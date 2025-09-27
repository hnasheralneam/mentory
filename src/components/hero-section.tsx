// components/hero-section.tsx
import { Button } from '@/components/ui/button'
import { TutorVideoCall } from '@/components/tutor-video-call'

export function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-black leading-tight">
              On demand tutoring,{' '}
              <span className="block">anywhere, any time</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              Connect with top tutors in minutes. Learn faster, stress less, and get help exactly when you need
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-full">
              Learn More
            </Button>
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