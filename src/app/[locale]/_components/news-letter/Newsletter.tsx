"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Loader2, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations, useLocale } from "next-intl";
import { publicApi } from "@/requests/public.request";

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const t = useTranslations();
  const locale = useLocale();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      await publicApi.subscribe({ email, locale });
      setIsSubscribed(true);
      setEmail("");
    } catch {
      // error notification handled by axios interceptor
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
            <div className="absolute inset-0 glass" />

            <div className="relative p-8 md:p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6"
              >
                <Sparkles className="h-8 w-8 text-primary" />
              </motion.div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                {t("home.newsletterTitle1")} <span className="gradient-text">{t("home.newsletterTitle2")}</span>
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-8">{t("home.newsletterSubtitle")}</p>

              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500"
                >
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">{t("home.subscribed")}</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder={t("home.enterEmail")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 h-12 bg-background/50"
                    />
                  </div>
                  <Button type="submit" size="lg" className="h-12 glow-sm" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("home.subscribing")}
                      </>
                    ) : (
                      t("home.subscribe")
                    )}
                  </Button>
                </form>
              )}

              <p className="text-xs text-muted-foreground mt-4">{t("home.noSpam")}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
