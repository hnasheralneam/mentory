import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const raleway = Raleway({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mentory ai",
  description: "An tutor and peer connection tool, optimized with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={raleway.className}>
      <link rel="icon" href="logo-dark.png" sizes="any" />
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
