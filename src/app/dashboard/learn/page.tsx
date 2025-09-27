// app/learn/page.jsx
"use client";

import LearnerSetupCard from "@/components/learner/LearnerSetupCard";
import React, { useEffect, useState } from "react";
import {
  LearnerFormData,
  LearnerSetupDialog,
} from "@/components/learner/LearnerDialogSetup";
import supabase from "@/utils/supabase";
import { LearnerDashboard } from "./student-dashboard";

export default function LearnPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const [learnerData, setLearnerData] = useState<LearnerFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLearnerData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data } = await supabase
        .from("profiles")
        .select("learner_profile")
        .eq("user_id", user?.id)
        .single();
      if (data) {
        setLearnerData(data.learner_profile as LearnerFormData);

        if (data.learner_profile) {
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

  const handleSetupComplete = (formData: LearnerFormData) => {
    setLearnerData(formData);
    setSetupComplete(true);
    setShowDialog(false);

    // Here you could save the data to your backend
    console.log("Learner setup completed with data:", formData);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
        <LearnerDashboard />
      )}
    </>
  );
}
