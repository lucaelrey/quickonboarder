import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, Loader2, Calendar, Car, Briefcase, Globe2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { useToast } from "@/components/ui/use-toast";

type Application = Database['public']['Tables']['applications']['Row'];

const Dashboard = () => {
  const navigate = useNavigate();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          console.log("No authenticated user found");
          navigate('/apply?form=login');
          return;
        }

        console.log("Fetching application for user:", user.id);
        const { data, error } = await supabase
          .from('applications')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching application:", error);
          toast({
            title: "Fehler beim Laden",
            description: "Ihre Bewerbung konnte nicht geladen werden. Bitte versuchen Sie es später erneut.",
            variant: "destructive",
          });
          return;
        }

        console.log("Fetched application data:", data);
        setApplication(data);
      } catch (error) {
        console.error("Error:", error);
        toast({
          title: "Fehler",
          description: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [navigate, toast]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "dd.MM.yyyy", { locale: de });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <LayoutDashboard className="h-6 w-6" />
              <CardTitle>Dashboard</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : !application ? (
              <div className="text-center py-8">
                <p className="mb-4">Sie haben noch keine Bewerbung eingereicht.</p>
                <Button onClick={() => navigate("/apply?from=dashboard")}>
                  Jetzt bewerben
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">Persönliche Informationen</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p>{application.salutation} {application.first_name} {application.last_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Zivilstand</p>
                      <p>{application.civil_status || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Geburtsdatum</p>
                      <p>{formatDate(application.birth_date)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nationalität</p>
                      <p>{application.nationality || "-"}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Globe2 className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">Kontakt & Sprachen</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Kontakt</p>
                      <p>{application.email}</p>
                      <p>{application.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bevorzugte Sprache</p>
                      <p>{application.preferred_language || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Sprachkenntnisse</p>
                      <p>Deutsch: {application.german_level || "-"}</p>
                      <p>Französisch: {application.french_level || "-"}</p>
                      <p>Italienisch: {application.italian_level || "-"}</p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">Adresse</h3>
                  </div>
                  <div>
                    <p>{application.street} {application.house_number}</p>
                    {application.address_addition && <p>{application.address_addition}</p>}
                    <p>{application.postal_code} {application.city}</p>
                  </div>
                </div>

                {/* Work Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">Arbeit</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Aktuelle Beschäftigung</p>
                      <p>{application.current_occupation || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gewünschtes Arbeitspensum</p>
                      <p>Minimum: {application.min_workload || "-"}</p>
                      <p>Maximum: {application.max_workload || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Verfügbare Arbeitstage</p>
                      <ul className="list-disc list-inside">
                        {application.available_workdays?.map((day) => (
                          <li key={day}>{day}</li>
                        )) || <p>-</p>}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Erfahrung als Zusteller:in</p>
                      <p>{application.has_delivery_experience ? "Ja" : "Nein"}</p>
                    </div>
                  </div>
                </div>

                {/* Vehicles */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">Fahrzeuge</h3>
                  </div>
                  <div>
                    <ul className="list-disc list-inside">
                      {application.vehicles?.map((vehicle) => (
                        <li key={vehicle}>{vehicle}</li>
                      )) || <p>-</p>}
                    </ul>
                  </div>
                </div>

                {/* Source */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">Quelle</h3>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Wie haben Sie von uns erfahren?</p>
                    <p>{application.job_source || "-"}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
