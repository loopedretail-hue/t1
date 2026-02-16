export interface UgcScript {
  hook: string;
  problem: string;
  solution: string;
  features: string[];
  cta: string;
  productName: string;
  angle?: string;
  wordCount?: number;
}

export interface ScriptLength {
  label: string;
  durationSeconds: number;
  durationFrames: number;
  wordCount: number;
}

export const SCRIPT_LENGTHS: Record<string, ScriptLength> = {
  "30s": { label: "30 seconds", durationSeconds: 30, durationFrames: 900, wordCount: 75 },
  "60s": { label: "60 seconds", durationSeconds: 60, durationFrames: 1800, wordCount: 150 },
  "90s": { label: "90 seconds", durationSeconds: 90, durationFrames: 2700, wordCount: 225 },
  "120s": { label: "2 minutes", durationSeconds: 120, durationFrames: 3600, wordCount: 300 },
};

export const TIMING = {
  hookDuration: 90, // 3 seconds at 30fps
  problemDuration: 240, // 8 seconds
  solutionDuration: 210, // 7 seconds
  featureDuration: 180, // 6 seconds per feature
  ctaDuration: 150, // 5 seconds
  transitionFrames: 15,
} as const;
