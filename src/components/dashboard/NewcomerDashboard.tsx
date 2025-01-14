import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, Building } from "lucide-react";
import { OnboardingIntro } from "@/components/onboarding/OnboardingIntro";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";

export const NewcomerDashboard = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const totalSteps = 4; // Update this as we add more chapters

  const handleStartOnboarding = () => {
    setShowOnboarding(true);
  };

  const handleCompleteIntro = () => {
    setOnboardingStep(1);
    // Here we'll later add logic to proceed to the next chapter
  };

  if (showOnboarding) {
    return (
      <div className="space-y-6">
        <OnboardingProgress current={onboardingStep} total={totalSteps} />
        <OnboardingIntro onComplete={handleCompleteIntro} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Onboarding
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="font-medium">Willkommen bei Quickmail!</h3>
            <p className="text-gray-600">
              In diesem Kapitel erfährst du, was deine Aufgabe bei Quickmail ist und an wen du dich bei Fragen wenden kannst.
            </p>
            <Button onClick={handleStartOnboarding} className="w-full">
              Los geht's
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Intranet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="font-medium">Interne Informationen</h3>
            <p className="text-gray-600">
              Hier findest du wichtige interne Dokumente und Informationen.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};