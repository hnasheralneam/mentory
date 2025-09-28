"use client";
import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";
import OpenAI from "openai";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 dark:border-gray-700 border-t-[#111111] dark:border-t-white"></div>
);

const LoadingScreen = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  const messages = [
    "Analyzing your request…",
    "Matching you with the perfect tutor…",
    "Optimizing results for your learning style…",
    "Processing real-time data…",
    "Generating the best match…",
    "Running AI algorithms…"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        setIsVisible(true);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] space-y-6">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap');
      `}</style>
      <LoadingSpinner />
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-[#111111] dark:text-white" 
            style={{ fontFamily: 'Raleway, sans-serif' }}>
          Finding Your Perfect Match
        </h3>
        <p className={`text-lg text-[#111111] dark:text-white transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
           style={{ fontFamily: 'Raleway, sans-serif' }}>
          {messages[currentMessageIndex]}
        </p>
      </div>
    </div>
  );
};

const UI = ({ id }: { id: number }) => {
  const [tutorMatches, setTutorMatches] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTutors, setSelectedTutors] = useState<any[]>([]); // store tutor names or IDs
  const router = useRouter();

  const client = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    async function runChat(request: any) {
      const { data } = await supabase
        .from("profiles")
        .select()
        .neq("tutor_profile", null).neq("user_id", request.user_id);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data: studentData } = await supabase
        .from("profiles")
        .select()
        .eq("user_id", user?.id)
        .single();

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
            "id": "tutor id",
            "email": "tutor email",
            "name": "Tutor Name",
            "compatibility": "85%",
            "explanation": "Brief explanation"
          }]

          If there are less than 5 tutors, only return the available tutors. If no tutors match, return an empty array.
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

      if (request.tutor_matches) {
        setTutorMatches(request.tutor_matches);
        setSelectedTutors(request.requested_tutors || []);
        setLoading(false);
        return;
      }

      const chatResponse = await runChat(request);
      if (!chatResponse) return;

      const parsed = JSON.parse(chatResponse);

      await supabase
        .from("requests")
        .update({ tutor_matches: parsed })
        .eq("id", id);
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
      .update({ requested_tutors: selectedTutors })
      .eq("id", id);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("profiles")
      .select()
      .eq("user_id", user?.id)
      .single();

    for (let tutor of selectedTutors) {
      console.log(process.env.NEXT_PUBLIC_MAIL_URL);
      const response = await fetch(`${process.env.NEXT_PUBLIC_MAIL_URL}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: tutor.email,
          subject:
            "New Tutoring Request from Mentory: " +
            data.first_name +
            " " +
            data.last_name,
          message: `You have a new tutoring request from ${data.first_name} ${data.last_name}. Please check your dashboard for more details.`, // Sending the formatted message
        }),
      });

      const result = await response.json();
      if (result.error) {
        console.error("Error sending email:", result.error);
      } else {
        console.log("Email sent successfully:", result);
      }
    }

    if (error) console.error(error);
    else {
      toast("Emails been sent!", {
        description: "Tutors have been notified of your request.",
      });
      router.push("/dashboard/learn?requestSent=1");
    }
  };

  if (loading) return <LoadingScreen />;

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
                  checked={selectedTutors.some((t) => t.id === tutor.id)} // check by id
                  onCheckedChange={async () => {
                    const newData = selectedTutors.some(
                      (t) => t.id === tutor.id
                    )
                      ? selectedTutors.filter((t) => t.id !== tutor.id)
                      : [...selectedTutors, tutor]; // add full object
                    setSelectedTutors(newData);

                    await supabase
                      .from("requests")
                      .update({ requested_tutors: newData })
                      .eq("id", id);
                  }}
                />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">{tutor.compatibility}</span>{" "}
                  match
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