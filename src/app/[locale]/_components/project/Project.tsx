"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { ProjectEntity } from "@/types/entities/project.entity";
import { ProjectCategoryEntity } from "@/types/entities/project-category.entity";

type ProjectsProps = {
  projects: ProjectEntity[];
  projectCategories: ProjectCategoryEntity[];
};

export const Projects: React.FC<ProjectsProps> = ({ projects, projectCategories }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const t = useTranslations();

  const categories = [
    { id: "all", label: t("home.allProjects") },
    ...projectCategories.map((c) => ({ id: c.slug, label: c.name })),
  ];

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.categories.some((c) => c.slug === activeCategory));

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-4">
            <Folder className="h-4 w-4" />
            {t("home.projectsBadge")}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            {t("home.projectsTitle1")} <span className="gradient-text">{t("home.projectsTitle2")}</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-pretty">{t("home.projectsSubtitle")}</p>
        </motion.div>

        {/* Featured Projects - Bento Grid */}
        {featuredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
          >
            {/* Large Featured Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="lg:col-span-2 lg:row-span-2 group relative rounded-2xl overflow-hidden bg-card border border-border"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
              <Image
                src={featuredProjects[0].files[0]?.url ?? "/placeholder.svg?height=600&width=800"}
                alt={featuredProjects[0].title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                <div className="flex flex-wrap gap-2 mb-3">
                  {featuredProjects[0].skills.slice(0, 4).map((skill) => (
                    <span key={skill.id} className="px-2 py-1 text-xs rounded-md bg-primary/20 text-primary">
                      {skill.name}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{featuredProjects[0].title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{featuredProjects[0].description}</p>
                <div className="flex gap-3">
                  {featuredProjects[0].liveUrl && (
                    <Button size="sm" className="gap-2" asChild>
                      <a href={featuredProjects[0].liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        {t("home.liveDemo")}
                      </a>
                    </Button>
                  )}
                  {featuredProjects[0].githubUrl && (
                    <Button size="sm" variant="outline" className="gap-2" asChild>
                      <a href={featuredProjects[0].githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        {t("home.code")}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Smaller Featured Cards */}
            {featuredProjects.slice(1, 3).map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -5 }}
                className="group relative rounded-2xl overflow-hidden bg-card border border-border aspect-[4/3]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
                <Image
                  src={project.files[0]?.url ?? "/placeholder.svg?height=400&width=600"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 z-20 p-5 flex flex-col justify-end">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.skills.slice(0, 2).map((skill) => (
                      <span key={skill.id} className="px-2 py-0.5 text-xs rounded-md bg-primary/20 text-primary">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                  <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    {project.liveUrl && (
                      <Button size="sm" variant="secondary" className="h-8 gap-1.5" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3" />
                          {t("home.demo")}
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button size="sm" variant="ghost" className="h-8 gap-1.5" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-3 w-3" />
                          {t("home.code")}
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Filter Tabs */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 text-sm rounded-full transition-all ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        )}

        {/* All Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                className="group rounded-2xl overflow-hidden bg-card border border-border"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.files[0]?.url ?? "/placeholder.svg?height=400&width=600"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.skills.slice(0, 3).map((skill) => (
                      <span key={skill.id} className="px-2 py-0.5 text-xs rounded-md bg-secondary text-muted-foreground">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{project.description}</p>
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <Button size="sm" variant="secondary" className="flex-1 gap-1.5" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3.5 w-3.5" />
                          {t("home.liveDemo")}
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button size="sm" variant="ghost" className="gap-1.5" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
