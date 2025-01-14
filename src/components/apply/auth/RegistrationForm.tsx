import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface RegistrationFormProps {
  onShowLogin: () => void;
  onProfileCreated: () => void;
}

export const RegistrationForm = ({ onShowLogin, onProfileCreated }: RegistrationFormProps) => {
  const { toast } = useToast();
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
      // First, check if there's an existing profile with this email
      const { data: existingProfiles } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", formData.email);

      // If there's an existing profile, delete it first
      if (existingProfiles && existingProfiles.length > 0) {
        const { error: deleteError } = await supabase
          .from("profiles")
          .delete()
          .eq("email", formData.email);

        if (deleteError) {
          console.error("Error deleting existing profile:", deleteError);
          toast({
            title: "Fehler",
            description: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
            variant: "destructive",
          });
          return;
        }
      }

      // Try to sign up the user
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

      if (authError) {
        console.error("Auth error:", authError);
        toast({
          title: "Fehler",
          description: "Ein Fehler ist aufgetreten bei der Registrierung. Bitte versuchen Sie es später erneut.",
          variant: "destructive",
        });
        return;
      }

      if (!authData.user) {
        throw new Error("Benutzer konnte nicht erstellt werden.");
      }

      // Create the profile
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          user_id: authData.user.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: "",
        });

      if (profileError) {
        console.error("Error creating profile:", profileError);
        toast({
          title: "Fehler",
          description: "Ein Fehler ist aufgetreten beim Erstellen des Profils.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Erfolg",
        description: "Ihr Profil wurde erfolgreich erstellt. Sie können sich jetzt einloggen.",
      });
      onProfileCreated();
    } catch (error) {
      console.error("Error in registration process:", error);
      toast({
        title: "Fehler",
        description: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      });
    }
  };

  return (
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
          onClick={onShowLogin}
          className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          type="button"
        >
          Du hast bereits einen Account? Jetzt anmelden
        </button>
      </div>
    </div>
  );
};