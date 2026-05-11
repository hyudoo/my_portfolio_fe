import { BaseEntity } from './_base.entity';

export type SettingEntity = BaseEntity & {
  locale: string;
  ownerName: string | null;
  tagline: string | null;
  bio: string | null;
  email: string | null;
  location: string | null;
  github: string | null;
  linkedin: string | null;
  twitter: string | null;
  facebook: string | null;
  instagram: string | null;
  youtube: string | null;
  resumeUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  gaId: string | null;
  showHero: boolean;
  showSkills: boolean;
  showProjects: boolean;
  showBlog: boolean;
  showAbout: boolean;
  showContact: boolean;
  sectionOrder: string;
};
