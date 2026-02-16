import React from "react";
import { Composition } from "remotion";
import { UgcAd, ugcAdSchema } from "./compositions/UgcAd";
import { UgcThumbnail, ugcThumbnailSchema } from "./compositions/UgcThumbnail";
import { ProductShowcase, productShowcaseSchema } from "./compositions/ProductShowcase";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="UgcAd"
        component={UgcAd}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
        schema={ugcAdSchema}
        defaultProps={{
          hook: "You won't believe what this product did for me...",
          problem: "I used to struggle with this every single day.",
          solution: "Then I discovered this game-changing product.",
          features: [
            "Feature one that solves your biggest pain point",
            "Feature two that makes your life easier",
            "Feature three that you didn't know you needed",
          ],
          cta: "Link in bio - use code SAVE20 for 20% off!",
          productName: "Amazing Product",
          accentColor: "#FF6B35",
          scriptLength: "60s",
        }}
      />
      <Composition
        id="UgcThumbnail"
        component={UgcThumbnail}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1920}
        schema={ugcThumbnailSchema}
        defaultProps={{
          headline: "This Changed Everything",
          subline: "Watch to find out why",
          productName: "Amazing Product",
          accentColor: "#FF6B35",
        }}
      />
      <Composition
        id="ProductShowcase"
        component={ProductShowcase}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1080}
        schema={productShowcaseSchema}
        defaultProps={{
          productName: "Amazing Product",
          tagline: "The solution you've been waiting for",
          features: [
            "Premium quality materials",
            "Designed for everyday use",
            "30-day money-back guarantee",
          ],
          accentColor: "#FF6B35",
          backgroundColor: "#0D0D0D",
        }}
      />
    </>
  );
};
