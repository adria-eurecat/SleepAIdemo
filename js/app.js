// ============================================================
// SleepAI — App principal: Navegació, Pipeline, Pacients
// ============================================================

(function () {
    'use strict';

    const main = document.getElementById('main-content');
    let currentTab = 'upload';
    let currentPipelinePatient = 1;
    let currentPatientId = 1;

    // ---- Navigation ----
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            if (tab.dataset.tab === currentTab) return;
            document.querySelector('.nav-tab.active').classList.remove('active');
            tab.classList.add('active');
            currentTab = tab.dataset.tab;
            renderTab(currentTab);
        });
    });

    function renderTab(tab) {
        if (typeof destroyMetricsCharts === 'function') destroyMetricsCharts();
        if (typeof destroyClusteringCharts === 'function') destroyClusteringCharts();

        switch (tab) {
            case 'upload': renderUpload(); break;
            case 'pipeline': renderPipeline(); break;
            case 'pacientes': renderPacientes(); break;
            case 'graph': renderKnowledgeGraph(); break;
            case 'clustering': renderClustering(); break;
        }
    }

    // ================================================================
    //  UPLOAD / LANDING VIEW
    // ================================================================
    function renderUpload() {
        main.innerHTML = `
            <div class="upload-landing fade-in">
                <h2>Sube un informe clínico</h2>
                <p class="upload-subtitle">Arrastra un archivo o selecciónalo desde tu equipo para iniciar el análisis</p>
                <div class="upload-dropzone" id="upload-dropzone">
                    <input type="file" id="upload-input" />
                    <div class="upload-dropzone-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/>
                            <line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                    </div>
                    <div class="upload-dropzone-text">
                        Arrastra tu informe aquí<br/>o <span>selecciona un archivo</span>
                    </div>
                    <div class="upload-dropzone-hint">PDF, DOCX, TXT — cualquier formato</div>
                </div>
            </div>`;

        const dropzone = document.getElementById('upload-dropzone');
        const fileInput = document.getElementById('upload-input');

        ['dragenter', 'dragover'].forEach(e =>
            dropzone.addEventListener(e, ev => { ev.preventDefault(); dropzone.classList.add('drag-over'); })
        );
        ['dragleave', 'drop'].forEach(e =>
            dropzone.addEventListener(e, () => dropzone.classList.remove('drag-over'))
        );

        dropzone.addEventListener('drop', ev => {
            ev.preventDefault();
            const file = ev.dataTransfer.files[0];
            if (file) startFakeProcessing(file.name);
        });

        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            if (file) startFakeProcessing(file.name);
        });
    }

    function startFakeProcessing(fileName) {
        const steps = [
            { msg: 'Cargando documento…', sub: 'Leyendo contenido del archivo', pct: 30 },
            { msg: 'Procesando con NLP…', sub: 'Extrayendo entidades clínicas', pct: 70 },
            { msg: 'Análisis completado', sub: 'Estructurando datos del paciente', pct: 100 }
        ];

        main.innerHTML = `
            <div class="upload-processing fade-in">
                <div class="upload-file-chip">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    ${fileName}
                </div>
                <div class="upload-spinner" id="upload-spinner"></div>
                <div class="upload-status-msg" id="upload-msg">${steps[0].msg}</div>
                <div class="upload-status-sub" id="upload-sub">${steps[0].sub}</div>
                <div class="upload-progress-bar"><div class="upload-progress-fill" id="upload-fill"></div></div>
            </div>`;

        const msgEl = document.getElementById('upload-msg');
        const subEl = document.getElementById('upload-sub');
        const fillEl = document.getElementById('upload-fill');
        const spinnerEl = document.getElementById('upload-spinner');

        // Step 0 — immediate (Cargando documento, 2s)
        setTimeout(() => { fillEl.style.width = steps[0].pct + '%'; }, 80);

        // Step 1 — 2s (Procesando con NLP, 3s)
        setTimeout(() => {
            msgEl.textContent = steps[1].msg;
            subEl.textContent = steps[1].sub;
            fillEl.style.width = steps[1].pct + '%';
        }, 2000);

        // Step 2 — 5s (Completado)
        setTimeout(() => {
            msgEl.textContent = steps[2].msg;
            subEl.textContent = steps[2].sub;
            fillEl.style.width = steps[2].pct + '%';
            spinnerEl.outerHTML = `
                <div class="upload-check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                </div>`;
        }, 5000);

        // Navigate to pipeline — 5.8s
        setTimeout(() => {
            const uploadTab = document.querySelector('.nav-tab[data-tab="upload"]');
            const pipelineTab = document.querySelector('.nav-tab[data-tab="pipeline"]');
            if (uploadTab) uploadTab.classList.remove('active');
            if (pipelineTab) pipelineTab.classList.add('active');
            currentTab = 'pipeline';
            renderTab('pipeline');
        }, 5800);
    }

    // ================================================================
    //  PIPELINE VIEW
    // ================================================================
    function renderPipeline() {
        const p = PATIENTS.find(pt => pt.id === currentPipelinePatient);
        const reportHtml = mdToHtml(p.informe_completo);
        const nerHtml = highlightNERFull(p.informe_completo);
        const jsonSample = buildJsonPreview(p);

        main.innerHTML = `
            <div class="pipeline-container fade-in">
                <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;margin-bottom:1rem">
                    <div class="section-title" style="margin-bottom:0">
                        <svg viewBox="0 0 20 20" width="20" height="20"><path d="M3 4h14M3 8h10M3 12h12M3 16h8" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>
                        Del Informe al Conocimiento
                    </div>
                    <div class="patient-list-selector">
                        <select id="pipeline-patient-select" class="patient-dropdown">
                            ${PATIENTS.map(pt => {
                                const b = getSeverityBadge(pt.severidad);
                                return `<option value="${pt.id}" ${pt.id === currentPipelinePatient ? 'selected' : ''}>
                                    ${pt.nombre} — ${b.label} (IAH ${pt.respiratorio.iah})
                                </option>`;
                            }).join('')}
                        </select>
                    </div>
                </div>

                <div class="pipeline-steps">
                    <div class="pipeline-step" id="pipe-step-1">
                        <div class="pipeline-step-label">
                            <span class="pipeline-step-number">1</span> Informe Original
                        </div>
                        <div class="pipeline-text pdf-style">
                            ${reportHtml}
                        </div>
                    </div>

                    <div class="pipeline-arrow" id="pipe-arrow-1">→</div>

                    <div class="pipeline-step" id="pipe-step-2">
                        <div class="pipeline-step-label" style="display:flex;align-items:center;justify-content:space-between">
                            <span><span class="pipeline-step-number">2</span> Extracción NLP</span>
                            <button id="btn-show-json" class="btn-json-popup">{ } Ver datos estructurados</button>
                        </div>
                        <div class="pipeline-text ner-style">
                            ${nerHtml}
                        </div>
                    </div>
                </div>

                <div class="ner-legend">
                    <div class="ner-legend-item"><span class="ner-legend-dot" style="background:#BBDEFB; border-bottom:2px solid #0066CC"></span> Métricas</div>
                    <div class="ner-legend-item"><span class="ner-legend-dot" style="background:#FFCDD2; border-bottom:2px solid #F44336"></span> Diagnóstico</div>
                    <div class="ner-legend-item"><span class="ner-legend-dot" style="background:#C8E6C9; border-bottom:2px solid #4CAF50"></span> Tratamiento</div>
                    <div class="ner-legend-item"><span class="ner-legend-dot" style="background:#F3E5F5; border-bottom:2px solid #9C27B0"></span> Síntomas / Comorbilidad</div>
                    <div class="ner-legend-item"><span class="ner-legend-dot" style="background:#FFF3E0; border-bottom:2px solid #FF9800"></span> Fármacos</div>
                </div>
            </div>

            <!-- JSON Modal -->
            <div id="json-modal" class="json-modal-overlay" style="display:none">
                <div class="json-modal-box">
                    <div class="json-modal-header">
                        <span><span class="pipeline-step-number">3</span> Datos Estructurados — ${p.nombre}</span>
                        <button id="btn-close-json" class="json-modal-close">&times;</button>
                    </div>
                    <div class="pipeline-text json-style" style="max-height:70vh;border-radius:0 0 8px 8px;border-top:none">
                        <pre>${jsonSample}</pre>
                    </div>
                </div>
            </div>
        `;

        // Bind patient selector
        document.getElementById('pipeline-patient-select').addEventListener('change', (e) => {
            currentPipelinePatient = parseInt(e.target.value);
            renderPipeline();
        });

        // JSON modal
        document.getElementById('btn-show-json').addEventListener('click', () => {
            document.getElementById('json-modal').style.display = 'flex';
        });
        document.getElementById('btn-close-json').addEventListener('click', () => {
            document.getElementById('json-modal').style.display = 'none';
        });
        document.getElementById('json-modal').addEventListener('click', (e) => {
            if (e.target.id === 'json-modal') document.getElementById('json-modal').style.display = 'none';
        });

        // Animate steps
        setTimeout(() => document.getElementById('pipe-step-1').classList.add('visible'), 200);
        setTimeout(() => document.getElementById('pipe-arrow-1').classList.add('visible'), 600);
        setTimeout(() => document.getElementById('pipe-step-2').classList.add('visible'), 800);
    }

    window.highlightNERFull = highlightNERFull;
    function highlightNERFull(md) {
        let t = mdToHtml(md);

        // Helper: wrap with NER span (avoids double-tagging)
        const ner = (cls, text) => `<span class="${cls}">${text}</span>`;

        // ── Fármacos ──
        const drugs = [
            'Citalopram', 'citalopram', 'Alprazolam', 'alprazolam', 'Zaldiar', 'Lexatin',
            'Sertralina', 'sertralina', 'Enalapril', 'Lorazepam', 'Atorvastatina',
            'Metformina', 'Losartán', 'Gabapentina', 'Amlodipino', 'Paracetamol',
            'Omeprazol', 'Valsartán', 'Simvastatina', 'Levotiroxina', 'Pregabalina',
            'Duloxetina', 'Tiotropio', 'Irbesartán', 'Insulina glargina', 'Insulina',
            'Apixabán', 'Bisoprolol', 'Espironolactona', 'Furosemida', 'Ramipril',
            'Pramipexol', 'Hierro oral', 'Calcio', 'Vitamina D', 'Trazodona',
            'Budesonida', 'Formoterol', 'Budesonida/Formoterol'
        ];
        drugs.forEach(d => {
            t = t.replace(new RegExp('(?<![\\w>])(' + d.replace('/', '\\/') + ')(?![\\w<])', 'g'), ner('ner-farmaco', '$1'));
        });

        // ── Parameter + Value pairs (metrics) ──
        // These capture the clinical parameter name TOGETHER with its numeric value

        // Demographic / anthropometric
        t = t.replace(/((?:Edad|edad)[:\s]*?)(\d+)\s*(años)/gi, '$1' + ner('ner-metric', '$2 $3'));
        t = t.replace(/((?:Altura|Talla)[:\s]*?)(\d+\.?\d*)\s*(cm)/gi, '$1' + ner('ner-metric', '$2 $3'));
        t = t.replace(/((?:Peso)[:\s]*?)(\d+\.?\d*)\s*(kgs?)/gi, '$1' + ner('ner-metric', '$2 $3'));
        t = t.replace(/(IMC[:\s]*?)(\d+\.?\d*)\s*(kg\/m²)/gi, ner('ner-metric', '$1$2 $3'));
        t = t.replace(/(Perímetro (?:cuello|cintura|cadera)[:\s]*?)(\d+)\s*(cm)/gi, ner('ner-metric', '$1$2 $3'));
        t = t.replace(/(Tensión Arterial[:\s]*?)(\d+\/\d+)/gi, ner('ner-metric', '$1$2'));
        t = t.replace(/(Epworth[\s:]*)(\d+)/gi, ner('ner-metric', '$1$2'));

        // Sleep parameters
        t = t.replace(/(tiempo total de sueño[\w\s]*?(?:de|fue|:)\s*)(\d+\.?\d*)\s*(minutos)/gi, ner('ner-metric', 'Tiempo total de sueño: $2 $3'));
        t = t.replace(/((?:tiempo|período|periodo)[\s\w]*registro[\s\w]*?(?:de|fue|:)\s*)(\d+\.?\d*)\s*(minutos)/gi, '$1' + ner('ner-metric', '$2 $3'));
        t = t.replace(/(eficiencia[\s\w]*?(?:del sueño|de sueño)?[\s\w]*?(?:de|del|:)\s*)(\d+\.?\d*)\s*(%)/gi, ner('ner-metric', 'Eficiencia: $2$3'));
        t = t.replace(/((?:posición supina|decúbito supino)[\s\w]*?(?:el|durante el)?\s*)(\d+\.?\d*)\s*(%)/gi, ner('ner-metric', 'Posición supina: $2$3'));
        t = t.replace(/(latencia[\s\w]*?sueño[\s\w]*?(?:de|fue|:)\s*)(\d+\.?\d*)\s*(minutos)/gi, ner('ner-metric', 'Latencia sueño: $2 $3'));
        t = t.replace(/(latencia[\s]*REM[\s\w]*?(?:de|fue|:)\s*)(\d+\.?\d*)\s*(minutos)/gi, ner('ner-metric', 'Latencia REM: $2 $3'));
        t = t.replace(/(vigilia[\s\w]*?(?:de|total de|:)\s*)(\d+\.?\d*)\s*(minutos)/gi, ner('ner-metric', 'Vigilia intrasueño: $2 $3'));
        t = t.replace(/(\d+)\s*(despertares?)/gi, ner('ner-metric', '$1 $2'));

        // Sleep stages — highlight stage + percentage together
        t = t.replace(/(\*?\*?N1\*?\*?[\s:]*?)(\d+\.?\d*)\s*(%)/g, ner('ner-metric', 'N1 $2$3'));
        t = t.replace(/(\*?\*?N2\*?\*?[\s:]*?)(\d+\.?\d*)\s*(%)/g, ner('ner-metric', 'N2 $2$3'));
        t = t.replace(/(\*?\*?N3\*?\*?[\s:]*?)(\d+\.?\d*)\s*(%)/g, ner('ner-metric', 'N3 $2$3'));
        t = t.replace(/(\*?\*?(?:R|REM)\*?\*?[\s:]*?)(\d+\.?\d*)\s*(%)/g, ner('ner-metric', 'REM $2$3'));

        // Arousals
        t = t.replace(/(índice[\s\w]*arousals[\s\w]*?(?:de|fue|:)\s*)(\d+\.?\d*)/gi, ner('ner-metric', 'Arousals: $2/h'));
        t = t.replace(/(arousals[\s\w]*respiratorios[\s\w]*?(?:de|fue|:)\s*)(\d+\.?\d*)/gi, ner('ner-metric', 'Arousals resp.: $2/h'));
        t = t.replace(/(índice de PLM[\s\w]*?(?:de|fue|:)\s*)(\d+\.?\d*)/gi, ner('ner-metric', 'PLM: $2/h'));
        t = t.replace(/(arousals[\s\w]*PLM[s]?[\s\w]*?(?:de|fue|:)\s*)(\d+\.?\d*)/gi, ner('ner-metric', 'Arousals PLM: $2/h'));

        // Respiratory events
        t = t.replace(/(\d+)\s*(apneas)/gi, ner('ner-metric', '$1 $2'));
        t = t.replace(/(\d+)\s*(hipopneas)/gi, ner('ner-metric', '$1 $2'));
        t = t.replace(/(\d+)\s*(centrales)/gi, ner('ner-metric', '$1 $2'));
        t = t.replace(/(\d+)\s*(mixtas)/gi, ner('ner-metric', '$1 $2'));
        t = t.replace(/(\d+)\s*(obstructivas)/gi, ner('ner-metric', '$1 $2'));

        // IAH (various forms)
        t = t.replace(/(IAH[\s\)]*[\s\w]*?(?:de|fue|:)\s*\*?\*?)(\d+\.?\d*)/g, ner('ner-metric', 'IAH $2'));
        t = t.replace(/(IAH en supino[\s\w]*?(?:de|fue|:)\s*)(\d+\.?\d*)/gi, ner('ner-metric', 'IAH supino: $2'));
        t = t.replace(/(IAH no supino[\s\w]*?(?:de|fue|:)\s*)(\d+\.?\d*)/gi, ner('ner-metric', 'IAH no supino: $2'));
        t = t.replace(/(IAH supino[\s\w]*?(?:de|fue|:)\s*)(\d+\.?\d*)/gi, ner('ner-metric', 'IAH supino: $2'));
        t = t.replace(/(IAH[\s\w]*REM[\s\w]*?(?:de|fue|:)\s*)(\d+\.?\d*)/gi, ner('ner-metric', 'IAH REM: $2'));
        t = t.replace(/(IAH[\s\w]*no REM[\s\w]*?(?:de|fue|:)\s*)(\d+\.?\d*)/gi, ner('ner-metric', 'IAH no REM: $2'));

        // Oximetry
        t = t.replace(/(saturación media[\s\w]*?(?:de|fue|del|:)\s*)(\d+)\s*(%?)/gi, ner('ner-metric', 'SpO₂ media: $2%'));
        t = t.replace(/((?:nadir|desaturación más baja|valor mínimo)[\s\w]*?(?:de|del|fue|:)\s*)(\d+)\s*(%?)/gi, ner('ner-metric', 'SpO₂ mín: $2%'));
        t = t.replace(/(CT-?90[\s\w]*?(?:de|del|fue|:)?\s*)(\d+\.?\d*)\s*(%)/gi, ner('ner-metric', 'CT-90: $2$3'));
        t = t.replace(/(desaturaciones[\s\w]*?≥?\s*3%[\s\w]*?(?:de|fueron|:)\s*\*?\*?)(\d+\.?\d*)/gi, ner('ner-metric', 'Desat ≥3%/h: $2'));

        // Standalone metric labels (only if not already inside a ner-metric span)
        t = t.replace(/(?<!ner-metric">)\b(SpO[₂2])\b(?![^<]*<\/span>)/g, ner('ner-metric', '$1'));
        t = t.replace(/(?<!ner-metric">)\b(SaO[₂2])\b(?![^<]*<\/span>)/g, ner('ner-metric', '$1'));

        // ── Symptoms & Comorbidities ──
        const symptoms = [
            'roncadora', 'roncador', 'apneas (?:observadas|presenciadas)', 'somnolencia diurna',
            'ronquidos intermitentes', 'limitación inspiratoria',
            'microdespertares', 'desaturación', 'hipoxia nocturna',
            'hipoxemia nocturna', 'hipoxemia',
            'asma(?:\\s+bronquial)?', 'trastorno depresivo(?:\\s+mayor)?', 'hipotiroidismo',
            'hipertensión arterial', 'diabetes mellitus(?:\\s+tipo\\s+\\d)?',
            'dislipemia', 'fibrilación auricular', 'EPOC', 'obesidad(?:\\s+mórbida)?',
            'insuficiencia cardíaca', 'ferropenia',
            'movimientos periódicos de piernas', 'roncopatía'
        ];
        symptoms.forEach(s => {
            t = t.replace(new RegExp('(?<![\\w>])(' + s + ')(?![\\w<])', 'gi'), ner('ner-symptom', '$1'));
        });

        // ── Diagnosis ──
        t = t.replace(/(Apnea Obstructiva del Sueño[^<.;]*)/g, ner('ner-diagnosis', '$1'));
        t = t.replace(/(No compatible con[^<.;]*Sueño)/gi, ner('ner-diagnosis', '$1'));
        t = t.replace(/(AOS (?:leve|moderad[oa]|grave|gravísim[oa])[^<.;]*)/g, ner('ner-diagnosis', '$1'));

        // ── Treatment ──
        t = t.replace(/\b(CPAP)\b/g, ner('ner-treatment', '$1'));
        t = t.replace(/(titulación[^<.;]*hospitalaria)/gi, ner('ner-treatment', '$1'));

        // Clean up any double-nested spans from overlapping regexes
        t = t.replace(/<span class="ner-metric"><span class="ner-metric">([^<]*)<\/span><\/span>/g, '<span class="ner-metric">$1</span>');

        return t;
    }

    function buildJsonPreview(p) {
        const obj = {
            paciente: p.nombre,
            demograficos: {
                edad: p.demograficos.edad,
                sexo: p.demograficos.sexo,
                IMC: p.demograficos.imc
            },
            respiratorio: {
                apneas: { total: p.respiratorio.apneas_total, obstructivas: p.respiratorio.apneas_obstructivas, centrales: p.respiratorio.apneas_centrales },
                hipopneas: p.respiratorio.hipopneas,
                IAH: p.respiratorio.iah,
                IAH_supino: p.respiratorio.iah_supino,
                IAH_REM: p.respiratorio.iah_rem
            },
            oximetria: {
                SpO2_media: p.oximetria.spo2_media,
                SpO2_min: p.oximetria.spo2_min,
                CT90: p.oximetria.ct90
            },
            diagnostico: p.diagnostico,
            severidad: p.severidad,
            tratamiento: p.tratamiento
        };
        return syntaxHighlightJSON(JSON.stringify(obj, null, 2));
    }

    function syntaxHighlightJSON(json) {
        return json
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"([^"]+)":/g, '<span style="color:#0066CC">"$1"</span>:')
            .replace(/: "([^"]+)"/g, ': <span style="color:#2E7D32">"$1"</span>')
            .replace(/: (\d+\.?\d*)/g, ': <span style="color:#E65100">$1</span>')
            .replace(/: (null)/g, ': <span style="color:#9E9E9E">$1</span>');
    }

    // ================================================================
    //  PACIENTES VIEW — Single patient with integrated metrics + stats
    // ================================================================
    function renderPacientes() {
        const p = PATIENTS.find(pt => pt.id === currentPatientId);
        const badge = getSeverityBadge(p.severidad);

        main.innerHTML = `
            <div class="fade-in">
                <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;margin-bottom:1.25rem">
                    <div class="section-title" style="margin-bottom:0">
                        <svg viewBox="0 0 20 20" width="20" height="20"><circle cx="10" cy="6" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M4 18c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
                        Ficha del Paciente
                    </div>
                    <div class="patient-list-selector">
                        <select id="paciente-select" class="patient-dropdown">
                            ${PATIENTS.map(pt => {
                                const b = getSeverityBadge(pt.severidad);
                                return `<option value="${pt.id}" ${pt.id === currentPatientId ? 'selected' : ''}>
                                    ${pt.nombre} — ${b.label} (IAH ${pt.respiratorio.iah})
                                </option>`;
                            }).join('')}
                        </select>
                    </div>
                </div>

                <!-- Patient Header Card -->
                <div class="card mb-2">
                    <div class="card-header" style="background:linear-gradient(135deg, var(--blue-50) 0%, var(--white) 100%)">
                        <div>
                            <div class="patient-name" style="font-size:1.2rem">${p.nombre}</div>
                            <div class="text-sm text-muted">${p.tipo_estudio}</div>
                        </div>
                        <span class="badge" style="background:${badge.bg};color:${badge.color};border:1px solid ${badge.color};font-size:0.85rem;padding:0.35rem 1rem">
                            ● ${badge.label}
                        </span>
                    </div>
                    <div class="card-body">
                        <div class="patient-chips">
                            ${p.demograficos.edad ? `<div class="patient-chip"><span class="chip-label">Edad</span><span class="chip-value">${p.demograficos.edad} años</span></div>` : ''}
                            ${p.demograficos.sexo ? `<div class="patient-chip"><span class="chip-label">Sexo</span><span class="chip-value">${p.demograficos.sexo}</span></div>` : ''}
                            ${p.demograficos.imc ? `<div class="patient-chip"><span class="chip-label">IMC</span><span class="chip-value">${p.demograficos.imc} kg/m²</span></div>` : ''}
                            ${p.demograficos.perimetro_cuello ? `<div class="patient-chip"><span class="chip-label">Cuello</span><span class="chip-value">${p.demograficos.perimetro_cuello} cm</span></div>` : ''}
                            ${p.epworth !== null ? `<div class="patient-chip"><span class="chip-label">Epworth</span><span class="chip-value">${p.epworth}/24</span></div>` : ''}
                            ${p.demograficos.tension_arterial ? `<div class="patient-chip"><span class="chip-label">T.A.</span><span class="chip-value">${p.demograficos.tension_arterial}</span></div>` : ''}
                        </div>
                        ${p.antecedentes.length ? `<div class="text-sm mt-1"><strong>Antecedentes:</strong> ${p.antecedentes.join(', ')}</div>` : ''}
                        ${p.farmacos.length ? `<div class="text-sm mt-1"><strong>Psicofármacos:</strong> ${p.farmacos.join(', ')}</div>` : ''}
                    </div>
                </div>

                <!-- Semáforo Clínico with population stats -->
                <div class="card mb-2">
                    <div class="card-header">
                        <strong>Indicadores Clave — Posición respecto a la cohorte</strong>
                        <span class="text-sm text-muted">n = ${PATIENTS.length} pacientes</span>
                    </div>
                    <div class="card-body">
                        <div class="semaforo-grid">
                            ${renderSemaforoWithStats(p)}
                        </div>
                    </div>
                </div>

                <!-- Charts Row -->
                <div class="grid-2 mb-2">
                    <div class="card">
                        <div class="card-header"><strong>Perfil Multidimensional</strong></div>
                        <div class="card-body">
                            <div class="chart-wrapper" style="height:280px"><canvas id="radar-chart"></canvas></div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header"><strong>Arquitectura del Sueño</strong></div>
                        <div class="card-body">
                            <div class="chart-wrapper" style="height:280px"><canvas id="architecture-chart"></canvas></div>
                        </div>
                    </div>
                </div>

                <!-- Events + Diagnosis -->
                <div class="grid-2">
                    <div class="card">
                        <div class="card-header"><strong>Eventos Respiratorios</strong></div>
                        <div class="card-body">
                            <div class="chart-wrapper" style="height:250px"><canvas id="events-chart"></canvas></div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header"><strong>Diagnóstico y Recomendación</strong></div>
                        <div class="card-body">
                            <div style="border-left:4px solid ${badge.color};padding-left:1rem;margin-bottom:1rem">
                                <div class="text-sm" style="font-weight:600;color:var(--red);margin-bottom:0.25rem">Diagnóstico</div>
                                <div style="font-weight:600">${p.diagnostico}</div>
                            </div>
                            <div style="border-left:4px solid var(--green);padding-left:1rem;margin-bottom:1rem">
                                <div class="text-sm" style="font-weight:600;color:var(--green);margin-bottom:0.25rem">Recomendación</div>
                                <div class="text-sm">${p.recomendacion}</div>
                            </div>
                            <div style="border-left:4px solid var(--blue-600);padding-left:1rem">
                                <div class="text-sm" style="font-weight:600;color:var(--blue-600);margin-bottom:0.25rem">Comentario Clínico</div>
                                <div class="text-sm" style="color:var(--gray-700);font-style:italic">${p.comentario}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Bind patient selector
        document.getElementById('paciente-select').addEventListener('change', (e) => {
            currentPatientId = parseInt(e.target.value);
            destroyMetricsCharts();
            renderPacientes();
        });

        // Render charts
        renderRadarSingle(p);
        renderArchitectureSingle(p);
        renderEventsSingle(p);
    }

    function renderSemaforoWithStats(p) {
        const metrics = [
            { key: 'iah', label: 'IAH', value: p.respiratorio.iah, unit: '/h', desc: 'Índice Apnea-Hipopnea' },
            { key: 'spo2_media', label: 'SpO₂ Media', value: p.oximetria.spo2_media, unit: '%', desc: 'Saturación media O₂' },
            { key: 'spo2_min', label: 'SpO₂ Mín', value: p.oximetria.spo2_min, unit: '%', desc: 'Saturación mínima O₂' },
            { key: 'ct90', label: 'CT90', value: p.oximetria.ct90, unit: '%', desc: 'Tiempo con SpO₂ < 90%' },
            { key: 'eficiencia', label: 'Eficiencia', value: p.sueno.eficiencia, unit: '%', desc: 'Eficiencia del sueño' },
            { key: 'plm_index', label: 'PLM Index', value: p.plm ? p.plm.index : null, unit: '/h', desc: 'Mov. periódicos piernas' },
            { key: 'arousals', label: 'Arousals', value: p.arousals ? p.arousals.total : null, unit: '/h', desc: 'Microdespertares' },
            { key: 'desaturaciones', label: 'Desat ≥3%', value: p.oximetria.desaturaciones_3pct, unit: '/h', desc: 'Desaturaciones ≥3%' }
        ];

        return metrics.map(m => {
            if (m.value === null || m.value === undefined) return '';
            const sev = getSeverity(m.key, m.value);
            const stats = computePopulationStats(m.key);
            const percentile = getPercentileRank(m.key, m.value);

            let barHtml = '';
            if (stats && stats.n > 1) {
                const lo = stats.min;
                const hi = stats.max;
                const range = hi - lo || 1;
                const pct = v => Math.max(0, Math.min(100, ((v - lo) / range) * 100));
                const q1p = pct(stats.q1);
                const medp = pct(stats.median);
                const q3p = pct(stats.q3);
                const valp = pct(m.value);

                barHtml = `
                    <div class="ind-bar-wrap">
                        <div class="ind-bar-track">
                            <div class="ind-bar-iqr" style="left:${q1p}%;width:${q3p - q1p}%"></div>
                            <div class="ind-bar-tick" style="left:${q1p}%" title="Q1: ${stats.q1}"></div>
                            <div class="ind-bar-tick ind-bar-tick-med" style="left:${medp}%" title="Mediana: ${stats.median}"></div>
                            <div class="ind-bar-tick" style="left:${q3p}%" title="Q3: ${stats.q3}"></div>
                            <div class="ind-bar-dot" style="left:${valp}%;background:${sev.color}" title="${m.value} ${m.unit}"></div>
                        </div>
                        <div class="ind-bar-labels">
                            <span class="ind-bar-lbl" style="left:0">${lo}</span>
                            <span class="ind-bar-lbl ind-bar-qlabel" style="left:${q1p}%">Q1</span>
                            <span class="ind-bar-lbl ind-bar-qlabel" style="left:${medp}%">Md</span>
                            <span class="ind-bar-lbl ind-bar-qlabel" style="left:${q3p}%">Q3</span>
                            <span class="ind-bar-lbl" style="right:0;left:auto">${hi}</span>
                        </div>
                    </div>
                    <span class="ind-percentile">P${percentile}</span>
                `;
            }

            return `
            <div class="ind-card">
                <div class="ind-header">
                    <span class="ind-dot" style="background:${sev.color}"></span>
                    <div class="ind-info">
                        <span class="ind-label">${m.label}</span>
                        <span class="ind-desc">${m.desc}</span>
                    </div>
                    <span class="ind-value" style="color:${sev.color}">${m.value}${m.unit}</span>
                    <span class="ind-badge" style="background:${sev.color}18;color:${sev.color}">${sev.label}</span>
                </div>
                ${barHtml}
            </div>`;
        }).join('');
    }

    // ---- Initial render ----
    renderTab('upload');
})();
