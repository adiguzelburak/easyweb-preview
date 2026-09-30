import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const cooperBlack = readFile(join(process.cwd(), "app/fonts/CooperBlack.ttf"));

export async function loadGoogleFont(family: string, weight: number, text: string) {
  const query = `family=${family.replaceAll(" ", "+")}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await fetch(`https://fonts.googleapis.com/css2?${query}`).then((response) => response.text());
  const source = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!source) throw new Error(`Google Fonts returned no TTF for ${family}`);
  return fetch(source).then((response) => response.arrayBuffer());
}
