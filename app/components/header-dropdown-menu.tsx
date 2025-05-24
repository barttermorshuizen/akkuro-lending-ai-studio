"use client";

import { UserRoundIcon } from "lucide-react";

import { ChevronDownIcon } from "lucide-react";

import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import useAuthStore from "@/stores/useAuthStore";
import Show from "@/components/condition/show";
import useConfiguringProductStore from "@/stores/useConfiguringProductStore";
import useConversationStore from "@/stores/useConversationStore";

export default function HeaderDropdownMenu() {
  const { userInfo, setUserInfo } = useAuthStore();
  const { resetProduct } = useConfiguringProductStore();
  const { resetConversation } = useConversationStore();

  const handleLogout = () => {
    setUserInfo(null);
    resetProduct();
    resetConversation();
  };
  return (
    <Show when={!!userInfo}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex flex-row gap-2">
            <UserRoundIcon className="w-8" />
            <span className="font-semibold">{userInfo?.displayName}</span>
            <ChevronDownIcon className="w-6" strokeWidth={2.5} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer hover:bg-gray-200"
          >
            <LogOutIcon className="w-6" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Show>
  );
}
