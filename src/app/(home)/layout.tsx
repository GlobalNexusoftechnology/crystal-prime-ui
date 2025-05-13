import type { Metadata } from "next";
import { ReactQueryProvider } from "@/services/react-query";
import { Header } from "@/components";
import { Inter } from "next/font/google";
import "../globals.css";


const montserrat = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reliable Tours & Travels",
  description: "This is Reliable Tours & Travels web app",
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
          <Header />
          {children}
        </body>
      </html>
    </ReactQueryProvider>
  );
}
