import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Calendar, Clock, Flame } from "lucide-react";

export const OnboardingDashboard = () => {
  const [streak, setStreak] = useState(0);
  const [dailyProgress, setDailyProgress] = useState(0);

  const chapters = [
    {
      id: 1,
      title: "Willkommen",
      progress: 100,
      isCompleted: true,
      icon: "👋",
    },
    {
      id: 2,
      title: "Deine Aufgaben",
      progress: 0,
      isCompleted: false,
      icon: "📝",
    },
    {
      id: 3,
      title: "Dein Team",
      progress: 0,
      isCompleted: false,
      icon: "👥",
    },
    {
      id: 4,
      title: "Arbeitsmaterial",
      progress: 0,
      isCompleted: false,
      icon: "📦",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/lovable-uploads/8f0601dd-1d67-4f11-bdd5-3b74a454519b.png"
              alt="Quentin"
              className="w-12 h-12"
            />
            <h1 className="text-2xl font-bold">Willkommen zurück!</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-orange-500" />
              <span className="font-bold">{streak}</span>
            </div>
            <Button variant="outline" className="gap-2">
              <Trophy className="w-4 h-4" />
              Tägliche Ziele
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Learning Path */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Dein Lernpfad</h2>
            <div className="grid gap-4">
              {chapters.map((chapter) => (
                <Card
                  key={chapter.id}
                  className={`p-4 transition-transform hover:scale-[1.02] cursor-pointer ${
                    chapter.isCompleted ? "bg-primary-light" : "bg-white"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{chapter.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-medium">{chapter.title}</h3>
                      <Progress value={chapter.progress} className="h-2 mt-2" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats and Progress */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Dein Fortschritt</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-gray-600">Tage aktiv</p>
                    <p className="text-xl font-bold">{streak}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-gray-600">Heute gelernt</p>
                    <p className="text-xl font-bold">{dailyProgress}%</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="font-bold mb-4">Tägliche Aktivität</h3>
              <div className="h-40 flex items-end justify-between gap-2">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-primary-light rounded w-full"
                    style={{
                      height: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>Mo</span>
                <span>Di</span>
                <span>Mi</span>
                <span>Do</span>
                <span>Fr</span>
                <span>Sa</span>
                <span>So</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};