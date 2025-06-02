"use client";

import MenuIcon from "@/app/assets/icons/MenuIcon";
import HeaderDropdownMenu from "@/app/components/header-dropdown-menu";
import { Z_INDEX } from "@/config/zIndex";
import AkkuroDarkLogo from "@/public/akkuro-dark.svg";
import Image from "next/image";

export default function Header() {
  return (
    <div
      className={`w-screen h-16 shadow-header fixed top-0 bg-white flex justify-between flex-row px-7 items-center z-${Z_INDEX.HEADER}`}
    >
      <div className="flex flex-row gap-[10.5px] items-center">
        <MenuIcon className="size-[18px] text-[#999999] mr-4" />
        <Image
          className="object-contain w-[120px] h-[21.14px]"
          src={AkkuroDarkLogo}
          alt="Akkuro Logo"
        />
        <span className="text-[#999999] text-2xl">/</span>
        <span className="text-[#999999] text-2xl">Studio</span>
      </div>
      <HeaderDropdownMenu />
    </div>
  );
}
