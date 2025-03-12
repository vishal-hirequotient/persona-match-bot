
export interface Message {
  id: string;
  content: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  isTyping?: boolean;
}

export interface Skill {
  name: string;
}

export interface Company {
  name: string;
}

export interface Experience {
  company: string;
  title: string;
  duration: string;
  startDate: string;
  endDate: string;
}

export interface Candidate {
  id: string;
  name: string;
  avatar?: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  experience: number; // in years
  location: string;
  skills: Skill[];
  pastCompanies: Company[];
  experienceDetails: Experience[];
  about: string;
  visaStatus?: string;
}

export interface ProjectDetails {
  name: string;
  role: string;
  locations: string[];
  requiredSkills: string[];
  minExperience: number;
  preferredCompanies?: string[];
  additionalRequirements?: string[];
}

export type Status = 'initial' | 'asking-location' | 'asking-role' | 'asking-experience' | 'asking-skills' | 'candidate-review' | 'sourcing' | 'complete';
