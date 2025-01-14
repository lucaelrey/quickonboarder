import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Navbar = () => {
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
          <Link to="/apply">
            <Button variant="default">Jetzt bewerben</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline">Admin Login</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};