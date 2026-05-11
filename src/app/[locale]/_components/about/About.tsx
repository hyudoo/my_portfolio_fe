"use client";

import { motion } from "framer-motion";
import { User, Briefcase } from "lucide-react";
import { useTranslations } from "next-intl";

export function About() {
  const t = useTranslations();

  const timeline = [
    {
      year: "2022 - Present",
      title: t("home.timeline2024Title"),
      company: t("home.timeline2024Company"),
      description: t("home.timeline2024Desc"),
    },
    {
      year: "2022",
      title: t("home.timeline2022Title"),
      company: t("home.timeline2022Company"),
      description: t("home.timeline2022Desc"),
    },
  ];

  const values = [
    { label: t("home.cleanCode"), value: t("home.qualityFirst") },
    { label: t("home.userFocus"), value: t("home.experienceMatters") },
    { label: t("home.continuousLearning"), value: t("home.stayCurious") },
    { label: t("home.teamPlayer"), value: t("home.collaborateGrow") },
  ];

  return (
    <section id="about" className="py-24 relative">
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
            <User className="h-4 w-4" />
            {t("home.aboutBadge")}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            {t("home.aboutTitle1")} <span className="gradient-text">{t("home.aboutTitle2")}</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-pretty">{t("home.aboutSubtitle")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">{t("home.aboutP1")}</p>
              <p className="text-muted-foreground leading-relaxed">{t("home.aboutP2")}</p>
              <p className="text-muted-foreground leading-relaxed">{t("home.aboutP3")}</p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {values.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-card border border-border"
                >
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                  <div className="font-semibold text-foreground">{item.value}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-12"
                >
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center">
                    <Briefcase className="h-4 w-4 text-primary" />
                  </div>

                  <div className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                    <div className="text-xs text-primary font-medium mb-1">{item.year}</div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <div className="text-sm text-muted-foreground mb-2">{item.company}</div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
