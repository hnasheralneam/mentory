// app/learn/page.jsx
"use client";

import LearnerSetupCard from "@/components/learner/LearnerSetupCard";
import React, { useState } from "react";


export default function LearnPage() {
  const [setupComplete, setSetupComplete] = useState(false);

  const handleSetupComplete = () => {
    setSetupComplete(true);
  };

  return (
    <>
      {!setupComplete ? (
        <LearnerSetupCard onSetupComplete={handleSetupComplete} />
      ) : (
        <p>asdf</p>
      )}
    </>
  );
}