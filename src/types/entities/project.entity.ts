import { BaseEntity } from './_base.entity';
import { FileEntity } from './file.entity';
import { ProjectCategoryEntity } from './project-category.entity';
import { SkillEntity } from './skill.entity';

export type ProjectEntity = BaseEntity & {
  title: string;
  description: string;
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  locale: string;
  order: string;
  files: FileEntity[];
  skills: SkillEntity[];
  categories: ProjectCategoryEntity[];
};
