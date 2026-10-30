import type { Metadata } from "next";
import { Caveat, Fraunces, Source_Sans_3 } from "next/font/google";
import { NetworkWatcher } from "@/components/site/NetworkWatcher";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/** Decorative “student notebook” hand — use only via .font-hand / .eyebrow */
const hand = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sacred Heart Sr. Sec. School | Nichlaul, Maharajganj",
    template: "%s | Sacred Heart School",
  },
  description:
    "Sacred Heart Senior Secondary School, Mandi Road Nichlaul Maharajganj. Established 2007. Vidya Dadati Vinayam — knowledge bestows humility.",
  keywords: [
    "Sacred Heart School",
    "Nichlaul",
    "Maharajganj",
    "CBSE school",
    "admission",
    "Mandi Road school",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Sacred Heart School",
    title: "Sacred Heart Sr. Sec. School",
    description:
      "Holistic education since 2007 on Mandi Road, Nichlaul, Maharajganj. Academics, facilities, admission & contact.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sacred Heart Sr. Sec. School",
    description: "Vidya Dadati Vinayam — Knowledge bestows humility.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${hand.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-ink">
        <NetworkWatcher />
        {children}
      </body>
    </html>
  );
}
