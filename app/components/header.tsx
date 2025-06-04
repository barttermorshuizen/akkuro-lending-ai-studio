"use client";

import AkkuroDarkLogo from "@/public/akkuro-dark.svg";
import Image from "next/image";
import HeaderDropdownMenu from "./header-dropdown-menu";

export default function Header() {
  return (
    <div className="w-screen h-16 shadow-header fixed top-0 bg-white flex justify-between flex-row px-7 items-center">
      <div className="flex flex-row items-center gap-[10.5px]">
        <Image
          priority={true}
          className="object-contain w-[120px] h-[21.14px]"
          src={AkkuroDarkLogo}
          alt="Akkuro Logo"
        />
        <span className="text-[#999999] text-2xl">/</span>
        <span className="text-[#999999] text-2xl">Lending</span>
      </div>
      <HeaderDropdownMenu />
    </div>
  );
}
