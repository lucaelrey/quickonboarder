import { Progress } from "@/components/ui/progress";

export const OnboardingProgress = ({ current, total }: { current: number; total: number }) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full max-w-xl mx-auto mb-4">
      <Progress value={progress} className="h-2" />
      <p className="text-sm text-gray-500 mt-2 text-center">
        {current} von {total} Schritten abgeschlossen
      </p>
    </div>
  );
};