// ============================================================
// SleepAI — Knowledge Graph (vis-network)
// ============================================================

let graphNetwork = null;

// Map individual drugs to therapeutic categories
const DRUG_TO_CATEGORY = {
    'Citalopram': 'Antidepresivos',
    'Sertralina': 'Antidepresivos',
    'Duloxetina': 'Antidepresivos',
    'Trazodona': 'Antidepresivos',
    'Alprazolam': 'Ansiolíticos/Sedantes',
    'Lorazepam': 'Ansiolíticos/Sedantes',
    'Lexatin': 'Ansiolíticos/Sedantes',
    'Pregabalina': 'Antiepilépticos/Neuromoduladores',
    'Gabapentina': 'Antiepilépticos/Neuromoduladores',
    'Zaldiar': 'Analgésicos',
    'Paracetamol': 'Analgésicos',
    'Enalapril': 'Antihipertensivos',
    'Losartán': 'Antihipertensivos',
    'Amlodipino': 'Antihipertensivos',
    'Valsartán': 'Antihipertensivos',
    'Irbesartán': 'Antihipertensivos',
    'Ramipril': 'Antihipertensivos',
    'Bisoprolol': 'Antihipertensivos',
    'Atorvastatina': 'Hipolipemiantes',
    'Simvastatina': 'Hipolipemiantes',
    'Metformina': 'Antidiabéticos',
    'Insulina glargina': 'Antidiabéticos',
    'Insulina': 'Antidiabéticos',
    'Omeprazol': 'Protectores gástricos',
    'Levotiroxina': 'Hormonas tiroideas',
    'Tiotropio': 'Broncodilatadores',
    'Budesonida/Formoterol': 'Broncodilatadores',
    'Budesonida': 'Broncodilatadores',
    'Formoterol': 'Broncodilatadores',
    'Apixabán': 'Anticoagulantes',
    'Espironolactona': 'Diuréticos',
    'Furosemida': 'Diuréticos',
    'Pramipexol': 'Agonistas dopaminérgicos',
    'Hierro oral': 'Suplementos',
    'Calcio': 'Suplementos',
    'Vitamina D': 'Suplementos'
};

function getDrugCategory(farmacos) {
    const categories = new Set();
    farmacos.forEach(f => {
        const cat = DRUG_TO_CATEGORY[f] || 'Otros fármacos';
        categories.add(cat);
    });
    return Array.from(categories);
}

