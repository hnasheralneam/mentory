import { GalleryVerticalEnd, GraduationCap } from "lucide-react";
import AuthImage from "@/../public/auth.jpg";
import { LoginForm } from "@/components/login-form";
import Image from "next/image";
import supabase from "@/utils/supabase";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 dark:bg-[#111] dark:text-white">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <Image
              src="/logo.png"
              alt="Mentory Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            mentory
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={AuthImage}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
