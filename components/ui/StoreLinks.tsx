import { AppleLogo, PlayLogo } from "./icons";
import { ui } from "@/content/site";
import type { App } from "@/content/types";

type StoreLinksProps = {
  stores: App["stores"];
  appName: string;
};

export function StoreLinks({ stores, appName }: StoreLinksProps) {
  const links = [
    { href: stores.appStore, label: ui.appStore, Icon: AppleLogo },
    { href: stores.googlePlay, label: ui.googlePlay, Icon: PlayLogo },
  ].filter((link): link is typeof link & { href: string } => Boolean(link.href));

  return (
    <ul className="flex flex-wrap gap-2">
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${appName} — ${label}`}
            className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold ring-1 ring-current/25 transition duration-300 ring-inset hover:ring-current"
          >
            <Icon className="size-4" />
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
