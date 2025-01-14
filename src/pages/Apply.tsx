import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import countries from "../data/countries.json";
import { Checkbox } from "@/components/ui/checkbox";

const Apply = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "birthDate") {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        setFormData((prev) => ({
          ...prev,
          birthDate: date,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setFormData((prev) => ({
      ...prev,
      birthDate: date || null,
    }));
  };

  const handleCheckboxChange = (value: string, field: "availableWorkdays" | "vehicles") => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleNext = async () => {
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        toast({
          title: "Fehler",
          description: "Bitte füllen Sie alle Pflichtfelder aus.",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.salutation || !formData.civilStatus || !formData.birthDate || 
          !formData.nationality || !formData.preferredLanguage || 
          !formData.germanLevel || !formData.frenchLevel || !formData.italianLevel) {
        toast({
          title: "Fehler",
          description: "Bitte füllen Sie alle Pflichtfelder aus.",
          variant: "destructive",
        });
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!formData.street || !formData.houseNumber || !formData.postalCode || !formData.city) {
        toast({
          title: "Fehler",
          description: "Bitte füllen Sie alle Pflichtfelder aus.",
          variant: "destructive",
        });
        return;
      }
      setStep(4);
    } else if (step === 4) {
      if (!formData.currentOccupation || !formData.minWorkload || !formData.maxWorkload || 
          formData.availableWorkdays.length === 0 || formData.vehicles.length === 0 || 
          !formData.jobSource) {
        toast({
          title: "Fehler",
          description: "Bitte füllen Sie alle Pflichtfelder aus.",
          variant: "destructive",
        });
        return;
      }

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          toast({
            title: "Fehler",
            description: "Sie müssen eingeloggt sein, um eine Bewerbung einzureichen.",
            variant: "destructive",
          });
          return;
        }

        const { error } = await supabase
          .from("applications")
          .insert({
            user_id: user.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
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

  const workloadOptions = [
    "10 % (½ Tag pro Woche)",
    "20 % (1 Tag pro Woche)",
    "30% (1½ Tage pro Woche)",
    "40 % (2 Tage pro Woche)",
    "50 % (2½ Tage pro Woche)",
    "60 % (3 Tage pro Woche)",
    "70 % (3½ Tage pro Woche)",
    "80 % (4 Tage pro Woche)",
    "90 % (4½ Tage pro Woche)",
    "100 % (5 Tage pro Woche)",
  ];

  const occupationOptions = [
    "haushaltsführende Person",
    "in Schichtarbeit",
    "teilzeitbeschäftigt",
    "vollzeitbeschäftigt",
    "pensioniert",
    "arbeitssuchend",
    "Student:in",
    "Schüler:in",
    "Sonstiges",
  ];

  const workdayOptions = [
    "Donnerstagvormittag",
    "Donnerstagnachmittag",
    "Freitagvormittag",
    "Freitagnachmittag",
    "Samstagvormittag (gelegentlich)",
  ];

  const vehicleOptions = [
    "Fahrrad",
    "E-Bike",
    "Mofa",
    "Motorrad",
    "Auto",
    "Keines",
  ];

  const jobSourceOptions = [
    "Facebook",
    "Google",
    "Instagram",
    "Jobbörse im Internet",
    "Empfehlung durch Bekannte",
    "Empfehlung durch Quickmail-Zusteller:in",
    "Stelleninserat in Zeitung",
    "Flugblatt in meinem Briefkasten",
    "RAV Regionales Arbeitsvermittlungszentrum",
    "Sonstiges",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Deine Bewerbung</CardTitle>
          </CardHeader>
          <CardContent>
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

            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Vorname</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Max"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nachname</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Mustermann"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="max.mustermann@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+49 123 456789"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Anrede</Label>
                  <RadioGroup
                    value={formData.salutation}
                    onValueChange={(value) => handleSelectChange("salutation", value)}
                  >
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Herr" id="herr" />
                        <Label htmlFor="herr">Herr</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Frau" id="frau" />
                        <Label htmlFor="frau">Frau</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Divers" id="divers" />
                        <Label htmlFor="divers">Divers</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Zivilstand</Label>
                  <Select
                    value={formData.civilStatus}
                    onValueChange={(value) => handleSelectChange("civilStatus", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Bitte wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ledig">Ledig</SelectItem>
                      <SelectItem value="verheiratet">Verheiratet</SelectItem>
                      <SelectItem value="verwitwet">Verwitwet</SelectItem>
                      <SelectItem value="geschieden">Geschieden</SelectItem>
                      <SelectItem value="getrennt">Getrennt</SelectItem>
                      <SelectItem value="eingetragene Partnerschaft">
                        Eingetragene Partnerschaft
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Geburtstag</Label>
                  <div className="flex space-x-2">
                    <Input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate ? format(formData.birthDate, 'yyyy-MM-dd') : ''}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !formData.birthDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.birthDate ? (
                            format(formData.birthDate, "P", { locale: de })
                          ) : (
                            <span>Datum auswählen</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.birthDate || undefined}
                          onSelect={handleDateSelect}
                          initialFocus
                          locale={de}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Nationalität</Label>
                  <Select
                    value={formData.nationality}
                    onValueChange={(value) => handleSelectChange("nationality", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Bitte wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.name}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Bevorzugte Sprache</Label>
                  <Select
                    value={formData.preferredLanguage}
                    onValueChange={(value) => handleSelectChange("preferredLanguage", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Bitte wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Deutsch">Deutsch</SelectItem>
                      <SelectItem value="Französisch">Französisch</SelectItem>
                      <SelectItem value="Italienisch">Italienisch</SelectItem>
                      <SelectItem value="Andere">Andere</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Deutschkenntnisse</Label>
                  <Select
                    value={formData.germanLevel}
                    onValueChange={(value) => handleSelectChange("germanLevel", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Bitte wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sehr gut (Muttersprache)">
                        Sehr gut (Muttersprache)
                      </SelectItem>
                      <SelectItem value="Gut">Gut</SelectItem>
                      <SelectItem value="Befriedigend">Befriedigend</SelectItem>
                      <SelectItem value="Ein wenig">Ein wenig</SelectItem>
                      <SelectItem value="Keine">Keine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Französischkenntnisse</Label>
                  <Select
                    value={formData.frenchLevel}
                    onValueChange={(value) => handleSelectChange("frenchLevel", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Bitte wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sehr gut (Muttersprache)">
                        Sehr gut (Muttersprache)
                      </SelectItem>
                      <SelectItem value="Gut">Gut</SelectItem>
                      <SelectItem value="Befriedigend">Befriedigend</SelectItem>
                      <SelectItem value="Ein wenig">Ein wenig</SelectItem>
                      <SelectItem value="Keine">Keine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Italienischkenntnisse</Label>
                  <Select
                    value={formData.italianLevel}
                    onValueChange={(value) => handleSelectChange("italianLevel", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Bitte wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sehr gut (Muttersprache)">
                        Sehr gut (Muttersprache)
                      </SelectItem>
                      <SelectItem value="Gut">Gut</SelectItem>
                      <SelectItem value="Befriedigend">Befriedigend</SelectItem>
                      <SelectItem value="Ein wenig">Ein wenig</SelectItem>
                      <SelectItem value="Keine">Keine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="street">Strasse</Label>
                    <Input
                      id="street"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="houseNumber">Hausnummer</Label>
                    <Input
                      id="houseNumber"
                      name="houseNumber"
                      value={formData.houseNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="addressAddition">Zusatz</Label>
                  <Input
                    id="addressAddition"
                    name="addressAddition"
                    value={formData.addressAddition}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">PLZ</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Ort</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Derzeitige Beschäftigung</Label>
                  <Select
                    value={formData.currentOccupation}
                    onValueChange={(value) => handleSelectChange("currentOccupation", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Bitte wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {occupationOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Gewünschtes Arbeitspensum</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Mindestens</Label>
                      <Select
                        value={formData.minWorkload}
                        onValueChange={(value) => handleSelectChange("minWorkload", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Bitte wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          {workloadOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Höchstens</Label>
                      <Select
                        value={formData.maxWorkload}
                        onValueChange={(value) => handleSelectChange("maxWorkload", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Bitte wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          {workloadOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Mögliche Arbeitstage</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {workdayOptions.map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox
                          id={day}
                          checked={formData.availableWorkdays.includes(day)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleCheckboxChange(day, "availableWorkdays");
                            }
                          }}
                        />
                        <Label htmlFor={day}>{day}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Ich verfüge über folgende Fahrzeuge</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {vehicleOptions.map((vehicle) => (
                      <div key={vehicle} className="flex items-center space-x-2">
                        <Checkbox
                          id={vehicle}
                          checked={formData.vehicles.includes(vehicle)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleCheckboxChange(vehicle, "vehicles");
                            }
                          }}
                        />
                        <Label htmlFor={vehicle}>{vehicle}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Ich verfüge bereits über Erfahrung als Zusteller:in</Label>
                  <RadioGroup
                    value={formData.hasDeliveryExperience ? "yes" : "no"}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        hasDeliveryExperience: value === "yes",
                      }))
                    }
                  >
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="yes" />
                        <Label htmlFor="yes">Ja</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no" />
                        <Label htmlFor="no">Nein</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Wie hast du vom Stellenangebot erfahren?</Label>
                  <Select
                    value={formData.jobSource}
                    onValueChange={(value) => handleSelectChange("jobSource", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Bitte wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobSourceOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

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
                className={cn(step === 1 ? "w-full" : "ml-auto")}
              >
                {step === 4 ? "Absenden" : "Weiter"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Apply;
