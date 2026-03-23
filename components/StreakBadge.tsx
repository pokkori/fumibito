"use client";

import { useEffect, useState } from "react";
import { updateStreak, getStreakMilestoneMessage, type StreakData } from "@/lib/streak";

export default function StreakBadge() {
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [milestone, setMilestone] = useState<string | null>(null);

  useEffect(() => {
    const updated = updateStreak("fumibito");
    setStreak(updated);
    setMilestone(getStreakMilestoneMessage(updated.count));
  }, []);

  if (!streak || streak.count === 0) return null;

  return (
    <div className="flex flex-col items-end gap-1">
      <div
        className="flex items-center gap-1.5 bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold px-3 py-1 rounded-full"
        aria-label={`${streak.count}日連続でアクセス中`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2C12 2 4 8 4 14a8 8 0 0 0 16 0C20 8 12 2 12 2Z" fill="#f59e0b" />
          <path d="M12 8c0 0-3 3.5-3 6a3 3 0 0 0 6 0C15 11.5 12 8 12 8Z" fill="#fef3c7" />
        </svg>
        {streak.count}日連続
      </div>
      {milestone && (
        <p className="text-xs text-amber-600 font-medium" aria-live="polite">
          {milestone}
        </p>
      )}
    </div>
  );
}
