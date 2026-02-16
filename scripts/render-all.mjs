#!/usr/bin/env node

/**
 * Batch render script for UGC video compositions.
 *
 * Usage:
 *   node scripts/render-all.mjs
 *   node scripts/render-all.mjs --input scripts-data.json
 *
 * Input JSON format:
 * [
 *   {
 *     "hook": "...",
 *     "problem": "...",
 *     "solution": "...",
 *     "features": ["..."],
 *     "cta": "...",
 *     "productName": "...",
 *     "accentColor": "#FF6B35",
 *     "scriptLength": "60s"
 *   }
 * ]
 */

import { execSync } from "node:child_process";
import { readFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, join } from "node:path";

const args = process.argv.slice(2);
const inputIndex = args.indexOf("--input");
const inputFile = inputIndex !== -1 ? args[inputIndex + 1] : null;

const outDir = resolve("out");
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

const entryPoint = "src/remotion/index.ts";

function renderComposition(compositionId, props, outputFile) {
  const propsJson = JSON.stringify(props);
  const cmd = [
    "npx remotion render",
    entryPoint,
    compositionId,
    `"${outputFile}"`,
    `--props='${propsJson}'`,
  ].join(" ");

  console.log(`Rendering: ${outputFile}`);
  try {
    execSync(cmd, { stdio: "inherit" });
    console.log(`Done: ${outputFile}\n`);
  } catch (err) {
    console.error(`Failed to render ${outputFile}: ${err.message}`);
    process.exit(1);
  }
}

if (inputFile) {
  // Batch render from input JSON
  const data = JSON.parse(readFileSync(inputFile, "utf-8"));
  const scripts = Array.isArray(data) ? data : [data];

  scripts.forEach((script, i) => {
    const slug = script.productName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const videoFile = join(outDir, `${slug}-${i + 1}.mp4`);
    const thumbFile = join(outDir, `${slug}-${i + 1}-thumb.png`);

    renderComposition("UgcAd", script, videoFile);
    renderComposition(
      "UgcThumbnail",
      {
        headline: script.hook.slice(0, 40),
        subline: script.solution.slice(0, 60),
        productName: script.productName,
        accentColor: script.accentColor || "#FF6B35",
      },
      thumbFile,
    );
  });
} else {
  // Default demo render
  console.log("No --input file specified, rendering with default props.\n");
  renderComposition("UgcAd", {}, join(outDir, "demo-ugc-ad.mp4"));
  renderComposition("UgcThumbnail", {}, join(outDir, "demo-thumbnail.png"));
  renderComposition("ProductShowcase", {}, join(outDir, "demo-showcase.mp4"));
}

console.log("All renders complete.");
