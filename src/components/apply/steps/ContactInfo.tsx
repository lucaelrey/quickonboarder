import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface ContactInfoProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export const ContactInfo = ({ formData, updateFormData }: ContactInfoProps) => {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <Label>Bevorzugte Sprache</Label>
          <Select
            value={formData.preferredLanguage}
            onValueChange={(value) => updateFormData({ preferredLanguage: value })}
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
            onValueChange={(value) => updateFormData({ germanLevel: value })}
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
            onValueChange={(value) => updateFormData({ frenchLevel: value })}
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
            onValueChange={(value) => updateFormData({ italianLevel: value })}
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
      </CardContent>
    </Card>
  );
};