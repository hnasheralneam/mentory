"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpWithEmail } from "@/actions/auth";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { ThemeSwitcher } from "@/components/theme-switcher";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await signUpWithEmail(firstName, lastName, email, password);
      if (!data.error) {
        router.push("/dashboard");
      } else {
        console.error("Sign up failed:", data.error);
        setErrorMessage("Error: " + data.error.message);
      }
    } catch (err) {
      console.error("Sign up failed:", err);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground dark:text-[#aaa] text-sm text-balance">
          Enter your email below to create your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="fname">First Name</Label>
          <Input
            id="fname"
            type="text"
            placeholder="First Name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="dark:bg-[#181818] dark:border-[#333] border-2"
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="lname">Last Name</Label>
          <Input
            id="lname"
            type="text"
            placeholder="Last Name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="dark:bg-[#181818] dark:border-[#333] border-2"
          />
        </div>
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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="dark:bg-[#181818] dark:border-[#333] border-2"
          />
        </div>
        <Button type="submit" className="w-full dark:bg-white dark:text-black dark:hover:bg-[#ccc]">
          Sign up
        </Button>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Log in
        </Link>
      </div>
      <span className="hidden">
        <ThemeSwitcher />
      </span>
    </form>
  );
}
