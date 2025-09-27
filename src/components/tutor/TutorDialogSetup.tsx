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
import { GraduationCap, DollarSign, User, Calendar, Plus, X } from "lucide-react";
import { CheckedState } from "@radix-ui/react-checkbox";

export interface TutorFormData {
  // Teaching Subjects
  subjects: string[];
  umbcClasses: string[]; // New field for UMBC classes
  experience: string;
  qualifications: string;
  teachingStyle: string;
  gradeRange: string; // New field for grade range

  // Availability
  availableDays: string[];
  availableTimes: string[];
  timezone: string;
  sessionLength: string[];

  // Rate & Pricing
  hourlyRate: string;
  currency: string;
  discounts: boolean;
  trialSession: boolean;

  // Profile
  bio: string;
  languages: string[];
  targetStudents: string[];
}

export function TutorSetupDialog({ isOpen, onClose, onComplete }: any) {
  const [step, setStep] = useState(1);
  const [currentClass, setCurrentClass] = useState("");
  const [formData, setFormData] = useState<TutorFormData>({
    // Teaching Subjects
    subjects: [],
    umbcClasses: [],
    experience: "",
    qualifications: "",
    teachingStyle: "",
    gradeRange: "",

    // Availability
    availableDays: [],
    availableTimes: [],
    timezone: "",
    sessionLength: [],

    // Rate & Pricing
    hourlyRate: "",
    currency: "USD",
    discounts: false,
    trialSession: false,

    // Profile
    bio: "",
    languages: [],
    targetStudents: [],
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

  const gradeOptions = [
    "Elementary (K-5)",
    "Middle School (6-8)",
    "High School (9-12)",
    "College/University",
    "Graduate Level",
    "All Levels"
  ];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const times = [
    "Morning (6AM-12PM)",
    "Afternoon (12PM-6PM)",
    "Evening (6PM-10PM)",
  ];

  const sessionLengths = ["30 minutes", "60 minutes", "90 minutes", "2 hours"];

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Chinese",
    "Japanese",
    "Korean",
    "Arabic",
    "Russian",
    "Hindi",
  ];

  const studentTypes = [
    "Elementary School",
    "Middle School",
    "High School",
    "College/University",
    "Adult Learners",
    "Professional Development",
  ];

  const handleSubjectChange = (subject: string, checked: CheckedState) => {
    setFormData((prev) => ({
      ...prev,
      subjects: checked
        ? [...prev.subjects, subject]
        : prev.subjects.filter((s) => s !== subject),
    }));
  };

  const handleAddClass = () => {
    if (currentClass.trim() && !formData.umbcClasses.includes(currentClass.trim())) {
      setFormData((prev) => ({
        ...prev,
        umbcClasses: [...prev.umbcClasses, currentClass.trim()],
      }));
      setCurrentClass("");
    }
  };

  const handleRemoveClass = (classToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      umbcClasses: prev.umbcClasses.filter((cls) => cls !== classToRemove),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddClass();
    }
  };

  const handleDayChange = (day: string, checked: CheckedState) => {
    setFormData((prev) => ({
      ...prev,
      availableDays: checked
        ? [...prev.availableDays, day]
        : prev.availableDays.filter((d) => d !== day),
    }));
  };

  const handleTimeChange = (time: string, checked: CheckedState) => {
    setFormData((prev) => ({
      ...prev,
      availableTimes: checked
        ? [...prev.availableTimes, time]
        : prev.availableTimes.filter((t) => t !== time),
    }));
  };

  const handleSessionLengthChange = (length: string, checked: CheckedState) => {
    setFormData((prev) => ({
      ...prev,
      sessionLength: checked
        ? [...prev.sessionLength, length]
        : prev.sessionLength.filter((l) => l !== length),
    }));
  };

  const handleLanguageChange = (language: string, checked: CheckedState) => {
    setFormData((prev) => ({
      ...prev,
      languages: checked
        ? [...prev.languages, language]
        : prev.languages.filter((l) => l !== language),
    }));
  };

  const handleTargetStudentChange = (
    student: string,
    checked: CheckedState
  ) => {
    setFormData((prev) => ({
      ...prev,
      targetStudents: checked
        ? [...prev.targetStudents, student]
        : prev.targetStudents.filter((s) => s !== student),
    }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Tutor form submitted:", formData);
    onComplete(formData);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-green-600">
              <GraduationCap className="h-5 w-5" />
              <h3 className="font-semibold">Teaching Subjects & Expertise</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label>
                  Which subjects can you teach? (Select all that apply)
                </Label>
                <div className="grid grid-cols-2 gap-2 mt-2 max-h-32 overflow-y-auto">
                  {subjects.map((subject) => (
                    <div key={subject} className="flex items-center space-x-2">
                      <Checkbox
                        id={subject}
                        checked={formData.subjects.includes(subject)}
                        onCheckedChange={(checked) =>
                          handleSubjectChange(subject, checked)
                        }
                      />
                      <Label htmlFor={subject} className="text-sm">
                        {subject}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* UMBC Classes Input */}
              <div>
                <Label htmlFor="umbcClasses">
                  UMBC Classes (Enter specific course codes/names)
                </Label>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Input
                      id="umbcClasses"
                      placeholder="e.g., CMSC 201, MATH 151, PHYS 121..."
                      value={currentClass}
                      onChange={(e) => setCurrentClass(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={handleAddClass}
                      variant="outline"
                      size="sm"
                      className="px-3"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {formData.umbcClasses.length > 0 && (
                    <div className="max-h-24 overflow-y-auto">
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.umbcClasses.map((cls, index) => (
                          <div
                            key={index}
                            className="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm"
                          >
                            {cls}
                            <button
                              onClick={() => handleRemoveClass(cls)}
                              className="ml-1 text-blue-600 hover:text-blue-800"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Grade Range Selection */}
              <div>
                <Label htmlFor="gradeRange">What grade levels can you teach?</Label>
                <Select
                  value={formData.gradeRange}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, gradeRange: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade range" />
                  </SelectTrigger>
                  <SelectContent>
                    {gradeOptions.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="qualifications">
                  Qualifications & Certifications
                </Label>
                <Textarea
                  id="qualifications"
                  placeholder="e.g., Master's in Mathematics, Teaching Certificate, PhD in Physics..."
                  value={formData.qualifications}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      qualifications: e.target.value,
                    }))
                  }
                  className="min-h-[80px]"
                />
              </div>

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

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-purple-600">
              <User className="h-5 w-5" />
              <h3 className="font-semibold">Profile & Students</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="bio">Bio/Introduction</Label>
                <Textarea
                  id="bio"
                  placeholder="Write a compelling introduction about yourself, your teaching philosophy, and what makes you unique..."
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      bio: e.target.value,
                    }))
                  }
                  className="min-h-[120px]"
                />
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
            Step {step} of 3 - Set up your teaching profile to start connecting
            with students
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          {renderStep()}
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>
            Back
          </Button>

          {step === 3 ? (
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