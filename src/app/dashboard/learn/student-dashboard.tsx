"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Calendar, Clock, MapPin, Video } from "lucide-react";
import { cn } from "@/lib/utils";

export function LearnerDashboard() {
  // State for each field
  const [course, setCourse] = useState("");
  const [meetingType, setMeetingType] = useState<
    "in-person" | "virtual" | null
  >(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [budget, setBudget] = useState([50]);
  const [notes, setNotes] = useState("");

  // Handle submit
  const handleSubmit = () => {
    const requestData = {
      course,
      meetingType,
      date,
      time,
      budget: budget[0],
      notes,
    };

    console.log("Submitting request:", requestData);

    // later: save to Supabase
    // const { data, error } = await supabase.from("requests").insert([requestData])
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Request Help</h1>
        <p className="text-muted-foreground">
          Tell us what you need and we’ll match you with the right tutor
        </p>
      </div>

      {/* Course */}
      <div className="space-y-2">
        <Label>What subject / course do you need help with?</Label>
        <Input
          placeholder="e.g., MATH 151"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
      </div>

      {/* Meeting preference */}
      <div className="space-y-2">
        <Label>How would you like to meet?</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card
            onClick={() => setMeetingType("in-person")}
            className={cn(
              "cursor-pointer hover:border-primary transition",
              meetingType === "in-person" &&
                "border-primary ring-1 ring-primary"
            )}
          >
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-base">In-Person</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Meet at a local library or cafe
            </CardContent>
          </Card>

          <Card
            onClick={() => setMeetingType("virtual")}
            className={cn(
              "cursor-pointer hover:border-primary transition",
              meetingType === "virtual" && "border-primary ring-1 ring-primary"
            )}
          >
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <Video className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-base">Virtual</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Meet online via video chat
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Date + Time */}
      <div className="space-y-2">
        <Label>When would you like to meet?</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 border rounded-md px-3 py-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border-0 focus-visible:ring-0"
            />
          </div>
          <div className="flex items-center gap-2 border rounded-md px-3 py-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border-0 focus-visible:ring-0"
            />
          </div>
        </div>
      </div>

      {/* Budget */}
      <div className="space-y-2">
        <Label>What’s your budget per hour?</Label>
        <Slider
          value={budget}
          onValueChange={setBudget}
          min={15}
          max={100}
          step={5}
        />
        <p className="text-sm text-muted-foreground">
          Current budget: <span className="font-medium">${budget[0]}/hour</span>
        </p>
      </div>

      {/* Extra notes */}
      <div className="space-y-2">
        <Label>Anything specific you need help with?</Label>
        <Textarea
          placeholder="e.g., preparing for an exam, struggling with specific topics..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      {/* Submit */}
      <Button
        size="lg"
        className="w-full bg-blue-600 hover:bg-blue-700"
        disabled={!course || !meetingType || !date || !time}
        onClick={handleSubmit}
      >
        Submit Request
      </Button>
    </div>
  );
}
