export const getPlural = (singularForm: string, quantity: number) => {
  if (quantity == 1) return singularForm;
  return singularForm + "s";
};
