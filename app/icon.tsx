import { brandIcon } from "@/lib/og";

// Google Search only shows favicons whose size is a multiple of 48px.
export const size = { width: 480, height: 480 };
export const contentType = "image/png";

export default function Icon() {
  return brandIcon(size.width, { rounded: true });
}
