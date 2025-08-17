import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timestampToRelativeTime(timestamp: string): string {
  const date: Date = new Date(timestamp.replace(' ', 'T'));

  if (isNaN(date.getTime())) {
    return ''
  }

  const now: Date = new Date();
  const diffInMs: number = now.getTime() - date.getTime();
  const diffInDays: number = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const sevenDays: number = 7;

  if (Math.abs(diffInDays) > sevenDays) {
    return new Intl.DateTimeFormat(navigator.language, {
      month: 'long',
      day: '2-digit'
    }).format(date)
  }

  const rtf: Intl.RelativeTimeFormat = new Intl.RelativeTimeFormat(navigator.language, {
    numeric: diffInDays < 1 ? 'auto' : 'always'
  });

  return rtf.format(-diffInDays, 'day');
}
