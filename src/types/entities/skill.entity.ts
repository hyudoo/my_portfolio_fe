import { BaseEntity } from './_base.entity';

export type SkillEntity = BaseEntity & {
  name: string;
  icon: string | null;
  locale: string;
  order: string;
  categoryId: number;
};
