import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  onShowRegistration: () => void;
}

export const LoginForm = ({ onShowRegistration }: LoginFormProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

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
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
              fontWeight: '500',
              height: '40px',
            },
            input: {
              borderRadius: '0.75rem',
              border: '1px solid #e2e8f0',
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
              width: '100%',
              marginBottom: '1rem',
              height: '40px',
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
        view="sign_in"
        localization={{
          variables: {
            sign_in: {
              email_label: 'E-Mail',
              password_label: 'Passwort',
              button_label: 'Anmelden',
              loading_button_label: 'Anmeldung läuft...',
              social_provider_text: 'Anmelden mit {{provider}}',
              link_text: '',
            },
          },
        }}
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