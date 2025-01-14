import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileText } from "lucide-react";

export const NewcomerDashboard = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Onboarding
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p>Willkommen im Team!</p>
              <Badge>Newcomer</Badge>
            </div>
            <p className="text-sm text-gray-500">
              Hier findest du alle wichtigen Informationen für deinen Start.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Interne Informationen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            Hier findest du wichtige interne Dokumente und Informationen.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};