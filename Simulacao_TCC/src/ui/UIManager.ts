import { PARAMETER_ROWS, REFERENCES } from "../data/parameters";
import { OBSERVATIONS } from "../data/observations";
export function populateSources() {
  document.getElementById("parameters")!.innerHTML = PARAMETER_ROWS.map(
    ([name, symbol, value, unit, ref]) =>
      `<tr><td>${name}<br><small>${symbol}</small></td><td>${value.toLocaleString("pt-BR", { maximumSignificantDigits: 8 })}</td><td>${unit}</td><td><a href="${REFERENCES[ref].url}" target="_blank" rel="noopener">Fonte ↗</a></td></tr>`,
  ).join("");
  document.getElementById("references")!.innerHTML = Object.values(REFERENCES)
    .map(
      (ref) =>
        `<li><a href="${ref.url}" target="_blank" rel="noopener">${ref.title}</a></li>`,
    )
    .join("");
  document.getElementById("observations")!.innerHTML = OBSERVATIONS.map(
    (o) =>
      `<p><a href="${o.source.url}" target="_blank" rel="noopener">${o.source.title}</a>: vc(${o.R} kpc) = ${o.vc} ± ${o.stat} km/s. ${o.note}</p>`,
  ).join("");
  const dialog = document.getElementById("info-dialog") as HTMLDialogElement;
  document.getElementById("btn-info")!.onclick = () => dialog.showModal();
  document.getElementById("btn-close")!.onclick = () => dialog.close();
  let stage = 0;
  document.getElementById("btn-panels")!.onclick = () => {
    stage = (stage + 1) % (innerWidth <= 580 ? 3 : 2);
    document.body.classList.toggle(
      "mobile-metrics",
      innerWidth <= 580 && stage === 1,
    );
    document.body.classList.toggle(
      "hide-panels",
      stage === (innerWidth <= 580 ? 2 : 1),
    );
    document
      .getElementById("btn-panels")!
      .setAttribute(
        "aria-expanded",
        String(!document.body.classList.contains("hide-panels")),
      );
    window.dispatchEvent(new Event("resize"));
  };
}
export function downloadJSON(value: unknown) {
  const blob = new Blob([JSON.stringify(value, null, 2)], {
      type: "application/json",
    }),
    url = URL.createObjectURL(blob),
    a = document.createElement("a");
  a.href = url;
  a.download = "experimento-galactico.json";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
