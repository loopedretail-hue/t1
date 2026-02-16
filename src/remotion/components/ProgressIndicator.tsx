import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { progressBar } from "../lib/animations";

interface ProgressIndicatorProps {
  color: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  color,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = progressBar(frame, durationInFrames);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 4,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          backgroundColor: color,
          transition: "none",
        }}
      />
    </div>
  );
};
