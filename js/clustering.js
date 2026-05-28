// ============================================================
// SleepAI — Clustering Visualization (Chart.js)
// ============================================================

let clusterChart1 = null, clusterChart2 = null, clusterChart3 = null;

function destroyClusteringCharts() {
    if (clusterChart1) { clusterChart1.destroy(); clusterChart1 = null; }
    if (clusterChart2) { clusterChart2.destroy(); clusterChart2 = null; }
    if (clusterChart3) { clusterChart3.destroy(); clusterChart3 = null; }
}

// Deterministic pseudo t-SNE: project patients into 2D based on clinical features
function computeFakeTSNE() {
    const features = PATIENTS.map(p => [
        p.respiratorio.iah,
        p.oximetria.spo2_media,
        p.oximetria.ct90,
        p.oximetria.spo2_min,
        p.sueno.eficiencia || 75,
        p.oximetria.desaturaciones_3pct || 0
    ]);

    const mins = features[0].map((_, i) => Math.min(...features.map(f => f[i])));
    const maxs = features[0].map((_, i) => Math.max(...features.map(f => f[i])));
    const norm = features.map(f => f.map((v, i) => maxs[i] - mins[i] > 0 ? (v - mins[i]) / (maxs[i] - mins[i]) : 0.5));

    // Cluster centers in a 2D square layout (not diagonal)
    //   ninguna = top-left, leve = top-right
    //   moderada = bottom-left, grave = bottom-right
    const centers = { ninguna: { x: 22, y: 25 }, leve: { x: 72, y: 22 }, moderada: { x: 25, y: 75 }, grave: { x: 75, y: 78 } };
    const jitterScale = 9;

    const seed = (i) => ((Math.sin(i * 127.1 + 311.7) * 43758.5453) % 1 + 1) % 1;

    return PATIENTS.map((p, i) => {
        const n = norm[i];
        const c = centers[p.severidad];
        // Spread within cluster using per-patient clinical variation
        const dx = (n[0] - 0.5) * jitterScale + (seed(i * 3) - 0.5) * jitterScale * 0.6;
        const dy = (n[2] - 0.5) * jitterScale + (seed(i * 7 + 1) - 0.5) * jitterScale * 0.6;
        return { x: c.x + dx, y: c.y + dy, label: p.nombre, id: p.id, severidad: p.severidad };
    });
}

const sevColors = {
    ninguna: { bg: 'rgba(76,175,80,0.7)', border: '#2E7D32' },
    leve: { bg: 'rgba(255,235,59,0.75)', border: '#F9A825' },
    moderada: { bg: 'rgba(255,152,0,0.7)', border: '#E65100' },
    grave: { bg: 'rgba(244,67,54,0.7)', border: '#B71C1C' }
};
const sevLabels = { ninguna: 'Normal', leve: 'Leve', moderada: 'Moderada', grave: 'Grave' };
const highlightStyle = { bg: 'rgba(0,0,0,0.85)', border: '#000', radius: 12, borderWidth: 3 };

function buildDatasets(points, selectedId, xKey, yKey, isBubble) {
    const groups = {};
    let highlightedPt = null;

    points.forEach(pt => {
        const s = pt.severidad;
        if (!groups[s]) groups[s] = [];
        if (selectedId && pt.id === selectedId) {
            highlightedPt = pt;
        } else {
            groups[s].push(pt);
        }
    });

    const SEV_ORDER = ['ninguna', 'leve', 'moderada', 'grave'];
    const datasets = SEV_ORDER.filter(sev => groups[sev]).map(sev => {
        const pts = groups[sev];
        const base = {
            label: sevLabels[sev] || sev,
            data: pts,
            backgroundColor: sevColors[sev]?.bg || 'rgba(128,128,128,0.7)',
            borderColor: sevColors[sev]?.border || '#666',
            borderWidth: 1.5
        };
        if (isBubble) {
            base.hoverRadius = 3;
        } else {
            base.pointRadius = 7;
            base.pointHoverRadius = 10;
        }
        return base;
    });

    if (highlightedPt) {
        const selName = PATIENTS.find(p => p.id === selectedId)?.nombre || '';
        const ds = {
            label: '● ' + selName,
            data: [highlightedPt],
            backgroundColor: highlightStyle.bg,
            borderColor: highlightStyle.border,
            borderWidth: highlightStyle.borderWidth
        };
        if (isBubble) {
            ds.hoverRadius = 4;
            // Make the highlighted bubble bigger
            ds.data = [{ ...highlightedPt, r: Math.max((highlightedPt.r || 8) + 4, 14) }];
        } else {
            ds.pointRadius = highlightStyle.radius;
            ds.pointHoverRadius = 15;
            ds.pointStyle = 'rectRounded';
        }
        datasets.push(ds);
    }

    return datasets;
}

