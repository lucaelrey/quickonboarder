import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import type { Database } from "@/integrations/supabase/types";

type Application = Database['public']['Tables']['applications']['Row'];

interface ApplicationDetailsProps {
  application: Application;
  onBack: () => void;
}

export const ApplicationDetails = ({ application, onBack }: ApplicationDetailsProps) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "dd.MM.yyyy", { locale: de });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-2"
      >
        ← Zurück zur Übersicht
      </button>

      <Card>
        <CardHeader>
          <CardTitle>Bewerbungsdetails</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Persönliche Informationen</h3>
              <div className="space-y-2">
                <p><span className="text-gray-600">Anrede:</span> {application.salutation}</p>
                <p><span className="text-gray-600">Name:</span> {application.first_name} {application.last_name}</p>
                <p><span className="text-gray-600">Geburtstag:</span> {formatDate(application.birth_date)}</p>
                <p><span className="text-gray-600">Nationalität:</span> {application.nationality}</p>
                <p><span className="text-gray-600">Zivilstand:</span> {application.civil_status}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Kontaktinformationen</h3>
              <div className="space-y-2">
                <p><span className="text-gray-600">E-Mail:</span> {application.email}</p>
                <p><span className="text-gray-600">Telefon:</span> {application.phone}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Adresse</h3>
            <div className="space-y-2">
              <p>
                {application.street} {application.house_number}
                {application.address_addition && `, ${application.address_addition}`}
              </p>
              <p>{application.postal_code} {application.city}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Sprachkenntnisse</h3>
            <div className="space-y-2">
              <p><span className="text-gray-600">Bevorzugte Sprache:</span> {application.preferred_language}</p>
              <p><span className="text-gray-600">Deutsch:</span> {application.german_level}</p>
              <p><span className="text-gray-600">Französisch:</span> {application.french_level}</p>
              <p><span className="text-gray-600">Italienisch:</span> {application.italian_level}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Arbeitsinformationen</h3>
            <div className="space-y-2">
              <p><span className="text-gray-600">Aktuelle Beschäftigung:</span> {application.current_occupation}</p>
              <p><span className="text-gray-600">Gewünschtes Arbeitspensum:</span> {application.min_workload} bis {application.max_workload}</p>
              <div>
                <span className="text-gray-600">Verfügbare Arbeitstage:</span>
                <ul className="list-disc list-inside mt-1">
                  {application.available_workdays?.map((day) => (
                    <li key={day}>{day}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-gray-600">Verfügbare Fahrzeuge:</span>
                <ul className="list-disc list-inside mt-1">
                  {application.vehicles?.map((vehicle) => (
                    <li key={vehicle}>{vehicle}</li>
                  ))}
                </ul>
              </div>
              <p>
                <span className="text-gray-600">Zustellerfahrung:</span>{" "}
                {application.has_delivery_experience ? "Ja" : "Nein"}
              </p>
              <p><span className="text-gray-600">Wie auf uns aufmerksam geworden:</span> {application.job_source}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Bewerbungsstatus</h3>
            <div className="space-y-2">
              <p><span className="text-gray-600">Eingereicht am:</span> {formatDate(application.created_at)}</p>
              <p>
                <span className="text-gray-600">Status:</span>{" "}
                <Badge variant="outline" className="ml-2">
                  {application.status}
                </Badge>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};