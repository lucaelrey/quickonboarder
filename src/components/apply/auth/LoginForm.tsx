import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

interface LoginFormProps {
  onShowRegistration: () => void;
}

export const LoginForm = ({ onShowRegistration }: LoginFormProps) => {
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
          onClick={onShowRegistration}
          className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          type="button"
        >
          Zurück zur Registrierung
        </button>
      </div>
    </div>
  );
};