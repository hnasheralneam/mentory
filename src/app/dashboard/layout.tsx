"use client";

import TutorSetupCard from "@/components/tutor/TutorSetupCard";
import { BookOpen, ChevronDown, GraduationCap, User } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

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
    <div className="min-h-screen bg-gray-50 dark:bg-[#111] dark:text-white">

      {/* Navbar */}
      <header className="py-4 px-28 sticky top-0">
        <div className="bg-[#eeeeee66] dark:bg-[#11111166] py-2 border border-gray-200 dark:border-[#555] rounded-full" style={{ backdropFilter: 'blur(8px)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/">
                <div className="flex-shrink-0">
                  <h1 className="text-2xl font-bold text-black dark:text-white">mentory</h1>
                </div>
              </Link>


              {/* Navigation Links */}
              <div className="flex items-center space-x-8 mt-2">
                <Link
                  className={`flex items-center space-x-2 cursor-pointer pb-2 border-b-2 ${isTutorMode === false ? "border-black dark:border-[#eee]" : "border-transparent"
                    } text-gray-600 hover:text-black dark:hover:text-white transition-all`}
                  href="/dashboard/learn"
                >
                  <BookOpen className="h-5 w-5" />
                  <span className={isTutorMode === false ? "font-medium text-black dark:text-white" : ""}>
                    Learn
                  </span>
                </Link>
                <Link
                  className={`flex items-center space-x-2 cursor-pointer pb-2 border-b-2 ${isTutorMode ? "border-black dark:border-[#eee]" : "border-transparent"
                    } text-gray-600 hover:text-black dark:hover:text-white transition-all`}
                  href="/dashboard/teach"
                >
                  <GraduationCap className="h-5 w-5" />
                  <span className={isTutorMode ? "font-medium text-black dark:text-white" : ""}>
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
        </div>
      </header>


      <div className="p-6">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto">{children}</div>
      </div>
    </div>
  );
}
