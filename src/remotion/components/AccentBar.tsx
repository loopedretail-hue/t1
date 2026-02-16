import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { scaleIn } from "../lib/animations";

interface AccentBarProps {
  startFrame: number;
  color: string;
  width?: number;
  height?: number;
}

export const AccentBar: React.FC<AccentBarProps> = ({
  startFrame,
  color,
  width = 80,
  height = 5,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = scaleIn(frame, startFrame, fps);

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: color,
        borderRadius: height / 2,
        transform: `scaleX(${scale})`,
        transformOrigin: "center",
        margin: "20px auto",
      }}
    />
  );
};
