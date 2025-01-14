import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Application = Database['public']['Tables']['applications']['Row'];

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (!session.session) {
          navigate("/apply");
          return;
        }

        const { data, error } = await supabase
          .from('applications')
          .select('*')
          .eq('user_id', session.session.user.id);

        if (error) throw error;

        setApplications(data || []);
      } catch (error) {
        console.error("Error fetching applications:", error);
        toast({
          title: "Fehler",
          description: "Ihre Bewerbungen konnten nicht geladen werden.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [navigate, toast]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-6">
            <p>Laden...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Meine Bewerbungen</CardTitle>
        </CardHeader>
        <CardContent>
          {applications.length === 0 ? (
            <p>Sie haben noch keine Bewerbungen eingereicht.</p>
          ) : (
            <div className="space-y-4">
              {applications.map((application) => (
                <Card key={application.id}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">
                      {application.first_name} {application.last_name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Eingereicht am: {new Date(application.created_at || '').toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;