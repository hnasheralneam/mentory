// components/features-section.tsx
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Schedule",
    subtitle: "Schedule with a tutor",
    description: "Details",
    illustration: "/calendar.svg",
  },
  {
    title: "Chatbot",
    subtitle: "Consult with AI real quick",
    description: "Chat",
    illustration: "/chat.svg",
  },
  {
    title: "Tutors",
    subtitle: "Sign up to be a tutor",
    description: "Employment",
    illustration: "/prof.svg",
  },
];

export function FeaturesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
            Key Features
          </h2>
        </div>

        {/* Feature Grid */}

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link href={index <= 1 ? "#" : "/tutor-application"}>
              <FeatureCard key={index} feature={feature} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: (typeof features)[0] }) {
  return (
    <Card className="bg-gray-50 dark:bg-[#191919] border-2 border-gray-200 dark:border-[#222] hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-8 text-center space-y-6">
        {/* Illustration */}
        <div className="mx-auto w-32 h-24 flex items-center justify-center">
          <Image
            src={feature.illustration}
            alt={feature.title}
            width={128}
            height={96}
            className="object-contain"
          />
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-black dark:text-white">{feature.title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{feature.subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );
}
