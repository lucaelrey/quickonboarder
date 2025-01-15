import { useState } from "react";
import { OnboardingDashboard } from "@/components/onboarding/OnboardingDashboard";
import { OnboardingIntro } from "@/components/onboarding/OnboardingIntro";

const Onboarding = () => {
  const [showIntro, setShowIntro] = useState(true);

  const handleCompleteIntro = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return <OnboardingIntro onComplete={handleCompleteIntro} />;
  }

  return <OnboardingDashboard />;
};

export default Onboarding;