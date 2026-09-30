import Image from "next/image";
import { LinkedInLogo } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { team } from "@/content/site";
import { teamMembers } from "@/content/team";

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

export function Team() {
  return (
    <section
      id="team"
      tabIndex={-1}
      aria-labelledby="team-title"
      data-nav-theme="light"
      className="bg-paper text-ink outline-none"
    >
      <div className="mx-auto max-w-7xl px-4 py-28 md:px-8 md:py-40">
        <SectionHeading id="team-title" eyebrow={team.eyebrow} title={team.title} />

        <ul className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <li key={`${member.name}-${member.role}`}>
              <Reveal delay={index * 0.08}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink/5">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <span aria-hidden className="absolute inset-0 grid place-items-center text-6xl font-heavy text-ink/15">
                      {initials(member.name)}
                    </span>
                  )}
                </div>
                <p className="mt-5 text-xl font-semibold">{member.name}</p>
                <p className="mt-1 text-muted">{member.role}</p>
                {member.linkedIn && (
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} — LinkedIn`}
                    className="mt-4 inline-flex size-10 items-center justify-center rounded-full ring-1 ring-ink/15 transition ring-inset hover:bg-ink hover:text-paper"
                  >
                    <LinkedInLogo className="size-4" />
                  </a>
                )}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
