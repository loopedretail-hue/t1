#!/usr/bin/env node

/**
 * Parses n8n UGC script generation output into Remotion-compatible props.
 *
 * Usage:
 *   node scripts/parse-n8n-output.mjs < n8n-response.json > scripts-data.json
 *   curl ... | node scripts/parse-n8n-output.mjs > scripts-data.json
 *
 * Takes the n8n webhook response and extracts script sections into
 * the format expected by the Remotion compositions.
 */

import { readFileSync } from "node:fs";

const input = readFileSync("/dev/stdin", "utf-8");
const data = JSON.parse(input);

function extractScripts(responseText) {
  // n8n output is a compilation document with numbered scripts
  const scriptBlocks = responseText.split(/---\s*SCRIPT\s*\d+/i).filter(Boolean);

  return scriptBlocks.map((block) => {
    const lines = block.trim().split("\n").filter((l) => l.trim());

    const hookLine = findSection(lines, "hook");
    const problemLine = findSection(lines, "problem", "agitation");
    const solutionLine = findSection(lines, "solution", "introduction");
    const ctaLine = findSection(lines, "call to action", "cta");
    const featureLines = findBulletPoints(lines, "feature", "benefit");

    return {
      hook: hookLine || lines[0] || "",
      problem: problemLine || "",
      solution: solutionLine || "",
      features: featureLines.length > 0 ? featureLines : ["Key benefit"],
      cta: ctaLine || "Check it out - link in bio!",
      productName: extractProductName(block) || "Product",
      accentColor: "#FF6B35",
      scriptLength: "60s",
    };
  });
}

function findSection(lines, ...keywords) {
  for (const line of lines) {
    const lower = line.toLowerCase();
    if (keywords.some((kw) => lower.includes(kw))) {
      return line.replace(/^[*#\-\d.:\s]+/, "").replace(/\*\*/g, "").trim();
    }
  }
  return "";
}

function findBulletPoints(lines, ...keywords) {
  const results = [];
  let inSection = false;

  for (const line of lines) {
    const lower = line.toLowerCase();
    if (keywords.some((kw) => lower.includes(kw))) {
      inSection = true;
      continue;
    }
    if (inSection && /^[\s]*[-•*]/.test(line)) {
      results.push(line.replace(/^[\s]*[-•*]\s*/, "").replace(/\*\*/g, "").trim());
    } else if (inSection && results.length > 0 && !/^\s/.test(line)) {
      break;
    }
  }

  return results.slice(0, 5);
}

function extractProductName(text) {
  const match = text.match(/product\s*(?:name)?[:]\s*(.+)/i);
  return match ? match[1].trim().replace(/\*\*/g, "") : null;
}

// Process input
const text = typeof data === "string" ? data : data.output || data.text || JSON.stringify(data);
const scripts = extractScripts(text);

console.log(JSON.stringify(scripts, null, 2));
