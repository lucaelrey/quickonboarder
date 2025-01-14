import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { format, parse, isValid } from "date-fns";
import { de } from "date-fns/locale";
import { cn } from "@/lib/utils";
import countries from "@/data/countries.json";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface PersonalInfoProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export const PersonalInfo = ({ formData, updateFormData }: PersonalInfoProps) => {
  const [dateInput, setDateInput] = useState(
    formData.birthDate ? format(formData.birthDate, "dd.MM.yyyy") : ""
  );

  const handleDateInputChange = (value: string) => {
    setDateInput(value);
    
    // Try to parse the manually entered date
    if (value.length === 10) { // Only try to parse if the input is complete (DD.MM.YYYY)
      const parsedDate = parse(value, "dd.MM.yyyy", new Date());
      if (isValid(parsedDate)) {
        updateFormData({ birthDate: parsedDate });
      }
    }
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <Label>Anrede</Label>
          <Select
            value={formData.salutation}
            onValueChange={(value) => updateFormData({ salutation: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Bitte wählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Herr">Herr</SelectItem>
              <SelectItem value="Frau">Frau</SelectItem>
              <SelectItem value="Divers">Divers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Telefon</Label>
          <Input
            type="tel"
            value={formData.phone || ""}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            placeholder="+41 XX XXX XX XX"
          />
        </div>

        <div className="space-y-2">
          <Label>Zivilstand</Label>
          <Select
            value={formData.civilStatus}
            onValueChange={(value) => updateFormData({ civilStatus: value })}
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
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="TT.MM.JJJJ"
              value={dateInput}
              onChange={(e) => handleDateInputChange(e.target.value)}
              className="w-full"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[280px]",
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
                  selected={formData.birthDate}
                  onSelect={(date) => {
                    updateFormData({ birthDate: date });
                    if (date) {
                      setDateInput(format(date, "dd.MM.yyyy"));
                    }
                  }}
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
            onValueChange={(value) => updateFormData({ nationality: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Bitte wählen" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => {
                if (country.code === "separator") {
                  return <Separator className="my-2" />;
                }
                return (
                  <SelectItem key={country.code} value={country.name}>
                    {country.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};