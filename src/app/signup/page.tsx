"use client";

import { GalleryVerticalEnd, GraduationCap } from "lucide-react";
import AuthImage from "@/../public/auth.png";
import { LoginForm } from "@/components/login-form";
import Image from "next/image";
import supabase from "@/utils/supabase";
import { SignUpForm } from "@/components/signup-form";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.push("/dashboard");
      }

      setLoading(false);
    };

    checkIfLoggedIn();
  }, [router]);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 dark:bg-[#111] dark:text-white">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center space-x-2">
            {/* Logo Image */}
            <span
              style={{
                height: "32px",
                width: "32px",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                display: "block",
              }}
              className="bg-[url('/logo-light.png')] dark:bg-[url('/logo-dark.png')]"
            ></span>
            {/* Logo Text */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-black dark:text-white">
                mentory
              </h1>
            </div>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={AuthImage}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
