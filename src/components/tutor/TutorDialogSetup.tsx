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

export interface TutorFormData {
  // Teaching Subjects
  subjects: string[];
  experience: string;
  qualifications: string;
  teachingStyle: string;

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
  const [formData, setFormData] = useState<TutorFormData>({
    // Teaching Subjects
    subjects: [],
    experience: "",
    qualifications: "",
    teachingStyle: "",

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
    if (step < 4) {
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
                <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto">
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

              <div>
                <Label htmlFor="experience">Years of teaching experience</Label>
                <Select
                  value={formData.experience}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, experience: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">Less than 1 year</SelectItem>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10+">More than 10 years</SelectItem>
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
                  className="min-h-[100px]"
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
            <div className="flex items-center space-x-2 text-blue-600">
              <Calendar className="h-5 w-5" />
              <h3 className="font-semibold">Availability</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Which days are you available to teach?</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {days.map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox
                        id={day}
                        checked={formData.availableDays.includes(day)}
                        onCheckedChange={(checked) =>
                          handleDayChange(day, checked)
                        }
                      />
                      <Label htmlFor={day} className="text-sm">
                        {day}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Available time slots</Label>
                <div className="space-y-2 mt-2">
                  {times.map((time) => (
                    <div key={time} className="flex items-center space-x-2">
                      <Checkbox
                        id={time}
                        checked={formData.availableTimes.includes(time)}
                        onCheckedChange={(checked) =>
                          handleTimeChange(time, checked)
                        }
                      />
                      <Label htmlFor={time} className="text-sm">
                        {time}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Session lengths you offer</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {sessionLengths.map((length) => (
                    <div key={length} className="flex items-center space-x-2">
                      <Checkbox
                        id={length}
                        checked={formData.sessionLength.includes(length)}
                        onCheckedChange={(checked) =>
                          handleSessionLengthChange(length, checked)
                        }
                      />
                      <Label htmlFor={length} className="text-sm">
                        {length}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="timezone">Your timezone</Label>
                <Input
                  id="timezone"
                  placeholder="e.g., EST, PST, GMT+1"
                  value={formData.timezone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      timezone: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
        );

      case 3:
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
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, currency: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="CAD">CAD (C$)</SelectItem>
                      <SelectItem value="AUD">AUD (A$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="trialSession"
                    checked={formData.trialSession}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        trialSession: checked === true,
                      }))
                    }
                  />
                  <Label htmlFor="trialSession">
                    Offer discounted trial sessions
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="discounts"
                    checked={formData.discounts}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        discounts: checked === true,
                      }))
                    }
                  />
                  <Label htmlFor="discounts">
                    Offer bulk session discounts
                  </Label>
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

      case 4:
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

              <div>
                <Label>Languages you can teach in</Label>
                <div className="grid grid-cols-3 gap-2 mt-2 max-h-32 overflow-y-auto">
                  {languages.map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={language}
                        checked={formData.languages.includes(language)}
                        onCheckedChange={(checked) =>
                          handleLanguageChange(language, checked)
                        }
                      />
                      <Label htmlFor={language} className="text-sm">
                        {language}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Types of students you prefer to teach</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {studentTypes.map((student) => (
                    <div key={student} className="flex items-center space-x-2">
                      <Checkbox
                        id={student}
                        checked={formData.targetStudents.includes(student)}
                        onCheckedChange={(checked) =>
                          handleTargetStudentChange(student, checked)
                        }
                      />
                      <Label htmlFor={student} className="text-sm">
                        {student}
                      </Label>
                    </div>
                  ))}
                </div>
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
            Step {step} of 4 - Set up your teaching profile to start connecting
            with students
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          {renderStep()}
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>
            Back
          </Button>

          {step === 4 ? (
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
