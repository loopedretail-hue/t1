import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { TextReveal } from "../components/TextReveal";
import { AccentBar } from "../components/AccentBar";
import { FeatureCard } from "../components/FeatureCard";
import { fadeIn, scaleIn } from "../lib/animations";

export const productShowcaseSchema = z.object({
  productName: z.string(),
  tagline: z.string(),
  features: z.array(z.string()),
  accentColor: z.string().default("#FF6B35"),
  backgroundColor: z.string().default("#0D0D0D"),
});

type ProductShowcaseProps = z.infer<typeof productShowcaseSchema>;

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  productName,
  tagline,
  features,
  accentColor,
  backgroundColor,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const introEnd = 90;
  const featuresStart = introEnd;
  const featuresEnd = featuresStart + features.length * 50 + 30;

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 50% 50%, ${accentColor}10 0%, transparent 60%)`,
        }}
      />

      {/* Intro */}
      <Sequence from={0} durationInFrames={introEnd}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <TextReveal
              text={productName}
              startFrame={5}
              fontSize={64}
              fontWeight="900"
              color="#FFFFFF"
            />
            <AccentBar startFrame={15} color={accentColor} width={100} />
            <TextReveal
              text={tagline}
              startFrame={22}
              fontSize={32}
              fontWeight="400"
              color="#AAAAAA"
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Features */}
      <Sequence from={featuresStart} durationInFrames={featuresEnd - featuresStart}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
          }}
        >
          {features.map((feature, i) => (
            <FeatureCard
              key={i}
              text={feature}
              index={i}
              startFrame={10}
              accentColor={accentColor}
            />
          ))}
        </AbsoluteFill>
      </Sequence>

      {/* Outro / Logo */}
      <Sequence from={durationInFrames - 60} durationInFrames={60}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              opacity: fadeIn(frame, durationInFrames - 55, 15),
              transform: `scale(${scaleIn(frame, durationInFrames - 55, fps)})`,
              fontSize: 48,
              fontWeight: "900",
              color: accentColor,
              fontFamily: "'Inter', sans-serif",
              textAlign: "center",
            }}
          >
            {productName}
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
