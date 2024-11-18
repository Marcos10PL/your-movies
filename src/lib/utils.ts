import { addMonths, format, subMonths } from "date-fns";

export const today = format(new Date(), "yyyy-MM-dd");
export const nextMonth = format(addMonths(today, 1), "yyyy-MM-dd");
export const halfYearAgo = format(subMonths(today, 6), "yyyy-MM-dd");

