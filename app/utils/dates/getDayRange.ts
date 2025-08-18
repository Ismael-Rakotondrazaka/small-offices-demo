/**
 * Returns the start and end of the day (in milliseconds) for a given timestamp.
 * @param timestamp - Unix timestamp in milliseconds.
 * @returns { startOfDay: number; endOfDay: number } - Start and end of the day in ms.
 */
export const getDayRange = (timestamp: number): [number, number] => {
  const date = new Date(timestamp);

  // Set to midnight (00:00:00.000)
  date.setHours(0, 0, 0, 0);
  const startOfDay = date.getTime();

  // Calculate end of day (23:59:59.999)
  const endOfDay = startOfDay + 86400000 - 1; // 24h in ms - 1ms

  return [startOfDay, endOfDay];
};
