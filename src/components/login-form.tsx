"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithEmail } from "@/actions/auth";
import Link from "next/link";
import { useRouter } from 'next/navigation'


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await signInWithEmail(email, password);

      if (!data.error) {
        // Successful login, redirect to dashboard
        router.push("/dashboard");
      } else {
        console.error("Login failed:", data.error);
        setErrorMessage("Error: " + data.error.message);
        // Optionally, set an error message state to display to the user
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold dark:text-white">
          Login to your account
        </h1>
        <p className="text-muted-foreground dark:text-muted text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="dark:bg-[#181818] dark:border-[#333] border-2"
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="dark:bg-[#181818] dark:border-[#333] border-2"
          />
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <Button
          type="submit"
          className="w-full dark:bg-white dark:text-black dark:hover:bg-[#ccc]"
        >
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
