import type { Metadata } from "next";
import "../../globals.css";
import { ReactQueryProvider } from "@/services/react-query";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], 
});

export const metadata: Metadata = {
  title: "Crystal Prime",
  description: "This is Crystal Prime web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider hasDevTools={false}>
      <html lang="en">
        <body
          className={`${poppins.className} antialiased`}
        >
          {children}
        </body>
      </html>
    </ReactQueryProvider>
  );
}
