"use client";

import { Button } from "@/components/ui/button";
import { login } from "@/lib/actions";
import useAuthStore from "@/stores/useAuthStore";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();
  const { userInfo, setUserInfo } = useAuthStore();

  const [isValidating, setIsValidating] = useState(true);
  const [state, formAction, isPending] = useActionState(login, {
    userInfo: null,
  });

  console.log("Current state:", state);
  console.log("Current userInfo from store:", userInfo);

  useEffect(() => {
    if (state.userInfo) {
      console.log("Login successful, updating store with:", state.userInfo);
      setUserInfo(state.userInfo);
    }
  }, [state, userInfo, router, setUserInfo]);

  useEffect(() => {
    // run after render to display loading before userInfo is set
    if (isValidating) {
      setIsValidating(false);
    }
  }, [isValidating]);

  useEffect(() => {
    // run after render to avoid inifinite loading case userInfo exist
    if (userInfo) {
      router.replace("/");
    }
  }, [userInfo, router]);

  if (isValidating || isPending || userInfo) {
    return (
      <div className="h-full w-full flex justify-center items-center bg-background">
        <div className="text-2xl text-white">
          <Loader2 className="size-10 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="xl:bg-[url('/hero-pattern.svg')] h-full w-full bg-cover bg-center bg-no-repeat pt-16">
      <form
        className="flex flex-col gap-4 w-full px-4 sm:px-0 sm:max-w-sm xl:max-w-md mt-16 mx-auto xl:ml-40"
        action={formAction}
      >
        <h1 className="text-white text-6xl font-extralight mb-6">
          Login to Akkuro
        </h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-white">
            Username
          </label>
          <input
            name="username"
            className="border border-gray-300 rounded-md py-3 px-4 w-full"
            id="username"
            type="text"
            placeholder="Enter your username"
          />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <input
            name="password"
            className="bg-white rounded-md py-3 px-4 w-full"
            id="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <Button
          className="bg-primary w-full rounded-md py-6 mt-8"
          disabled={isPending}
        >
          Login
        </Button>
      </form>
    </div>
  );
}
