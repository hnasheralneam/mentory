"use client";

import TutorSetupCard from "@/components/tutor/TutorSetupCard";
import { BookOpen, ChevronDown, GraduationCap, User } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function TeachPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isTutorMode, setIsTutorMode] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsTutorMode(pathname === "/dashboard/teach");
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Uber-style Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-black">mentory</h1>
            </div>
            </Link>
            

            {/* Navigation Links */}
            <div className="flex items-center space-x-8 mt-2">
              <Link
                className={`flex items-center space-x-2 cursor-pointer pb-2 border-b-2 ${
                  isTutorMode === false ? "border-black" : "border-transparent"
                } text-gray-600 hover:text-black transition-all`}
                href="/dashboard/learn"
              >
                <BookOpen className="h-5 w-5" />
                <span className={isTutorMode === false ? "font-medium text-black" : ""}>
                  Learn
                </span>
              </Link>
              <Link
                className={`flex items-center space-x-2 cursor-pointer pb-2 border-b-2 ${
                  isTutorMode ? "border-black" : "border-transparent"
                } text-gray-600 hover:text-black transition-all`}
                href="/dashboard/teach"
              >
                <GraduationCap className="h-5 w-5" />
                <span className={isTutorMode ? "font-medium text-black" : ""}>
                  Teach
                </span>
              </Link>
              {/* <div className="flex items-center space-x-2 cursor-pointer pb-2 border-b-2 border-transparent hover:border-gray-300 text-gray-600 hover:text-black transition-all">
                <Calendar className="h-5 w-5" />
                <span className="font-medium">Sessions</span>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer pb-2 border-b-2 border-transparent hover:border-gray-300 text-gray-600 hover:text-black transition-all">
                <MessageSquare className="h-5 w-5" />
                <span className="font-medium">Messages</span>
              </div> */}
            </div>

            {/* Right side - Activity and Profile */}
            <div className="flex items-center space-x-6">
              {/* <div className="flex items-center space-x-2 cursor-pointer text-gray-600 hover:text-black transition-colors">
                <Activity className="h-5 w-5" />
                <span className="font-medium">Activity</span>
              </div> */}
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
                <ChevronDown className="h-4 w-4 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-6">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto">{children}</div>
      </div>
    </div>
  );
}
