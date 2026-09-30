import { ImageResponse } from "next/og";
import { company } from "@/content/site";
import { cooperBlack } from "@/lib/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 48,
          borderRadius: 116,
          background: "#ff6600",
          color: "#f6f1e9",
          fontFamily: "Cooper",
          fontSize: 400,
          lineHeight: 1,
        }}
      >
        {company.name[0]}
      </div>
    ),
    { ...size, fonts: [{ name: "Cooper", data: await cooperBlack, weight: 400, style: "normal" }] },
  );
}