function renderKnowledgeGraph() {
    const main = document.getElementById('main-content');
    const allVars = getKGVariables();

    const categoryColors = {
        Paciente: { bg: '#E3F2FD', border: '#0066CC', fg: '#0D2137' },
        Síntomas: { bg: '#F3E5F5', border: '#9C27B0', fg: '#4A148C' },
        Antecedentes: { bg: '#FCE4EC', border: '#E91E63', fg: '#880E4F' },
        Fármacos: { bg: '#FFF3E0', border: '#FF9800', fg: '#E65100' },
        Diagnóstico: { bg: '#FFEBEE', border: '#F44336', fg: '#B71C1C' },
        Tratamiento: { bg: '#E8F5E9', border: '#4CAF50', fg: '#1B5E20' },
        Métricas: { bg: '#E0F2F1', border: '#009688', fg: '#004D40' }
    };

    const patientOptions = PATIENTS.map(pt => `<option value="${pt.id}">${pt.nombre}</option>`).join('');
    const filterCheckboxes = Object.entries(allVars).map(([cat, items]) => {
        const colors = categoryColors[cat];
        const isPatient = cat === 'Paciente';
        return `<label style="display:flex;align-items:center;gap:0.5rem;padding:0.3rem 0.75rem;background:${colors.bg};border:1px solid ${colors.border};border-radius:20px;cursor:${isPatient ? 'default' : 'pointer'};font-size:0.82rem;font-weight:600;color:${colors.fg}">
            <input type="checkbox" data-category="${cat}" checked ${isPatient ? 'disabled' : ''} style="cursor:${isPatient ? 'default' : 'pointer'}">
            ${cat}
        </label>`;
    }).join('');

    main.innerHTML = `
        <div class="graph-container fade-in">
            <div class="section-title">
                <svg viewBox="0 0 20 20" width="20" height="20"><circle cx="10" cy="5" r="2.5" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="4" cy="15" r="2.5" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="16" cy="15" r="2.5" stroke="currentColor" stroke-width="1.5" fill="none"/><line x1="10" y1="7.5" x2="5" y2="12.5" stroke="currentColor" stroke-width="1.2"/><line x1="10" y1="7.5" x2="15" y2="12.5" stroke="currentColor" stroke-width="1.2"/></svg>
                Knowledge Graph — Relaciones Clínicas
            </div>
            <div style="display:flex;gap:1rem;margin-bottom:1rem;flex-wrap:wrap">
                <div>
                    <span class="text-sm" style="font-weight:600;color:var(--gray-700);display:block;margin-bottom:0.5rem">Pacientes:</span>
                    <select id="graph-patient-select" class="patient-dropdown">
                        <option value="all" selected>Todos</option>
                        ${patientOptions}
                    </select>
                </div>
                <div>
                    <span class="text-sm" style="font-weight:600;color:var(--gray-700);display:block;margin-bottom:0.5rem">Mostrar variables:</span>
                    <div id="kg-filters" style="display:flex;gap:0.5rem;flex-wrap:wrap">
                        ${filterCheckboxes}
                    </div>
                </div>
            </div>
            <div id="graph-canvas"></div>
        </div>
    `;

    const filterInputs = document.querySelectorAll('[data-category]');
    const patientSelect = document.getElementById('graph-patient-select');

    const updateGraph = () => {
        const enabledCategories = new Set(Array.from(filterInputs).filter(cb => cb.checked).map(cb => cb.dataset.category));
        const patientId = patientSelect.value === 'all' ? null : parseInt(patientSelect.value);
        buildGraph(patientId, enabledCategories);
    };

    filterInputs.forEach(input => input.addEventListener('change', updateGraph));
    patientSelect.addEventListener('change', updateGraph);

    updateGraph();
}

