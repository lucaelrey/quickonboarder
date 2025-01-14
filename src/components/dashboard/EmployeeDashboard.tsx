import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, GraduationCap } from "lucide-react";

export const EmployeeDashboard = () => {
  return (
    <div className="space-y-6">
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
              Hier finden Sie wichtige interne Dokumente und Informationen.
            </p>
            {/* Add intranet content here */}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Schulungen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="font-medium">Verfügbare Schulungen</h3>
            <p className="text-gray-600">
              Hier finden Sie alle verfügbaren Schulungen und Weiterbildungsmöglichkeiten.
            </p>
            {/* Add training content here */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};