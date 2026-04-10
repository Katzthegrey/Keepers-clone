import React, { useEffect, useState } from 'react';
import { formatCountdown, formatReminderWhen } from '../utils/reminderUtils';

const ReminderCountdown = ({ reminderAt, onClear }) => {
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setTick((n) => n + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const { text, overdue } = formatCountdown(reminderAt);
  const whenLabel = formatReminderWhen(reminderAt);

  return (
    <div
      className={`note-reminder-row${overdue ? ' note-reminder-overdue' : ''}`}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      role="status"
      aria-live="polite"
    >
      <span className="material-icons-outlined note-reminder-icon" aria-hidden="true">
        schedule
      </span>
      <span className="note-reminder-countdown" title={whenLabel}>
        {text} · {whenLabel}
      </span>
      <button
        type="button"
        className="note-reminder-clear"
        onClick={(e) => {
          e.stopPropagation();
          onClear?.();
        }}
        aria-label="Clear reminder"
      >
        <span className="material-icons-outlined" aria-hidden="true">
          close
        </span>
      </button>
    </div>
  );
};

export default ReminderCountdown;
