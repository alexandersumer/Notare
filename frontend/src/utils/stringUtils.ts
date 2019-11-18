export const getPlural = (singularForm: string, quantity: number) => {
  if (quantity == 1) return singularForm;
  return singularForm + "s";
};

export const sortStringArray = (arr: string[]): string[] => {
  return arr.concat().sort((a, b) => a.toLowerCase() !== b.toLowerCase() ? a.toLowerCase() < b.toLowerCase() ? -1 : 1 : 0);
}