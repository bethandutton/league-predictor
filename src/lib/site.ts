export const SITE_NAME = "League Predictor";

export const SITE_DESCRIPTION =
  "Predict how any football league finishes. Drag the clubs into your order, then share your table as a link or an image. Free, non-profit, and nothing is saved.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const AUTHOR = "Bethan Dutton";
