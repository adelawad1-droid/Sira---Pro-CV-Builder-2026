
export type Language = 'ar' | 'en';

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

export interface CVData {
  personalInfo: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    image?: string;
  };
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  languages: { name: string; level: string }[];
}

export type TemplateType = 
  | 'modern' 
  | 'executive' 
  | 'creative' 
  | 'geometric' 
  | 'sidebar' 
  | 'professional'
  | 'minimalist'
  | 'technical'
  | 'bold'
  | 'compact'
  | 'luxury'
  | 'academic'
  | 'timeline'
  | 'infographic'
  | 'classic'
  | 'startup'
  | 'architectural'
  | 'retro'
  | 'glass'
  | 'neon'
  | 'journal'
  | 'engineering'
  | 'artistic'
  | 'official';
