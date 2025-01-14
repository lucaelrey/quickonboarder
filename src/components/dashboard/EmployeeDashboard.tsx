import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, GraduationCap, BookOpen } from "lucide-react";

export const EmployeeDashboard = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            <CardTitle>Intranet</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Willkommen im Mitarbeiterbereich</p>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">Aktuelle Mitteilungen</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Neue Sicherheitsrichtlinien</li>
                    <li>Kommende Teamevents</li>
                    <li>Wichtige Updates</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">Ressourcen</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Formulare & Dokumente</li>
                    <li>IT-Support</li>
                    <li>Urlaubsantrag</li>
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
            <GraduationCap className="h-5 w-5" />
            <CardTitle>Schulungen</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Verfügbare Schulungen und Weiterbildungen</p>
            <div className="grid gap-4">
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">Aktuelle Kurse</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center justify-between">
                      <span>Sicherheitstraining</span>
                      <Badge>Neu</Badge>
                    </li>
                    <li>Kundenservice Excellence</li>
                    <li>Führungskräfteentwicklung</li>
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