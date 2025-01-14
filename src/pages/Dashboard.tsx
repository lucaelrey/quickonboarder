import { useState, useEffect } from "react";
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

type Application = Database['public']['Tables']['applications']['Row'];
type UserRole = Database['public']['Enums']['user_role'];

const Dashboard = () => {
  const navigate = useNavigate();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('bewerber');
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          console.log("No authenticated user found");
          navigate('/apply?form=login');
          return;
        }

        // Fetch user role from profiles
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
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

        if (profile) {
          setUserRole(profile.role);
        }

        // Only fetch application if user is an applicant
        if (profile.role === 'bewerber') {
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
    switch (userRole) {
      case 'bewerber':
        if (!application) {
          return (
            <div className="text-center py-8">
              <p className="mb-4">Sie haben noch keine Bewerbung eingereicht.</p>
              <Button onClick={() => navigate("/apply?from=dashboard")}>
                Jetzt bewerben
              </Button>
            </div>
          );
        }
        return <ApplicantDashboard 
          application={application} 
          onViewDetails={() => setShowDetails(true)} 
        />;
      
      case 'newcomer':
        return <NewcomerDashboard />;
      
      case 'mitarbeiter':
        return <EmployeeDashboard />;
      
      case 'gekuendigt':
        return (
          <div className="text-center py-8">
            <p>Ihr Zugang wurde deaktiviert.</p>
          </div>
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