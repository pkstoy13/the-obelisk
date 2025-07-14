import type { Metadata } from "next";
import { Syne_Mono } from "next/font/google";
import "./globals.css";

const syneMono = Syne_Mono({
  variable: "--font-syne-mono",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "the obelisk",
  description: "welcome",
  icons: {
    icon: "/Obelisk.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${syneMono.variable} dark font-syne-mono antialiased`}>
        {children}
      </body>
    </html>
  );
}
