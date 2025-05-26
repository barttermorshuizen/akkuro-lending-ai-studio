"use client";

import { Z_INDEX } from "@/config/zIndex";
import {
  CheckSquare,
  HomeIcon,
  LucideArrowUpRight,
  Package,
  Square,
  Tag,
} from "lucide-react";
import React, { useState } from "react";

type SideBarCode =
  | "home"
  | "schedule"
  | "loan-management"
  | "product-configuration"
  | "regional-audit"
  | "pricing";

type SideBarItem = {
  code: SideBarCode;
  icon: React.ReactNode;
};

const sideBarItems: SideBarItem[] = [
  {
    code: "home",
    icon: <HomeIcon />,
  },
  {
    code: "schedule",
    icon: <Square />,
  },
  {
    code: "loan-management",
    icon: <Package />,
  },
  {
    code: "product-configuration",
    icon: <Tag />,
  },
  {
    code: "regional-audit",
    icon: <CheckSquare />,
  },
  {
    code: "pricing",
    icon: <LucideArrowUpRight />,
  },
];

export default function SideBar() {
  const [activeItem, setActiveItem] = useState<SideBarCode>(
    "product-configuration",
  );
  return (
    <div
      className={`h-[calc(100vh-64px)] absolute top-16 left-0 w-16 bg-primary-darkForest flex flex-col z-${Z_INDEX.SIDE_BAR}`}
    >
      {sideBarItems.map((item, index) => (
        <button
          key={index}
          className={`flex flex-row gap-2  p-4 ${activeItem === item.code ? "bg-white text-primary" : "text-white"}`}
          onClick={() => setActiveItem(item.code)}
        >
          {React.cloneElement(
            item.icon as React.ReactElement<{ className: string }>,
            {
              className: `w-full ${activeItem === item.code ? "text-primary" : "text-white"}`,
            },
          )}
        </button>
      ))}
    </div>
  );
}
