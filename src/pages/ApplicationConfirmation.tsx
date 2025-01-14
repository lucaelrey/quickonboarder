import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRightCircle } from "lucide-react";

const ApplicationConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Bewerbung erfolgreich eingereicht!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-gray-600">
            Vielen Dank für Ihre Bewerbung. Wir werden diese sorgfältig prüfen und uns zeitnah bei Ihnen melden.
          </p>
          <Button 
            onClick={() => navigate("/dashboard")} 
            className="w-full"
          >
            Zum Dashboard
            <ArrowRightCircle className="ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationConfirmation;