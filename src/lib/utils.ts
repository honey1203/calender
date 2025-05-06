import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from 'date-fns'; // Ensure date-fns is available if needed elsewhere, though primarily used in component

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Example utility if needed elsewhere, otherwise safe to remove
export function formatDate(date: Date, formatString: string = 'PPP'): string {
  return format(date, formatString);
}
