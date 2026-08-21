type Rgb = [number, number, number];

function toRgb(hex: string): Rgb {
  const value = hex.replace("#", "");
  const full = value.length === 3 ? [...value].map((c) => c + c).join("") : value;
  return [0, 2, 4].map((i) => Number.parseInt(full.slice(i, i + 2), 16)) as Rgb;
}

function toHex([r, g, b]: Rgb): string {
  return `#${[r, g, b].map((c) => Math.round(Math.min(255, Math.max(0, c))).toString(16).padStart(2, "0")).join("")}`;
}

function luminance(rgb: Rgb): number {
  const [r, g, b] = rgb.map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [light, dark] = [luminance(toRgb(a)), luminance(toRgb(b))].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

function mix(hex: string, towards: Rgb, amount: number): string {
  const rgb = toRgb(hex);
  return toHex(rgb.map((c, i) => c + (towards[i] - c) * amount) as Rgb);
}

const WHITE: Rgb = [255, 255, 255];
const BLACK: Rgb = [0, 0, 0];

/** Nudges a colour until it is readable as text on `background`, giving up at the extremes. */
function readableOn(colour: string, background: string, towards: Rgb): string {
  let candidate = colour;
  for (let step = 0; step < 20 && contrast(candidate, background) < 4.5; step += 1) {
    candidate = mix(candidate, towards, 0.1);
  }
  return candidate;
}

export type ResolvedTheme = {
  pageDark: string;
  pageLight: string;
  accent: string;
  accentInk: string;
  accentOnDark: string;
  accentOnLight: string;
};

export function resolveTheme(page: string, accent: string, accentInk: string): ResolvedTheme {
  const pageLight = mix(page, WHITE, 0.94);
  return {
    pageDark: page,
    pageLight,
    accent,
    accentInk,
    accentOnDark: readableOn(accent, page, WHITE),
    accentOnLight: readableOn(accent, pageLight, BLACK),
  };
}
