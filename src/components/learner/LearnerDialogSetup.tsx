// components/learner/LearnerSetupDialog.jsx
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
import { BookOpen, Clock, Target, Calendar } from "lucide-react";
import { CheckedState } from "@radix-ui/react-checkbox";

export interface LearnerFormData {
    primaryGoal: string;
    specificGoals: string;
    timeCommitment: string;
    subjects: string[];
    currentLevel: string;
    preferredLearningStyle: string;
    preferredDays: string[];
    preferredTimes: string[];
    timezone: string;
    sessionLength: string;
}

export function LearnerSetupDialog({ isOpen, onClose, onComplete }: any) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<LearnerFormData>({
    // Learning Goals
    primaryGoal: "",
    specificGoals: "",
    timeCommitment: "",

    // Subjects
    subjects: [],
    currentLevel: "",
    preferredLearningStyle: "",

    // Schedule
    preferredDays: [],
    preferredTimes: [],
    timezone: "",
    sessionLength: "",
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
      preferredDays: checked
        ? [...prev.preferredDays, day]
        : prev.preferredDays.filter((d) => d !== day),
    }));
  };

  const handleTimeChange = (time: string, checked: CheckedState) => {
    setFormData((prev) => ({
      ...prev,
      preferredTimes: checked
        ? [...prev.preferredTimes, time]
        : prev.preferredTimes.filter((t) => t !== time),
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
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    onComplete(formData);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-blue-600">
              <Target className="h-5 w-5" />
              <h3 className="font-semibold">Learning Goals</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="primaryGoal">
                  What's your primary learning goal?
                </Label>
                <Select
                  value={formData.primaryGoal}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, primaryGoal: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your main goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Academic Support</SelectItem>
                    <SelectItem value="skill">Learn New Skills</SelectItem>
                    <SelectItem value="career">Career Development</SelectItem>
                    <SelectItem value="hobby">
                      Personal Interest/Hobby
                    </SelectItem>
                    <SelectItem value="exam">Exam Preparation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="specificGoals">
                  Describe your specific learning objectives
                </Label>
                <Textarea
                  id="specificGoals"
                  placeholder="e.g., I want to improve my calculus skills for engineering courses..."
                  value={formData.specificGoals}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      specificGoals: e.target.value,
                    }))
                  }
                  className="min-h-[100px]"
                />
              </div>

              {/* <div>
                <Label htmlFor="timeCommitment">
                  How much time can you commit per week?
                </Label>
                <Select
                  value={formData.timeCommitment}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, timeCommitment: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time commitment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1-2 hours</SelectItem>
                    <SelectItem value="3-5">3-5 hours</SelectItem>
                    <SelectItem value="6-10">6-10 hours</SelectItem>
                    <SelectItem value="10+">More than 10 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-green-600">
              <BookOpen className="h-5 w-5" />
              <h3 className="font-semibold">Subjects & Learning Style</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label>
                  Which subjects are you interested in? (Select all that apply)
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
                <Label htmlFor="currentLevel">What's your current level?</Label>
                <Select
                  value={formData.currentLevel}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, currentLevel: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="varies">Varies by subject</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="learningStyle">Preferred learning style</Label>
                <Select
                  value={formData.preferredLearningStyle}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      preferredLearningStyle: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="How do you learn best?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visual">
                      Visual (diagrams, charts)
                    </SelectItem>
                    <SelectItem value="auditory">
                      Auditory (discussions, explanations)
                    </SelectItem>
                    <SelectItem value="kinesthetic">
                      Hands-on/Practice-based
                    </SelectItem>
                    <SelectItem value="mixed">Mixed approach</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <span>Complete Your Learning Profile</span>
          </DialogTitle>
          <DialogDescription>
            Step {step} of 2 - Help us match you with the perfect tutor
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
              className="bg-blue-600 hover:bg-blue-700"
            >
              Complete Setup
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Next
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
