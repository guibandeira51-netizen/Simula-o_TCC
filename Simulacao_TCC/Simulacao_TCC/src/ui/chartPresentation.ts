/** Graph presentation only; no physical equations or parameter changes. */
export type ChartQuantity =
  "rotation" | "energy" | "error" | "discrepancy" | "separation";
export function formatChartValue(
  label: string,
  value: number,
  quantity: ChartQuantity,
): string {
  if (!Number.isFinite(value)) return `${label}: indefinido`;
  const units = {
    rotation: "km/s",
    energy: "(km/s)²",
    error: "adimensional",
    discrepancy: "adimensional",
    separation: "kpc",
  };
  const number =
    quantity === "error"
      ? value.toExponential(3)
      : value.toFixed(
          quantity === "discrepancy" || quantity === "separation" ? 3 : 2,
        );
  return `${label}: ${number} ${units[quantity]}`;
}

export interface LegendSeries {
  label?: string;
  seriesKey?: string;
  hidden?: boolean;
}

/** Chart.js metasets are replaced on refresh; keep the user's choices by series ID. */
export class LegendVisibility {
  private hidden = new Set<string>();
  toggle(key: string, currentlyVisible: boolean) {
    if (currentlyVisible) this.hidden.add(key);
    else this.hidden.delete(key);
  }
  apply<T extends LegendSeries>(datasets: T[]): (T & { hidden: boolean })[] {
    return datasets.map((dataset) => ({
      ...dataset,
      hidden:
        !!dataset.hidden ||
        this.hidden.has(dataset.seriesKey ?? dataset.label ?? ""),
    }));
  }
}
