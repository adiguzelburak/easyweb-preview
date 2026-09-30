import Image from "next/image";
import { ScreenshotStory } from "./ScreenshotStory";
import { StatusBar } from "./StatusBar";
import { EasyText } from "@/components/ui/EasyText";
import { isOrangeWorld } from "@/content/apps";
import type { App } from "@/content/types";
import { cn } from "@/lib/cn";

type AppScreenProps = {
  app: App;
  playing?: boolean;
};

export function AppScreen({ app, playing = false }: AppScreenProps) {
  if (app.screenshots.length > 0) {
    return <ScreenshotStory screenshots={app.screenshots} playing={playing} />;
  }

  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center px-[10cqw] text-center",
        isOrangeWorld(app.world) && "on-orange",
      )}
      style={{ backgroundColor: app.world.background, color: app.world.foreground }}
    >
      <StatusBar tone={app.world.theme === "dark" ? "light" : "dark"} />
      <Image
        src={app.icon}
        alt=""
        width={256}
        height={256}
        sizes="128px"
        className="w-[36cqw] rounded-[22.5%] shadow-[0_3cqw_8cqw_rgba(0,0,0,0.3)]"
      />
      <p className="mt-[6cqw] text-[8.5cqw] leading-none font-heavy tracking-tight">
        <EasyText text={app.name} />
      </p>
      <p className="mt-[2.5cqw] text-[3.6cqw] font-medium opacity-70">{app.category}</p>
      <div className="mt-[9cqw] flex w-full flex-col items-center gap-[3cqw]">
        <span className="h-[10cqw] w-full rounded-[3.5cqw] bg-current opacity-10" />
        <span className="h-[10cqw] w-4/5 rounded-[3.5cqw] bg-current opacity-10" />
        <span className="h-[10cqw] w-3/5 rounded-[3.5cqw] bg-current opacity-10" />
      </div>
    </div>
  );
}
