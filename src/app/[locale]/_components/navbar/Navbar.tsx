"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { SettingEntity } from "@/types/entities/setting.entity";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Menu, X, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { LanguageToggle } from "./language-toggle/LanguageToggle";
import { ThemeToggle } from "./theme-toggle/ThemeToggle";

type NavbarProps = {
  setting: SettingEntity | null;
};

export const Navbar: React.FC<NavbarProps> = ({ setting }) => {
  const t = useTranslations();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: t("home.navHome") },
    { href: "#skills", label: t("home.navSkills") },
    { href: "#projects", label: t("home.navProjects") },
    { href: "#about", label: t("home.navAbout") },
    { href: "#blog", label: t("home.navBlog") },
    { href: "#contact", label: t("home.navContact") },
  ];

  const socialLinks = [
    { icon: Github, href: setting?.github ?? null, label: "GitHub" },
    { icon: Linkedin, href: setting?.linkedin ?? null, label: "LinkedIn" },
    { icon: Youtube, href: setting?.youtube ?? null, label: "YouTube" },
  ].filter((s) => s.href !== null) as { icon: typeof Github; href: string; label: string }[];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass py-3" : "py-5"}`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="#home" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">H</span>
            </div>
            <span className="font-semibold text-lg">{setting?.ownerName ?? t("home.name")}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-1">
                {socialLinks.map((social) => (
                  <Button key={social.label} variant="ghost" size="icon" asChild className="h-9 w-9">
                    <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                      <social.icon className="h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>
            )}
            <LanguageToggle />
            <ThemeToggle />
            <Button className="glow-sm" asChild>
              <Link href="#contact">{t("home.hireMe")}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden pt-20"
          >
            <div className="glass h-full p-6">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 text-lg font-medium hover:bg-secondary rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              {socialLinks.length > 0 && (
                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
                  {socialLinks.map((social) => (
                    <Button key={social.label} variant="ghost" size="icon" asChild>
                      <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                        <social.icon className="h-5 w-5" />
                      </a>
                    </Button>
                  ))}
                </div>
              )}
              <Button className="w-full mt-4 glow-sm" asChild>
                <Link href="#contact">{t("home.hireMe")}</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
