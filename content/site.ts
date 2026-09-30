import type { CountStat, Link, PlaybookStop, Stat } from "./types";

const email = "info@appricott.ai";
const linkedInUrl = "https://www.linkedin.com/company/easyapp.io";
const familyUrl = "https://easy.com/";

export const company = {
  name: "easyApp.io",
  title: "easyApp.io — The app publisher of the easy® family",
  description:
    "easyApp.io is the app publisher of the easy® family. We build, launch and scale consumer apps that people use every day.",
  url: "https://www.easyapp.io",
  email,
  linkedInUrl,
  familyUrl,
  gaId: "G-KPX919X0L5",
  showTeam: false,
};

export const ui = {
  skipToContent: "Skip to content",
  mainNav: "Main",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  appsRail: "Jump to an app",
  appStore: "App Store",
  googlePlay: "Google Play",
};

const sectionLinks: Link[] = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Playbook", href: "#playbook" },
  { label: "Traction", href: "#traction" },
  { label: "Contact", href: "#contact" },
];

const contactUs: Link = { label: "Contact us", href: `mailto:${email}` };

export const nav = {
  links: sectionLinks,
  cta: contactUs,
};

export const hero = {
  title: "The app publisher of the easy® family.",
  lead: "We build, launch and scale consumer apps that people use every day.",
  primaryCta: contactUs,
  secondaryCta: { label: "See the portfolio", href: "#portfolio" } satisfies Link,
  metrics: [
    { value: "10M+", label: "Downloads" },
    { value: "6", label: "Flagship apps" },
    { value: "50+", label: "Markets" },
  ] satisfies Stat[],
};

export const phone = {
  time: "9:41",
  widgetCaption: "Six flagship apps",
  search: "Search",
};

export const portfolio = {
  eyebrow: "Portfolio",
  title: "Six flagship apps. Six worlds.",
  lead: "Each app is built for its own audience and runs on the same publishing engine.",
};

export const playbook = {
  eyebrow: "Playbook",
  title: "A playbook that compounds.",
  lead: "Every app moves through the same four stages, and every launch makes the next one faster.",
  stops: [
    { title: "Launch", body: "From idea to the stores fast, with lean MVPs tested on real users." },
    { title: "Grow", body: "Paid acquisition, ASO and creators, steered by cohort data." },
    { title: "Monetize", body: "Subscriptions and paywalls, A/B tested at every step." },
    { title: "Scale", body: "Localized and launched across 50+ markets." },
  ] satisfies PlaybookStop[],
};

export const traction = {
  eyebrow: "Traction",
  title: "By the numbers.",
  metrics: [
    { value: 10, suffix: "M+", label: "Total downloads", context: "Across iOS and Android." },
    { value: 25, suffix: "+", label: "Apps published", context: "Shipped to the App Store and Google Play." },
    { value: 50, suffix: "+", label: "Markets served", context: "With localized store listings." },
    { value: 6, label: "Flagship apps", context: "easyStars, easyMusic, Comikaze, GlobeAlert, GLPal and CarUp." },
  ] satisfies CountStat[],
};

export const family = {
  eyebrow: "The easy® family",
  title: "Part of the easy® family of brands.",
  mark: "easy",
  body: "easyApp.io is the mobile app publisher of the easy® family, bringing the easy® name to apps used around the world.",
  link: { label: "Visit easy.com", href: familyUrl } satisfies Link,
  brands: [] as string[],
};

export const team = {
  eyebrow: "Team",
  title: "The people behind the apps.",
};

export const closing = {
  eyebrow: "Contact",
  title: "Let’s make it easy.",
  lead: "For investment and partnership inquiries, write to us directly.",
  copy: "Copy email address",
  copied: "Email copied",
  mailApp: "Open in your mail app",
  linkedIn: "LinkedIn",
};

export const footer = {
  tagline: "The app publisher of the easy® family.",
  columns: [
    { title: "Company", links: sectionLinks },
    {
      title: "Elsewhere",
      links: [
        { label: "easy.com", href: familyUrl },
        { label: "LinkedIn", href: linkedInUrl },
      ],
    },
  ] satisfies { title: string; links: Link[] }[],
  family: "Part of the easy® family of brands",
  legal: "© 2026 easyApp.io — All rights reserved.",
};
