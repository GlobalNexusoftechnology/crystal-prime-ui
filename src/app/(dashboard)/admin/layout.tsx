import "../../globals.css";
import { ReactQueryProvider } from "@/services/react-query";
import { RoleRedirectWrapper, AdminSidebarLayout } from "@/components";
import { Montserrat } from "next/font/google";
import { Metadata } from "next";
import { adminSidebarLinks } from "@/constants";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Satkar",
  description: "This is Satkar web app",
};

export default function RootAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider hasDevTools={false}>
      <html lang="en">
        <body
          className={`${montserrat.className} flex flex-col justify-between`}
        >
          <div>
            <RoleRedirectWrapper>
              <AdminSidebarLayout adminSidebarLinks={adminSidebarLinks}>
                {children}
              </AdminSidebarLayout>
            </RoleRedirectWrapper>
          </div>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
