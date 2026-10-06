import { EasyText } from "@/components/ui/EasyText";
import { company, footer } from "@/content/site";

export function Footer() {
  return (
    <footer data-nav-theme="dark" className="overflow-hidden bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 pt-20 md:px-8 md:pt-28">
        <div className="flex flex-col gap-14 md:flex-row md:justify-between">
          <div>
            <a href="#top" className="text-3xl leading-none md:text-4xl">
              <EasyText text={company.name} />
            </a>
            <p className="mt-4 max-w-xs text-paper/60">
              <EasyText text={footer.tagline} />
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:gap-20">
            {footer.columns.map((column) => (
              <div key={column.title}>
                <h2 className="text-sm text-paper/50">{column.title}</h2>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => {
                    const external = link.href.startsWith("http");
                    return (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noreferrer" : undefined}
                          className="font-medium transition-opacity hover:opacity-60"
                        >
                          <EasyText text={link.label} />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-paper/10 py-8 text-sm text-paper/50 sm:flex-row sm:justify-between">
          <p>
            <EasyText text={footer.legal} />
          </p>
          <a href={company.familyUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-paper">
            <EasyText text={footer.family} />
          </a>
        </div>
      </div>
    </footer>
  );
}
