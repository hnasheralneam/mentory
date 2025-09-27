// app/teach/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import TutorSetupCard from "@/components/tutor/TutorSetupCard";
import {
  TutorFormData,
  TutorSetupDialog,
} from "@/components/tutor/TutorDialogSetup";
import supabase from "@/utils/supabase";

export default function TeachPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const [tutorData, setTutorData] = useState<TutorFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLearnerData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data } = await supabase
        .from("profiles")
        .select("tutor_profile")
        .eq("user_id", user?.id)
        .single();
      if (data) {
        setTutorData(data.tutor_profile as TutorFormData);

        if (data.tutor_profile) {
          setSetupComplete(true);
        } else {
          setSetupComplete(false);
        }
        setLoading(false);
      }
    };

    fetchLearnerData();
  }, []);

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

  if (loading) {
    return <div>Loading...</div>;
  }

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
