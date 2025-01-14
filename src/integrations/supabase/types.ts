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
          user_id: string
          status: string
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          phone: string
          user_id: string
          status?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string
          user_id?: string
          status?: string
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
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}