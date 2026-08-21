import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "League Predictor",
  description: "Predict how the table finishes, then share it with your mates.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${figtree.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
