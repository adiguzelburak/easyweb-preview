export type AppId = "easystars" | "easymusic" | "comikaze" | "globealert" | "glpal" | "carup";

export type Theme = "light" | "dark";

export type Link = {
  label: string;
  href: string;
};

export type World = {
  background: string;
  foreground: string;
  accent: string;
  theme: Theme;
};

export type Stat = {
  value: string;
  label: string;
};

export type CountStat = {
  value: number;
  suffix?: string;
  label: string;
  context: string;
};

type GlassCardBase = {
  tint: string;
  title: string;
  subtitle: string;
};

export type GlassCard =
  | (GlassCardBase & { kind: "stats"; stats: Stat[] })
  | (GlassCardBase & { kind: "progress"; items: Stat[]; progress: number })
  | (GlassCardBase & { kind: "meter"; items: Stat[]; reading: string });

export type App = {
  id: AppId;
  name: string;
  category: string;
  tagline: string;
  icon: string;
  screenshots: string[];
  world: World;
  cards?: GlassCard[];
  stores: {
    appStore?: string;
    googlePlay?: string;
  };
  metrics?: Stat[];
};

export type PlaybookStop = {
  title: string;
  body: string;
};

export type TeamMember = {
  name: string;
  role: string;
  photo?: string;
  linkedIn?: string;
};
