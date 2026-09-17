/**
 * Render Excalidraw JSON to PNG using the Playwright already installed in this repo.
 *
 * Node port of `render_excalidraw.py` — same template, same output — for environments
 * that have the project's `playwright-core` + cached Chromium but no `uv`/Python
 * Playwright. Prefer this one here; no setup step is needed.
 *
 * Usage:
 *   node .claude/skills/excalidraw-diagram/references/render_excalidraw.mjs <file.excalidraw> [--output path.png] [--scale 2] [--width 1920] [--crop-element id1,id2] [--crop-margin 40]
 */

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const { chromium } = await import('playwright-core').catch(async () => import('playwright'));

const args = process.argv.slice(2);
const positional = args.filter((arg) => !arg.startsWith('-'));
const flag = (name, fallback) => {
  const index = args.findIndex((arg) => arg === `--${name}` || arg === `-${name[0]}`);
  return index === -1 ? fallback : args[index + 1];
};

const inputPath = positional[0];
if (!inputPath) {
  console.error('Usage: node render_excalidraw.mjs <file.excalidraw> [--output path.png] [--scale 2] [--width 1920]');
  process.exit(1);
}

const outputPath = flag('output', inputPath.replace(/\.excalidraw$/, '') + '.png');
const scale = Number(flag('scale', 2));
const maxWidth = Number(flag('width', 1920));
const cropElementArg = flag('crop-element', null);
const cropElementIds = cropElementArg ? cropElementArg.split(',').map((id) => id.trim()) : null;
const cropMargin = Number(flag('crop-margin', 40));

const data = JSON.parse(readFileSync(inputPath, 'utf8'));
if (data.type !== 'excalidraw') {
  console.error(`ERROR: expected type 'excalidraw', got '${data.type}'`);
  process.exit(1);
}
const elements = (data.elements ?? []).filter((element) => !element.isDeleted);
if (elements.length === 0) {
  console.error('ERROR: no elements to render');
  process.exit(1);
}

/** Bounding box across every element, following points[] for arrows and lines. */
const bounds = elements.reduce(
  (box, element) => {
    const { x = 0, y = 0, width = 0, height = 0, type, points } = element;
    if ((type === 'arrow' || type === 'line') && points) {
      for (const [pointX, pointY] of points) {
        box.minX = Math.min(box.minX, x + pointX);
        box.minY = Math.min(box.minY, y + pointY);
        box.maxX = Math.max(box.maxX, x + pointX);
        box.maxY = Math.max(box.maxY, y + pointY);
      }
      return box;
    }
    box.minX = Math.min(box.minX, x);
    box.minY = Math.min(box.minY, y);
    box.maxX = Math.max(box.maxX, x + Math.abs(width));
    box.maxY = Math.max(box.maxY, y + Math.abs(height));
    return box;
  },
  { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity },
);

const padding = 80;
const viewportWidth = Math.min(Math.round(bounds.maxX - bounds.minX + padding * 2), maxWidth);
const viewportHeight = Math.max(Math.round(bounds.maxY - bounds.minY + padding * 2), 600);

const templatePath = resolve(dirname(fileURLToPath(import.meta.url)), 'render_template.html');
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: viewportWidth, height: viewportHeight },
  deviceScaleFactor: scale,
});

await page.goto(pathToFileURL(templatePath).href);
await page.waitForFunction('window.__moduleReady === true', undefined, { timeout: 60000 });

const result = await page.evaluate(
  ({ diagram, options }) => window.renderDiagram(diagram, options),
  { diagram: data, options: { cropElementIds, cropMargin } },
);
if (!result?.success) {
  console.error(`ERROR: render failed: ${result?.error ?? 'renderDiagram returned null'}`);
  await browser.close();
  process.exit(1);
}
if (result.warning) {
  console.error(`WARNING: ${result.warning}`);
}

await page.waitForFunction('window.__renderComplete === true', undefined, { timeout: 15000 });
const svg = await page.$('#root svg');
if (!svg) {
  console.error('ERROR: no SVG element found after render');
  await browser.close();
  process.exit(1);
}

await svg.screenshot({ path: outputPath });
await browser.close();
console.log(outputPath);
