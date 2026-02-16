import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, slideUp } from "../lib/animations";

interface TextRevealProps {
  text: string;
  startFrame: number;
  fontSize?: number;
  color?: string;
  fontWeight?: React.CSSProperties["fontWeight"];
  textAlign?: React.CSSProperties["textAlign"];
  maxWidth?: string;
  lineHeight?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  startFrame,
  fontSize = 48,
  color = "#FFFFFF",
  fontWeight = "700",
  textAlign = "center",
  maxWidth = "90%",
  lineHeight = 1.3,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = fadeIn(frame, startFrame, 12);
  const translateY = slideUp(frame, startFrame, fps, 40);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        fontSize,
        color,
        fontWeight,
        textAlign,
        maxWidth,
        lineHeight,
        fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
        margin: "0 auto",
        padding: "0 40px",
      }}
    >
      {text}
    </div>
  );
};
