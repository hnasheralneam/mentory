"use client";
import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";
import OpenAI from "openai";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const UI = ({ id}: { id: number }) => {
  const [tutorMatches, setTutorMatches] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  const client = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    async function runChat(request: any) {
      const { data } = await supabase
        .from("profiles")
        .select()
        .neq("tutor_profile", null);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data: studentData } = await supabase
        .from("profiles")
        .select()
        .eq("user_id", user?.id)
        .single();

      if (!studentData) return;
      if (!data) return;

      const filteredData = data.filter(
        (profile) =>
          parseInt(profile.tutor_profile.hourlyRate) <= request.budget &&
          profile.tutor_profile.courses.some(
            (c: any) => c.course.toLowerCase() === request.course.toLowerCase()
          )
      );

      const response = await client.chat.completions.create({
        model: "gpt-5-mini", // or gpt-4.1 / gpt-3.5-turbo
        reasoning_effort: "low",
        messages: [
          {
            role: "system",
            content:
              "You are a tutor-student matching engine. You are great at matching tutors and students based on their needs and preferences and assign them a compatability rating percent (0-100). Be honest and do not be too nice.",
          },
          {
            role: "user",
            content: `Here are the student's preferences:
          ${JSON.stringify(studentData.learner_profile)}

          Here are the students needs for this specific session:
          Course: ${request.course}
          Meeting Type: ${request.meetingType}
          Date: ${request.date}
          Time: ${request.time}
          Budget: $${request.budget}/hour
          Notes: ${request.notes}

          Here are the available tutors:
          ${JSON.stringify(filteredData)}

          Now give each tutor a compatability rating percent (0-100) based on how well they match the student's preferences and needs. Then rank them from highest to lowest and give me the top 5 matches with a brief explanation of why they are a good match. Format your response as follows:
          [{
            "name": "Tutor Name",
            "compatability": "85%",
            "explanation": "Brief explanation of why they are a good match"
        }]

        Remember to format it as an array of objects as shown above.
          `,
          },
        ],
      });

      return response.choices[0].message.content;
    }

    async function fetchRequest() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: request } = await supabase
        .from("requests")
        .select()
        .eq("id", id)
        .single();

      if (request.tutor_matches && request.tutor_matches.length > 0) {
        setTutorMatches(request.tutor_matches);
        setLoading(false);
        return;
      }

      const chatResponse = await runChat(request);

      if (!chatResponse) return;

      await supabase
        .from("requests")
        .update({ tutor_matches: JSON.parse(chatResponse) })
        .eq("id", id)
        .select()
        .single();

      setTutorMatches(JSON.parse(chatResponse));
      setLoading(false);
    }

    fetchRequest();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <>
      {tutorMatches && (
        <aside className="w-80 space-y-4">
          <h2 className="text-xl font-bold">Top Tutor Matches</h2>
          {tutorMatches.map((tutor: any, idx: number) => (
            <Card key={idx} className="border hover:shadow-md transition">
              <CardHeader>
                <CardTitle className="text-lg">{tutor.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">{tutor.compatability}</span>{" "}
                  match
                </p>
                <p className="text-sm mt-2">{tutor.explanation}</p>
              </CardContent>
            </Card>
          ))}
        </aside>
      )}
    </>
  );
};

export default UI;
