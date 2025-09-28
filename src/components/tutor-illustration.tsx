// components/tutor-illustration.tsx
import { Card } from '@/components/ui/card'

export function TutorIllustration() {
  return (
    <div className="relative">
      {/* Whiteboard/Screen */}
      <Card className="w-full max-w-md bg-white border-4 border-black rounded-lg overflow-hidden shadow-xl">
        <div className="aspect-video bg-white p-6 flex items-center">
          {/* Simple whiteboard content */}
          <div className="w-full space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-2 bg-black rounded"></div>
              <div className="w-4 h-2 bg-black rounded"></div>
            </div>
            <div className="w-16 h-1 bg-gray-300 rounded"></div>
          </div>
        </div>
      </Card>

      {/* Tutor Figure */}
      <div className="absolute -bottom-4 -right-8 flex flex-col items-center">
        {/* Person illustration */}
        <div className="relative">
          {/* Head */}
          <div className="w-12 h-12 bg-purple-400 rounded-full mb-2 relative">
            {/* Glasses */}
            <div className="absolute top-3 left-1 w-10 h-6 border-2 border-gray-600 rounded-full bg-transparent">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-4 bg-gray-600"></div>
            </div>
            {/* Hair */}
            <div className="absolute -top-2 left-1 w-10 h-8 bg-gray-400 rounded-full"></div>
          </div>
          
          {/* Body */}
          <div className="w-8 h-16 bg-purple-600 rounded-lg mx-auto relative">
            {/* Arms */}
            <div className="absolute -left-2 top-2 w-6 h-2 bg-purple-600 rounded rotate-45"></div>
            <div className="absolute -right-2 top-2 w-6 h-2 bg-purple-600 rounded -rotate-45"></div>
          </div>
          
          {/* Legs */}
          <div className="flex justify-center space-x-1 mt-1">
            <div className="w-2 h-12 bg-gray-800 rounded"></div>
            <div className="w-2 h-12 bg-gray-800 rounded"></div>
          </div>
        </div>

        {/* Ground/Platform */}
        <div className="w-32 h-2 bg-gray-300 rounded-full opacity-60 mt-2"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-6 -left-6 w-12 h-12 bg-purple-200 rounded-lg opacity-40"></div>
      <div className="absolute -bottom-2 -left-8">
        <div className="flex space-x-1">
          <div className="w-3 h-8 bg-green-400 rounded transform rotate-12"></div>
          <div className="w-3 h-6 bg-green-500 rounded transform -rotate-6"></div>
          <div className="w-3 h-10 bg-green-300 rounded transform rotate-3"></div>
        </div>
      </div>
    </div>
  )
}