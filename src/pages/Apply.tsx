import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProfileForm } from "@/components/apply/ProfileForm";
import { ApplicationSteps } from "@/components/apply/ApplicationSteps";
import { Button } from "@/components/ui/button";

const Apply = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<{ id: string } | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: profile, error } = await supabase
          .from("profiles")
          .select("id")
          .eq("user_id", user.id)
          .single();

        if (error) throw error;
        setProfile(profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        fetchProfile();
      } else if (event === 'SIGNED_OUT') {
        setProfile(null);
        setShowApplicationForm(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {!profile ? (
          <ProfileForm onProfileCreated={() => window.location.reload()} />
        ) : !showApplicationForm ? (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Bewerbung starten</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Ihr Profil wurde erfolgreich erstellt. Sie können nun mit dem Bewerbungsprozess fortfahren.
              </p>
              <Button onClick={() => setShowApplicationForm(true)} className="w-full">
                Bewerbung starten
              </Button>
            </CardContent>
          </Card>
        ) : (
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