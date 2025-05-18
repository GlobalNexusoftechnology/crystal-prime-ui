import type { Metadata } from "next";
import { ReactQueryProvider } from "@/services/react-query";
import { Inter } from "next/font/google";
import "../globals.css";


const montserrat = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Satkar",
  description: "This is Satkar web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider hasDevTools={false}>
      <html lang="en">
        <body className={`${montserrat.className}`}>
          {children}
        </body>
      </html>
    </ReactQueryProvider>
  );
}
