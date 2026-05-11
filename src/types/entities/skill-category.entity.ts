import { BaseEntity } from './_base.entity';
import { SkillEntity } from './skill.entity';

export type SkillCategoryEntity = BaseEntity & {
  name: string;
  icon: string | null;
  locale: string;
  order: string;
  skills: SkillEntity[];
};
