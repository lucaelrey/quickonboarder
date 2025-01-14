import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import type { Database } from "@/integrations/supabase/types";
import { ApplicationDetails } from "./ApplicationDetails";
import { useState } from "react";

type Application = Database['public']['Tables']['applications']['Row'];

interface ApplicantDashboardProps {
  application: Application;
}

export const ApplicantDashboard = ({ application }: ApplicantDashboardProps) => {
  const [showDetails, setShowDetails] = useState(false);

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
      wird_geprueft: { variant: 'secondary' as const, icon: FileText, label: 'Wird geprüft' },
      angenommen: { variant: 'default' as const, icon: FileText, label: 'Angenommen' },
      abgelehnt: { variant: 'destructive' as const, icon: FileText, label: 'Abgelehnt' }
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

  if (showDetails) {
    return <ApplicationDetails application={application} onBack={() => setShowDetails(false)} />;
  }

  return (
    <Card className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setShowDetails(true)}>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h3 className="font-semibold">{application.first_name} {application.last_name}</h3>
            <p className="text-sm text-gray-500">{application.email}</p>
            <p className="text-sm text-gray-500">Eingereicht am: {formatDate(application.created_at)}</p>
            {getStatusBadge(application.status)}
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  );
};