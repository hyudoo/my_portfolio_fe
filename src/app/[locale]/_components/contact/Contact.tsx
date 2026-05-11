"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Send, Loader2, Github, Linkedin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { SettingEntity } from "@/types/entities/setting.entity";
import { publicApi } from "@/requests/public.request";

type ContactProps = {
  setting: SettingEntity | null;
};

export function Contact({ setting }: ContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const t = useTranslations();

  const email = setting?.email ?? null;
  const location = setting?.location ?? null;

  const socialLinks = [
    { icon: Github, href: setting?.github ?? null, label: "GitHub" },
    { icon: Linkedin, href: setting?.linkedin ?? null, label: "LinkedIn" },
    { icon: Mail, href: email ? `mailto:${email}` : null, label: "Email" },
  ].filter((s) => s.href !== null) as { icon: typeof Github; href: string; label: string }[];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setIsSubmitting(true);
    try {
      await publicApi.submitContact({
        name: fd.get("name") as string,
        email: fd.get("email") as string,
        subject: fd.get("subject") as string,
        message: fd.get("message") as string,
      });
      setIsSubmitted(true);
    } catch {
      // error notification handled by axios interceptor
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-4">
            <Mail className="h-4 w-4" />
            {t("home.contactBadge")}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            {t("home.contactTitle1")} <span className="gradient-text">{t("home.contactTitle2")}</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-pretty">{t("home.contactSubtitle")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">{t("home.workTogether")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("home.contactDescription")}</p>
            </div>

            <div className="space-y-4">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
                >
                  <div className="p-2.5 rounded-lg bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{t("home.email")}</div>
                    <div className="font-medium">{email}</div>
                  </div>
                </a>
              )}

              <a
                href="tel:0964511602"
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <div className="p-2.5 rounded-lg bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{t("home.phone")}</div>
                  <div className="font-medium">0964 511 602</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                <div className="p-2.5 rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{t("home.location")}</div>
                  <div className="font-medium">{location ?? t("home.locationValue")}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                <div className="p-2.5 rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{t("home.availability")}</div>
                  <div className="font-medium">{t("home.availabilityValue")}</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3">{t("home.connectWithMe")}</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="p-3 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex items-center justify-center p-8 rounded-2xl bg-card border border-border"
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{t("home.messageSent")}</h3>
                  <p className="text-muted-foreground">{t("home.thankYou")}</p>
                  <Button variant="outline" className="mt-4" onClick={() => setIsSubmitted(false)}>
                    {t("home.sendAnother")}
                  </Button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-2xl bg-card border border-border space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("home.nameField")}</Label>
                    <Input id="name" name="name" placeholder="John Doe" required className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("home.email")}</Label>
                    <Input id="email" name="email" type="email" placeholder="john@example.com" required className="bg-background" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">{t("home.subject")}</Label>
                  <Input id="subject" name="subject" placeholder={t("home.subjectPlaceholder")} required className="bg-background" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t("home.message")}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={t("home.messagePlaceholder")}
                    required
                    rows={5}
                    className="bg-background resize-none"
                  />
                </div>

                <Button type="submit" className="w-full glow-sm" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("home.sending")}
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      {t("home.sendMessage")}
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
