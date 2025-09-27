"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Star, BarChart2 } from "lucide-react";
import Image from "next/image";

export function TutorDashboard() {
  // In real app, pull this from Supabase
  const tutorName = "John Doe";
  const stats = {
    activeStudents: 12,
    avgRating: 5.0,
    thisMonth: 100,
  };

  const requests = [
    {
      id: 1,
      name: "Ostine Chen",
      year: "Freshman",
      school: "UCLA",
      course: "Calculus 1",
      details: "Struggling with integration techniques and series convergence",
      match: 96,
      avatar: "/student-avatar.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      year: "Sophomore",
      school: "UMBC",
      course: "Computer Science 202",
      details: "Needs help with data structures & algorithms",
      match: 91,
      avatar: "/student-avatar.jpg",
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Tutor Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {tutorName}!</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeStudents}</div>
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgRating}</div>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 text-yellow-500 fill-yellow-500"
                />
              ))}
            </div>
          </CardContent>
        </Card> */}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.thisMonth}</div>
          </CardContent>
        </Card>
      </div>

      {/* Student Requests */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Student Requests</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {requests.map((req) => (
            <Card key={req.id} className="flex flex-col">
              <CardContent className="flex flex-col gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={req.avatar}
                    alt={req.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{req.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {req.year} · {req.school}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                      {req.match}% Match
                    </span>
                  </div>
                </div>

                <div>
                  <p className="font-semibold">{req.course}</p>
                  <p className="text-sm text-muted-foreground">{req.details}</p>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Connect
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
