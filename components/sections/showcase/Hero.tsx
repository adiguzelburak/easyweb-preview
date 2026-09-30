import { HomeScreen } from "./HomeScreen";
import { Button } from "@/components/ui/Button";
import { EasyText } from "@/components/ui/EasyText";
import { ArrowRight } from "@/components/ui/icons";
import { Phone } from "@/components/ui/Phone";
import { apps } from "@/content/apps";
import { hero } from "@/content/site";

export function Hero() {
  return (
    <section
      id="top"
      tabIndex={-1}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col justify-center pt-32 pb-20 text-ink outline-none md:py-32"
    >
      <div aria-hidden data-nav-theme="light" className="absolute -inset-x-4 inset-y-0 -z-10 bg-paper md:hidden" />

      <h1 id="hero-title" data-intro-split className="max-w-[11ch] text-hero">
        <EasyText text={hero.title} />
      </h1>

      <p data-intro-reveal className="mt-8 max-w-md text-lg leading-relaxed text-muted md:text-xl">
        {hero.lead}
      </p>

      <div data-intro-reveal className="mt-10 flex flex-wrap gap-3">
        <Button href={hero.primaryCta.href}>
          {hero.primaryCta.label}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Button>
        <Button href={hero.secondaryCta.href} variant="outline">
          {hero.secondaryCta.label}
        </Button>
      </div>

      <dl data-intro-reveal className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-ink/10 pt-6">
        {hero.metrics.map((metric) => (
          <div key={metric.label} className="flex flex-col-reverse justify-end gap-1">
            <dt className="text-sm text-muted">{metric.label}</dt>
            <dd className="text-3xl font-heavy tracking-tight tabular-nums">{metric.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mx-auto mt-16 w-[70%] max-w-72 md:hidden">
        <Phone introTarget>
          <HomeScreen apps={apps} />
        </Phone>
      </div>
    </section>
  );
}
