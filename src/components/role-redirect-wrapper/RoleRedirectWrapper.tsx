"use client";

// import { useRoleRedirect } from "@/utils";
import { ReactNode } from "react";

export function RoleRedirectWrapper({
  // allowedRoles,
  // redirectTo,
  children,
}: {
  allowedRoles?: string[];
  redirectTo?: string;
  children: ReactNode;
}) {
  // const { loading } = useRoleRedirect({ allowedRoles, redirectTo });

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen w-screen text-center">
  //       <div className="spinner font-bold text-2xl">Loading...</div>
  //     </div>
  //   );
  // }

  return <div>{children}</div>;
}
