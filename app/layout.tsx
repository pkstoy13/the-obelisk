import type { Metadata } from "next";
import { Syne_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const syneMono = Syne_Mono({
  variable: "--font-syne-mono",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "the obelisk",
  description: "underground music letter",
  icons: {
    icon: "/obelisk 1st draft no bg.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        {/* Google Analytics */}
        <Script
          strategy='afterInteractive'
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TAG}`}
        />
        <Script
          id='google-analytics'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.GA_TAG}');
            `,
          }}
        />
      </head>
      <body className={`${syneMono.variable} dark font-syne-mono antialiased`}>
        {children}
      </body>
    </html>
  );
}
