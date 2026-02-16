import React from "react";
import { AbsoluteFill } from "remotion";
import { z } from "zod";

export const ugcThumbnailSchema = z.object({
  headline: z.string(),
  subline: z.string(),
  productName: z.string(),
  accentColor: z.string().default("#FF6B35"),
});

type UgcThumbnailProps = z.infer<typeof ugcThumbnailSchema>;

export const UgcThumbnail: React.FC<UgcThumbnailProps> = ({
  headline,
  subline,
  productName,
  accentColor,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0D0D0D",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background accent glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "80%",
          height: "60%",
          background: `radial-gradient(ellipse, ${accentColor}25 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
          padding: "0 60px",
          position: "relative",
        }}
      >
        {/* Headline */}
        <div
          style={{
            fontSize: 72,
            fontWeight: "900",
            color: "#FFFFFF",
            fontFamily: "'Inter', sans-serif",
            textAlign: "center",
            lineHeight: 1.1,
            textTransform: "uppercase",
            letterSpacing: -2,
          }}
        >
          {headline}
        </div>

        {/* Accent bar */}
        <div
          style={{
            width: 120,
            height: 6,
            backgroundColor: accentColor,
            borderRadius: 3,
          }}
        />

        {/* Subline */}
        <div
          style={{
            fontSize: 36,
            fontWeight: "500",
            color: "#AAAAAA",
            fontFamily: "'Inter', sans-serif",
            textAlign: "center",
          }}
        >
          {subline}
        </div>

        {/* Product badge */}
        <div
          style={{
            marginTop: 40,
            padding: "16px 48px",
            backgroundColor: accentColor,
            borderRadius: 50,
            fontSize: 28,
            fontWeight: "700",
            color: "#FFFFFF",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {productName}
        </div>
      </div>
    </AbsoluteFill>
  );
};
