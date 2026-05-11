"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    router.replace(pathname, { locale: locale === "en" ? "vi" : "en" });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="h-9 w-9 relative"
      aria-label={locale === "en" ? "Switch to Vietnamese" : "Switch to English"}
    >
      <Languages className="h-4 w-4" />
      <span className="absolute -bottom-0.5 -right-0.5 text-[10px] font-bold uppercase bg-primary text-primary-foreground rounded px-1">
        {locale === "en" ? "VI" : "EN"}
      </span>
    </Button>
  );
}
