import Image from "next/image";

export function TutorIllustration() {
  return (
    <div className="w-full max-w-md mx-auto">
      <Image
        src="/student.svg" // or .svg
        alt="Tutor Illustration"
        width={600}
        height={400}
        className="w-full h-auto object-contain"
      />
    </div>
  );
}
