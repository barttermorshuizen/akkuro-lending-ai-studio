"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import Header from "./components/header";
import SideBar from "./components/side-bar";
import useAuthStore from "@/stores/useAuthStore";
import { useEffect } from "react";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isHydrated, setIsHydrated] = useState(false);
  const { userInfo } = useAuthStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  if (!userInfo) {
    redirect("/login");
  }
  return (
    <div className="w-screen h-full bg-white">
      <Header />
      <SideBar />
      <main className="h-[calc(100vh-64px)]">{children}</main>
    </div>
  );
}
