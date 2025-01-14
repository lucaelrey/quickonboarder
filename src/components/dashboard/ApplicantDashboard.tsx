import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import type { Database } from "@/integrations/supabase/types";

type Application = Database['public']['Tables']['applications']['Row'];

interface ApplicantDashboardProps {
  application: Application;
}

export const ApplicantDashboard = ({ application }: ApplicantDashboardProps) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "dd.MM.yyyy", { locale: de });
    } catch {
      return dateString;
    }
  };

  const getStatusBadge = (status: Application['status']) => {
    const statusConfig = {
      eingereicht: { variant: 'default' as const, icon: FileText, label: 'Eingereicht' },
      wird_geprueft: { variant: 'secondary' as const, icon: AlertCircle, label: 'Wird geprüft' },
      angenommen: { variant: 'default' as const, icon: CheckCircle, label: 'Angenommen' },
      abgelehnt: { variant: 'destructive' as const, icon: XCircle, label: 'Abgelehnt' }
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Meine Bewerbung</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                {getStatusBadge(application.status)}
              </div>
              <div>
                <p className="text-sm text-gray-500">Eingereicht am</p>
                <p>{formatDate(application.created_at)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};