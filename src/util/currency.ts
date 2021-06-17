export const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
export const formatCurrency = (n?: number) =>
  currencyFormatter.format((n || 0) / 100);
