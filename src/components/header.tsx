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

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-black">TutorLink</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Link href="/">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-gray-900 inline-flex items-center"
                >
                  Schedule
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
                </Link>
                
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Book a Session</DropdownMenuItem>
                <DropdownMenuItem>View Schedule</DropdownMenuItem>
                <DropdownMenuItem>Manage Bookings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-gray-900"
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
    </header>
  );
}
