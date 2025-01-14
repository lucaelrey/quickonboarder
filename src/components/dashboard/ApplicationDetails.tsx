import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { ChevronLeft, User, Phone, MapPin, Globe, Briefcase } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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

  const Section = ({ icon: Icon, title, children }: { icon: any, title: string, children: React.ReactNode }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold text-primary">
        <Icon className="h-5 w-5" />
        <h3>{title}</h3>
      </div>
      <div className="pl-7">
        {children}
      </div>
    </div>
  );

  const Field = ({ label, value }: { label: string, value: string | null | undefined }) => (
    <div className="grid grid-cols-2 gap-2 py-1">
      <span className="text-muted-foreground">{label}</span>
      <span>{value || "-"}</span>
    </div>
  );

  const ListField = ({ label, items }: { label: string, items: string[] | null | undefined }) => (
    <div className="py-1">
      <span className="text-muted-foreground block mb-1">{label}</span>
      <div className="flex flex-wrap gap-2">
        {items?.map((item) => (
          <Badge key={item} variant="secondary">{item}</Badge>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={onBack}
        className="flex items-center gap-2 text-primary hover:text-primary/80"
      >
        <ChevronLeft className="h-4 w-4" />
        Zurück zur Übersicht
      </Button>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">
                {application.first_name} {application.last_name}
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Eingereicht am {formatDate(application.created_at)}
              </p>
            </div>
            <Badge className="capitalize">{application.status}</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <Section icon={User} title="Persönliche Informationen">
            <Field label="Anrede" value={application.salutation} />
            <Field label="Geburtstag" value={formatDate(application.birth_date)} />
            <Field label="Nationalität" value={application.nationality} />
            <Field label="Zivilstand" value={application.civil_status} />
          </Section>

          <Separator />

          <Section icon={Phone} title="Kontaktinformationen">
            <Field label="E-Mail" value={application.email} />
            <Field label="Telefon" value={application.phone} />
          </Section>

          <Separator />

          <Section icon={MapPin} title="Adresse">
            <div className="space-y-1">
              <p>
                {application.street} {application.house_number}
                {application.address_addition && `, ${application.address_addition}`}
              </p>
              <p>{application.postal_code} {application.city}</p>
            </div>
          </Section>

          <Separator />

          <Section icon={Globe} title="Sprachkenntnisse">
            <Field label="Bevorzugte Sprache" value={application.preferred_language} />
            <Field label="Deutsch" value={application.german_level} />
            <Field label="Französisch" value={application.french_level} />
            <Field label="Italienisch" value={application.italian_level} />
          </Section>

          <Separator />

          <Section icon={Briefcase} title="Arbeitsinformationen">
            <Field label="Aktuelle Beschäftigung" value={application.current_occupation} />
            <div className="grid grid-cols-2 gap-2 py-1">
              <span className="text-muted-foreground">Gewünschtes Arbeitspensum</span>
              <span>{application.min_workload} bis {application.max_workload}</span>
            </div>
            <ListField label="Verfügbare Arbeitstage" items={application.available_workdays} />
            <ListField label="Verfügbare Fahrzeuge" items={application.vehicles} />
            <Field 
              label="Zustellerfahrung" 
              value={application.has_delivery_experience ? "Ja" : "Nein"} 
            />
            <Field 
              label="Wie auf uns aufmerksam geworden" 
              value={application.job_source} 
            />
          </Section>
        </CardContent>
      </Card>
    </div>
  );
};