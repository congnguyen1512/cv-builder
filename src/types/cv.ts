export type SectionId =
  | 'summary'
  | 'experience'
  | 'education'
  | 'projects'
  | 'skills'
  | 'certifications'
  | 'activities'
  | 'references'
  | 'custom';

export type TemplateId =
  | 'ats-standard'
  | 'modern-professional'
  | 'executive-minimal'
  | 'creative-designer'
  | 'tech-compact';

export type AvatarShape = 'circle' | 'square' | 'rounded' | 'hidden';
export type SkillDisplayStyle = 'pills' | 'comma' | 'bars' | 'dots';
export type LanguageCode = 'vi' | 'en';
export type DateFormatType = 'MM/YYYY' | 'MMM YYYY' | 'YYYY';
export type FontFamilyType = 'Inter' | 'Roboto' | 'Merriweather' | 'Lora' | 'Plus Jakarta Sans';

export interface SocialLinks {
  linkedin: string;
  github: string;
  website: string;
  portfolio: string; // Behance / Dribbble / Other
}

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  avatarUrl: string;
  avatarShape: AvatarShape;
  avatarZoom: number;
  email: string;
  phone: string;
  address: string;
  dob: string;
  showDob: boolean;
  gender: string;
  showGender: boolean;
  socials: SocialLinks;
}

export interface WorkExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string; // YYYY-MM
  endDate: string;   // YYYY-MM
  isCurrent: boolean;
  description: string; // Supports rich text / bullets
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  gpa: string;
  achievements: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  techStack: string[];
  link: string;
  description: string;
}

export interface SkillEntry {
  id: string;
  name: string;
  level: number; // 1 to 5
}

export interface SkillGroup {
  id: string;
  category: string;
  skills: SkillEntry[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface ActivityItem {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
}

export interface CustomSectionItemEntry {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

export interface CustomSectionGroup {
  id: string;
  sectionTitle: string;
  items: CustomSectionItemEntry[];
}

export interface SectionConfig {
  id: SectionId;
  visible: boolean;
  customLabelVi?: string;
  customLabelEn?: string;
}

export interface DesignSettings {
  template: TemplateId;
  primaryColor: string;
  fontFamily: FontFamilyType;
  fontSize: number;      // in pt, e.g., 9.5 to 12
  lineHeight: number;    // e.g., 1.25 to 1.65
  sectionGap: number;    // in px, e.g., 10 to 26
  pageMargin: number;    // in mm, e.g., 10 to 22
  language: LanguageCode;
  dateFormat: DateFormatType;
  skillDisplayStyle: SkillDisplayStyle;
  sidebarPosition: 'left' | 'right';
}

export interface CVDocument {
  id: string;
  title: string; // e.g. "CV Senior Frontend - Shopee"
  updatedAt: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: WorkExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  skills: SkillGroup[];
  certifications: CertificationItem[];
  activities: ActivityItem[];
  references: {
    availableUponRequest: boolean;
    items: ReferenceItem[];
  };
  customSections: CustomSectionGroup[];
  sectionsOrder: SectionConfig[];
  design: DesignSettings;
}
