import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface AddressInfoProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export const AddressInfo = ({ formData, updateFormData }: AddressInfoProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
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
      </CardContent>
    </Card>
  );
};