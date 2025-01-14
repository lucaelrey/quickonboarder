import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export const ProfileForm = ({ onProfileCreated }: { onProfileCreated: () => void }) => {
  const { toast } = useToast();
  const [showLogin, setShowLogin] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast({
        title: "Fehler",
        description: "Bitte füllen Sie alle Pflichtfelder aus.",
        variant: "destructive",
      });
      return;
    }

    try {
      // First, create the user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          },
        },
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error("Benutzer konnte nicht erstellt werden.");
      }

      // Then create the profile
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          user_id: authData.user.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: "", // Set empty string as default
        });

      if (profileError) throw profileError;

      toast({
        title: "Erfolg",
        description: "Ihr Profil wurde erfolgreich erstellt. Sie können sich jetzt einloggen.",
      });
      onProfileCreated();
    } catch (error) {
      console.error("Error creating profile:", error);
      toast({
        title: "Fehler",
        description: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      {!showLogin ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Profil erstellen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Vorname</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Max"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nachname</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Mustermann"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="max.mustermann@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Passwort</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                />
              </div>
              <Button onClick={handleSubmit} className="w-full">
                Profil erstellen
              </Button>
              <div className="text-center">
                <button
                  onClick={() => setShowLogin(true)}
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  type="button"
                >
                  Du hast bereits einen Account? Jetzt anmelden
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Anmelden</CardTitle>
          </CardHeader>
          <CardContent>
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                style: {
                  button: {
                    background: '#0077ff',
                    color: 'white',
                    width: '100%',
                    borderRadius: '0.375rem',
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    '&:hover': {
                      background: '#004aad',
                    },
                  },
                  input: {
                    borderRadius: '0.375rem',
                    border: '1px solid #e2e8f0',
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem',
                    width: '100%',
                    marginBottom: '1rem',
                  },
                  label: {
                    color: '#1a202c',
                    marginBottom: '0.5rem',
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                  },
                  container: {
                    width: '100%',
                  },
                },
                className: {
                  container: 'space-y-4',
                  button: 'w-full',
                  input: 'w-full',
                  label: 'block text-sm font-medium',
                },
              }}
              theme="light"
              providers={[]}
              view="sign_in"
            />
            <div className="text-center mt-4">
              <button
                onClick={() => setShowLogin(false)}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                type="button"
              >
                Zurück zur Registrierung
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};