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

export function NotificationToggle() {
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
    } else {
      const granted = await requestNotificationPermission();
      setEnabled(granted);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      aria-label={enabled ? "Disable prayer reminders" : "Enable prayer reminders"}
      title={enabled ? "Reminders on" : "Enable reminders"}
    >
      {enabled ? (
        <Bell className="w-4 h-4 text-franciscan" />
      ) : (
        <BellOff className="w-4 h-4" />
      )}
    </button>
  );
}
