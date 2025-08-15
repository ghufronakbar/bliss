import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TanstackProvider } from "@/provider/tanstack-provider";
import { db } from "@/lib/db";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = async (): Promise<Metadata> => {
  const data = await db.root.findFirst({
    include: {
      logo: true,
      about: true,
      property: true,
      why: true,
      cta: true,
      service: true,
      testimonial: true,
      relatedProperty: true,
    },
  });

  return {
    title: data?.logo?.name,
    description: data?.logo?.name,
    openGraph: {
      title: data?.logo?.name,
      description: data?.logo?.name,
      images: [data?.logo?.logo || ""],
    },
    twitter: {
      card: "summary_large_image",
      title: data?.logo?.name,
      description: data?.logo?.name,
      images: [data?.logo?.logo || ""],
    },
    alternates: {
      canonical: "https://blissgroup.com",
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: {
        media: "(prefers-color-scheme: light)",
        url: data?.logo?.logo || "",
        href: data?.logo?.logo || "",
      },
    },
  };
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const icon = await db.logoInformation.findFirst();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href={icon?.logo || ""} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full overflow-x-hidden`}
      >
        <TanstackProvider>
          {children}
          <Toaster />
        </TanstackProvider>
      </body>
    </html>
  );
}
