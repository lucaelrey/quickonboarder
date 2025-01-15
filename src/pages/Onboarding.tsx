import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OnboardingIntro } from "@/components/onboarding/OnboardingIntro";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { motion } from "framer-motion";

const Onboarding = () => {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleComplete = () => {
    // Handle completion of intro
    setCurrentStep(2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <OnboardingProgress current={currentStep} total={totalSteps} />
        
        {!started ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="max-w-xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center">Willkommen bei Quickmail</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-6">
                  In diesem Kapitel erfährst du, was deine Aufgabe bei Quickmail ist und an wen du dich bei Fragen wenden kannst.
                </p>
                <Button onClick={() => setStarted(true)} className="w-full max-w-xs">
                  Los geht's!
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <OnboardingIntro onComplete={handleComplete} />
        )}
      </div>
    </div>
  );
};

export default Onboarding;