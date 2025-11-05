import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmartBanner from "./components/SmartBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Verify Your EVE Online Profile - Opacity Multipass",
  description:
    "Securely verify your EVE Online character and corporation history using Opacity's multipass technology. Share proof of your pilot credentials while keeping your personal data private.",
  openGraph: {
    title: "Verify Your EVE Online Profile - Opacity Multipass",
    description:
      "Connect your EVE Online account to securely verify your character history and achievements. Powered by Opacity to verify your pilot profile without exposing sensitive personal information.",
    siteName: "Opacity Multipass - EVE Online Profile Verification",
    url: "https://multipass-eveonline.vercel.app",
    images: [],
  },
  appLinks: {
    ios: {
      url: "https://apps.apple.com/us/app/opacity-pass/id6743722717",
      app_store_id: "6743722717",
      app_name: "Opacity Pass",
    },
    android: {
      url: "https://play.google.com/store/apps/details?id=com.opacity.app",
      package: "com.opacity.app",
      app_name: "Opacity Pass",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmartBanner />
        {children}
      </body>
    </html>
  );
}
