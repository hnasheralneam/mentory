// app/learn/page.jsx
"use client";

import LearnerSetupCard from "@/components/learner/LearnerSetupCard";
import React, { useState } from "react";
import { LearnerFormData, LearnerSetupDialog } from "@/components/learner/LearnerDialogSetup";

export default function LearnPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const [learnerData, setLearnerData] = useState<LearnerFormData | null>(null);

  const handleSetupClick = () => {
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handleSetupComplete = (formData: LearnerFormData) => {
    setLearnerData(formData);
    setSetupComplete(true);
    setShowDialog(false);

    // Here you could save the data to your backend
    console.log("Learner setup completed with data:", formData);
  };

  return (
    <>
      {!setupComplete ? (
        <>
          <LearnerSetupCard onSetupComplete={handleSetupClick} />
          <LearnerSetupDialog
            isOpen={showDialog}
            onClose={handleDialogClose}
            onComplete={handleSetupComplete}
          />
        </>
      ) : (
        <p>asldf</p>
      )}
    </>
  );
}