function renderClustering() {
    const main = document.getElementById('main-content');

    main.innerHTML = `
        <div class="clustering-container fade-in">
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;margin-bottom:1rem">
                <div class="section-title" style="margin-bottom:0">
                    <svg viewBox="0 0 20 20" width="20" height="20"><circle cx="6" cy="14" r="2" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="14" cy="6" r="2" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="15" cy="13" r="2" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
                    Clustering de Pacientes
                </div>
                <div class="patient-list-selector">
                    <span class="text-sm" style="font-weight:600;color:var(--gray-700)">Destacar:</span>
                    <select id="cluster-patient-select" class="patient-dropdown">
                        <option value="">Ninguno</option>
                        ${PATIENTS.map(pt => `<option value="${pt.id}">${pt.nombre} (IAH ${pt.respiratorio.iah})</option>`).join('')}
                    </select>
                </div>
            </div>

            <!-- t-SNE clustering -->
            <div class="card mb-2">
                <div class="card-header"><strong>Mapa de Similitud Clínica (proyección multidimensional)</strong></div>
                <div class="card-body">
                    <div class="chart-wrapper" style="height:380px"><canvas id="cluster-tsne"></canvas></div>
                </div>
            </div>

            <div class="grid-2 mb-2">
                <!-- IAH vs SpO2 -->
                <div class="card">
                    <div class="card-header"><strong>IAH vs SpO₂ Media</strong></div>
                    <div class="card-body">
                        <div class="chart-wrapper" style="height:320px"><canvas id="cluster-main"></canvas></div>
                    </div>
                </div>

                <!-- IAH vs CT90 -->
                <div class="card">
                    <div class="card-header"><strong>IAH vs CT90</strong></div>
                    <div class="card-body">
                        <div class="chart-wrapper" style="height:320px"><canvas id="cluster-secondary"></canvas></div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const renderAll = (selId) => {
        destroyClusteringCharts();
        renderClusterTSNE(selId);
        renderClusterMain(selId);
        renderClusterSecondary(selId);
    };

    document.getElementById('cluster-patient-select').addEventListener('change', (e) => {
        const selId = e.target.value ? parseInt(e.target.value) : null;
        renderAll(selId);
    });

    renderAll(null);
}

// ---- t-SNE clustering chart ----
function renderClusterTSNE(selectedPatient = null) {
    const ctx = document.getElementById('cluster-tsne');
    const tsnePoints = computeFakeTSNE();

    // Add severity to points
    const points = tsnePoints.map(pt => {
        const p = PATIENTS.find(pa => pa.id === pt.id);
        return { ...pt, severidad: p.severidad };
    });

    const datasets = buildDatasets(points, selectedPatient, 'x', 'y', false);

    clusterChart3 = new Chart(ctx, {
        type: 'scatter',
        data: { datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: ctx => {
                            const pt = ctx.raw;
                            const p = PATIENTS.find(pa => pa.id === pt.id);
                            return [pt.label, `Severidad: ${p.severidad}`, `IAH: ${p.respiratorio.iah}/h`];
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Componente 1', font: { weight: 'bold' } },
                    grid: { color: '#F0F0F0' },
                    ticks: { display: false }
                },
                y: {
                    title: { display: true, text: 'Componente 2', font: { weight: 'bold' } },
                    grid: { color: '#F0F0F0' },
                    ticks: { display: false }
                }
            }
        }
    });
}

// ---- IAH vs SpO2 ----
function renderClusterMain(selectedPatient = null) {
    const ctx = document.getElementById('cluster-main');

    const points = PATIENTS.map(p => ({
        x: p.respiratorio.iah,
        y: p.oximetria.spo2_media,
        r: 8,
        label: p.nombre,
        id: p.id,
        severidad: p.severidad
    }));

    const datasets = buildDatasets(points, selectedPatient, 'x', 'y', true);

    const severityZonesPlugin = {
        id: 'severityZonesMain',
        beforeDatasetsDraw(chart) {
            const { ctx, scales: { x, y } } = chart;
            const zones = [
                { xMin: 0, xMax: 5, color: 'rgba(76,175,80,0.08)' },
                { xMin: 5, xMax: 15, color: 'rgba(255,235,59,0.10)' },
                { xMin: 15, xMax: 30, color: 'rgba(255,152,0,0.08)' },
                { xMin: 30, xMax: 100, color: 'rgba(244,67,54,0.08)' }
            ];
            zones.forEach(z => {
                const left = x.getPixelForValue(z.xMin);
                const right = x.getPixelForValue(Math.min(z.xMax, x.max));
                const top = y.getPixelForValue(y.max);
                const bottom = y.getPixelForValue(y.min);
                ctx.fillStyle = z.color;
                ctx.fillRect(left, top, right - left, bottom - top);
            });
            ctx.setLineDash([5, 5]);
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(0,0,0,0.12)';
            [5, 15, 30].forEach(v => {
                const px = x.getPixelForValue(v);
                ctx.beginPath();
                ctx.moveTo(px, y.getPixelForValue(y.max));
                ctx.lineTo(px, y.getPixelForValue(y.min));
                ctx.stroke();
            });
            ctx.setLineDash([]);
        }
    };

    clusterChart1 = new Chart(ctx, {
        type: 'bubble',
        data: { datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: ctx => {
                            const pt = ctx.raw;
                            return [`${pt.label}`, `IAH: ${pt.x}/h`, `SpO₂: ${pt.y}%`];
                        }
                    }
                }
            },
            scales: {
                x: { title: { display: true, text: 'IAH (eventos/hora)', font: { weight: 'bold' } }, min: 0, max: 100, grid: { color: '#F0F0F0' } },
                y: { title: { display: true, text: 'SpO₂ Media (%)', font: { weight: 'bold' } }, min: 70, max: 100, grid: { color: '#F0F0F0' } }
            }
        },
        plugins: [severityZonesPlugin]
    });
}

// ---- IAH vs CT90 ----
function renderClusterSecondary(selectedPatient = null) {
    const ctx = document.getElementById('cluster-secondary');

    const points = PATIENTS.map(p => ({
        x: p.respiratorio.iah,
        y: p.oximetria.ct90,
        label: p.nombre,
        id: p.id,
        severidad: p.severidad
    }));

    const datasets = buildDatasets(points, selectedPatient, 'x', 'y', false);

    const severityZonesPlugin = {
        id: 'severityZonesSecondary',
        beforeDatasetsDraw(chart) {
            const { ctx, scales: { x, y } } = chart;
            const zones = [
                { xMin: 0, xMax: 5, color: 'rgba(76,175,80,0.08)' },
                { xMin: 5, xMax: 15, color: 'rgba(255,235,59,0.10)' },
                { xMin: 15, xMax: 30, color: 'rgba(255,152,0,0.08)' },
                { xMin: 30, xMax: 100, color: 'rgba(244,67,54,0.08)' }
            ];
            zones.forEach(z => {
                const left = x.getPixelForValue(z.xMin);
                const right = x.getPixelForValue(Math.min(z.xMax, x.max));
                const top = y.getPixelForValue(y.max);
                const bottom = y.getPixelForValue(y.min);
                ctx.fillStyle = z.color;
                ctx.fillRect(left, top, right - left, bottom - top);
            });
            ctx.setLineDash([5, 5]);
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(0,0,0,0.12)';
            [5, 15, 30].forEach(v => {
                const px = x.getPixelForValue(v);
                ctx.beginPath();
                ctx.moveTo(px, y.getPixelForValue(y.max));
                ctx.lineTo(px, y.getPixelForValue(y.min));
                ctx.stroke();
            });
            ctx.setLineDash([]);
        }
    };

    clusterChart2 = new Chart(ctx, {
        type: 'scatter',
        data: { datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: ctx => {
                            const pt = ctx.raw;
                            return `${pt.label}: IAH ${pt.x}, CT90: ${pt.y}%`;
                        }
                    }
                }
            },
            scales: {
                x: { title: { display: true, text: 'IAH (eventos/hora)', font: { weight: 'bold' } }, min: 0, grid: { color: '#F0F0F0' } },
                y: { title: { display: true, text: 'CT90 (%)', font: { weight: 'bold' } }, min: 0, grid: { color: '#F0F0F0' } }
            }
        },
        plugins: [severityZonesPlugin]
    });
}
