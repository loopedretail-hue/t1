import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fadeIn, slideUp, scaleIn } from "../lib/animations";

interface FeatureCardProps {
  text: string;
  index: number;
  startFrame: number;
  accentColor: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  text,
  index,
  startFrame,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const itemStart = startFrame + index * 20;
  const opacity = fadeIn(frame, itemStart, 10);
  const translateY = slideUp(frame, itemStart, fps, 30);
  const bulletScale = scaleIn(frame, itemStart, fps);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        display: "flex",
        alignItems: "flex-start",
        gap: 20,
        padding: "16px 40px",
        maxWidth: "90%",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: accentColor,
          transform: `scale(${bulletScale})`,
          flexShrink: 0,
          marginTop: 10,
        }}
      />
      <span
        style={{
          fontSize: 36,
          color: "#FFFFFF",
          fontFamily: "'Inter', sans-serif",
          fontWeight: "500",
          lineHeight: 1.4,
        }}
      >
        {text}
      </span>
    </div>
  );
};
