import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function formatDateDigits(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  });
}
