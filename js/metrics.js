// ============================================================
// SleepAI — Métricas Visualizations (Chart.js)
// ============================================================

let metricsCharts = [];

function destroyMetricsCharts() {
    metricsCharts.forEach(c => c.destroy());
    metricsCharts = [];
}

function renderMetrics() {
    const main = document.getElementById('main-content');

    main.innerHTML = `
        <div class="metrics-container fade-in">
            <div class="section-title">
                <svg viewBox="0 0 20 20" width="20" height="20"><rect x="2" y="10" width="3" height="8" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="8.5" y="5" width="3" height="13" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="15" y="2" width="3" height="16" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
                Dashboard de Métricas
            </div>

            <div class="metrics-selector">
                <span class="text-sm" style="font-weight:600;color:var(--gray-700)">Paciente:</span>
                <button class="graph-btn active" data-mp="1">Paciente 1</button>
                <button class="graph-btn" data-mp="2">Paciente 2</button>
                <button class="graph-btn" data-mp="3">Paciente 3</button>
                <button class="graph-btn" data-mp="compare">Comparar todos</button>
            </div>

            <!-- Gauges Row -->
            <div class="card">
                <div class="card-header"><strong>Indicadores Clave — Semáforo Clínico</strong></div>
                <div class="card-body">
                    <div class="gauges-row" id="gauges-container"></div>
                </div>
            </div>

            <!-- Radar Chart -->
            <div class="grid-2">
                <div class="card">
                    <div class="card-header"><strong>Perfil Multidimensional</strong></div>
                    <div class="card-body">
                        <div class="chart-wrapper"><canvas id="radar-chart"></canvas></div>
                    </div>
                </div>

                <!-- Sleep Architecture -->
                <div class="card">
                    <div class="card-header"><strong>Arquitectura del Sueño</strong></div>
                    <div class="card-body">
                        <div class="chart-wrapper"><canvas id="architecture-chart"></canvas></div>
                    </div>
                </div>
            </div>

            <!-- Respiratory Events -->
            <div class="card">
                <div class="card-header"><strong>Eventos Respiratorios por Tipo</strong></div>
                <div class="card-body">
                    <div class="chart-wrapper" style="max-height:300px"><canvas id="events-chart"></canvas></div>
                </div>
            </div>
        </div>
    `;

    // Bind patient selector
    document.querySelectorAll('[data-mp]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('[data-mp].active').classList.remove('active');
            btn.classList.add('active');
            destroyMetricsCharts();
            renderMetricsCharts(btn.dataset.mp);
        });
    });

    renderMetricsCharts('1');
}

function renderMetricsCharts(mode) {
    if (mode === 'compare') {
        renderGaugesCompare();
        renderRadarCompare();
        renderArchitectureCompare();
        renderEventsCompare();
    } else {
        const p = PATIENTS.find(pt => pt.id === parseInt(mode));
        renderGaugesSingle(p);
        renderRadarSingle(p);
        renderArchitectureSingle(p);
        renderEventsSingle(p);
    }
}

// ---- Gauges ----
function renderGaugesSingle(p) {
    const container = document.getElementById('gauges-container');
    const gaugeMetrics = [
        { key: 'iah', label: 'IAH', value: p.respiratorio.iah, max: 100, unit: '/h' },
        { key: 'spo2_media', label: 'SpO₂ Media', value: p.oximetria.spo2_media, max: 100, unit: '%', invert: true },
        { key: 'ct90', label: 'CT90', value: p.oximetria.ct90, max: 100, unit: '%' },
        { key: 'eficiencia', label: 'Eficiencia Sueño', value: p.sueno.eficiencia, max: 100, unit: '%', invert: true }
    ];

    container.innerHTML = gaugeMetrics.map((m, i) => `
        <div class="gauge-card">
            <div class="gauge-label">${m.label}</div>
            <div class="chart-wrapper" style="max-width:180px;margin:0 auto"><canvas id="gauge-${i}"></canvas></div>
            <div class="gauge-value" id="gauge-val-${i}">${m.value !== null ? m.value + m.unit : 'N/D'}</div>
            <div class="gauge-status" id="gauge-status-${i}"></div>
        </div>
    `).join('');

    gaugeMetrics.forEach((m, i) => {
        if (m.value === null) return;
        const sev = getSeverity(m.key, m.value);
        document.getElementById(`gauge-val-${i}`).style.color = sev.color;
        document.getElementById(`gauge-status-${i}`).textContent = sev.label;
        document.getElementById(`gauge-status-${i}`).style.color = sev.color;

        const pct = m.invert ? m.value / m.max : Math.min(m.value / m.max, 1);
        const chart = new Chart(document.getElementById(`gauge-${i}`), {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [pct * 100, 100 - pct * 100],
                    backgroundColor: [sev.color, '#E0E0E0'],
                    borderWidth: 0
                }]
            },
            options: {
                circumference: 180,
                rotation: -90,
                cutout: '75%',
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                responsive: true,
                maintainAspectRatio: true
            }
        });
        metricsCharts.push(chart);
    });
}

