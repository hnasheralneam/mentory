import { GraduationCap, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

interface Props {
    onSetupComplete: (mode: string) => void;
}

const TutorSetupCard = (props: Props) => (
  <Card className="border-gray-200 dark:border-[#444] dark:hover:border-[#666] bg-gray-50 dark:bg-[#181818] max-w-4xl mx-auto">
    <CardHeader>
      <div className="flex items-center space-x-2">
        <GraduationCap className="h-6 w-6 text-gray-700 dark:text-white" />
        <CardTitle className="text-gray-900">
          Complete Your Tutor Profile
        </CardTitle>
      </div>
      <CardDescription className="text-gray-700 dark:text-gray-300">
        Set up your teaching profile to start connecting with students
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-700 dark:text-gray-300">Basic Info</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-700 dark:text-gray-300">Teaching Subjects</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-700 dark:text-gray-300">Availability</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-700 dark:text-gray-300">Rate & Pricing</span>
        </div>
      </div>
      <br/>
      <Button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"

        onClick={() => props.onSetupComplete("tutor")}
      >
        Complete Tutor Setup
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </CardContent>
  </Card>
);

export default TutorSetupCard