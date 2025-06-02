"use client";

import useAuthStore from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PageLoading from "./page-loading";

export function WithAuthProtectionPage(WrappedComponent: React.ComponentType) {
  return function ProtectedComponent() {
    const { userInfo } = useAuthStore();
    const router = useRouter();
    const [isValidating, setIsValidating] = useState(true);

    useEffect(() => {
      if (isValidating) {
        setIsValidating(false);
      } else if (!userInfo) {
        router.replace("/login");
      }
    }, [userInfo, router, isValidating]);

    if (isValidating || !userInfo) {
      return <PageLoading />;
    }

    return <WrappedComponent />;
  };
}
