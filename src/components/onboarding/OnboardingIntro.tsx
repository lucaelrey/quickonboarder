import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const introSteps = [
  {
    id: 1,
    text: "Hi, ich bin Quentin. Ich bin das Maskottchen von Quickmail.",
    delay: 3000,
  },
  {
    id: 2,
    text: "Ich bringe dir bei, was du über deine Aufgabe bei Quickmail wissen musst.",
    delay: 4000,
  },
  {
    id: 3,
    text: "Wir haben alles in kleine Lerneinheiten aufgeteilt. Ich helfe dir Schritt für Schritt durch deine Ausbildung. Nimm dir 15 Minuten Zeit pro Tag. Nach einer Woche bist du bereit.",
    delay: 6000,
  },
  {
    id: 4,
    text: "Keine Sorge. Du kannst alles in deinem Tempo lernen. Wenn du etwas nicht verstehst, oder nicht mehr weiter weisst, sind unsere Zustellbezirksleiter:innen gerne für dich da!",
    delay: 5000,
  },
];

export const OnboardingIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    if (currentStep < introSteps.length) {
      const timer = setTimeout(() => {
        setCanProceed(true);
      }, introSteps[currentStep].delay);

      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < introSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setCanProceed(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-xl"
        >
          <Card className="p-6 text-center shadow-lg">
            <div className="flex flex-col items-center space-y-6">
              <img
                src="/lovable-uploads/8f0601dd-1d67-4f11-bdd5-3b74a454519b.png"
                alt="Quentin - Quickmail Maskottchen"
                className="w-32 h-32 object-contain mb-4"
              />
              <p className="text-lg mb-8">{introSteps[currentStep].text}</p>
              <Button
                onClick={handleNext}
                disabled={!canProceed}
                className="w-full max-w-xs mx-auto"
              >
                {currentStep < introSteps.length - 1 ? (
                  <>
                    Weiter <ArrowRight className="ml-2" />
                  </>
                ) : (
                  "Los geht's!"
                )}
              </Button>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};