export const totePrice = 12500;
export const toteStock = { Arena: 12, Azul: 6 };
export const toteColors = ["Arena", "Azul"] as const;

const pesos = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

export function formatDemoPrice(value: number) {
  return pesos.format(value);
}
