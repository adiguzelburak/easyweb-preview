import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { company } from "@/content/site";

export const cooperBlack = readFile(join(process.cwd(), "app/fonts/CooperBlack.ttf"));

export async function loadGoogleFont(family: string, weight: number, text: string) {
  const query = `family=${family.replaceAll(" ", "+")}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await fetch(`https://fonts.googleapis.com/css2?${query}`).then((response) => response.text());
  const source = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!source) throw new Error(`Google Fonts returned no TTF for ${family}`);
  return fetch(source).then((response) => response.arrayBuffer());
}

export async function brandIcon(size: number, { rounded }: { rounded: boolean }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: size * 0.094,
          borderRadius: rounded ? size * 0.227 : 0,
          background: "#ff6600",
          color: "#ffffff",
          fontFamily: "Cooper",
          fontSize: size * 0.78,
          lineHeight: 1,
        }}
      >
        {company.name[0]}
      </div>
    ),
    { width: size, height: size, fonts: [{ name: "Cooper", data: await cooperBlack, weight: 400, style: "normal" }] },
  );
}
