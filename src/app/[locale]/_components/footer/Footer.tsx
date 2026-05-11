"use client";

import { Link } from "@/i18n/navigation";
import { SettingEntity } from "@/types/entities/setting.entity";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { useTranslations } from "next-intl";

type FooterProps = {
  setting: SettingEntity | null;
};

export function Footer({ setting }: FooterProps) {
  const t = useTranslations();

  const socialLinks = [
    { icon: Github, href: setting?.github ?? null, label: "GitHub" },
    { icon: Linkedin, href: setting?.linkedin ?? null, label: "LinkedIn" },
    { icon: Mail, href: setting?.email ? `mailto:${setting.email}` : null, label: "Email" },
  ].filter((s) => s.href !== null) as { icon: typeof Github; href: string; label: string }[];

  const footerLinks = {
    navigation: [
      { label: t("home.navHome"), href: "#home" },
      { label: t("home.navSkills"), href: "#skills" },
      { label: t("home.navProjects"), href: "#projects" },
      { label: t("home.navAbout"), href: "#about" },
      { label: t("home.navBlog"), href: "#blog" },
      { label: t("home.navContact"), href: "#contact" },
    ],
    resources: [
      ...(setting?.resumeUrl ? [{ label: t("home.resume"), href: setting.resumeUrl, external: true }] : []),
      ...(setting?.github ? [{ label: "GitHub", href: setting.github, external: true }] : []),
      ...(setting?.linkedin ? [{ label: "LinkedIn", href: setting.linkedin, external: true }] : []),
    ],
    legal: [
      { label: t("home.privacyPolicy"), href: "#", external: false },
      { label: t("home.termsOfService"), href: "#", external: false },
    ],
  };

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="#home" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">H</span>
              </div>
              <span className="font-semibold text-lg">{setting?.ownerName ?? t("home.name")}</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">{t("home.footerDescription")}</p>
            {socialLinks.length > 0 && (
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">{t("home.navigation")}</h3>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">{t("home.resources")}</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">{t("home.legal")}</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {setting?.ownerName ?? t("home.name")}. {t("home.allRightsReserved")}
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            {t("home.madeWith")} <Heart className="h-4 w-4 text-red-500 fill-red-500" /> {t("home.using")}
          </p>
        </div>
      </div>
    </footer>
  );
}
