"use client";

import { useState, useEffect } from "react";
import { Bell, BellOff } from "lucide-react";
import {
  isNotificationSupported,
  isNotificationEnabled,
  requestNotificationPermission,
  disableNotifications,
  scheduleAllReminders,
} from "@/lib/notifications";
import { trackNotificationsEnabled, trackNotificationsDisabled } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface NotificationToggleProps {
  compact?: boolean;
  labelOn?: string;
  labelOff?: string;
  className?: string;
}

export function NotificationToggle({
  compact = true,
  labelOn = "Reminders On",
  labelOff = "Enable Reminders",
  className,
}: NotificationToggleProps) {
  const [supported, setSupported] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setSupported(isNotificationSupported());
    setEnabled(isNotificationEnabled());
    // Re-schedule on mount if enabled
    if (isNotificationEnabled()) scheduleAllReminders();
  }, []);

  if (!supported) return null;

  const handleToggle = async () => {
    if (enabled) {
      disableNotifications();
      setEnabled(false);
      trackNotificationsDisabled();
    } else {
      const granted = await requestNotificationPermission();
      setEnabled(granted);
      if (granted) trackNotificationsEnabled();
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={cn(
        compact
          ? "p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent"
          : "inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground hover:border-franciscan/40 transition-colors",
        "transition-colors",
        className
      )}
      aria-label={enabled ? "Disable prayer reminders" : "Enable prayer reminders"}
      title={enabled ? "Reminders on" : "Enable reminders"}
    >
      {enabled ? (
        <Bell className="w-4 h-4 text-franciscan" />
      ) : (
        <BellOff className="w-4 h-4" />
      )}
      {!compact && (
        <span>{enabled ? labelOn : labelOff}</span>
      )}
    </button>
  );
}
