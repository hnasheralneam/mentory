// app/apply/page.tsx
import { Header } from '@/components/header'
import { TutorHeroSection } from '@/components/tutor-hero-section'


export default function TutorApplyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <TutorHeroSection />
      </main>
    </div>
  )
}