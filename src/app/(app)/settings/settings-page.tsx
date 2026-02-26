"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { BackButton } from "@/components/back-button";
import { AuthButton } from "@/components/auth-button";
import { NotificationToggle } from "@/components/notification-toggle";
import { BellSettingsCard } from "@/components/bell-settings";
import { useI18n, LOCALE_FLAGS, LOCALE_LABELS, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { trackThemeToggled, trackLanguageChanged } from "@/lib/analytics";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="space-y-3">
      <BackButton label={t("home.back")} />
      <h2 className="text-base font-semibold text-foreground">{t("settings.title")}</h2>

      <div className="bg-card rounded-xl border border-border p-4">
        <p className="text-sm font-medium text-foreground">{t("settings.account")}</p>
        <p className="text-xs text-muted-foreground mt-1">{t("settings.account_desc")}</p>
        <div className="mt-3">
          <AuthButton />
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-4">
        <p className="text-sm font-medium text-foreground">{t("settings.notifications")}</p>
        <p className="text-xs text-muted-foreground mt-1">{t("settings.notifications_desc")}</p>
        <div className="mt-3">
          <NotificationToggle
            compact={false}
            labelOn={t("settings.notifications_on")}
            labelOff={t("settings.notifications_off")}
          />
        </div>
      </div>

      <BellSettingsCard />

      <div className="bg-card rounded-xl border border-border p-4">
        <p className="text-sm font-medium text-foreground">{t("settings.language")}</p>
        <p className="text-xs text-muted-foreground mt-1">{t("settings.language_desc")}</p>
        <div className="grid grid-cols-2 gap-2 mt-3">
          {(Object.keys(LOCALE_LABELS) as Locale[]).map((l) => (
            <button
              key={l}
              onClick={() => { setLocale(l); trackLanguageChanged(l); }}
              className={cn(
                "px-3 py-2 rounded-lg border text-sm text-left transition-colors",
                locale === l
                  ? "border-franciscan bg-franciscan-light text-franciscan"
                  : "border-border bg-background text-foreground hover:border-franciscan/40"
              )}
            >
              <span className="text-xs font-mono mr-2">{LOCALE_FLAGS[l]}</span>
              <span>{LOCALE_LABELS[l]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-4">
        <p className="text-sm font-medium text-foreground">{t("settings.appearance")}</p>
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => { setTheme("light"); trackThemeToggled("light"); }}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border text-sm transition-colors",
              theme === "light"
                ? "border-franciscan bg-franciscan-light text-franciscan"
                : "border-border bg-background text-foreground hover:border-franciscan/40"
            )}
          >
            <Sun className="w-4 h-4" /> {t("settings.theme_light")}
          </button>
          <button
            onClick={() => { setTheme("dark"); trackThemeToggled("dark"); }}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border text-sm transition-colors",
              theme === "dark"
                ? "border-franciscan bg-franciscan-light text-franciscan"
                : "border-border bg-background text-foreground hover:border-franciscan/40"
            )}
          >
            <Moon className="w-4 h-4" /> {t("settings.theme_dark")}
          </button>
        </div>
      </div>
    </div>
  );
}
