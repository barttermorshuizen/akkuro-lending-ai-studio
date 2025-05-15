"use client";

import AkkuroDarkLogo from "@/public/akkuro-dark.svg";
import { ChevronDownIcon, UserRoundIcon } from "lucide-react";
import Image from "next/image";
import useAuthStore from "@/stores/useAuthStore";
import Show from "@/components/condition/show";
import MenuIcon from "@/app/assets/icons/MenuIcon";
import { Z_INDEX } from "@/config/zIndex";

export default function Header() {
  const { userInfo } = useAuthStore();
  return (
    <div
      className={`w-screen h-16 shadow-header fixed top-0 bg-white flex justify-between flex-row px-7 items-center z-${Z_INDEX.HEADER}`}
    >
      <div className="flex flex-row gap-[10.5px] items-center">
        <MenuIcon className="size-[18px] text-[#999999] mr-4" />
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
      <Show when={!!userInfo}>
        <div className="flex flex-row gap-2">
          <UserRoundIcon className="w-8" />
          <span className="font-semibold">{userInfo?.displayName}</span>
          <ChevronDownIcon className="w-6" strokeWidth={2.5} />
        </div>
      </Show>
    </div>
  );
}
