export const INTRO_STORAGE_KEY = "easyapp:intro-seen";

export const introScript = `try{if(!sessionStorage.getItem("${INTRO_STORAGE_KEY}")&&matchMedia("(prefers-reduced-motion: no-preference)").matches)document.documentElement.dataset.intro="play"}catch(e){}`;

export function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
  } catch {
    return;
  }
}
