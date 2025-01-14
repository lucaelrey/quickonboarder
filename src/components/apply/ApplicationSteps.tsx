import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PersonalInfo } from "./steps/PersonalInfo";
import { ContactInfo } from "./steps/ContactInfo";
import { AddressInfo } from "./steps/AddressInfo";
import { WorkInfo } from "./steps/WorkInfo";
import { supabase } from "@/integrations/supabase/client";

export const ApplicationSteps = ({ profileId }: { profileId: string }) => {
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
        const { error } = await supabase
          .from("applications")
          .insert({
            profile_id: profileId,
            salutation: formData.salutation,
            civil_status: formData.civilStatus,
            birth_date: formData.birthDate?.toISOString(),
            nationality: formData.nationality,
            preferred_language: formData.preferredLanguage,
            german_level: formData.germanLevel,
            french_level: formData.frenchLevel,
            italian_level: formData.italianLevel,
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
          });

        if (error) throw error;

        toast({
          title: "Erfolg",
          description: "Ihre Bewerbung wurde erfolgreich eingereicht.",
        });
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