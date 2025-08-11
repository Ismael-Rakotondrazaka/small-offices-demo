const roundToNearest10 = (value: number) => {
  return Math.max(10, Math.ceil(value / 10) * 10); // Ensure minimum 10
};

export const generatePageSizes = (defaultValue: number) => {
  const sizes = new Set<number>();

  // Generate meaningful values rounded to nearest 10
  sizes.add(roundToNearest10(defaultValue / 5));
  sizes.add(roundToNearest10(defaultValue / 2));
  sizes.add(roundToNearest10(defaultValue));
  sizes.add(roundToNearest10(defaultValue * 2));
  sizes.add(roundToNearest10(defaultValue * 5));

  return [...sizes].sort((a, b) => a - b);
};
