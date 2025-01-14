import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">Quickmail</span>
        </Link>
        <div className="flex items-center space-x-4">
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