import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, LayoutDashboard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { useToast } from "@/components/ui/use-toast";
import { ApplicantDashboard } from "@/components/dashboard/ApplicantDashboard";
import { NewcomerDashboard } from "@/components/dashboard/NewcomerDashboard";
import { EmployeeDashboard } from "@/components/dashboard/EmployeeDashboard";

type Profile = Database['public']['Tables']['profiles']['Row'];
type Application = Database['public']['Tables']['applications']['Row'];

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [application, setApplication] = useState<Application | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          console.log("No authenticated user found");
          navigate('/apply?form=login');
          return;
        }

        // Fetch profile first to get user status
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          toast({
            title: "Fehler beim Laden",
            description: "Ihr Profil konnte nicht geladen werden. Bitte versuchen Sie es später erneut.",
            variant: "destructive",
          });
          return;
        }

        setProfile(profileData);

        // Only fetch application if user is an applicant
        if (profileData.status === 'bewerber') {
          const { data: applicationData, error: applicationError } = await supabase
            .from('applications')
            .select('*')
            .eq('user_id', user.id)
            .maybeSingle();

          if (applicationError) {
            console.error("Error fetching application:", applicationError);
            toast({
              title: "Fehler beim Laden",
              description: "Ihre Bewerbung konnte nicht geladen werden. Bitte versuchen Sie es später erneut.",
              variant: "destructive",
            });
            return;
          }

          setApplication(applicationData);
        }
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

    fetchUserData();
  }, [navigate, toast]);

  const renderDashboardContent = () => {
    if (!profile) return null;

    switch (profile.status) {
      case 'bewerber':
        return application ? <ApplicantDashboard application={application} /> : (
          <div className="text-center py-8">
            <p className="mb-4">Sie haben noch keine Bewerbung eingereicht.</p>
            <Button onClick={() => navigate("/apply?from=dashboard")}>
              Jetzt bewerben
            </Button>
          </div>
        );
      case 'newcomer':
        return <NewcomerDashboard />;
      case 'mitarbeiter':
        return <EmployeeDashboard />;
      case 'gekuendigt':
        return (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-500">
                Ihr Zugang wurde deaktiviert.
              </p>
            </CardContent>
          </Card>
        );
      default:
        return null;
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
            ) : (
              renderDashboardContent()
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;