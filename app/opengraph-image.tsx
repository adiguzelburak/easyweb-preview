import { ImageResponse } from "next/og";
import { company, hero } from "@/content/site";
import { cooperBlack, loadGoogleFont } from "@/lib/og";

export const alt = company.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const [brand, domain] = company.name.split(".");
const words = hero.title.split(" ");

export default async function OpengraphImage() {
  const [cooper, bricolage] = await Promise.all([
    cooperBlack,
    loadGoogleFont("Bricolage Grotesque", 600, `${hero.title}.${domain}`).catch(() => null),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#ff6600",
          color: "#16130f",
          fontFamily: "Bricolage",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", fontSize: 88, color: "#f6f1e9" }}>
          <span style={{ fontFamily: "Cooper" }}>{brand}</span>
          <span>.{domain}</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", columnGap: 24, maxWidth: 1000, fontSize: 88, lineHeight: 1 }}>
          {words.map((word, index) => (
            <span
              key={index}
              style={word.startsWith("easy") ? { fontFamily: "Cooper", color: "#f6f1e9" } : { letterSpacing: "-0.03em" }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cooper", data: cooper, weight: 400, style: "normal" },
        ...(bricolage ? [{ name: "Bricolage", data: bricolage, weight: 600 as const, style: "normal" as const }] : []),
      ],
    },
  );
}
