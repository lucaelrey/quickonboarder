export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          address_addition: string | null
          available_workdays: string[] | null
          birth_date: string | null
          city: string | null
          civil_status: Database["public"]["Enums"]["civil_status"] | null
          created_at: string | null
          current_occupation: string | null
          email: string
          first_name: string
          french_level: Database["public"]["Enums"]["language_level"] | null
          german_level: Database["public"]["Enums"]["language_level"] | null
          has_delivery_experience: boolean | null
          house_number: string | null
          id: string
          italian_level: Database["public"]["Enums"]["language_level"] | null
          job_source: string | null
          last_name: string
          max_workload: string | null
          min_workload: string | null
          nationality: string | null
          phone: string
          postal_code: string | null
          preferred_language:
            | Database["public"]["Enums"]["preferred_language"]
            | null
          profile_id: string | null
          salutation: string | null
          status: Database["public"]["Enums"]["application_status"]
          street: string | null
          user_id: string | null
          vehicles: string[] | null
        }
        Insert: {
          address_addition?: string | null
          available_workdays?: string[] | null
          birth_date?: string | null
          city?: string | null
          civil_status?: Database["public"]["Enums"]["civil_status"] | null
          created_at?: string | null
          current_occupation?: string | null
          email: string
          first_name: string
          french_level?: Database["public"]["Enums"]["language_level"] | null
          german_level?: Database["public"]["Enums"]["language_level"] | null
          has_delivery_experience?: boolean | null
          house_number?: string | null
          id?: string
          italian_level?: Database["public"]["Enums"]["language_level"] | null
          job_source?: string | null
          last_name: string
          max_workload?: string | null
          min_workload?: string | null
          nationality?: string | null
          phone: string
          postal_code?: string | null
          preferred_language?:
            | Database["public"]["Enums"]["preferred_language"]
            | null
          profile_id?: string | null
          salutation?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          street?: string | null
          user_id?: string | null
          vehicles?: string[] | null
        }
        Update: {
          address_addition?: string | null
          available_workdays?: string[] | null
          birth_date?: string | null
          city?: string | null
          civil_status?: Database["public"]["Enums"]["civil_status"] | null
          created_at?: string | null
          current_occupation?: string | null
          email?: string
          first_name?: string
          french_level?: Database["public"]["Enums"]["language_level"] | null
          german_level?: Database["public"]["Enums"]["language_level"] | null
          has_delivery_experience?: boolean | null
          house_number?: string | null
          id?: string
          italian_level?: Database["public"]["Enums"]["language_level"] | null
          job_source?: string | null
          last_name?: string
          max_workload?: string | null
          min_workload?: string | null
          nationality?: string | null
          phone?: string
          postal_code?: string | null
          preferred_language?:
            | Database["public"]["Enums"]["preferred_language"]
            | null
          profile_id?: string | null
          salutation?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          street?: string | null
          user_id?: string | null
          vehicles?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string
          role: Database["public"]["Enums"]["user_role"]
          status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          phone: string
          role?: Database["public"]["Enums"]["user_role"]
          status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string
          role?: Database["public"]["Enums"]["user_role"]
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      application_status:
        | "eingereicht"
        | "wird_geprueft"
        | "angenommen"
        | "abgelehnt"
      civil_status:
        | "ledig"
        | "verheiratet"
        | "verwitwet"
        | "geschieden"
        | "getrennt"
        | "eingetragene Partnerschaft"
      language_level:
        | "Sehr gut (Muttersprache)"
        | "Gut"
        | "Befriedigend"
        | "Ein wenig"
        | "Keine"
      preferred_language: "Deutsch" | "Französisch" | "Italienisch" | "Andere"
      user_role: "bewerber" | "newcomer" | "mitarbeiter" | "gekuendigt"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
