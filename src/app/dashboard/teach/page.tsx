// app/teach/page.jsx
"use client";

import React, { useState } from "react";
import TutorSetupCard from "@/components/tutor/TutorSetupCard";

export default function TeachPage() {
  const [setupComplete, setSetupComplete] = useState(false);

  const handleSetupComplete = () => {
    setSetupComplete(true);
  };

  return (
    <>
      {!setupComplete ? (
        <TutorSetupCard onSetupComplete={handleSetupComplete} />
      ) : (
        <p>asdf</p>
      )}
    </>
  );
}