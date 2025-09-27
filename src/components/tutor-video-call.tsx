// components/tutor-video-call.tsx
import Image from 'next/image'

export function TutorVideoCall() {
  return (
    <div className="w-full max-w-md">
      <Image
        src="/video-call.svg"
        alt="Video Call"
        width={600}
        height={400}
        className="w-full h-auto"
      />
    </div>
  )
}
