import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ApplicationSteps } from "@/components/apply/ApplicationSteps";
import { Loader2 } from "lucide-react";

const Apply = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<{ id: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          console.log("No authenticated user found");
          navigate('/create-profile?form=login');
          return;
        }

        console.log("Checking profile for user:", user.id);
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("id")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching profile:", error);
          toast({
            title: "Fehler",
            description: "Fehler beim Laden des Profils. Bitte versuchen Sie es später erneut.",
            variant: "destructive",
          });
          return;
        }

        if (!profile) {
          console.log("No profile found, redirecting to profile creation");
          navigate('/create-profile');
          return;
        }

        console.log("Profile found:", profile);
        setProfile(profile);
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

    checkProfile();
  }, [navigate, toast]);

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
      <div className="container mx-auto px-4 py-8">
        {profile && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Bewerbung</CardTitle>
            </CardHeader>
            <CardContent>
              <ApplicationSteps profileId={profile.id} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Apply;