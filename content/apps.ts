import type { App, AppId, World } from "./types";

const brandOrange = "#ff6600";

export const homeWorld: World = {
  background: "#f6f1e9",
  foreground: "#16130f",
  accent: brandOrange,
  theme: "light",
};

const storeShots = (name: string, count: number, extension: "jpg" | "png" | "webp") =>
  Array.from({ length: count }, (_, index) => `/apps/screenshoots/${name}-${index + 1}.${extension}`);

export const apps: App[] = [
  {
    id: "globealert",
    name: "GlobeAlert",
    category: "Real-time World News",
    tagline: "Breaking news, conflicts and earthquakes — tracked live on an interactive world map.",
    icon: "/apps/globealert/icon.png",
    screenshots: storeShots("globe", 6, "png"),
    world: { background: "#0b1622", foreground: "#f6f1e9", accent: "#ff3b30", theme: "dark" },
    stores: {
      appStore: "https://apps.apple.com/us/app/live-world-monitor-globealert/id6780722710",
      googlePlay: "https://play.google.com/store/apps/details?id=com.kmzapps.worldmonitor",
    },
  },
  {
    id: "glpal",
    name: "GLPal",
    category: "GLP-1 Tracker",
    tagline: "Your companion for the GLP-1 journey — every dose, weigh-in and meal in one simple place.",
    icon: "/apps/glpal/icon.png",
    screenshots: storeShots("glpal", 7, "png"),
    world: { background: "#ebe5ff", foreground: "#16130f", accent: "#7b5cf0", theme: "light" },
    cards: [
      {
        kind: "stats",
        tint: "#7b5cf0",
        title: "Shot Day",
        subtitle: "Today at 3pm",
        stats: [
          { label: "Dose", value: "2.5 mg" },
          { label: "Next", value: "7 days" },
          { label: "Streak", value: "12 wk" },
        ],
      },
      {
        kind: "progress",
        tint: "#d9468f",
        title: "Protein",
        subtitle: "116 of 148 g",
        items: [
          { label: "Breakfast", value: "32 g" },
          { label: "Lunch", value: "48 g" },
          { label: "Dinner", value: "36 g" },
        ],
        progress: 0.78,
      },
      {
        kind: "meter",
        tint: "#1f8f84",
        title: "Weight",
        subtitle: "This month",
        items: [
          { label: "Start", value: "86.4 kg" },
          { label: "Now", value: "82.2 kg" },
          { label: "Goal", value: "78 kg" },
        ],
        reading: "−4.2 kg",
      },
    ],
    stores: {
      appStore: "https://apps.apple.com/tr/app/glp-1-tracker-glpal/id6783449123",
      googlePlay: "https://play.google.com/store/apps/details?id=com.easyapp.glpal",
    },
  },
  {
    id: "comikaze",
    name: "Comikaze",
    category: "Comic & Manga Maker",
    tagline: "Turn your photos and stories into stunning comic strips and manga panels.",
    icon: "/apps/comikaze/icon.png",
    screenshots: storeShots("comikaze", 5, "jpg"),
    world: { background: "#ffd83d", foreground: "#16130f", accent: "#e5322d", theme: "light" },
    stores: {
      appStore: "https://apps.apple.com/us/app/comic-maker-manga-comikaze/id6760800445",
      googlePlay: "https://play.google.com/store/apps/details?id=com.appricott.comikaze",
    },
  },
  {
    id: "easystars",
    name: "easyStars",
    category: "Astrology & Tarot",
    tagline: "AI-powered birth charts, daily horoscopes and tarot readings — your personal astrologer.",
    icon: "/apps/easystars/icon.png",
    screenshots: storeShots("easystars", 9, "jpg"),
    world: { background: "#1b1340", foreground: "#f6f1e9", accent: "#8b5cf6", theme: "dark" },
    stores: {
      appStore: "https://apps.apple.com/us/app/easystars-astrology-tarot/id6462723652",
      googlePlay: "https://play.google.com/store/apps/details?id=co.stellarapp.stellar",
    },
  },
  {
    id: "easymusic",
    name: "easyMusic",
    category: "AI Music Studio",
    tagline: "Turn any idea into a full song — AI vocals, covers and music videos in minutes.",
    icon: "/apps/easymusic/icon.png",
    screenshots: storeShots("easymusic", 5, "jpg"),
    world: { background: brandOrange, foreground: "#16130f", accent: "#16130f", theme: "light" },
    stores: {
      appStore: "https://apps.apple.com/us/app/ai-song-generator-easymusic/id6773059145",
      googlePlay: "https://play.google.com/store/apps/details?id=com.easyapp.easymusic",
    },
  },
  {
    id: "carup",
    name: "CarUp",
    category: "CarPlay Widgets & Sounds",
    tagline: "Make your CarPlay screen truly yours — your car, your style, your sounds.",
    icon: "/apps/carup/icon.png",
    screenshots: storeShots("carup", 5, "webp"),
    world: { background: "#0c120e", foreground: "#f6f1e9", accent: "#3ad35e", theme: "dark" },
    stores: {
      appStore: "https://apps.apple.com/gb/app/car-widgets-dashboard-carup/id6791237038",
    },
  },
];

export function worldOf(id: AppId | "home"): World {
  return apps.find((app) => app.id === id)?.world ?? homeWorld;
}

export const isOrangeWorld = (world: World) => world.background === brandOrange;
