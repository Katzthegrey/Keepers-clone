export function toDatetimeLocalValue(ms) {
  if (ms == null || Number.isNaN(Number(ms))) return '';
  const d = new Date(Number(ms));
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function fromDatetimeLocalValue(str) {
  if (!str || !String(str).trim()) return null;
  const t = new Date(str).getTime();
  return Number.isNaN(t) ? null : t;
}

/**
 * Human-readable countdown until reminderMs (local clock).
 * @returns {{ text: string, overdue: boolean }}
 */
export function formatCountdown(reminderMs) {
  const now = Date.now();
  const diff = Number(reminderMs) - now;
  if (diff <= 0) return { text: 'Overdue', overdue: true };
  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;

  if (days > 0) {
    return { text: `${days}d ${hours}h ${minutes}m`, overdue: false };
  }
  if (hours > 0) {
    return { text: `${hours}h ${minutes}m ${seconds}s`, overdue: false };
  }
  if (minutes > 0) {
    return { text: `${minutes}m ${seconds}s`, overdue: false };
  }
  return { text: `${seconds}s`, overdue: false };
}

export function formatReminderWhen(ms) {
  return new Date(ms).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}
