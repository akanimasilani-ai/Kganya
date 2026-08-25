import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kganya Royal Funeral Services | Dignified Funeral Support",
  description:
    "Professional funeral services, funeral cover, and compassionate support. Apply for funeral cover, submit claims, and request catering services online.",
  keywords:
    "funeral services, funeral cover, funeral insurance, South Africa, dignified service, compassionate support",
  authors: [{ name: "Kganya Royal Funeral Services" }],
  creator: "Kganya Royal Funeral Services",
  publisher: "Kganya Royal Funeral Services",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://kganya.local",
    siteName: "Kganya Royal Funeral Services",
    title: "Kganya Royal Funeral Services | Dignified Funeral Support",
    description:
      "Professional funeral services and support when it matters most. Honouring life with dignity, compassion & excellence.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kganya Royal Funeral Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kganya Royal Funeral Services",
    description: "Professional funeral services and dignified support.",
    images: ["/images/og-image.png"],
  },
  verification: {
    other: {
      "google-site-verification": ["your-verification-code-here"],
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e3a5f" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-white">
          {children}
        </div>
      </body>
    </html>
  );
}
