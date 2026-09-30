import { brandIcon } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS masks home-screen icons itself, so this one stays square.
export default function AppleIcon() {
  return brandIcon(size.width, { rounded: false });
}
