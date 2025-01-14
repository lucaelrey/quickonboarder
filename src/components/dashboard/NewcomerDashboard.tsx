import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen, Building } from "lucide-react";

export const NewcomerDashboard = () => {
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
            <h3 className="font-medium">Willkommen im Team!</h3>
            <p className="text-gray-600">
              Hier finden Sie alle wichtigen Informationen für Ihren Start bei uns.
            </p>
            {/* Add onboarding steps/content here */}
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
              Hier finden Sie wichtige interne Dokumente und Informationen.
            </p>
            {/* Add intranet content here */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};