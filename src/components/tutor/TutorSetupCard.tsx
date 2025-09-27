import { GraduationCap, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

interface Props {
    onSetupComplete: (mode: string) => void;
}

const TutorSetupCard = (props: Props) => (
  <Card className="border-gray-200 bg-gray-50">
    <CardHeader>
      <div className="flex items-center space-x-2">
        <GraduationCap className="h-6 w-6 text-gray-700" />
        <CardTitle className="text-gray-900">
          Complete Your Tutor Profile
        </CardTitle>
      </div>
      <CardDescription className="text-gray-600">
        Set up your teaching profile to start connecting with students
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-gray-800" />
          <span className="text-sm text-gray-700">Basic Info</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-700">Teaching Subjects</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-700">Availability</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-700">Rate & Pricing</span>
        </div>
      </div>
      <Button
        className="w-full bg-gray-900 hover:bg-gray-800 text-white"
        onClick={() => props.onSetupComplete("tutor")}
      >
        Complete Tutor Setup
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </CardContent>
  </Card>
);

export default TutorSetupCard