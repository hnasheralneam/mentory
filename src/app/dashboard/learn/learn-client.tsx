// app/dashboard/learn/learn-client.tsx
"use client";

import LearnerSetupCard from "@/components/learner/LearnerSetupCard";
import React, { useEffect, useState } from "react";
import {
  LearnerFormData,
  LearnerSetupDialog,
} from "@/components/learner/LearnerDialogSetup";
import supabase from "@/utils/supabase";
import { LearnerDashboard } from "./student-dashboard";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 dark:border-gray-700 border-t-[#111111] dark:border-t-white"></div>
);

const LoadingScreen = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  const messages = [
    "Setting up your learning profile…",
    "Preparing your dashboard…",
    "Loading your preferences…",
    "Initializing system…",
    "Getting everything ready…"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        setIsVisible(true);
      }, 300);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap');
      `}</style>
      <LoadingSpinner />
      <p className={`text-lg text-[#111111] dark:text-white transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
         style={{ fontFamily: 'Raleway, sans-serif' }}>
        {messages[currentMessageIndex]}
      </p>
    </div>
  );
};

export default function LearnClientPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const [learnerData, setLearnerData] = useState<LearnerFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const requestSent = searchParams.get("requestSent");

  useEffect(() => {
    if (requestSent) {
      toast.success("Your request has been sent to the tutor!");
    }
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
      } else {
        setLoading(false);
        setSetupComplete(false);
      }
    };

    fetchLearnerData();
  }, [requestSent]);

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
    return <LoadingScreen />;
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