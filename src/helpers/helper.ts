import { format, differenceInDays } from "date-fns";

export function formatBookingDates(startDate: Date, endDate: Date) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const days = differenceInDays(end, start);
  const startFormatted = format(start, "EEE, MMM dd yyyy"); // Wed, Dec 03 2025
  const endFormatted = format(end, "EEE, MMM dd yyyy"); // Fri, Dec 05 2025

  return `${startFormatted} (in ${days} days) — ${endFormatted}`;
}


export function formatBookingTime(dateNumber: Date) {
  const date = new Date(dateNumber);
  return `Booked ${format(date, "EEE, MMM dd yyyy, hh:mm a")}`;
}

