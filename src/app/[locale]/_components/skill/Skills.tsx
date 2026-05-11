"use client";

import { motion } from "framer-motion";
import { Database, Layout, Server, Cloud, Wrench, Code2, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { SkillCategoryEntity } from "@/types/entities/skill-category.entity";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ICON_MAP: Record<string, LucideIcon> = {
  frontend: Layout,
  backend: Server,
  database: Database,
  devops: Cloud,
  cloud: Cloud,
  tools: Wrench,
  tool: Wrench,
};

function resolveIcon(icon: string | null, name: string): LucideIcon {
  const key = (icon ?? name).toLowerCase().replace(/[\s-_]/g, "");
  for (const [k, Icon] of Object.entries(ICON_MAP)) {
    if (key.includes(k)) return Icon;
  }
  return Code2;
}

type SkillsProps = {
  skillCategories: SkillCategoryEntity[];
};

export const Skills: React.FC<SkillsProps> = ({ skillCategories }) => {
  const t = useTranslations();

  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute inset-0 -z-10 bg-secondary/30" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-4">
            <Code2 className="h-4 w-4" />
            {t("home.skillsBadge")}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            {t("home.skillsTitle1")} <span className="gradient-text">{t("home.skillsTitle2")}</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-pretty">{t("home.skillsSubtitle")}</p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category) => {
            const Icon = resolveIcon(category.icon, category.name);
            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-3 py-1.5 text-sm rounded-full bg-secondary text-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
