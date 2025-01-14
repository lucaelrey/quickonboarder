import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Application = Database['public']['Tables']['applications']['Row'];

const Dashboard = () => {
  const navigate = useNavigate();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: application, error } = await supabase
          .from('applications')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error("Error fetching application:", error);
        }

        setApplication(application);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

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
            {!application ? (
              <div className="text-center">
                <p className="mb-4">Sie haben noch keine Bewerbung eingereicht.</p>
                <Button onClick={() => navigate("/apply?from=dashboard")}>
                  Jetzt bewerben
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Bewerberprofil</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p>{application.salutation} {application.first_name} {application.last_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Kontakt</p>
                    <p>{application.email}</p>
                    <p>{application.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Adresse</p>
                    <p>{application.street} {application.house_number}</p>
                    {application.address_addition && <p>{application.address_addition}</p>}
                    <p>{application.postal_code} {application.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Sprachen</p>
                    <p>Bevorzugte Sprache: {application.preferred_language}</p>
                    <p>Deutsch: {application.german_level}</p>
                    <p>Französisch: {application.french_level}</p>
                    <p>Italienisch: {application.italian_level}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Beschäftigung</p>
                    <p>Aktuell: {application.current_occupation}</p>
                    <p>Gewünschtes Pensum: {application.min_workload} - {application.max_workload}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Verfügbarkeit</p>
                    <ul className="list-disc list-inside">
                      {application.available_workdays?.map((day) => (
                        <li key={day}>{day}</li>
                      ))}
                    </ul>
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