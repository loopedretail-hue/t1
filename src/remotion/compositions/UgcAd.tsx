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
import { ProgressIndicator } from "../components/ProgressIndicator";
import { SCRIPT_LENGTHS, TIMING } from "../lib/types";
import { fadeIn, fadeOut, pulseScale } from "../lib/animations";

export const ugcAdSchema = z.object({
  hook: z.string(),
  problem: z.string(),
  solution: z.string(),
  features: z.array(z.string()),
  cta: z.string(),
  productName: z.string(),
  accentColor: z.string().default("#FF6B35"),
  scriptLength: z.enum(["30s", "60s", "90s", "120s"]).default("60s"),
});

type UgcAdProps = z.infer<typeof ugcAdSchema>;

export const UgcAd: React.FC<UgcAdProps> = ({
  hook,
  problem,
  solution,
  features,
  cta,
  productName,
  accentColor,
  scriptLength,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const config = SCRIPT_LENGTHS[scriptLength];

  // Calculate section timing based on total duration
  const totalFrames = durationInFrames;
  const hookEnd = TIMING.hookDuration;
  const problemEnd = hookEnd + TIMING.problemDuration;
  const solutionEnd = problemEnd + TIMING.solutionDuration;
  const featuresEnd =
    solutionEnd + features.length * TIMING.featureDuration;
  const ctaStart = totalFrames - TIMING.ctaDuration;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0D0D0D",
        overflow: "hidden",
      }}
    >
      {/* Ambient gradient background */}
      <div
        style={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background: `radial-gradient(circle at 50% 30%, ${accentColor}15 0%, transparent 50%)`,
        }}
      />

      {/* HOOK section */}
      <Sequence from={0} durationInFrames={hookEnd}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextReveal
            text={hook}
            startFrame={5}
            fontSize={56}
            fontWeight="800"
          />
          <AccentBar startFrame={15} color={accentColor} width={120} />
        </AbsoluteFill>
      </Sequence>

      {/* PROBLEM section */}
      <Sequence from={hookEnd} durationInFrames={TIMING.problemDuration}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextReveal
            text={problem}
            startFrame={5}
            fontSize={44}
            fontWeight="600"
            color="#E0E0E0"
          />
        </AbsoluteFill>
      </Sequence>

      {/* SOLUTION section */}
      <Sequence from={problemEnd} durationInFrames={TIMING.solutionDuration}>
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
              fontSize={32}
              color={accentColor}
              fontWeight="600"
            />
            <TextReveal
              text={solution}
              startFrame={12}
              fontSize={44}
              fontWeight="700"
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* FEATURES section */}
      <Sequence
        from={solutionEnd}
        durationInFrames={features.length * TIMING.featureDuration}
      >
        <AbsoluteFill
          style={{
            justifyContent: "center",
            paddingTop: 100,
          }}
        >
          <TextReveal
            text="Why it works:"
            startFrame={0}
            fontSize={36}
            color={accentColor}
            fontWeight="700"
          />
          <div style={{ marginTop: 40 }}>
            {features.map((feature, i) => (
              <FeatureCard
                key={i}
                text={feature}
                index={i}
                startFrame={15}
                accentColor={accentColor}
              />
            ))}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* CTA section */}
      <Sequence from={ctaStart} durationInFrames={TIMING.ctaDuration}>
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            background: `linear-gradient(180deg, #0D0D0D 0%, ${accentColor}20 100%)`,
          }}
        >
          <div
            style={{
              transform: `scale(${pulseScale(frame - ctaStart, fps, 0.02)})`,
              textAlign: "center",
            }}
          >
            <TextReveal
              text={cta}
              startFrame={5}
              fontSize={48}
              fontWeight="800"
            />
            <AccentBar startFrame={20} color={accentColor} width={200} height={6} />
            <TextReveal
              text={productName}
              startFrame={25}
              fontSize={28}
              color={accentColor}
              fontWeight="600"
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      <ProgressIndicator color={accentColor} />
    </AbsoluteFill>
  );
};
