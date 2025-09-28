// app/teach/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import TutorSetupCard from "@/components/tutor/TutorSetupCard";
import {
  TutorFormData,
  TutorSetupDialog,
} from "@/components/tutor/TutorDialogSetup";
import supabase from "@/utils/supabase";
import { TutorDashboard } from "./tutor-dashboard";

export default function TeachPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const [tutorData, setTutorData] = useState<TutorFormData | null>(null);
  const [studentRequests, setStudentRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTutorId, setCurrentTutorId] = useState<string | null>(null);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchLearnerData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentTutorId(user?.id || null);
      const { data } = await supabase
        .from("profiles")
        .select("tutor_profile")
        .eq("user_id", user?.id)
        .single();

      const { data: requestData } = await supabase
        .from("requests")
        .select()
        .neq("requested_tutors", null).or(`connected.eq.${user?.id},connected.is.null`);

      const totalRequests: any = [];

      requestData?.forEach((request) => {
        const tutors =
          request.requested_tutors;

        if (tutors.some((tutor: any) => tutor.id === user?.id)) {
          totalRequests.push(request);
        }
      });

      setStudentRequests(totalRequests);
      
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
  }, [refetch]);

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
        <TutorDashboard studentRequests={studentRequests} currentTutorId={currentTutorId} setRefetch={setRefetch} />
      )}
    </>
  );
}
