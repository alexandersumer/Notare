export const getPlural = (singularForm: string, quantity: number) => {
  if (quantity == 1) return singularForm;
  return singularForm + "s";
};

export const sortStringArray = (arr: string[]): string[] => {
  return arr
    .concat()
    .sort((a, b) =>
      a.toLowerCase() !== b.toLowerCase()
        ? a.toLowerCase() < b.toLowerCase()
          ? -1
          : 1
        : 0
    );
};

export const formatTimestamp = (seconds: number): string => {
  let date = new Date(0);
  date.setSeconds(seconds);
  if (seconds >= 60 * 60) return date.toISOString().substr(11, 8);
  return date.toISOString().substr(14, 5);
};