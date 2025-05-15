import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./studio/components/header";
import SideBar from "./studio/components/side-bar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Akkuro",
  description: "Starter app for the OpenAI Responses API",
  icons: {
    icon: "/app-logo.png",
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
        <div className="w-screen h-screen bg-white overflow-x-hidden overflow-y-auto">
          <Header />
          <SideBar />
          <main className="h-full pt-16">{children}</main>
        </div>
      </body>
    </html>
  );
}
