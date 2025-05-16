"use client";

import AkkuroDarkLogo from "@/public/akkuro-dark.svg";
import Image from "next/image";
import HeaderDropdownMenu from "./header-dropdown-menu";

export default function Header() {
  return (
    <div className="w-screen h-16 shadow-header fixed top-0 bg-white flex justify-between flex-row px-7 items-center">
      <div className="flex flex-row gap-[10.5px]">
        <Image
          src={AkkuroDarkLogo}
          alt="Akkuro Logo"
          width={120}
          height={21.14}
          objectFit="contain"
        />
        <span className="text-[#999999] text-2xl">/</span>
        <span className="text-[#999999] text-2xl">Lending</span>
      </div>
      <HeaderDropdownMenu />
    </div>
  );
}
