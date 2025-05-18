import type { Metadata } from "next";
import "../../globals.css";
import { ReactQueryProvider } from "@/services/react-query";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], 
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
        <body
          className={`${poppins.className} antialiased`}
        >
          {children}
        </body>
      </html>
    </ReactQueryProvider>
  );
}
