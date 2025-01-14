import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import { format } from "date-fns";
import { de } from "date-fns/locale";

type Application = Database['public']['Tables']['applications']['Row'];

interface ApplicantDashboardProps {
  application: Application | null;
  loading: boolean;
}

export const ApplicantDashboard = ({ application, loading }: ApplicantDashboardProps) => {
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

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ihre Bewerbung</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!application) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Keine Bewerbung gefunden</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Sie haben noch keine Bewerbung eingereicht.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ihre Bewerbung</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Status</p>
            {getStatusBadge(application.status)}
          </div>
          <div>
            <p className="text-sm text-gray-500">Eingereicht am</p>
            <p>{formatDate(application.created_at)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p>{application.first_name} {application.last_name}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};