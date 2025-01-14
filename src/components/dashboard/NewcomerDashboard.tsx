import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Building2, GraduationCap } from "lucide-react";

export const NewcomerDashboard = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            <CardTitle>Onboarding</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="font-semibold">Willkommen im Team!</h3>
            <p>Hier finden Sie alle wichtigen Informationen für Ihren Start bei uns.</p>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">Erste Schritte</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Arbeitsvertrag unterschreiben</li>
                    <li>IT-Systeme Zugang einrichten</li>
                    <li>Teamvorstellung</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">Wichtige Dokumente</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Mitarbeiterhandbuch</li>
                    <li>Sicherheitsrichtlinien</li>
                    <li>Verhaltenskodex</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            <CardTitle>Intranet</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Aktuelle Informationen und wichtige Links</p>
            <div className="grid gap-4">
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">Neuigkeiten</h4>
                  <ul className="space-y-2 text-sm">
                    <li>Neue Mitarbeiter im Team</li>
                    <li>Aktuelle Projekte</li>
                    <li>Kommende Events</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};