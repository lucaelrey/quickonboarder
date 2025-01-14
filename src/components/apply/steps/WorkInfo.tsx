import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface WorkInfoProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export const WorkInfo = ({ formData, updateFormData }: WorkInfoProps) => {
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

  const handleCheckboxChange = (value: string, field: "availableWorkdays" | "vehicles") => {
    updateFormData({
      [field]: formData[field].includes(value)
        ? formData[field].filter((item: string) => item !== value)
        : [...formData[field], value],
    });
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <Label>Derzeitige Beschäftigung</Label>
          <Select
            value={formData.currentOccupation}
            onValueChange={(value) => updateFormData({ currentOccupation: value })}
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
                onValueChange={(value) => updateFormData({ minWorkload: value })}
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
                onValueChange={(value) => updateFormData({ maxWorkload: value })}
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
              updateFormData({ hasDeliveryExperience: value === "yes" })
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
            onValueChange={(value) => updateFormData({ jobSource: value })}
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
      </CardContent>
    </Card>
  );
};