function buildGraph(patientId = null, enabledCategories = new Set(['Paciente', 'Síntomas', 'Antecedentes', 'Fármacos', 'Diagnóstico', 'Tratamiento', 'Métricas'])) {
    const container = document.getElementById('graph-canvas');
    if (graphNetwork) {
        graphNetwork.destroy();
        graphNetwork = null;
    }

    const nodes = [];
    const edges = [];
    let nodeId = 0;
    const categoryColors = {
        Paciente: { bg: '#E3F2FD', border: '#0066CC', fg: '#0D2137' },
        Síntomas: { bg: '#F3E5F5', border: '#9C27B0', fg: '#4A148C' },
        Antecedentes: { bg: '#FCE4EC', border: '#E91E63', fg: '#880E4F' },
        Fármacos: { bg: '#FFF3E0', border: '#FF9800', fg: '#E65100' },
        Diagnóstico: { bg: '#FFEBEE', border: '#F44336', fg: '#B71C1C' },
        Tratamiento: { bg: '#E8F5E9', border: '#4CAF50', fg: '#1B5E20' },
        Métricas: { bg: '#E0F2F1', border: '#009688', fg: '#004D40' }
    };

    function addNode(label, category, opts = {}) {
        const id = ++nodeId;
        const colors = categoryColors[category] || categoryColors.Paciente;
        nodes.push({
            id,
            label,
            group: category,
            color: { background: colors.bg, border: colors.border },
            font: { color: colors.fg, ...opts.font },
            ...opts
        });
        return id;
    }

    function addEdge(from, to, opts = {}) {
        edges.push({ from, to, ...opts });
    }

    const patients = patientId
        ? [PATIENTS.find(p => p.id === patientId)]
        : PATIENTS;

    const sharedNodes = {};
    const isAllMode = !patientId;

    function getOrCreateNode(label, category) {
        if (!isAllMode) return addNode(label, category);
        const key = category + ':' + label;
        if (sharedNodes[key]) return sharedNodes[key];
        const id = addNode(label, category);
        sharedNodes[key] = id;
        return id;
    }

    patients.forEach(p => {
        // Paciente
        if (enabledCategories.has('Paciente')) {
            const pid = addNode(p.nombre + '\n(' + p.severidad + ')', 'Paciente', { size: 35, font: { size: 12, bold: true }, patientId: p.id });

            // Síntomas
            if (enabledCategories.has('Síntomas')) {
                p.sintomas.forEach(s => {
                    const sid = getOrCreateNode(s, 'Síntomas');
                    addEdge(pid, sid);
                });
            }

            // Antecedentes
            if (enabledCategories.has('Antecedentes')) {
                p.antecedentes.forEach(a => {
                    const aid = getOrCreateNode(a, 'Antecedentes');
                    addEdge(pid, aid);
                });
            }

            // Fármacos — agrupados por categoría terapéutica
            if (enabledCategories.has('Fármacos')) {
                const drugCategories = getDrugCategory(p.farmacos);
                drugCategories.forEach(cat => {
                    const fid = getOrCreateNode(cat, 'Fármacos');
                    addEdge(pid, fid);
                });
            }

            // Diagnóstico
            if (enabledCategories.has('Diagnóstico')) {
                const dxLabel = `AOS ${p.severidad === 'ninguna' ? 'ninguna' : p.severidad}`;
                const dxId = getOrCreateNode(dxLabel, 'Diagnóstico');
                addEdge(pid, dxId);
            }

            // Tratamiento
            if (enabledCategories.has('Tratamiento')) {
                p.tratamiento.slice(0, 3).forEach(t => {
                    const tid = getOrCreateNode(t, 'Tratamiento');
                    addEdge(pid, tid);
                });
            }

            // Métricas (grouped by quartile)
            if (enabledCategories.has('Métricas')) {
                const iahGroup = groupMetricByQuartile('iah', p.respiratorio.iah);
                if (iahGroup) {
                    const iahId = getOrCreateNode(`IAH ${iahGroup}`, 'Métricas');
                    addEdge(pid, iahId);
                }

                const spo2Group = groupMetricByQuartile('spo2_media', p.oximetria.spo2_media);
                if (spo2Group) {
                    const spo2Id = getOrCreateNode(`SpO₂ ${spo2Group}`, 'Métricas');
                    addEdge(pid, spo2Id);
                }

                const ct90Group = groupMetricByQuartile('ct90', p.oximetria.ct90);
                if (ct90Group) {
                    const ct90Id = getOrCreateNode(`CT90 ${ct90Group}`, 'Métricas');
                    addEdge(pid, ct90Id);
                }
            }
        }
    });

    const data = {
        nodes: new vis.DataSet(nodes),
        edges: new vis.DataSet(edges)
    };

    const options = {
        groups: {
            Paciente: { shape: 'circle', borderWidth: 3, font: { size: 13, bold: true } },
            Síntomas: { shape: 'box', borderWidth: 2, font: { size: 11 } },
            Antecedentes: { shape: 'box', borderWidth: 2, font: { size: 11 } },
            Fármacos: { shape: 'box', borderWidth: 2, font: { size: 11 } },
            Diagnóstico: { shape: 'ellipse', borderWidth: 2.5, font: { size: 12, bold: true } },
            Tratamiento: { shape: 'box', borderWidth: 2, font: { size: 11 } },
            Métricas: { shape: 'ellipse', borderWidth: 2, font: { size: 11, bold: true } }
        },
        physics: {
            barnesHut: {
                gravitationalConstant: -3000,
                centralGravity: 0.3,
                springLength: 150,
                springConstant: 0.04,
                damping: 0.09
            },
            stabilization: { iterations: 150 }
        },
        interaction: {
            hover: true,
            tooltipDelay: 200,
            navigationButtons: false,
            keyboard: true
        },
        edges: {
            smooth: { type: 'continuous' },
            color: { color: '#BDBDBD', highlight: '#0066CC', hover: '#0066CC' },
            width: 1.5
        }
    };

    graphNetwork = new vis.Network(container, data, options);

    // Track which neighbor nodes have been manually highlighted
    let highlightedNeighborIds = [];
    let activeVariableNodeId = null;

    // Click on patient node → show report + NLP popup
    // Click on variable node → highlight connected patient nodes
    graphNetwork.on('click', function (params) {
        // Always reset previously highlighted neighbor nodes first
        if (highlightedNeighborIds.length > 0) {
            data.nodes.update(highlightedNeighborIds.map(id => {
                const n = data.nodes.get(id);
                const cols = categoryColors[n.group] || categoryColors.Paciente;
                return { id, borderWidth: 3, color: { background: cols.bg, border: cols.border } };
            }));
            highlightedNeighborIds = [];
        }

        if (!params.nodes.length) {
            activeVariableNodeId = null;
            return;
        }

        const clickedNodeId = params.nodes[0];
        const nodeData = data.nodes.get(clickedNodeId);
        if (!nodeData) return;

        // Patient node → show report popup (existing behaviour)
        if (nodeData.group === 'Paciente') {
            activeVariableNodeId = null;
            const patient = PATIENTS.find(p => p.id === nodeData.patientId);
            if (patient && patient.informe_completo) showKGReportPopup(patient);
            return;
        }

        // Same variable clicked again → toggle off (reset already done above)
        if (clickedNodeId === activeVariableNodeId) {
            graphNetwork.unselectAll();
            activeVariableNodeId = null;
            return;
        }

        // Variable node → highlight all connected patient nodes with thicker border
        activeVariableNodeId = clickedNodeId;
        const neighborIds = graphNetwork.getConnectedNodes(clickedNodeId);
        highlightedNeighborIds = neighborIds.slice();
        data.nodes.update(neighborIds.map(id => ({
            id,
            borderWidth: 6,
            color: { background: '#C9E6FF', border: '#0044AA' }
        })));
    });
}

