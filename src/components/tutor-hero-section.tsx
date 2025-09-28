// components/tutor-hero-section.tsx
import { Button } from "@/components/ui/button";
import { TutorIllustration } from "./tutor-illustration";
import Link from "next/link";

export function TutorHeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-5xl font-bold text-white leading-tight">
              Share Your Knowledge.{" "}
              <span className="block">Shape the Future.</span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
              Connect with eager students, teach on your schedule, and make an
              impact — all while earning doing what you love.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full"
              >
                Apply Now
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-full"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Right Content - Tutor Illustration */}
        <div className="lg:justify-self-end">
          <TutorIllustration />
        </div>
      </div>
    </section>
  );
}
