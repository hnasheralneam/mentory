"use client";
import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";
import OpenAI from "openai";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const UI = ({ id }: { id: number }) => {
  const [tutorMatches, setTutorMatches] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTutors, setSelectedTutors] = useState<string[]>([]); // store tutor names or IDs

  const client = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    async function runChat(request: any) {
      const { data } = await supabase.from("profiles").select().neq("tutor_profile", null);
      const { data: { user } } = await supabase.auth.getUser();
      const { data: studentData } = await supabase.from("profiles").select().eq("user_id", user?.id).single();

      if (!studentData || !data) return;

      const filteredData = data.filter(
        (profile) =>
          parseInt(profile.tutor_profile.hourlyRate) <= request.budget &&
          profile.tutor_profile.courses.some(
            (c: any) => c.course.toLowerCase() === request.course.toLowerCase()
          )
      );

      const response = await client.chat.completions.create({
        model: "gpt-5-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a tutor-student matching engine. Output only JSON.",
          },
          {
            role: "user",
            content: `Here are the student's preferences:
          ${JSON.stringify(studentData.learner_profile)}

          Session:
          Course: ${request.course}
          Meeting Type: ${request.meetingType}
          Date: ${request.date}
          Time: ${request.time}
          Budget: $${request.budget}/hour
          Notes: ${request.notes}

          Tutors:
          ${JSON.stringify(filteredData)}

          Give top 5 tutors as JSON array:
          [{
            "name": "Tutor Name",
            "compatability": "85%",
            "explanation": "Brief explanation"
          }]
          `,
          },
        ],
      });

      return response.choices[0].message.content;
    }

    async function fetchRequest() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: request } = await supabase.from("requests").select().eq("id", id).single();

      if (request.tutor_matches) {
        setTutorMatches(request.tutor_matches);
        setLoading(false);
        return;
      }

      const chatResponse = await runChat(request);
      if (!chatResponse) return;

      const parsed = JSON.parse(chatResponse);

      await supabase.from("requests").update({ tutor_matches: parsed }).eq("id", id);
      setTutorMatches(parsed);
      setLoading(false);
    }

    fetchRequest();
  }, [id]);

  // Toggle tutor selection
  const toggleTutor = (name: string) => {
    setSelectedTutors((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  // Send request to selected tutors
  const handleSendRequest = async () => {
    if (selectedTutors.length === 0) return;

    // For now, just update the request row with chosen tutors
    const { error } = await supabase
      .from("requests")
      .update({ chosen_tutors: selectedTutors })
      .eq("id", id);

    if (error) console.error(error);
    else alert(`Request sent to: ${selectedTutors.join(", ")}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      {tutorMatches && (
        <aside className="w-96 space-y-4">
          <h2 className="text-xl font-bold">Top Tutor Matches</h2>
          {tutorMatches.map((tutor: any, idx: number) => (
            <Card key={idx} className="border hover:shadow-md transition">
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-lg">{tutor.name}</CardTitle>
                <Checkbox
                  checked={selectedTutors.includes(tutor.name)}
                  onCheckedChange={() => toggleTutor(tutor.name)}
                />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">{tutor.compatability}</span> match
                </p>
                <p className="text-sm mt-2">{tutor.explanation}</p>
              </CardContent>
            </Card>
          ))}
        </aside>
      )}

      {tutorMatches && tutorMatches.length > 0 && (
        <Button
          onClick={handleSendRequest}
          disabled={selectedTutors.length === 0}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Send Request to Selected Tutors
        </Button>
      )}
    </div>
  );
};

export default UI;
