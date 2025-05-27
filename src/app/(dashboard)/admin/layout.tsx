import "../../globals.css";
import { ReactQueryProvider } from "@/services/react-query";
import { RoleRedirectWrapper, AdminSidebarLayout } from "@/components";
import { Poppins } from "next/font/google";
import { Metadata } from "next";
import { adminSidebarLinks } from "@/constants";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // optional: define weights you want
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
        <body className={`${poppins.className} flex flex-col justify-between`}>
          <div>
            <RoleRedirectWrapper>
              <AdminSidebarLayout adminSidebarLinks={adminSidebarLinks}>
                {children}
                <Toaster position="top-right" reverseOrder={false} />
              </AdminSidebarLayout>
            </RoleRedirectWrapper>
          </div>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
