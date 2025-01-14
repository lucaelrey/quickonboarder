import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-primary-light to-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Starte deine Karriere bei Quickmail
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Wir suchen talentierte Menschen wie dich, die mit uns die Zukunft gestalten möchten.
          </p>
          <Link to="/apply">
            <Button size="lg" className="text-lg px-8">
              Jetzt bewerben
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};