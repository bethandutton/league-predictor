import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { AUTHOR, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — predict any football league table`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: AUTHOR }],
  creator: AUTHOR,
  publisher: AUTHOR,
  keywords: [
    "league predictor",
    "predict the table",
    "football predictions",
    "Premier League table predictor",
    "EFL Championship predictor",
    "LaLiga table predictor",
    "Serie A table predictor",
    "final table prediction",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_GB",
    title: `${SITE_NAME} — predict any football league table`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — predict any football league table`,
    description: SITE_DESCRIPTION,
  },
  category: "sports",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${figtree.variable} h-full antialiased`}>
      <body className="themed min-h-full">{children}</body>
    </html>
  );
}
