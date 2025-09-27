// components/tutor/TutorSetupDialog.jsx
"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { GraduationCap, DollarSign, User, Calendar } from "lucide-react";
import { CheckedState } from "@radix-ui/react-checkbox";
import supabase from "@/utils/supabase";

export interface TutorFormData {
  courses: { course: string; grade: string }[];
  experience: string;
  qualifications: string;
  teachingStyle: string;
  hourlyRate: string;
}

export function TutorSetupDialog({ isOpen, onClose, onComplete }: any) {
  const [step, setStep] = useState(1);
  const [courseSearch, setCourseSearch] = useState("");

  const [formData, setFormData] = useState<TutorFormData>({
    // Teaching Subjects
    courses: [],
    experience: "",
    qualifications: "",
    teachingStyle: "",

    // Rate & Pricing
    hourlyRate: "",
  });

  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "English Literature",
    "History",
    "Geography",
    "Psychology",
    "Economics",
    "Art",
    "Music",
    "Languages",
    "Business",
    "Engineering",
  ];

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    console.log(user?.id);
    const { data, error } = await supabase
      .from("profiles")
      .update({ tutor_profile: formData })
      .eq("user_id", user?.id);


    if (error) {
      console.error("Error saving tutor profile:", error);
      return;
    }
    onComplete(formData);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-green-600">
              <GraduationCap className="h-5 w-5" />
              <h3 className="font-semibold">Courses & Expertise</h3>
            </div>

            <div className="space-y-4">
              {/* Search and Add Course */}
              <div>
                <Label>Add Courses You Can Teach</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Search for a course (e.g., MATH 101)"
                    value={courseSearch}
                    onChange={(e) => setCourseSearch(e.target.value)}
                  />
                  <Button
                    onClick={() => {
                      if (!courseSearch) return;
                      setFormData((prev) => ({
                        ...prev,
                        courses: [
                          ...prev.courses,
                          { course: courseSearch, grade: "" },
                        ],
                      }));
                      setCourseSearch("");
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>

              {/* Selected Courses List */}
              <div className="space-y-2">
                {formData.courses.map((c, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border p-2 rounded"
                  >
                    <span className="font-medium">{c.course}</span>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Grade"
                        value={c.grade}
                        className="w-20"
                        onChange={(e) => {
                          const newCourses = [...formData.courses];
                          newCourses[idx].grade = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            courses: newCourses,
                          }));
                        }}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            courses: prev.courses.filter((_, i) => i !== idx),
                          }))
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Qualifications */}
              <div>
                <Label htmlFor="qualifications">
                  Qualifications & Certifications
                </Label>
                <Textarea
                  id="qualifications"
                  placeholder="e.g., Master's in Mathematics, Teaching Certificate..."
                  value={formData.qualifications}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      qualifications: e.target.value,
                    }))
                  }
                  className="min-h-[100px]"
                />
              </div>

              {/* Teaching Style */}
              <div>
                <Label htmlFor="teachingStyle">Teaching approach/style</Label>
                <Select
                  value={formData.teachingStyle}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, teachingStyle: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="How do you prefer to teach?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="structured">
                      Structured & Methodical
                    </SelectItem>
                    <SelectItem value="interactive">
                      Interactive & Discussion-based
                    </SelectItem>
                    <SelectItem value="practical">
                      Hands-on & Practical
                    </SelectItem>
                    <SelectItem value="adaptive">
                      Adaptive to student needs
                    </SelectItem>
                    <SelectItem value="exam-focused">
                      Exam-focused preparation
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-emerald-600">
              <DollarSign className="h-5 w-5" />
              <h3 className="font-semibold">Pricing</h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hourlyRate">Hourly rate</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    placeholder="25"
                    value={formData.hourlyRate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        hourlyRate: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Pricing Tips:</strong> Research competitive rates in
                  your subjects. Consider starting with a slightly lower rate to
                  build reviews, then increase as you gain more students.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5" />
            <span>Complete Your Tutor Profile</span>
          </DialogTitle>
          <DialogDescription>
            Step {step} of 2 - Set up your teaching profile to start connecting
            with students
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 2) * 100}%` }}
            />
          </div>

          {renderStep()}
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>
            Back
          </Button>

          {step === 2 ? (
            <Button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700"
            >
              Complete Setup
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-green-600 hover:bg-green-700"
            >
              Next
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
