export const distanceFormatter = new Intl.NumberFormat("pt-BR");
export const formatDistance = (n?: number) =>
  `${distanceFormatter.format((n || 0) / 1000)} Km`;
