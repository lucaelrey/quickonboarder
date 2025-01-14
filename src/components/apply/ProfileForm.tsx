import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegistrationForm } from "./auth/RegistrationForm";
import { LoginForm } from "./auth/LoginForm";

export const ProfileForm = ({ 
  onProfileCreated,
  initialShowLogin = false
}: { 
  onProfileCreated: () => void;
  initialShowLogin?: boolean;
}) => {
  const [showLogin, setShowLogin] = useState(initialShowLogin);

  return (
    <div className="space-y-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{showLogin ? "Anmelden" : "Profil erstellen"}</CardTitle>
        </CardHeader>
        <CardContent>
          {!showLogin ? (
            <RegistrationForm
              onShowLogin={() => setShowLogin(true)}
              onProfileCreated={onProfileCreated}
            />
          ) : (
            <LoginForm onShowRegistration={() => setShowLogin(false)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};