export type Mode = "online" | "in-person" | "hybrid";
export type Region = "UK" | "US" | "Japan" | "Malaysia" | "Korea" | "China";
export type OpportunityType = "volunteering" | "competition";

export interface Course {
  id: string;
  name: string;
  slug: string;
}

export interface Organisation {
  id: string;
  name: string;
  website?: string;
  town?: string;
  lat?: number;
  lng?: number;
  source?: "manual" | "do-it" | "reach" | "nhs" | "charityjob" | "council" | "university";
}

export interface Opportunity {
  id: string;
  organisation_id: string;
  organisation_name: string; // denormalised for convenience
  role: string;
  description: string;
  why_it_helps: string;
  skills: string[];
  courses: string[]; // course slugs this opportunity is relevant to
  mode: Mode;
  region: Region;
  weekly_commitment: string;
  min_age: number;
  town: string;
  lat?: number;
  lng?: number;
  apply_url: string;
  achievements: string[];
  reflection_prompts: string[];
  example_sentence: string;
  type: OpportunityType;
  is_active: boolean;
  last_checked: string; // ISO date string
  created_at?: string;
}

export interface SavedOpportunity {
  id: string;
  user_id: string;
  opportunity_id: string;
  status: "saved" | "in_progress" | "completed";
  notes?: string;
  saved_at: string;
  completed_at?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  target_course?: string;
  postcode_or_town?: string;
  created_at?: string;
}

export interface PersonalStatementScore {
  overall: number; // 0-100
  commitment: number;
  reflection: number;
  skill_range: number;
  course_relevance: number;
}
