import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="border-b bg-transparent">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="w-full flex justify-center">
          <Link to="/" className="flex items-center justify-center">
            <img 
              src="/lovable-uploads/8294c711-1f00-4f39-bdd8-771770011abf.png" 
              alt="Quickmail Logo" 
              className="h-16 object-contain"
            />
          </Link>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="default">Dashboard</Button>
              </Link>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleLogout}
                className="hover:bg-gray-100"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Link to="/apply">
              <Button variant="default">Anmelden</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};