function renderGaugesCompare() {
    const container = document.getElementById('gauges-container');
    const metrics = ['iah', 'spo2_media', 'ct90', 'eficiencia'];
    const labels = ['IAH (/h)', 'SpO₂ Media (%)', 'CT90 (%)', 'Eficiencia (%)'];

    container.innerHTML = `<div class="chart-wrapper" style="grid-column:1/-1;max-height:280px"><canvas id="gauges-compare-bar"></canvas></div>`;

    const datasets = PATIENTS.map((p, i) => ({
        label: p.nombre,
        data: [
            p.respiratorio.iah,
            p.oximetria.spo2_media,
            p.oximetria.ct90,
            p.sueno.eficiencia || 0
        ],
        backgroundColor: ['#0066CC', '#42A5F5', '#90CAF9'][i],
        borderRadius: 4
    }));

    const chart = new Chart(document.getElementById('gauges-compare-bar'), {
        type: 'bar',
        data: { labels, datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' }
            },
            scales: {
                y: { beginAtZero: true, grid: { color: '#F0F0F0' } },
                x: { grid: { display: false } }
            }
        }
    });
    metricsCharts.push(chart);
}

// ---- Radar Chart ----
function normalizeForRadar(key, value) {
    if (value === null) return 0;
    switch (key) {
        case 'eficiencia': return Math.min(value / 100 * 100, 100);      // Higher = better
        case 'n3':         return Math.min(value / 25 * 100, 100);       // ~20-25% normal
        case 'rem':        return Math.min(value / 25 * 100, 100);       // ~20-25% normal
        case 'iah':        return Math.max(0, 100 - (value / 80 * 100)); // Lower = better (inverted)
        case 'spo2':       return Math.min(value / 100 * 100, 100);      // Higher = better
        case 'plm':        return Math.max(0, 100 - (value / 60 * 100)); // Lower = better (inverted)
        default: return 50;
    }
}

function getRadarData(p) {
    return [
        normalizeForRadar('eficiencia', p.sueno.eficiencia),
        normalizeForRadar('n3', p.arquitectura ? p.arquitectura.N3 : null),
        normalizeForRadar('rem', p.arquitectura ? p.arquitectura.REM : null),
        normalizeForRadar('iah', p.respiratorio.iah),
        normalizeForRadar('spo2', p.oximetria.spo2_media),
        normalizeForRadar('plm', p.plm ? p.plm.index : null)
    ];
}

const radarLabels = ['Eficiencia Sueño', 'Sueño Profundo (N3)', 'Sueño REM', 'IAH (invertido)', 'SpO₂ Media', 'PLM (invertido)'];

function renderRadarSingle(p) {
    const chart = new Chart(document.getElementById('radar-chart'), {
        type: 'radar',
        data: {
            labels: radarLabels,
            datasets: [{
                label: p.nombre,
                data: getRadarData(p),
                backgroundColor: 'rgba(33, 150, 243, 0.15)',
                borderColor: '#2196F3',
                borderWidth: 2,
                pointBackgroundColor: '#2196F3',
                pointRadius: 4
            }, {
                label: 'Referencia Normal',
                data: [85, 80, 85, 94, 97, 100],
                backgroundColor: 'rgba(76, 175, 80, 0.08)',
                borderColor: '#4CAF50',
                borderWidth: 1.5,
                borderDash: [5, 5],
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom', labels: { font: { size: 10 }, padding: 10 } } },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { stepSize: 25, display: false },
                    grid: { color: '#E0E0E0' },
                    pointLabels: { font: { size: 10 } }
                }
            }
        }
    });
    metricsCharts.push(chart);
}

function renderRadarCompare() {
    const colors = [
        { bg: 'rgba(33,150,243,0.12)', border: '#2196F3' },
        { bg: 'rgba(255,152,0,0.12)', border: '#FF9800' },
        { bg: 'rgba(244,67,54,0.12)', border: '#F44336' }
    ];

    const datasets = PATIENTS.map((p, i) => ({
        label: p.nombre,
        data: getRadarData(p),
        backgroundColor: colors[i].bg,
        borderColor: colors[i].border,
        borderWidth: 2,
        pointBackgroundColor: colors[i].border,
        pointRadius: 3
    }));

    datasets.push({
        label: 'Referencia Normal',
        data: [85, 80, 85, 94, 97, 100],
        backgroundColor: 'rgba(76,175,80,0.05)',
        borderColor: '#4CAF50',
        borderWidth: 1.5,
        borderDash: [5, 5],
        pointRadius: 0
    });

    const chart = new Chart(document.getElementById('radar-chart'), {
        type: 'radar',
        data: { labels: radarLabels, datasets },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom' } },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { stepSize: 25, display: false },
                    grid: { color: '#E0E0E0' },
                    pointLabels: { font: { size: 11 } }
                }
            }
        }
    });
    metricsCharts.push(chart);
}

