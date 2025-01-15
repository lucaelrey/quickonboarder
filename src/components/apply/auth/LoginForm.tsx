import { useToast } from "@/components/ui/use-toast";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  onShowRegistration: () => void;
}

export const LoginForm = ({ onShowRegistration }: LoginFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        toast({
          title: "Erfolgreich angemeldet",
          description: "Sie wurden erfolgreich angemeldet.",
        });
        navigate("/onboarding");
      } else if (event === "SIGNED_OUT") {
        toast({
          title: "Abgemeldet",
          description: "Sie wurden erfolgreich abgemeldet.",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [toast, navigate]);

  return (
    <div className="space-y-4">
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          style: {
            button: {
              background: '#0077ff',
              color: 'white',
              width: '100%',
              borderRadius: '0.75rem',
              padding: '0.75rem 1rem',
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
              fontWeight: '500',
              height: '2.5rem',
            },
            input: {
              borderRadius: '0.75rem',
              border: '1px solid #e2e8f0',
              padding: '0.75rem 1rem',
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
              width: '100%',
              marginBottom: '1rem',
              height: '2.5rem',
            },
            label: {
              color: '#1a202c',
              marginBottom: '0.5rem',
              display: 'block',
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
              fontWeight: '500',
            },
            container: {
              width: '100%',
              marginBottom: '1rem',
            },
            message: {
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
              color: '#ef4444',
              marginTop: '0.5rem',
            },
            anchor: {
              display: 'none', // Hide the "Don't have an account? Sign up" link
            },
          },
          className: {
            container: 'space-y-4',
            button: 'w-full hover:bg-primary-dark transition-colors duration-200',
            input: 'w-full',
            label: 'block text-sm font-medium',
            message: 'text-sm text-red-500 mt-2',
          },
        }}
        theme="light"
        providers={[]}
      />
      <div className="text-center mt-4">
        <button
          onClick={onShowRegistration}
          className="text-sm text-primary hover:text-primary-dark hover:underline transition-colors duration-200"
          type="button"
        >
          Zurück zur Registrierung
        </button>
      </div>
    </div>
  );
};