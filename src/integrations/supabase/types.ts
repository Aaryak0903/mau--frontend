export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          badge_color: string | null
          category: string
          created_at: string | null
          description: string
          icon: string | null
          id: string
          name: string
          requirement_type: string
          requirement_value: number
          xp_reward: number | null
        }
        Insert: {
          badge_color?: string | null
          category: string
          created_at?: string | null
          description: string
          icon?: string | null
          id?: string
          name: string
          requirement_type: string
          requirement_value: number
          xp_reward?: number | null
        }
        Update: {
          badge_color?: string | null
          category?: string
          created_at?: string | null
          description?: string
          icon?: string | null
          id?: string
          name?: string
          requirement_type?: string
          requirement_value?: number
          xp_reward?: number | null
        }
        Relationships: []
      }
      activities: {
        Row: {
          activity_type: string
          created_at: string | null
          description: string | null
          id: string
          metadata: Json | null
          title: string
          user_id: string | null
        }
        Insert: {
          activity_type: string
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          title: string
          user_id?: string | null
        }
        Update: {
          activity_type?: string
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_interview_attempts: {
        Row: {
          candidate_email: string
          candidate_name: string | null
          created_at: string | null
          end_time: string | null
          feedback: Json | null
          id: string
          interview_id: string
          start_time: string | null
          status: string | null
        }
        Insert: {
          candidate_email: string
          candidate_name?: string | null
          created_at?: string | null
          end_time?: string | null
          feedback?: Json | null
          id?: string
          interview_id: string
          start_time?: string | null
          status?: string | null
        }
        Update: {
          candidate_email?: string
          candidate_name?: string | null
          created_at?: string | null
          end_time?: string | null
          feedback?: Json | null
          id?: string
          interview_id?: string
          start_time?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_interview_attempts_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: false
            referencedRelation: "ai_interviews"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_interview_responses: {
        Row: {
          attempt_id: string
          created_at: string | null
          id: string
          question_index: number
          question_text: string
          response_text: string | null
        }
        Insert: {
          attempt_id: string
          created_at?: string | null
          id?: string
          question_index: number
          question_text: string
          response_text?: string | null
        }
        Update: {
          attempt_id?: string
          created_at?: string | null
          id?: string
          question_index?: number
          question_text?: string
          response_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_interview_responses_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "ai_interview_attempts"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_interviews: {
        Row: {
          company_id: string | null
          created_at: string | null
          created_by: string | null
          id: string
          job_description: string
          question_count: number
          questions: Json | null
          share_link_id: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          job_description: string
          question_count: number
          questions?: Json | null
          share_link_id: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          job_description?: string
          question_count?: number
          questions?: Json | null
          share_link_id?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_interviews_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          candidate_id: string | null
          cover_letter: string | null
          created_at: string | null
          id: string
          job_id: string | null
          resume_url: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          candidate_id?: string | null
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          job_id?: string | null
          resume_url?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          candidate_id?: string | null
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          job_id?: string | null
          resume_url?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      aptitude_questions: {
        Row: {
          company_tagged: boolean | null
          created_at: string | null
          description: string | null
          difficulty: string | null
          id: string
          title: string
        }
        Insert: {
          company_tagged?: boolean | null
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          id?: string
          title: string
        }
        Update: {
          company_tagged?: boolean | null
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      arrests: {
        Row: {
          arrest_date: string | null
          arrest_id: number
          arresting_officer_id: number | null
          bail_amount: number | null
          charges: string | null
          court_date: string | null
          location: string | null
          status: string | null
          suspect_id: number | null
        }
        Insert: {
          arrest_date?: string | null
          arrest_id?: number
          arresting_officer_id?: number | null
          bail_amount?: number | null
          charges?: string | null
          court_date?: string | null
          location?: string | null
          status?: string | null
          suspect_id?: number | null
        }
        Update: {
          arrest_date?: string | null
          arrest_id?: number
          arresting_officer_id?: number | null
          bail_amount?: number | null
          charges?: string | null
          court_date?: string | null
          location?: string | null
          status?: string | null
          suspect_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "arrests_arresting_officer_id_fkey"
            columns: ["arresting_officer_id"]
            isOneToOne: false
            referencedRelation: "officers"
            referencedColumns: ["officer_id"]
          },
          {
            foreignKeyName: "arrests_suspect_id_fkey"
            columns: ["suspect_id"]
            isOneToOne: false
            referencedRelation: "suspects"
            referencedColumns: ["suspect_id"]
          },
        ]
      }
      assessment_attempts: {
        Row: {
          answers: Json | null
          assessment_id: string | null
          candidate_id: string | null
          created_at: string | null
          end_time: string | null
          id: string
          score: number | null
          start_time: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          answers?: Json | null
          assessment_id?: string | null
          candidate_id?: string | null
          created_at?: string | null
          end_time?: string | null
          id?: string
          score?: number | null
          start_time?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          answers?: Json | null
          assessment_id?: string | null
          candidate_id?: string | null
          created_at?: string | null
          end_time?: string | null
          id?: string
          score?: number | null
          start_time?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_attempts_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_attempts_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      assessments: {
        Row: {
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          duration_minutes: number | null
          id: string
          passing_score: number | null
          skill_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          duration_minutes?: number | null
          id?: string
          passing_score?: number | null
          skill_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          duration_minutes?: number | null
          id?: string
          passing_score?: number | null
          skill_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assessments_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      c_quest_questions: {
        Row: {
          created_at: string
          id: string
          order_index: number | null
          quest_id: string | null
          question_id: string | null
          question_table: string
        }
        Insert: {
          created_at?: string
          id?: string
          order_index?: number | null
          quest_id?: string | null
          question_id?: string | null
          question_table: string
        }
        Update: {
          created_at?: string
          id?: string
          order_index?: number | null
          quest_id?: string | null
          question_id?: string | null
          question_table?: string
        }
        Relationships: []
      }
      candidate_skills: {
        Row: {
          candidate_id: string
          created_at: string | null
          proficiency_level: number | null
          skill_id: string
          years_of_experience: number | null
        }
        Insert: {
          candidate_id: string
          created_at?: string | null
          proficiency_level?: number | null
          skill_id: string
          years_of_experience?: number | null
        }
        Update: {
          candidate_id?: string
          created_at?: string | null
          proficiency_level?: number | null
          skill_id?: string
          years_of_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_skills_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      company_questions: {
        Row: {
          correct_answer: string | null
          created_by: string | null
          id: string
          options: Json | null
          time_limit: number | null
          title: string
          topics: string | null
          type: string | null
        }
        Insert: {
          correct_answer?: string | null
          created_by?: string | null
          id?: string
          options?: Json | null
          time_limit?: number | null
          title: string
          topics?: string | null
          type?: string | null
        }
        Update: {
          correct_answer?: string | null
          created_by?: string | null
          id?: string
          options?: Json | null
          time_limit?: number | null
          title?: string
          topics?: string | null
          type?: string | null
        }
        Relationships: []
      }
      company_quests: {
        Row: {
          categories: string | null
          company_id: string | null
          created_at: string
          description: string | null
          duration_minutes: number | null
          id: string
          is_published: boolean | null
          section_counts: Json | null
          title: string | null
        }
        Insert: {
          categories?: string | null
          company_id?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_published?: boolean | null
          section_counts?: Json | null
          title?: string | null
        }
        Update: {
          categories?: string | null
          company_id?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_published?: boolean | null
          section_counts?: Json | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_company"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          commander_id: number | null
          department_id: number
          department_name: string
          location: string | null
          phone: string | null
        }
        Insert: {
          commander_id?: number | null
          department_id?: number
          department_name: string
          location?: string | null
          phone?: string | null
        }
        Update: {
          commander_id?: number | null
          department_id?: number
          department_name?: string
          location?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      dsa_categories: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      dsa_questions: {
        Row: {
          acceptance_rate: number | null
          accepted_submissions: number | null
          author_company: string | null
          category_id: number | null
          constraints: Json | null
          created_at: string | null
          description: string
          difficulty: string
          examples: Json | null
          hints: Json | null
          id: number
          is_public: boolean | null
          solution_template: Json | null
          tags: string[] | null
          test_cases: Json | null
          title: string
          total_submissions: number | null
          updated_at: string | null
        }
        Insert: {
          acceptance_rate?: number | null
          accepted_submissions?: number | null
          author_company?: string | null
          category_id?: number | null
          constraints?: Json | null
          created_at?: string | null
          description: string
          difficulty: string
          examples?: Json | null
          hints?: Json | null
          id?: number
          is_public?: boolean | null
          solution_template?: Json | null
          tags?: string[] | null
          test_cases?: Json | null
          title: string
          total_submissions?: number | null
          updated_at?: string | null
        }
        Update: {
          acceptance_rate?: number | null
          accepted_submissions?: number | null
          author_company?: string | null
          category_id?: number | null
          constraints?: Json | null
          created_at?: string | null
          description?: string
          difficulty?: string
          examples?: Json | null
          hints?: Json | null
          id?: number
          is_public?: boolean | null
          solution_template?: Json | null
          tags?: string[] | null
          test_cases?: Json | null
          title?: string
          total_submissions?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dsa_questions_author_company_fkey"
            columns: ["author_company"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dsa_questions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "dsa_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      dsa_submissions: {
        Row: {
          code: string
          execution_time: number | null
          id: number
          judge0_token: string | null
          language_id: number | null
          memory_usage: number | null
          question_id: number | null
          score: number | null
          status: string | null
          submitted_at: string | null
          test_results: Json | null
          user_id: string | null
        }
        Insert: {
          code: string
          execution_time?: number | null
          id?: number
          judge0_token?: string | null
          language_id?: number | null
          memory_usage?: number | null
          question_id?: number | null
          score?: number | null
          status?: string | null
          submitted_at?: string | null
          test_results?: Json | null
          user_id?: string | null
        }
        Update: {
          code?: string
          execution_time?: number | null
          id?: number
          judge0_token?: string | null
          language_id?: number | null
          memory_usage?: number | null
          question_id?: number | null
          score?: number | null
          status?: string | null
          submitted_at?: string | null
          test_results?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dsa_submissions_language_id_fkey"
            columns: ["language_id"]
            isOneToOne: false
            referencedRelation: "programming_languages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dsa_submissions_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "dsa_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      dsa_user_progress: {
        Row: {
          attempts: number | null
          attempts_count: number | null
          best_score: number | null
          best_submission_id: number | null
          first_solved_at: string | null
          id: number
          last_attempt: string | null
          last_attempt_at: string | null
          question_id: number | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          attempts?: number | null
          attempts_count?: number | null
          best_score?: number | null
          best_submission_id?: number | null
          first_solved_at?: string | null
          id?: number
          last_attempt?: string | null
          last_attempt_at?: string | null
          question_id?: number | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          attempts?: number | null
          attempts_count?: number | null
          best_score?: number | null
          best_submission_id?: number | null
          first_solved_at?: string | null
          id?: number
          last_attempt?: string | null
          last_attempt_at?: string | null
          question_id?: number | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dsa_user_progress_best_submission_id_fkey"
            columns: ["best_submission_id"]
            isOneToOne: false
            referencedRelation: "dsa_submissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dsa_user_progress_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "dsa_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      evidence: {
        Row: {
          chain_of_custody: string | null
          collected_by: number | null
          collection_date: string | null
          description: string | null
          evidence_id: number
          evidence_type: string
          incident_id: number | null
          location_found: string | null
          status: string | null
        }
        Insert: {
          chain_of_custody?: string | null
          collected_by?: number | null
          collection_date?: string | null
          description?: string | null
          evidence_id?: number
          evidence_type: string
          incident_id?: number | null
          location_found?: string | null
          status?: string | null
        }
        Update: {
          chain_of_custody?: string | null
          collected_by?: number | null
          collection_date?: string | null
          description?: string | null
          evidence_id?: number
          evidence_type?: string
          incident_id?: number | null
          location_found?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "evidence_collected_by_fkey"
            columns: ["collected_by"]
            isOneToOne: false
            referencedRelation: "officers"
            referencedColumns: ["officer_id"]
          },
          {
            foreignKeyName: "evidence_incident_id_fkey"
            columns: ["incident_id"]
            isOneToOne: false
            referencedRelation: "incidents"
            referencedColumns: ["incident_id"]
          },
        ]
      }
      follows: {
        Row: {
          created_at: string | null
          follower_id: string | null
          following_id: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          follower_id?: string | null
          following_id?: string | null
          id?: string
        }
        Update: {
          created_at?: string | null
          follower_id?: string | null
          following_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "follows_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      incidents: {
        Row: {
          description: string | null
          incident_date: string | null
          incident_id: number
          incident_number: string
          incident_type: string
          location: string | null
          priority_level: string | null
          reported_date: string | null
          reporting_officer_id: number | null
          status: string | null
        }
        Insert: {
          description?: string | null
          incident_date?: string | null
          incident_id?: number
          incident_number: string
          incident_type: string
          location?: string | null
          priority_level?: string | null
          reported_date?: string | null
          reporting_officer_id?: number | null
          status?: string | null
        }
        Update: {
          description?: string | null
          incident_date?: string | null
          incident_id?: number
          incident_number?: string
          incident_type?: string
          location?: string | null
          priority_level?: string | null
          reported_date?: string | null
          reporting_officer_id?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "incidents_reporting_officer_id_fkey"
            columns: ["reporting_officer_id"]
            isOneToOne: false
            referencedRelation: "officers"
            referencedColumns: ["officer_id"]
          },
        ]
      }
      interviews: {
        Row: {
          company: string
          created_at: string | null
          date: string
          id: string
          title: string
          type: string | null
        }
        Insert: {
          company: string
          created_at?: string | null
          date: string
          id?: string
          title: string
          type?: string | null
        }
        Update: {
          company?: string
          created_at?: string | null
          date?: string
          id?: string
          title?: string
          type?: string | null
        }
        Relationships: []
      }
      job_skills: {
        Row: {
          created_at: string | null
          is_required: boolean | null
          job_id: string
          required_proficiency_level: number | null
          skill_id: string
        }
        Insert: {
          created_at?: string | null
          is_required?: boolean | null
          job_id: string
          required_proficiency_level?: number | null
          skill_id: string
        }
        Update: {
          created_at?: string | null
          is_required?: boolean | null
          job_id?: string
          required_proficiency_level?: number | null
          skill_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_skills_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          company_id: string | null
          created_at: string | null
          description: string
          experience_level: string | null
          id: string
          job_type: string | null
          location: string | null
          requirements: string[] | null
          salary_range_max: number | null
          salary_range_min: number | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          description: string
          experience_level?: string | null
          id?: string
          job_type?: string | null
          location?: string | null
          requirements?: string[] | null
          salary_range_max?: number | null
          salary_range_min?: number | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          description?: string
          experience_level?: string | null
          id?: string
          job_type?: string | null
          location?: string | null
          requirements?: string[] | null
          salary_range_max?: number | null
          salary_range_min?: number | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      officers: {
        Row: {
          badge_number: string
          department_id: number | null
          email: string | null
          first_name: string
          hire_date: string | null
          last_name: string
          officer_id: number
          phone: string | null
          rank: string
          status: string | null
        }
        Insert: {
          badge_number: string
          department_id?: number | null
          email?: string | null
          first_name: string
          hire_date?: string | null
          last_name: string
          officer_id?: number
          phone?: string | null
          rank: string
          status?: string | null
        }
        Update: {
          badge_number?: string
          department_id?: number | null
          email?: string | null
          first_name?: string
          hire_date?: string | null
          last_name?: string
          officer_id?: number
          phone?: string | null
          rank?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "officers_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["department_id"]
          },
        ]
      }
      post_comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          post_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          post_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          post_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string | null
          id: string
          post_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          comments_count: number | null
          content: string
          created_at: string | null
          id: string
          is_public: boolean | null
          likes_count: number | null
          metadata: Json | null
          post_type: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          comments_count?: number | null
          content: string
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          likes_count?: number | null
          metadata?: Json | null
          post_type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          comments_count?: number | null
          content?: string
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          likes_count?: number | null
          metadata?: Json | null
          post_type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          banner_url: string | null
          bio: string | null
          company_name: string | null
          created_at: string | null
          discord_url: string | null
          email: string
          first_name: string | null
          github_url: string | null
          id: string
          instagram_url: string | null
          job_title: string | null
          last_name: string | null
          level: number | null
          linkedin_url: string | null
          location: string | null
          onboarding_complete: boolean | null
          portfolio_url: string | null
          resume_url: string | null
          twitter_url: string | null
          updated_at: string | null
          user_type: string
          username: string | null
          website_url: string | null
          xp: number | null
          youtube_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          company_name?: string | null
          created_at?: string | null
          discord_url?: string | null
          email: string
          first_name?: string | null
          github_url?: string | null
          id: string
          instagram_url?: string | null
          job_title?: string | null
          last_name?: string | null
          level?: number | null
          linkedin_url?: string | null
          location?: string | null
          onboarding_complete?: boolean | null
          portfolio_url?: string | null
          resume_url?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          user_type: string
          username?: string | null
          website_url?: string | null
          xp?: number | null
          youtube_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          company_name?: string | null
          created_at?: string | null
          discord_url?: string | null
          email?: string
          first_name?: string | null
          github_url?: string | null
          id?: string
          instagram_url?: string | null
          job_title?: string | null
          last_name?: string | null
          level?: number | null
          linkedin_url?: string | null
          location?: string | null
          onboarding_complete?: boolean | null
          portfolio_url?: string | null
          resume_url?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          user_type?: string
          username?: string | null
          website_url?: string | null
          xp?: number | null
          youtube_url?: string | null
        }
        Relationships: []
      }
      programming_languages: {
        Row: {
          code_template: string | null
          created_at: string | null
          id: number
          judge0_id: number
          name: string
          version: string | null
        }
        Insert: {
          code_template?: string | null
          created_at?: string | null
          id?: number
          judge0_id: number
          name: string
          version?: string | null
        }
        Update: {
          code_template?: string | null
          created_at?: string | null
          id?: number
          judge0_id?: number
          name?: string
          version?: string | null
        }
        Relationships: []
      }
      questions: {
        Row: {
          created_at: string | null
          difficulty: string | null
          id: string
          leetcode_url: string
          title: string
        }
        Insert: {
          created_at?: string | null
          difficulty?: string | null
          id?: string
          leetcode_url: string
          title: string
        }
        Update: {
          created_at?: string | null
          difficulty?: string | null
          id?: string
          leetcode_url?: string
          title?: string
        }
        Relationships: []
      }
      quests: {
        Row: {
          category: string
          created_at: string | null
          description: string
          difficulty: string | null
          id: string
          is_active: boolean | null
          requirements: Json | null
          title: string
          updated_at: string | null
          xp_reward: number | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          difficulty?: string | null
          id?: string
          is_active?: boolean | null
          requirements?: Json | null
          title: string
          updated_at?: string | null
          xp_reward?: number | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          difficulty?: string | null
          id?: string
          is_active?: boolean | null
          requirements?: Json | null
          title?: string
          updated_at?: string | null
          xp_reward?: number | null
        }
        Relationships: []
      }
      resumes: {
        Row: {
          ats_score: number | null
          content: Json
          created_at: string | null
          file_url: string | null
          id: string
          is_primary: boolean | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ats_score?: number | null
          content: Json
          created_at?: string | null
          file_url?: string | null
          id?: string
          is_primary?: boolean | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ats_score?: number | null
          content?: Json
          created_at?: string | null
          file_url?: string | null
          id?: string
          is_primary?: boolean | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      sql_questions: {
        Row: {
          company_tagged: boolean | null
          created_at: string | null
          description: string | null
          difficulty: string | null
          expected_output: string | null
          id: string
          title: string
        }
        Insert: {
          company_tagged?: boolean | null
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          expected_output?: string | null
          id?: string
          title: string
        }
        Update: {
          company_tagged?: boolean | null
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          expected_output?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      suspects: {
        Row: {
          address: string | null
          alias: string | null
          date_of_birth: string | null
          eye_color: string | null
          first_name: string
          gender: string | null
          hair_color: string | null
          height: string | null
          known_associates: string | null
          last_name: string
          phone: string | null
          suspect_id: number
          weight: string | null
        }
        Insert: {
          address?: string | null
          alias?: string | null
          date_of_birth?: string | null
          eye_color?: string | null
          first_name: string
          gender?: string | null
          hair_color?: string | null
          height?: string | null
          known_associates?: string | null
          last_name: string
          phone?: string | null
          suspect_id?: number
          weight?: string | null
        }
        Update: {
          address?: string | null
          alias?: string | null
          date_of_birth?: string | null
          eye_color?: string | null
          first_name?: string
          gender?: string | null
          hair_color?: string | null
          height?: string | null
          known_associates?: string | null
          last_name?: string
          phone?: string | null
          suspect_id?: number
          weight?: string | null
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string | null
          earned_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          achievement_id?: string | null
          earned_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          achievement_id?: string | null
          earned_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_companies: {
        Row: {
          company_id: string
          created_at: string | null
          id: string
          role: string
          user_id: string
        }
        Insert: {
          company_id: string
          created_at?: string | null
          id?: string
          role: string
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      user_details: {
        Row: {
          about_me: string | null
          created_at: string | null
          current_ctc: number | null
          current_location: string | null
          date_of_birth: string | null
          expected_ctc: number | null
          gender: string | null
          id: string
          interests: string[] | null
          notice_period: number | null
          phone_number: string | null
          preferred_work_location: string[] | null
          profile_photo_url: string | null
          total_experience: number | null
          updated_at: string | null
          work_type: string[] | null
        }
        Insert: {
          about_me?: string | null
          created_at?: string | null
          current_ctc?: number | null
          current_location?: string | null
          date_of_birth?: string | null
          expected_ctc?: number | null
          gender?: string | null
          id: string
          interests?: string[] | null
          notice_period?: number | null
          phone_number?: string | null
          preferred_work_location?: string[] | null
          profile_photo_url?: string | null
          total_experience?: number | null
          updated_at?: string | null
          work_type?: string[] | null
        }
        Update: {
          about_me?: string | null
          created_at?: string | null
          current_ctc?: number | null
          current_location?: string | null
          date_of_birth?: string | null
          expected_ctc?: number | null
          gender?: string | null
          id?: string
          interests?: string[] | null
          notice_period?: number | null
          phone_number?: string | null
          preferred_work_location?: string[] | null
          profile_photo_url?: string | null
          total_experience?: number | null
          updated_at?: string | null
          work_type?: string[] | null
        }
        Relationships: []
      }
      user_interviews: {
        Row: {
          created_at: string | null
          id: string
          interview_id: string | null
          score: number | null
          status: string | null
          transcript: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          interview_id?: string | null
          score?: number | null
          status?: string | null
          transcript?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          interview_id?: string | null
          score?: number | null
          status?: string | null
          transcript?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_interviews_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: false
            referencedRelation: "interviews"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company: string | null
          created_at: string | null
          experience_level: string | null
          github_url: string | null
          id: string
          job_title: string | null
          linkedin_url: string | null
          location: string | null
          portfolio_url: string | null
          skills: string[] | null
          twitter_url: string | null
          updated_at: string | null
          user_id: string
          username: string
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string | null
          experience_level?: string | null
          github_url?: string | null
          id?: string
          job_title?: string | null
          linkedin_url?: string | null
          location?: string | null
          portfolio_url?: string | null
          skills?: string[] | null
          twitter_url?: string | null
          updated_at?: string | null
          user_id: string
          username: string
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string | null
          experience_level?: string | null
          github_url?: string | null
          id?: string
          job_title?: string | null
          linkedin_url?: string | null
          location?: string | null
          portfolio_url?: string | null
          skills?: string[] | null
          twitter_url?: string | null
          updated_at?: string | null
          user_id?: string
          username?: string
          website?: string | null
        }
        Relationships: []
      }
      user_quest_progress: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          progress: Json | null
          quest_id: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          progress?: Json | null
          quest_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          progress?: Json | null
          quest_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_quest_progress_quest_id_fkey"
            columns: ["quest_id"]
            isOneToOne: false
            referencedRelation: "quests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_quest_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vault_entries: {
        Row: {
          created_at: string
          enc_ciphertext: string
          enc_iv: string
          enc_tag: string
          id: string
          label: string
          user_id: string
          username: string
        }
        Insert: {
          created_at?: string
          enc_ciphertext: string
          enc_iv: string
          enc_tag: string
          id?: string
          label: string
          user_id: string
          username: string
        }
        Update: {
          created_at?: string
          enc_ciphertext?: string
          enc_iv?: string
          enc_tag?: string
          id?: string
          label?: string
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      vault_items: {
        Row: {
          cipher: Json
          created_at: string
          id: string
          origin: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cipher: Json
          created_at?: string
          id: string
          origin: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Update: {
          cipher?: Json
          created_at?: string
          id?: string
          origin?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      vault_mfa_codes: {
        Row: {
          code: string
          created_at: string
          entry_id: string
          expires_at: string
          id: string
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string
          entry_id: string
          expires_at: string
          id?: string
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string
          entry_id?: string
          expires_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vault_mfa_codes_entry_id_fkey"
            columns: ["entry_id"]
            isOneToOne: false
            referencedRelation: "vault_entries"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      execute_detective_query: {
        Args: { query_text: string }
        Returns: Json
      }
      get_ai_interviews_for_user: {
        Args: { company_id: string; user_id: string } | { user_id: string }
        Returns: {
          company_id: string | null
          created_at: string | null
          created_by: string | null
          id: string
          job_description: string
          question_count: number
          questions: Json | null
          share_link_id: string
          status: string | null
          title: string
          updated_at: string | null
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
