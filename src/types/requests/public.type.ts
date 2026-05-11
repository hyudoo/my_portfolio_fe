import { ProjectCategoryEntity } from '../entities/project-category.entity';
import { ProjectEntity } from '../entities/project.entity';
import { SettingEntity } from '../entities/setting.entity';
import { SkillCategoryEntity } from '../entities/skill-category.entity';

export type LocaleQuery = { locale?: string };

export type GetPublicSettingsResponse = { setting: SettingEntity };

export type GetPublicSkillsResponse = { skillCategories: SkillCategoryEntity[] };

export type GetPublicProjectCategoriesResponse = { projectCategories: ProjectCategoryEntity[] };

export type GetPublicProjectsResponse = { projects: ProjectEntity[] };

export type CreateContactBody = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type SubscribeBody = {
  email: string;
  locale?: string;
};

export type MessageResponse = { message: string };
