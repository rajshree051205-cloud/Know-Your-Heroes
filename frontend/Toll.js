/* ============================================================
   THE TOLL — approximate, publicly-reported martyr counts per
   conflict, rendered as a bar chart and a cumulative line.
   Figures are commonly-cited approximations, not official data.
   ============================================================ */

const TOLL = [
  { year: 1947, label: "First Kashmir War", short: "1947–48", count: 1500 },
  { year: 1961, label: "Annexation of Goa", short: "1961", count: 22 },
  { year: 1962, label: "Sino-Indian War", short: "1962", count: 1400 },
  { year: 1965, label: "Indo-Pak War", short: "1965", count: 3000 },
  { year: 1971, label: "Indo-Pak War", short: "1971", count: 3850 },
  { year: 1984, label: "Siachen (Op Meghdoot)", short: "1984→", count: 900 },
  { year: 1987, label: "IPKF, Sri Lanka", short: "1987–90", count: 1200 },
  { year: 1999, label: "Kargil War", short: "1999", count: 527 },
  { year: 2019, label: "Balakot episode", short: "2019", count: 7 },
  { year: 2020, label: "Galwan Valley Clash", short: "2020", count: 20 },
];

function renderBarChart() {
  const el = document.getElementById("tollChart");
  if (!el) return;
  const max = Math.max(...TOLL.map(d => d.count));
  const W = 900, H = 420, padL = 60, padB = 70, padT = 20, padR = 20;
  const chartW = W - padL - padR, chartH = H - padT - padB;
  const barGap = 14;
  const barW = (chartW - barGap * (TOLL.length - 1)) / TOLL.length;

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map(f => {
    const y = padT + chartH * (1 - f);
    const val = Math.round(max * f);
    return `
      <line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="var(--paper-line)" stroke-width="1"/>
      <text x="${padL - 10}" y="${y + 4}" text-anchor="end" class="toll-axis-label">${val.toLocaleString()}</text>
    `;
  }).join("");

  const bars = TOLL.map((d, i) => {
    const barH = (d.count / max) * chartH;
    const x = padL + i * (barW + barGap);
    const y = padT + chartH - barH;
    return `
      <g class="toll-bar-group">
        <rect x="${x}" y="${y}" width="${barW}" height="${barH}" rx="6" class="toll-bar" style="--delay:${i * 0.06}s">
          <title>${d.label}, ${d.short}: approx. ${d.count.toLocaleString()}</title>
        </rect>
        <text x="${x + barW / 2}" y="${padT + chartH + 22}" text-anchor="middle" class="toll-x-label">${d.short}</text>
        <text x="${x + barW / 2}" y="${y - 8}" text-anchor="middle" class="toll-bar-value">${d.count.toLocaleString()}</text>
      </g>
    `;
  }).join("");

  el.innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" width="100%" height="auto" role="img" aria-label="Bar chart of approximate martyrs per conflict, 1947 to 2020">
      ${gridLines}
      ${bars}
      <line x1="${padL}" y1="${padT + chartH}" x2="${W - padR}" y2="${padT + chartH}" stroke="var(--ink-soft)" stroke-width="1.4"/>
    </svg>
  `;
}

function renderCumulative() {
  const el = document.getElementById("tollCumulative");
  if (!el) return;
  let running = 0;
  const points = TOLL.map(d => { running += d.count; return { ...d, running }; });
  const total = running;

  const W = 900, H = 320, padL = 60, padB = 44, padT = 30, padR = 20;
  const chartW = W - padL - padR, chartH = H - padT - padB;

  const coords = points.map((p, i) => {
    const x = padL + (i / (points.length - 1)) * chartW;
    const y = padT + chartH - (p.running / total) * chartH;
    return { x, y, p };
  });

  const path = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(" ");
  const area = `${path} L ${coords[coords.length - 1].x.toFixed(1)} ${padT + chartH} L ${coords[0].x.toFixed(1)} ${padT + chartH} Z`;

  const dots = coords.map(c => `
    <circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="4.5" class="toll-dot">
      <title>${c.p.label}, ${c.p.short}: cumulative approx. ${c.p.running.toLocaleString()}</title>
    </circle>
    <text x="${c.x.toFixed(1)}" y="${padT + chartH + 22}" text-anchor="middle" class="toll-x-label">${c.p.short}</text>
  `).join("");

  el.innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" width="100%" height="auto" role="img" aria-label="Cumulative approximate martyrs from 1947 to present">
      <defs>
        <linearGradient id="tollFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--saffron)" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="var(--saffron)" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <path d="${area}" fill="url(#tollFade)"/>
      <path d="${path}" fill="none" stroke="var(--forest)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
      ${dots}
      <line x1="${padL}" y1="${padT + chartH}" x2="${W - padR}" y2="${padT + chartH}" stroke="var(--ink-soft)" stroke-width="1.4"/>
    </svg>
    <p class="toll-total">Approximate cumulative total, 1947 → present: <strong>${total.toLocaleString()}+</strong></p>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderBarChart();
  renderCumulative();
});