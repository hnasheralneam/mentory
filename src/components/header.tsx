// components/header.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
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

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Link href="/">
                    <Button
                      variant="ghost"
                      className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white inline-flex items-center"
                    >
                      Schedule
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>

                </DropdownMenuTrigger>
                <DropdownMenuContent className="dark:bg-[#181818] dark:border-[#444] dark:text-white">
                  <DropdownMenuItem className="dark:hover:bg-[#2a2a2a] dark:hover:text-gray-50">Book a Session</DropdownMenuItem>
                  <DropdownMenuItem className="dark:hover:bg-[#2a2a2a] dark:hover:text-gray-50">View Schedule</DropdownMenuItem>
                  <DropdownMenuItem className="dark:hover:bg-[#2a2a2a] dark:hover:text-gray-50">Manage Bookings</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Login
              </Button>
            </Link >
            <Link href="/signup">
            <Button className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full">
              Get Started
            </Button>
            </Link>

            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
