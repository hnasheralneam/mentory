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
import supabase from "@/utils/supabase";
import { unstable_noStore as noStore } from "next/cache";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  // Handle submit
  const handleSubmit = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { data: profileData } = await supabase
      .from("profiles")
      .select()
      .eq("user_id", user?.id)
      .single();

    const requestData = {
      course,
      meetingType,
      date,
      time,
      budget: budget[0],
      notes,
      user_id: user?.id,
      name: profileData?.first_name + " " + profileData?.last_name,
    };

    const {data } = await supabase.from("requests").insert([requestData]).select().single();

    console.log("Submitting request:", requestData);

    router.push('/dashboard/requests/' + data?.id);
    //console.log("Chat response:", chatResponse);

  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-3">Request Help</h1>
        <p className="text-muted-foreground">
          Tell us what you need and we'll match you with the right tutor
        </p>
      </div>

      {/* Course */}
      <div className="space-y-2">
        <Label className="my-4">What subject / course do you need help with?</Label>
        <Input
          placeholder="e.g., MATH 151"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="dark:bg-[#181818] dark:border-[#333] border-2"
        />
      </div>

      {/* Meeting preference */}
      <div className="space-y-2">
        <Label className="my-4">How would you like to meet?</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card
            onClick={() => setMeetingType("in-person")}
            className={cn(
              "cursor-pointer hover:border-primary transition",
              meetingType === "in-person" &&
                "border-primary dark:border-white ring-1 ring-primary"
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
              meetingType === "virtual" && "border-primary dark:border-white ring-1 ring-primary"
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
        <Label className="my-4">When would you like to meet?</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 border dark:border-[#444] rounded-md px-3 py-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border-0 focus-visible:ring-0"
            />
          </div>
          <div className="flex items-center gap-2 border dark:border-[#444] rounded-md px-3 py-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border-0 focus-visible:ring-0"
            />
          </div>
        </div>

      {/* Budget */}
      <div className="space-y-2">
        <Label className="my-4">What's your budget per hour?</Label>
        <Slider
          value={budget}
          onValueChange={setBudget}
          min={0}
          max={100}
          step={5}
        />
        <p className="text-sm text-muted-foreground">
          Current budget: <span className="font-medium">${budget[0]}/hour</span>
        </p>
      </div>

      {/* Extra notes */}
      <div className="space-y-2">
        <Label className="my-4">Anything specific you need help with?</Label>
        <Textarea
          placeholder="e.g., preparing for an exam, struggling with specific topics..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-[100px] dark:bg-[#181818] dark:border-[#333] border-2"
        />
      </div>

            <br/>
        {/* Submit */}
        <Button
          size="lg"
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={!course || !meetingType || !date || !time}
          onClick={async () => await handleSubmit()}
        >
          Submit Request
        </Button>
      </div>
    </div>
  );
}
