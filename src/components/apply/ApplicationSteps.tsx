import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PersonalInfo } from "./steps/PersonalInfo";
import { ContactInfo } from "./steps/ContactInfo";
import { AddressInfo } from "./steps/AddressInfo";
import { WorkInfo } from "./steps/WorkInfo";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type ApplicationInsert = Database['public']['Tables']['applications']['Insert'];

export const ApplicationSteps = ({ profileId }: { profileId: string }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    salutation: "",
    civilStatus: "",
    birthDate: null as Date | null,
    nationality: "",
    preferredLanguage: "",
    germanLevel: "",
    frenchLevel: "",
    italianLevel: "",
    street: "",
    houseNumber: "",
    addressAddition: "",
    postalCode: "",
    city: "",
    currentOccupation: "",
    minWorkload: "",
    maxWorkload: "",
    availableWorkdays: [] as string[],
    vehicles: [] as string[],
    hasDeliveryExperience: false,
    jobSource: "",
  });

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = async () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      try {
        // First get the profile data to include required fields
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('first_name, last_name, email, phone')
          .eq('id', profileId)
          .single();

        if (profileError) throw profileError;
        if (!profileData) throw new Error('Profile not found');

        const applicationData: ApplicationInsert = {
          profile_id: profileId,
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          email: profileData.email,
          phone: profileData.phone,
          salutation: formData.salutation,
          civil_status: formData.civilStatus as Database['public']['Enums']['civil_status'],
          birth_date: formData.birthDate?.toISOString(),
          nationality: formData.nationality,
          preferred_language: formData.preferredLanguage as Database['public']['Enums']['preferred_language'],
          german_level: formData.germanLevel as Database['public']['Enums']['language_level'],
          french_level: formData.frenchLevel as Database['public']['Enums']['language_level'],
          italian_level: formData.italianLevel as Database['public']['Enums']['language_level'],
          street: formData.street,
          house_number: formData.houseNumber,
          address_addition: formData.addressAddition,
          postal_code: formData.postalCode,
          city: formData.city,
          current_occupation: formData.currentOccupation,
          min_workload: formData.minWorkload,
          max_workload: formData.maxWorkload,
          available_workdays: formData.availableWorkdays,
          vehicles: formData.vehicles,
          has_delivery_experience: formData.hasDeliveryExperience,
          job_source: formData.jobSource,
        };

        const { error } = await supabase
          .from('applications')
          .insert(applicationData);

        if (error) throw error;

        toast({
          title: "Erfolg",
          description: "Ihre Bewerbung wurde erfolgreich eingereicht.",
        });
        
        navigate("/application-confirmation");
      } catch (error) {
        console.error("Error submitting application:", error);
        toast({
          title: "Fehler",
          description: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
          variant: "destructive",
        });
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <PersonalInfo formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <ContactInfo formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <AddressInfo formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <WorkInfo formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= stepNumber
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {stepNumber}
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          />
        </div>
      </div>

      {renderStep()}

      <div className="pt-4 flex justify-between">
        {step > 1 && (
          <Button
            variant="outline"
            onClick={() => setStep((prev) => prev - 1)}
          >
            Zurück
          </Button>
        )}
        <Button
          onClick={handleNext}
          className={step === 1 ? "w-full" : "ml-auto"}
        >
          {step === 4 ? "Absenden" : "Weiter"}
        </Button>
      </div>
    </div>
  );
};