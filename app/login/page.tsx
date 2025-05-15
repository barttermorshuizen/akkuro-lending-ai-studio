"use client";

import { Button } from "@/components/ui/button";
import { login } from "@/lib/actions";
import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuthStore from "@/stores/useAuthStore";

export default function Login() {
  const router = useRouter();
  const { userInfo, setUserInfo } = useAuthStore();
  const [state, formAction, isPending] = useActionState(login, {
    userInfo: null,
  });

  const [isValidation, setIsValidation] = useState(false);

  console.log("Current state:", state);
  console.log("Current userInfo from store:", userInfo);

  useEffect(() => {
    if (userInfo) {
      console.log("User already logged in, redirecting to studio");
      router.replace("/");
      return;
    }
    if (state.userInfo) {
      console.log("Login successful, updating store with:", state.userInfo);
      setUserInfo(state.userInfo);
      router.replace("/");
    }
    setIsValidation(true);
  }, [state, userInfo, router, setUserInfo]);

  if (!isValidation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[url('/hero-pattern.svg')] h-full w-full bg-cover bg-center bg-no-repeat pt-16">
      <form
        className="flex flex-col gap-4 max-w-md mt-16 ml-40"
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
