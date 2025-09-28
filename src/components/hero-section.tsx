// components/hero-section.tsx
import { Button } from '@/components/ui/button'
import { TutorVideoCall } from '@/components/tutor-video-call'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-black dark:text-white leading-tight">
              On demand tutoring,{' '}
              <span className="block">anywhere, any time</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
              Connect with top tutors in minutes. Learn faster, stress less, and get help exactly when you need it.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-400 text-white dark:text-black px-8 py-3 rounded-full">
              Get Started
            </Button>
            </Link>
          </div>
        </div>

        {/* Right Content - Video Call Interface */}
        <div className="lg:justify-self-end">
          <TutorVideoCall />
        </div>
      </div>
    </section>
  )
}