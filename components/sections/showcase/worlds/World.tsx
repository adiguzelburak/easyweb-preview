import { CarupWorld } from "./CarupWorld";
import { ComicWorld } from "./ComicWorld";
import { GlobeWorld } from "./GlobeWorld";
import { GlpalWorld } from "./GlpalWorld";
import { MusicWorld } from "./MusicWorld";
import { StarsWorld } from "./StarsWorld";
import type { WorldProps } from "./types";
import type { AppId } from "@/content/types";

export function World({ id, ...props }: WorldProps & { id: AppId }) {
  switch (id) {
    case "easystars":
      return <StarsWorld {...props} />;
    case "easymusic":
      return <MusicWorld {...props} />;
    case "comikaze":
      return <ComicWorld {...props} />;
    case "globealert":
      return <GlobeWorld {...props} />;
    case "glpal":
      return <GlpalWorld {...props} />;
    case "carup":
      return <CarupWorld {...props} />;
  }
}
