import { ImageResponse } from "next/og";

export const alt = "Mo Magnett__ — Code / AI / Live";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          color: "#e8e4e0",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 96,
            height: 6,
            background: "#e63946",
            marginBottom: 40,
          }}
        />
        <div
          style={{
            fontSize: 130,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
          }}
        >
          MO MAGNETT__
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 30,
            color: "#e63946",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
          }}
        >
          Code / AI / Live Performance
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 22,
            color: "#666666",
            letterSpacing: "0.1em",
          }}
        >
          systems that listen, respond, and evolve
        </div>
      </div>
    ),
    { ...size }
  );
}
