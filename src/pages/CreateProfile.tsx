import { Navbar } from "@/components/layout/Navbar";
import { ProfileForm } from "@/components/apply/ProfileForm";
import { useNavigate, useSearchParams } from "react-router-dom";

const CreateProfile = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const showLogin = searchParams.get("form") === "login";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <ProfileForm
          onProfileCreated={() => navigate("/apply")}
          initialShowLogin={showLogin}
        />
      </div>
    </div>
  );
};

export default CreateProfile;