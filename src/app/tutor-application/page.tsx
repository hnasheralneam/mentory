// app/apply/page.tsx
import { Header } from '@/components/header'
import { TutorHeroSection } from '@/components/tutor-hero-section'


export default function TutorApplyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#111] dark:text-white">
      <Header />
      <main>
        <TutorHeroSection />
      </main>
    </div>
  )
}