// ---- Patient Report + NLP Popup ----
function showKGReportPopup(patient) {
    // Remove any existing popup
    const existing = document.getElementById('kg-report-modal');
    if (existing) existing.remove();

    const reportHtml = mdToHtml(patient.informe_completo);
    const nerHtml = typeof highlightNERFull === 'function'
        ? highlightNERFull(patient.informe_completo)
        : reportHtml;

    const badge = getSeverityBadge(patient.severidad);

    const overlay = document.createElement('div');
    overlay.id = 'kg-report-modal';
    overlay.className = 'json-modal-overlay';
    overlay.style.display = 'flex';
    overlay.innerHTML = `
        <div class="kg-report-box">
            <div class="json-modal-header" style="background:#E3F2FD">
                <span style="display:flex;align-items:center;gap:0.5rem">
                    <svg viewBox="0 0 20 20" width="16" height="16"><circle cx="10" cy="6" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M4 18c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
                    ${patient.nombre}
                    <span style="font-size:0.75rem;padding:0.15rem 0.5rem;border-radius:12px;background:${badge.bg};color:${badge.color};font-weight:700">${badge.label}</span>
                </span>
                <button class="json-modal-close" id="kg-report-close">&times;</button>
            </div>
            <div class="kg-report-body">
                <div class="kg-report-col">
                    <div class="kg-report-col-title">Informe Original</div>
                    <div class="pipeline-text pdf-style">${reportHtml}</div>
                </div>
                <div class="kg-report-col">
                    <div class="kg-report-col-title">Extracción NLP</div>
                    <div class="pipeline-text ner-style">${nerHtml}</div>
                    <div class="ner-legend" style="margin-top:0.75rem">
                        <div class="ner-legend-item"><span class="ner-legend-dot" style="background:#BBDEFB; border-bottom:2px solid #0066CC"></span> Métricas</div>
                        <div class="ner-legend-item"><span class="ner-legend-dot" style="background:#FFCDD2; border-bottom:2px solid #F44336"></span> Diagnóstico</div>
                        <div class="ner-legend-item"><span class="ner-legend-dot" style="background:#C8E6C9; border-bottom:2px solid #4CAF50"></span> Tratamiento</div>
                        <div class="ner-legend-item"><span class="ner-legend-dot" style="background:#F3E5F5; border-bottom:2px solid #9C27B0"></span> Síntomas</div>
                        <div class="ner-legend-item"><span class="ner-legend-dot" style="background:#FFF3E0; border-bottom:2px solid #FF9800"></span> Fármacos</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    // Close handlers
    document.getElementById('kg-report-close').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', escHandler); }
    });
}