// ---- Sleep Architecture ----
function renderArchitectureSingle(p) {
    if (!p.arquitectura) {
        document.getElementById('architecture-chart').parentElement.innerHTML =
            '<div class="text-center text-muted" style="padding:2rem">Arquitectura del sueño no disponible para este estudio (poligrafía domiciliaria).</div>';
        return;
    }

    const ctx = document.getElementById('architecture-chart');
    const stages = ['N1', 'N2', 'N3', 'REM'];
    const values = [p.arquitectura.N1, p.arquitectura.N2, p.arquitectura.N3, p.arquitectura.REM];
    const normal = [5, 50, 20, 25];
    const colors = ['#EF5350', '#42A5F5', '#1565C0', '#66BB6A'];

    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: stages,
            datasets: [
                {
                    label: p.nombre,
                    data: values,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1,
                    borderRadius: 4,
                    barPercentage: 0.8,
                    categoryPercentage: 0.6
                },
                {
                    label: 'Referencia normal',
                    data: normal,
                    backgroundColor: colors.map(c => c + '30'),
                    borderColor: colors.map(c => c + '99'),
                    borderWidth: 2,
                    borderDash: [4, 4],
                    borderRadius: 4,
                    barPercentage: 0.8,
                    categoryPercentage: 0.6
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { padding: 15, font: { size: 12 }, usePointStyle: true, pointStyle: 'rect' }
                },
                tooltip: {
                    callbacks: {
                        label: ctx => `${ctx.dataset.label}: ${ctx.raw}%`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 70,
                    title: { display: true, text: '% tiempo de sueño', font: { weight: 'bold' } },
                    grid: { color: '#F0F0F0' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
    metricsCharts.push(chart);
}

function renderArchitectureCompare() {
    const stages = ['N1', 'N2', 'N3', 'REM'];
    const colors = ['#90CAF9', '#42A5F5', '#0D47A1', '#FF7043'];

    const datasets = stages.map((stage, i) => ({
        label: stage,
        data: PATIENTS.map(p => p.arquitectura ? p.arquitectura[stage] : 0),
        backgroundColor: colors[i],
        borderRadius: 4
    }));

    const chart = new Chart(document.getElementById('architecture-chart'), {
        type: 'bar',
        data: {
            labels: PATIENTS.map(p => p.nombre),
            datasets
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: ctx => `${ctx.dataset.label}: ${ctx.raw}%`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    stacked: true,
                    title: { display: true, text: '% del sueño' },
                    grid: { color: '#F0F0F0' }
                },
                x: { stacked: true, grid: { display: false } }
            }
        }
    });
    metricsCharts.push(chart);
}

// ---- Respiratory Events ----
function renderEventsSingle(p) {
    const chart = new Chart(document.getElementById('events-chart'), {
        type: 'bar',
        data: {
            labels: ['Apneas Obstructivas', 'Apneas Centrales', 'Apneas Mixtas', 'Hipopneas'],
            datasets: [{
                label: 'Número de eventos',
                data: [
                    p.respiratorio.apneas_obstructivas,
                    p.respiratorio.apneas_centrales,
                    p.respiratorio.apneas_mixtas,
                    p.respiratorio.hipopneas
                ],
                backgroundColor: ['#F44336', '#FF9800', '#FFC107', '#2196F3'],
                borderRadius: 6,
                barPercentage: 0.5
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: {
                    beginAtZero: true,
                    title: { display: true, text: 'Número de eventos' },
                    grid: { color: '#F0F0F0' }
                },
                y: { grid: { display: false } }
            }
        }
    });
    metricsCharts.push(chart);
}

function renderEventsCompare() {
    const colors = ['#0066CC', '#42A5F5', '#90CAF9'];

    const chart = new Chart(document.getElementById('events-chart'), {
        type: 'bar',
        data: {
            labels: ['Apneas Obstructivas', 'Apneas Centrales', 'Hipopneas', 'Total Eventos'],
            datasets: PATIENTS.map((p, i) => ({
                label: p.nombre,
                data: [
                    p.respiratorio.apneas_obstructivas,
                    p.respiratorio.apneas_centrales,
                    p.respiratorio.hipopneas,
                    p.respiratorio.eventos_total
                ],
                backgroundColor: colors[i],
                borderRadius: 4
            }))
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'top' } },
            scales: {
                x: {
                    beginAtZero: true,
                    title: { display: true, text: 'Número de eventos' },
                    grid: { color: '#F0F0F0' }
                },
                y: { grid: { display: false } }
            }
        }
    });
    metricsCharts.push(chart);
}
