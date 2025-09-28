"use client";

// app/page.tsx
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { FeaturesSection } from '@/components/features-section'
import { useEffect, useState } from 'react';
import supabase from '@/utils/supabase';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        router.push('/dashboard');
      }

      setLoading(false);
    }

    checkIfLoggedIn();
  }, [router]);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#111]">
      <Header />
      <div>
        <HeroSection />
        <FeaturesSection />
      </div>
    </div>
  )
}