"use client";

import { ReactNode } from "react";

// import { ReactNode, useEffect } from "react";

// import { useAuthStore, useRoleDetailQuery } from "@/services";

// import { Loading } from "../loading";

export function RoleRedirectWrapper({
  children,
}: {
  children: ReactNode;
}) {
  // const { activeSession, updateActiveSession } = useAuthStore();
  // const userId = activeSession?.user?.role?.id || '';

  // const {
  //   roleDetailsData,
  //   isLoading: isRoleDetailsLoading,
  // } = useRoleDetailQuery(userId);

  // useEffect(() => {
  //   if (roleDetailsData && activeSession?.user) {
  //     updateActiveSession({...activeSession, user: {...activeSession.user, role: roleDetailsData.data } });
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [roleDetailsData]);

  // if (isRoleDetailsLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen w-screen text-center">
  //       <Loading />
  //     </div>
  //   );
  // }

  return <div>{children}</div>;
}
