"use client";

import { useState, useEffect } from "react";
import { Plus, X, Heart } from "lucide-react";
import { getIntentions, addIntention, removeIntention, type Intention } from "@/lib/intentions";
import { useT } from "@/lib/i18n";

export function IntentionsJournal() {
  const t = useT();
  const [intentions, setIntentions] = useState<Intention[]>([]);
  const [newText, setNewText] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    setIntentions(getIntentions());
  }, []);

  const handleAdd = () => {
    if (!newText.trim()) return;
    const intention = addIntention(newText.trim());
    setIntentions([intention, ...intentions]);
    setNewText("");
    setShowAdd(false);
  };

  const handleRemove = (id: string) => {
    removeIntention(id);
    setIntentions(intentions.filter((i) => i.id !== id));
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {t("intentions.desc")}
      </p>

      {/* Add button */}
      {!showAdd ? (
        <button
          onClick={() => setShowAdd(true)}
          className="w-full flex items-center justify-center gap-2 bg-franciscan-light text-franciscan rounded-lg p-3 text-sm font-medium hover:opacity-80 transition-opacity"
        >
          <Plus className="w-4 h-4" /> {t("intentions.add")}
        </button>
      ) : (
        <div className="bg-card rounded-lg border border-border p-4 space-y-3">
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder={t("intentions.placeholder")}
            className="w-full bg-background border border-input rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            rows={3}
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              disabled={!newText.trim()}
              className="flex-1 bg-franciscan text-franciscan-foreground rounded-lg py-2 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              {t("intentions.add_btn")}
            </button>
            <button
              onClick={() => { setShowAdd(false); setNewText(""); }}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("intentions.cancel")}
            </button>
          </div>
        </div>
      )}

      {/* Intentions list */}
      {intentions.length === 0 ? (
        <div className="text-center py-8">
          <Heart className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">{t("intentions.empty")}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {t("intentions.empty_sub")}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {intentions.map((intention) => (
            <div
              key={intention.id}
              className="bg-card rounded-lg border border-border p-3 flex items-start gap-3"
            >
              <Heart className="w-4 h-4 text-franciscan shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{intention.text}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(intention.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleRemove(intention.id)}
                className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
