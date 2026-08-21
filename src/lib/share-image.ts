import { formatSubmittedAt } from "./prediction-code";
import type { League, Team, Zone } from "./types";

const WIDTH = 1080;
const PADDING = 56;
const HEADER_HEIGHT = 210;
const FOOTER_HEIGHT = 96;
const ROW_GAP = 6;

function zoneForPosition(league: League, position: number): Zone | undefined {
  return league.zones.find((zone) => position >= zone.from && position <= zone.to);
}

function loadImage(source: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = source;
  });
}

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
}

export async function renderShareImage(
  league: League,
  order: Team[],
  name: string,
  submittedAt: Date,
): Promise<Blob | null> {
  const theme = {
    page: league.theme.page,
    ink: "#ffffff",
    card: "#ffffff",
    cardInk: "#14161a",
    muted: "#6b6f76",
    accent: league.theme.accent,
  };
  const rowHeight = 56;
  const tableHeight = order.length * (rowHeight + ROW_GAP) - ROW_GAP;
  const height = HEADER_HEIGHT + tableHeight + FOOTER_HEIGHT + PADDING;

  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) return null;

  context.fillStyle = theme.page;
  context.fillRect(0, 0, WIDTH, height);

  context.fillStyle = theme.accent;
  context.fillRect(0, 0, WIDTH, 10);

  context.textBaseline = "middle";

  context.fillStyle = theme.ink;
  context.font = "700 52px Figtree, system-ui, sans-serif";
  context.fillText(name || "My prediction", PADDING, 96);

  context.fillStyle = theme.accent;
  context.font = "700 28px Figtree, system-ui, sans-serif";
  context.fillText(`${league.name} ${league.season}`.toUpperCase(), PADDING, 150);

  context.fillStyle = theme.muted;
  context.font = "400 22px Figtree, system-ui, sans-serif";
  context.fillText(`Predicted ${formatSubmittedAt(submittedAt)}`, PADDING, 186);

  const badges = await Promise.all(order.map((team) => loadImage(team.logoPng)));

  order.forEach((team, index) => {
    const position = index + 1;
    const y = HEADER_HEIGHT + index * (rowHeight + ROW_GAP);
    const zone = zoneForPosition(league, position);

    context.fillStyle = theme.card;
    roundedRect(context, PADDING, y, WIDTH - PADDING * 2, rowHeight, 10);
    context.fill();

    if (zone) {
      context.fillStyle = zone.colour;
      roundedRect(context, PADDING, y, 8, rowHeight, 4);
      context.fill();
    }

    context.fillStyle = theme.muted;
    context.font = "700 26px Figtree, system-ui, sans-serif";
    context.textAlign = "right";
    context.fillText(String(position), PADDING + 78, y + rowHeight / 2);
    context.textAlign = "left";

    const badge = badges[index];
    if (badge) {
      const size = 38;
      context.drawImage(badge, PADDING + 100, y + (rowHeight - size) / 2, size, size);
    }

    context.fillStyle = theme.cardInk;
    context.font = "600 28px Figtree, system-ui, sans-serif";
    context.fillText(team.name, PADDING + 156, y + rowHeight / 2 + 1);
  });

  context.fillStyle = theme.muted;
  context.font = "400 22px Figtree, system-ui, sans-serif";
  context.fillText("Made with League Predictor", PADDING, height - FOOTER_HEIGHT / 2 - 8);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.92);
  });
}
