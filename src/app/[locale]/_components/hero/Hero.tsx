"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, Github, Linkedin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { SettingEntity } from "@/types/entities/setting.entity";

type HeroProps = {
  setting: SettingEntity | null;
};

export function Hero({ setting }: HeroProps) {
  const t = useTranslations();

  const socialLinks = [
    { icon: Github, href: setting?.github ?? null, label: "GitHub" },
    { icon: Linkedin, href: setting?.linkedin ?? null, label: "LinkedIn" },
    { icon: Mail, href: setting?.email ? `mailto:${setting.email}` : null, label: "Email" },
  ].filter((s) => s.href !== null) as { icon: typeof Github; href: string; label: string }[];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--glow)_0%,_transparent_50%)] opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_oklch(0.55_0.2_220_/_0.3)_0%,_transparent_50%)]" />

        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.5_0_0_/_0.03)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.5_0_0_/_0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-sm text-muted-foreground">{t("home.heroAvailable")}</span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-lg md:text-xl text-muted-foreground mb-4"
          >
            {t("home.heroGreeting")}
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none"
          >
            <span className="gradient-text">{setting?.ownerName ?? t("home.name")}</span>
          </motion.h1>

          {/* Role */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-4 text-foreground/90"
          >
            {t("home.heroTitle1")} <span className="text-primary">{t("home.heroTitle2")}</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty"
          >
            {setting?.tagline ?? t("home.heroSubtitle")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-10"
          >
            <Button size="lg" className="glow-sm gap-2" asChild>
              <Link href="#projects">
                {t("home.viewProjects")}
                <ArrowDown className="h-4 w-4" />
              </Link>
            </Button>

            {setting?.resumeUrl ? (
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a href={setting.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4" />
                  {t("home.downloadCV")}
                </a>
              </Button>
            ) : (
              <Button size="lg" variant="outline" className="gap-2" disabled>
                <Download className="h-4 w-4" />
                {t("home.downloadCV")}
              </Button>
            )}

            <Button size="lg" variant="secondary" className="gap-2" asChild>
              <Link href="#contact">
                <Mail className="h-4 w-4" />
                {t("home.contactMe")}
              </Link>
            </Button>
          </motion.div>

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center justify-center gap-4 mt-10"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </motion.div>
          )}

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border max-w-xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text">2+</div>
              <div className="text-sm text-muted-foreground mt-1">{t("home.yearsExperience")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text">10+</div>
              <div className="text-sm text-muted-foreground mt-1">{t("home.projectsCompleted")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text">100%</div>
              <div className="text-sm text-muted-foreground mt-1">{t("home.clientsSatisfied")}</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs">{t("home.scrollDown")}</span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
