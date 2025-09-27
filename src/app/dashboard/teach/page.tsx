// app/teach/page.jsx
"use client";

import React, { useState } from "react";
import TutorSetupCard from "@/components/tutor/TutorSetupCard";
import { TutorFormData, TutorSetupDialog } from "@/components/tutor/TutorDialogSetup";

export default function TeachPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const [tutorData, setTutorData] = useState<TutorFormData | null>(null);

  const handleSetupClick = () => {
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handleSetupComplete = (formData: TutorFormData) => {
    setTutorData(formData);
    setSetupComplete(true);
    setShowDialog(false);
    
    // Here you could save the data to your backend
    console.log("Tutor setup completed with data:", formData);
  };

  return (
    <>
      {!setupComplete ? (
        <>
          <TutorSetupCard onSetupComplete={handleSetupClick} />
          <TutorSetupDialog
            isOpen={showDialog}
            onClose={handleDialogClose}
            onComplete={handleSetupComplete}
          />
        </>
      ) : (
        <p>Welcome to your tutor dashboard!</p>
      )}
    </>
  );
}