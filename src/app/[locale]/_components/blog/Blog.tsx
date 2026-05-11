"use client";

import { motion } from "framer-motion";
import { BookOpen, PenLine } from "lucide-react";
import { useTranslations } from "next-intl";

export const Blog: React.FC = () => {
  const t = useTranslations();

  return (
    <section id="blog" className="py-24 relative">
      <div className="absolute inset-0 -z-10 bg-secondary/30" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-4">
            <BookOpen className="h-4 w-4" />
            {t("home.blogBadge")}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            {t("home.blogTitle1")} <span className="gradient-text">{t("home.blogTitle2")}</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-pretty">{t("home.blogSubtitle")}</p>
        </motion.div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden flex flex-col items-center justify-center py-28 rounded-2xl bg-card border-2 border-dashed border-border"
        >
          {/* Decorative blobs */}
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col items-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <PenLine className="h-9 w-9 text-primary" />
            </div>
            <h3 className="text-3xl font-bold mb-3">
              <span className="gradient-text">{t("home.blogComingSoon")}</span>
            </h3>
            <p className="text-muted-foreground text-center max-w-sm text-pretty">{t("home.blogComingSoonDesc")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
