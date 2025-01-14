import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, FileText } from "lucide-react";

export const EmployeeDashboard = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Schulungen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p>Verfügbare Schulungen</p>
              <Badge>Mitarbeiter</Badge>
            </div>
            <p className="text-sm text-gray-500">
              Hier findest du alle verfügbaren Schulungen und Weiterbildungen.
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