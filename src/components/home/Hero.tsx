import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
        Werde Teil unseres Teams
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Starte deine Karriere als Zusteller/in bei Quickmail und gestalte mit uns die Zukunft der Briefzustellung in der Schweiz.
      </p>
      <Link to="/apply?form=register">
        <Button size="lg" className="text-lg px-8">
          Jetzt bewerben
        </Button>
      </Link>
    </div>
  );
};