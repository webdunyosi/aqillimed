export const formatMoney = (value: number) =>
  new Intl.NumberFormat('uz-UZ').format(value) + " so'm"
