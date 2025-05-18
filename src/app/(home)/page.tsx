"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loading } from "@/components";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login"); 
  }, [router]);

  return <Loading />;
}
