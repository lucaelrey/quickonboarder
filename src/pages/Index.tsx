import { Hero } from "@/components/home/Hero";
import { Navbar } from "@/components/layout/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
    </div>
  );
};

export default Index;