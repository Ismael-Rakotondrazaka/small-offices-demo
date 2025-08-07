/**
 * Date comparison utilities
 */

/**
 * Checks if a date is today
 * @param date The date to check
 * @param now Reference date (defaults to current date)
 * @returns boolean
 */
export const isToday = (date: Date, now: Date = new Date()): boolean => {
  return date.toDateString() === now.toDateString();
};

/**
 * Gets the year and week number for a given date (ISO week date system)
 * @param date The date to evaluate
 * @returns Tuple containing [year, weekNumber]
 */
const getYearAndWeek = (date: Date): [number, number] => {
  // Clone date to avoid modifying original
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );

  // Adjust to nearest Thursday (ISO week starts on Monday)
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));

  // Get first day of year
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );

  return [d.getUTCFullYear(), weekNo];
};

/**
 * Checks if a date is in the same week as the reference date
 * @param date The date to check
 * @param now Reference date (defaults to current date)
 * @returns boolean
 */
export const isOnThisWeek = (date: Date, now: Date = new Date()): boolean => {
  const [year, week] = getYearAndWeek(now);
  const [yearToCompare, weekToCompare] = getYearAndWeek(date);
  return year === yearToCompare && week === weekToCompare;
};

/**
 * Checks if a date is in the same year as the reference date
 * @param date The date to check
 * @param now Reference date (defaults to current date)
 * @returns boolean
 */
export const isOnThisYear = (date: Date, now: Date = new Date()): boolean => {
  return date.getFullYear() === now.getFullYear();
};
