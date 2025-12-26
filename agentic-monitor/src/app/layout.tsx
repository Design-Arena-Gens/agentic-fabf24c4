import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Veille IA générative éducation",
  description:
    "Agent de veille francophone dédié aux IA génératives pour l'éducation, avec sources sélectionnées et synthèses quotidiennes.",
  metadataBase: new URL("https://agentic-fabf24c4.vercel.app"),
  openGraph: {
    title: "Agent de veille IA générative x Éducation",
    description:
      "Sources francophones, outils pédagogiques et synthèses quotidiennes sur l'IA générative.",
    url: "https://agentic-fabf24c4.vercel.app",
    siteName: "Agent de veille IA générative",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agent de veille IA générative x Éducation",
    description:
      "Liste de sources francophones et monitoring quotidien des nouveautés IA.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
