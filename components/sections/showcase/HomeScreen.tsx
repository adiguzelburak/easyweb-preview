import Image from "next/image";
import { StatusBar } from "./StatusBar";
import { EasyText } from "@/components/ui/EasyText";
import { SearchIcon } from "@/components/ui/icons";
import { company, phone } from "@/content/site";
import type { App } from "@/content/types";

export function HomeScreen({ apps }: { apps: App[] }) {
  return (
    <div className="absolute inset-0 flex flex-col bg-[radial-gradient(130%_90%_at_50%_0%,#ff8a3d_0%,#ff6600_48%,#e85a00_100%)] px-[6cqw] pt-[15cqw] text-white">
      <StatusBar tone="light" />

      <div
        data-intro-pop
        className="flex aspect-[2.1/1] flex-col justify-between rounded-[6.5cqw] bg-paper p-[5.5cqw] text-ink shadow-[0_2cqw_6cqw_rgba(22,19,15,0.18)]"
      >
        <span className="text-[9.5cqw] leading-none">
          <EasyText text={company.name} />
        </span>
        <span className="text-[3.4cqw] font-semibold text-muted">{phone.widgetCaption}</span>
      </div>

      <ul className="mt-[8cqw] grid grid-cols-4 gap-x-[5cqw] gap-y-[5cqw] on-orange">
        {apps.map((app) => (
          <li key={app.id} data-intro-pop className="flex min-w-0 flex-col items-center gap-[1.8cqw]">
            <Image
              data-app-icon={app.id}
              src={app.icon}
              alt=""
              width={128}
              height={128}
              sizes="72px"
              className="aspect-square w-full rounded-[22.5%] shadow-[0_1cqw_3cqw_rgba(22,19,15,0.2)]"
            />
            <span className="w-full truncate text-center text-[2.7cqw] font-medium">
              <EasyText text={app.name} />
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto mb-[7cqw] flex items-center gap-[1.6cqw] self-center rounded-full bg-white/25 px-[4cqw] py-[1.8cqw] text-[3.2cqw] font-medium backdrop-blur-md">
        <SearchIcon className="size-[3.4cqw]" />
        {phone.search}
      </div>
    </div>
  );
}
