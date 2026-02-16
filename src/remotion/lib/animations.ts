import { interpolate, spring, Easing } from "remotion";

export function fadeIn(frame: number, start: number, duration = 15): number {
  return interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

export function fadeOut(frame: number, start: number, duration = 15): number {
  return interpolate(frame, [start, start + duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

export function slideUp(
  frame: number,
  start: number,
  fps: number,
  distance = 60,
): number {
  const progress = spring({
    frame: frame - start,
    fps,
    config: { damping: 15, stiffness: 120, mass: 0.8 },
  });
  return interpolate(progress, [0, 1], [distance, 0]);
}

export function scaleIn(
  frame: number,
  start: number,
  fps: number,
): number {
  return spring({
    frame: frame - start,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.6 },
  });
}

export function typewriter(
  text: string,
  frame: number,
  start: number,
  charsPerFrame = 1.5,
): string {
  const elapsed = Math.max(0, frame - start);
  const charCount = Math.floor(elapsed * charsPerFrame);
  return text.slice(0, charCount);
}

export function pulseScale(
  frame: number,
  fps: number,
  intensity = 0.05,
): number {
  const pulse = Math.sin((frame / fps) * Math.PI * 2) * intensity;
  return 1 + pulse;
}

export function progressBar(
  frame: number,
  totalFrames: number,
): number {
  return interpolate(frame, [0, totalFrames], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.linear,
  });
}
