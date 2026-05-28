// ============================================================
// SleepAI — Datos estructurados de pacientes
// ============================================================

const REFERENCE_RANGES = {
    iah: {
        label: 'IAH (eventos/h)',
        unit: 'eventos/h',
        ranges: [
            { max: 5, label: 'Normal', color: '#4CAF50', level: 0 },
            { max: 15, label: 'Leve', color: '#FFC107', level: 1 },
            { max: 30, label: 'Moderado', color: '#FF9800', level: 2 },
            { max: Infinity, label: 'Grave', color: '#F44336', level: 3 }
        ]
    },
    spo2_media: {
        label: 'SpO₂ media (%)',
        unit: '%',
        ranges: [
            { min: 95, label: 'Normal', color: '#4CAF50', level: 0 },
            { min: 90, label: 'Leve', color: '#FFC107', level: 1 },
            { min: 85, label: 'Moderado', color: '#FF9800', level: 2 },
            { min: -Infinity, label: 'Grave', color: '#F44336', level: 3 }
        ]
    },
    spo2_min: {
        label: 'SpO₂ mínima (%)',
        unit: '%',
        ranges: [
            { min: 90, label: 'Normal', color: '#4CAF50', level: 0 },
            { min: 85, label: 'Leve', color: '#FFC107', level: 1 },
            { min: 80, label: 'Moderado', color: '#FF9800', level: 2 },
            { min: -Infinity, label: 'Grave', color: '#F44336', level: 3 }
        ]
    },
    ct90: {
        label: 'CT90 (%)',
        unit: '%',
        ranges: [
            { max: 5, label: 'Normal', color: '#4CAF50', level: 0 },
            { max: 20, label: 'Leve', color: '#FFC107', level: 1 },
            { max: 50, label: 'Moderado', color: '#FF9800', level: 2 },
            { max: Infinity, label: 'Grave', color: '#F44336', level: 3 }
        ]
    },
    eficiencia: {
        label: 'Eficiencia del sueño (%)',
        unit: '%',
        ranges: [
            { min: 85, label: 'Normal', color: '#4CAF50', level: 0 },
            { min: 75, label: 'Reducida', color: '#FFC107', level: 1 },
            { min: 60, label: 'Baja', color: '#FF9800', level: 2 },
            { min: -Infinity, label: 'Muy baja', color: '#F44336', level: 3 }
        ]
    },
    plm_index: {
        label: 'Índice PLM',
        unit: '/h',
        ranges: [
            { max: 15, label: 'Normal', color: '#4CAF50', level: 0 },
            { max: 25, label: 'Leve', color: '#FFC107', level: 1 },
            { max: 50, label: 'Moderado', color: '#FF9800', level: 2 },
            { max: Infinity, label: 'Grave', color: '#F44336', level: 3 }
        ]
    },
    arousals: {
        label: 'Índice arousals',
        unit: '/h',
        ranges: [
            { max: 10, label: 'Normal', color: '#4CAF50', level: 0 },
            { max: 15, label: 'Leve', color: '#FFC107', level: 1 },
            { max: 25, label: 'Moderado', color: '#FF9800', level: 2 },
            { max: Infinity, label: 'Grave', color: '#F44336', level: 3 }
        ]
    },
    desaturaciones: {
        label: 'Desaturaciones ≥3%',
        unit: '/h',
        ranges: [
            { max: 5, label: 'Normal', color: '#4CAF50', level: 0 },
            { max: 15, label: 'Leve', color: '#FFC107', level: 1 },
            { max: 30, label: 'Moderado', color: '#FF9800', level: 2 },
            { max: Infinity, label: 'Grave', color: '#F44336', level: 3 }
        ]
    }
};

// Normal sleep architecture reference (adults)
const SLEEP_ARCHITECTURE_NORMAL = {
    N1: { min: 2, max: 5, label: 'N1 (Transición)' },
    N2: { min: 45, max: 55, label: 'N2 (Ligero)' },
    N3: { min: 15, max: 25, label: 'N3 (Profundo)' },
    REM: { min: 20, max: 25, label: 'REM' }
};

const PATIENTS = [
    {
        id: 1,
        nombre: 'Paciente 1',
        demograficos: {
            edad: 48,
            sexo: 'Mujer',
            altura: 157.0,
            peso: 85.0,
            imc: 34.5,
            perimetro_cuello: 36,
            perimetro_cintura: 107,
            perimetro_cadera: 120,
            tension_arterial: '139/65'
        },
        antecedentes: ['Asma', 'Trastorno depresivo', 'Hipotiroidismo'],
        sintomas: ['Roncadora', 'Apneas observadas', 'Somnolencia diurna'],
        farmacos: ['Citalopram', 'Alprazolam'],
        epworth: null,
        tipo_estudio: 'Polisomnografía hospitalaria',
        sueno: {
            percepcion: 'Regular',
            tiempo_registro: 433.5,
            tiempo_total: 338.5,
            eficiencia: 78.1,
            latencia: 55.0,
            latencia_rem: 141.0,
            despertares: 0,
            vigilia_intrasueno: 40.0,
            porcentaje_supino: 87.8
        },
        arquitectura: {
            N1: 2.1,
            N2: 50.2,
            N3: 22.3,
            REM: 25.4
        },
        respiratorio: {
            apneas_total: 18,
            apneas_centrales: 2,
            apneas_mixtas: 0,
            apneas_obstructivas: 16,
            hipopneas: 89,
            eventos_total: 107,
            iah: 19.0,
            iah_supino: 30.8,
            iah_no_supino: 9.65,
            iah_rem: 9.8,
            iah_nrem: 21.4
        },
        oximetria: {
            spo2_media: 87,
            spo2_min: 79,
            ct90: 83.7,
            desaturaciones_3pct: 16.7
        },
        plm: {
            index: 28.4,
            arousals_plm: 0.7
        },
        arousals: {
            total: 10.5,
            respiratorios: 6.7
        },
        diagnostico: 'Apnea Obstructiva del Sueño moderada, con hipoxia nocturna grave',
        severidad: 'moderada',
        severidad_label: 'AOS Moderada + Hipoxia Grave',
        recomendacion: 'Hábitos saludables y dietéticos del sueño. Valorar iniciar tratamiento con CPAP. Realizar titulación de CPAP hospitalaria.',
        tratamiento: ['Hábitos saludables del sueño', 'Valorar CPAP', 'Titulación CPAP hospitalaria'],
        comentario: 'Eficiencia de sueño ligeramente baja. Latencia de sueño muy aumentada. Hipnograma con predominio del sueño superficial. Algunos movimientos periódicos de piernas que no provocan despertar. Frecuentes eventos respiratorios obstructivos con despertar y desaturación. Predominio de saturación media baja con hipoxia nocturna.', 
        // Fragmento original del informe (para la vista pipeline)
        informe_fragmento: 'Se registraron 18 apneas (16 obstructivas, 2 centrales, 0 mixtas) y 89 hipopneas; total 107 eventos. ÍNDICE DE APNEA-HIPOPNEA (IAH): 19.0/h. Saturación media de O₂: 87%, nadir 79%, CT-90: 83.7%. Diagnóstico: Apnea Obstructiva del Sueño moderada, con hipoxia nocturna grave.',
        informe_completo: `**INFORME POLISOMNOGRÁFICO**

**Paciente:** Mujer, 48 años.

| | | |
| :--- | :--- | :--- |
| **Talla:** 157.0 cm | **Peso:** 85.0 kgs | **IMC:** 34.5 kg/m² |
| **T.A.:** 139/65 | **P. cuello:** 36 cm | |
| **P. cintura:** 107 cm | **P. cadera:** 120 cm | |

**ANTECEDENTES Y MOTIVO DE CONSULTA:** Paciente con asma bronquial, trastorno depresivo mayor e hipotiroidismo. Refiere roncopatía crónica con apneas presenciadas por la pareja y somnolencia diurna. Medicación psicotropa: citalopram, alprazolam.

**HALLAZGOS:** La paciente refiere haber dormido de forma irregular durante el estudio.

*Parámetros de sueño:* Período de registro total 433.5 minutos (luz apagada: 433.5 minutos). Tiempo total de sueño: 338.5 minutos. Eficiencia: 78.1%. Posición supina durante el 87.8% del registro. Latencia de sueño prolongada: 55.0 minutos. Latencia REM: 141.0 minutos. No se registraron despertares completos, aunque la paciente permaneció 40.0 minutos en vigilia intrasueño.

*Hipnograma:* **N1** 2.1%, **N2** 50.2%, **N3** 22.3%, **R** 25.4%. Representación adecuada de todas las fases, con predominio del sueño superficial.

*Microdespertares:* Índice total de arousals: 10.5/h. Arousals respiratorios: 6.7/h. PLM: índice de 28.4, arousals por PLM 0.7/h — los movimientos periódicos no generan fragmentación significativa.

*Eventos respiratorios:* 18 apneas (16 obstructivas, 2 centrales, 0 mixtas) y 89 hipopneas; total 107 eventos. **ÍNDICE DE APNEA-HIPOPNEA (IAH):** **19.0/h**. IAH en supino: 30.8; **IAH no supino**: 9.65. **IAH en REM**: 9.8; **IAH en sueño no REM**: 21.4. No es posible valorar adecuadamente el componente posicional dado que la paciente permaneció en supino la práctica totalidad del estudio.

*Oximetría:* **Saturación media** de O₂: 87%. Nadir: 79%. **CT-90: 83.7%**. Desaturaciones ≥3%/h: **16.7**. La paciente permaneció por debajo del 90% durante la mayor parte del registro. Este hallazgo podría ser secundario a tratamiento farmacológico (efecto depresor de alprazolam) y/o a su patología respiratoria de base (asma).

**VALORACIÓN CLÍNICA:** Se objetiva un AOS moderado (IAH 19) con una hipoxia nocturna desproporcionadamente grave (CT-90 83.7%, saturación media 87%). La discordancia entre el grado de apnea y la magnitud de la hipoxemia sugiere la contribución de factores adicionales: efecto depresor respiratorio de los psicofármacos y/o el asma bronquial de base. La latencia de sueño está muy prolongada y la eficiencia es subóptima. Los PLM, si bien elevados, no condicionan fragmentación relevante.

**DIAGNÓSTICO:** *Apnea Obstructiva del Sueño moderada, con hipoxia nocturna grave.*

**RECOMENDACIÓN:** Medidas higiénico-dietéticas del sueño. Valorar en el contexto clínico global la indicación de tratamiento con CPAP. En caso de iniciarse, programar titulación de CPAP hospitalaria. Considerar revisión de los psicofármacos con su psiquiatra.`
    },
    {
        id: 2,
        nombre: 'Paciente 2',
        demograficos: {
            edad: 54,
            sexo: 'Hombre',
            altura: 172.0,
            peso: 79.0,
            imc: 26.7,
            perimetro_cuello: 37,
            perimetro_cintura: 95,
            perimetro_cadera: 108,
            tension_arterial: '126/79'
        },
        antecedentes: [],
        sintomas: ['Roncador', 'Apneas observadas', 'Somnolencia diurna'],
        farmacos: ['Zaldiar', 'Lexatin', 'Sertralina'],
        epworth: 14,
        tipo_estudio: 'Polisomnografía diagnóstica',
        sueno: {
            percepcion: 'Bien',
            tiempo_registro: 425.3,
            tiempo_total: 269.0,
            eficiencia: 65.2,
            latencia: 87.5,
            latencia_rem: 122.5,
            despertares: 1,
            vigilia_intrasueno: 56.0,
            porcentaje_supino: 83.0
        },
        arquitectura: {
            N1: 3.3,
            N2: 56.1,
            N3: 17.5,
            REM: 23.0
        },
        respiratorio: {
            apneas_total: 3,
            apneas_centrales: 0,
            apneas_mixtas: 0,
            apneas_obstructivas: 3,
            hipopneas: 10,
            eventos_total: 13,
            iah: 2.9,
            iah_supino: 2.7,
            iah_no_supino: null,
            iah_rem: 7.7,
            iah_nrem: 1.4
        },
        oximetria: {
            spo2_media: 97,
            spo2_min: 93,
            ct90: 0.0,
            desaturaciones_3pct: 2.5
        },
        plm: {
            index: 57.0,
            arousals_plm: 6.0
        },
        arousals: {
            total: 7.8,
            respiratorios: 0.7
        },
        diagnostico: 'No compatible con Apnea Obstructiva del Sueño',
        severidad: 'ninguna',
        severidad_label: 'Sin AOS',
        recomendacion: 'Hábitos saludables y dietéticos del sueño.',
        tratamiento: ['Hábitos saludables del sueño'],
        comentario: 'Eficiencia de sueño disminuida. Latencia de sueño alargada. Hipnograma sin alteraciones significativas. Tiempo de vigilia intrasueño aumentado. PLM elevado sin provocar microdespertar. Ronquidos intermitentes con escasos eventos respiratorios. Se descarta AOS.',
        informe_fragmento: 'Análisis respiratorio: 3 apneas (3 obstructivas, 0 centrales, 0 mixtas), 10 hipopneas, 13 eventos totales. ÍNDICE DE APNEA-HIPOPNEA (IAH): 2.9/h. Saturación media de O₂: 97%, nadir 93%, CT-90: 0.0%. Diagnóstico: No compatible con apnea Obstructiva del Sueño.',
        informe_completo: `| | |
| :--- | :--- |
| **Edad:** 54 años | **Tipo de estudio:** DIAGNÓSTICO |
| **Altura:** 172.0 cm | **Médico remitente:** NEUMOLOGÍA |
| **Peso:** 79.0 kgs | **IMC:** 26.7 kg/m² |
| **Perímetro cuello:** 37 cm | **Tensión Arterial:** 126/79 |
| **Perímetro cintura:** 95 cm | |
| **Perímetro cadera:** 108 cm | |

**HISTORIA CLÍNICA:** Varón de 54 años remitido desde Neumología. Roncador habitual con apneas presenciadas y somnolencia diurna significativa (Epworth 14). Medicación: Zaldiar, Lexatin y Sertralina.

**RESUMEN:** El paciente indica haber dormido bien durante la noche del estudio.

El registro abarcó 425.3 minutos (período con luz apagada: 412.5 minutos). El tiempo total de sueño fue de 269.0 minutos, con una eficiencia llamativamente baja del 65.2%. Posición supina el 83.0% del tiempo.

Se observó una latencia de sueño muy prolongada de 87.5 minutos, con latencia REM dentro del rango normal (122.5 minutos). Un despertar registrado, con un tiempo de vigilia intrasueño de 56.0 minutos, notablemente elevado.

Distribución de fases del sueño: **N1** 3.3%, **N2** 56.1%, **N3** 17.5%, **R** 23.0%. Representación de todas las fases sin alteraciones relevantes del hipnograma.

Índice total de arousals: 7.8/h. Arousals respiratorios: 0.7/h. El dato más llamativo es el índice de PLM de 57.0/h, marcadamente elevado, con un índice de arousals por PLM de 6.0/h — si bien los PLM no parecen generar un número proporcional de microdespertares.

Análisis respiratorio: 3 apneas (3 obstructivas, 0 centrales, 0 mixtas), 10 hipopneas, 13 eventos totales. **ÍNDICE DE APNEA-HIPOPNEA (IAH):** **2.9/h**. IAH supino: 2.7; **IAH no supino**: 600.00. **IAH en REM**: 7.7; **IAH en sueño no REM**: 1.4.

**Saturación media** de O₂: 97%. Nadir: 93%. **CT-90: 0.0%**. Desaturaciones ≥3%/h: **2.5**. Oximetría nocturna dentro de la normalidad.

**INTERPRETACIÓN:** La eficiencia del sueño está claramente disminuida (65.2%), con una latencia al sueño muy prolongada y un elevado tiempo de vigilia intrasueño, hallazgos que podrían relacionarse con el efecto de primera noche o con el perfil de medicación del paciente. Los PLM son marcadamente elevados. Sin embargo, desde el punto de vista respiratorio, el estudio muestra ronquidos intermitentes con limitación inspiratoria aislada y muy escasos eventos obstructivos, que no alcanzan criterio diagnóstico de apnea obstructiva del sueño. No se observaron alteraciones de la conducta durante el registro.

**DIAGNÓSTICO:** *No compatible con apnea Obstructiva del Sueño*

**RECOMENDACIÓN:** Hábitos saludables y dietéticos del sueño.`
    },
    {
        id: 3,
        nombre: 'Paciente 3',
        demograficos: {
            edad: null,
            sexo: null,
            altura: null,
            peso: null,
            imc: null,
            perimetro_cuello: 40,
            perimetro_cintura: 119,
            perimetro_cadera: 113,
            tension_arterial: null
        },
        antecedentes: [],
        sintomas: ['Roncador', 'Apneas observadas', 'Somnolencia diurna'],
        farmacos: [],
        epworth: 6,
        tipo_estudio: 'Poligrafía domiciliaria (Alice Night One)',
        sueno: {
            percepcion: 'Mal',
            tiempo_registro: 354.2,
            tiempo_valido: 350.2,
            tiempo_total: null,
            eficiencia: null,
            latencia: null,
            latencia_rem: null,
            despertares: null,
            vigilia_intrasueno: null,
            porcentaje_supino: 87.2 // 308.7/354.2
        },
        arquitectura: null, // No disponible en poligrafía domiciliaria
        respiratorio: {
            apneas_total: 411,
            apneas_centrales: 0,
            apneas_mixtas: 0,
            apneas_obstructivas: 411,
            hipopneas: 20,
            eventos_total: 431,
            iah: 76.4,
            iah_supino: 77.8,
            iah_no_supino: 64.62,
            iah_rem: null,
            iah_nrem: null
        },
        oximetria: {
            spo2_media: 82,
            spo2_min: 61,
            ct90: 74.4,
            desaturaciones_3pct: 79.8
        },
        plm: null,
        arousals: null,
        diagnostico: 'Apnea Obstructiva del Sueño grave con hipoxemia nocturna',
        severidad: 'grave',
        severidad_label: 'AOS Grave + Hipoxemia',
        recomendacion: 'Hábitos saludables y dietéticos del sueño. Iniciar tratamiento con dispositivo de CPAP. Valorar realizar titulación de CPAP hospitalaria.',
        tratamiento: ['Hábitos saludables del sueño', 'Iniciar CPAP', 'Titulación CPAP hospitalaria'],
        comentario: 'Ronquidos intermitentes y períodos de limitación inspiratoria al flujo aéreo. AOS grave con hipoxemia nocturna.',
        informe_fragmento: 'El estudio reveló 411 apneas obstructivas (0 mixtas, 0 centrales), con un índice de apneas de 72.9/h, y 20 hipopneas (índice 3.5/h). ÍNDICE DE APNEA-HIPOPNEA global: 76.4/h. Saturación media de O₂: 82%, nadir 61%, CT-90: 74.4%. Diagnóstico: Apnea Obstructiva del Sueño grave con hipoxemia nocturna.',
        informe_completo: `**HISTORIA CLÍNICA:** Varón roncador con apneas presenciadas y somnolencia diurna leve (Epworth 6). SpO₂ basal en vigilia: 97%.

| | | |
| :--- | :--- | :--- |
| **Perímetro cuello:** 40 cm | **Perímetro cintura:** 119 cm | **Perímetro cadera:** 113 cm |

***Procedimiento:*** Se realizó poligrafía respiratoria nocturna domiciliaria mediante equipo portátil Alice Night One (Philips Respironics). Variables registradas: flujo aéreo nasal por cánula, esfuerzo respiratorio torácico, pulsioximetría, ronquido y posición corporal. Codificación de eventos según los criterios de la Academia Americana del Sueño (AASM, Manual for the Scoring of Sleep and Associated Events, versión 2.0, 2012).

**RESULTADOS:** El paciente refiere haber dormido mal durante la noche del registro.

El tiempo total de registro fue de 354.2 minutos, siendo válidos para el análisis 350.2 minutos. El estudio reveló un elevado número de eventos respiratorios: 411 apneas en total, todas ellas de carácter obstructivo (0 mixtas, 0 centrales), con un índice de apneas de 72.9/h. Se detectaron 20 hipopneas adicionales (índice 3.5/h). **El ÍNDICE DE APNEA-HIPOPNEA global fue de 76.4/h**, cifra que sitúa al paciente en el rango de gravedad severa.

El análisis posicional mostró 308.7 minutos en decúbito supino, con un IAH supino de 77.8/h frente a un IAH no supino de 64.62/h. No se evidencia componente posicional relevante, dado que los eventos son casi igual de frecuentes en ambas posiciones.

La pulsioximetría nocturna mostró: saturación media de O₂ del **82%**, con un nadir de **61%**. El paciente permaneció 260.7 minutos con SaO₂ por debajo del 90%, lo que supone un **CT-90 del 74.4%** — prácticamente las tres cuartas partes de la noche transcurrieron en hipoxemia. El índice de desaturaciones ≥3% fue de **79.8/h**.

**COMENTARIO:** Poligrafía respiratoria que muestra un AOS grave con un IAH de 76.4/h, de predominio obstructivo. La hipoxemia nocturna es igualmente grave (saturación media 82%, nadir 61%). No se observa componente postural de los eventos. Se observaron también ronquidos intermitentes con períodos de limitación inspiratoria.

**DIAGNÓSTICO:** *Apnea Obstructiva del Sueño grave con hipoxemia nocturna.*

**RECOMENDACIÓN:** Medidas higiénico-dietéticas del sueño. Iniciar tratamiento con CPAP de forma prioritaria. Programar titulación de CPAP hospitalaria.`
    }
,
    {
        id: 4,
        nombre: 'Paciente 4',
        demograficos: {
            edad: 32,
            sexo: 'Mujer',
            altura: 165,
            peso: 58,
            imc: 21.3,
            perimetro_cuello: 32,
            perimetro_cintura: 72,
            perimetro_cadera: 96,
            tension_arterial: '115/72'
        },
        antecedentes: [],
        sintomas: ['Roncadora ocasional', 'Somnolencia diurna leve'],
        farmacos: [],
        epworth: 4,
        tipo_estudio: 'Polisomnografía hospitalaria',
        sueno: {
            percepcion: 'Bien',
            tiempo_registro: 452,
            tiempo_total: 398.5,
            eficiencia: 88.1,
            latencia: 18,
            latencia_rem: 95,
            despertares: 1,
            vigilia_intrasueno: 15.5,
            porcentaje_supino: 45.2
        },
        arquitectura: { N1: 3.2, N2: 48.5, N3: 23.1, REM: 25.2 },
        respiratorio: {
            apneas_total: 2,
            apneas_centrales: 0,
            apneas_mixtas: 0,
            apneas_obstructivas: 2,
            hipopneas: 5,
            eventos_total: 7,
            iah: 1.1,
            iah_supino: 1.5,
            iah_no_supino: 0.8,
            iah_rem: 2.1,
            iah_nrem: 0.7
        },
        oximetria: {
            spo2_media: 97,
            spo2_min: 94,
            ct90: 0,
            desaturaciones_3pct: 0.8
        },
        plm: { index: 4.2, arousals_plm: 0.1 },
        arousals: { total: 5.2, respiratorios: 0.3 },
        diagnostico: 'No compatible con Apnea Obstructiva del Sueño',
        severidad: 'ninguna',
        severidad_label: 'Sin AOS',
        recomendacion: 'Hábitos saludables del sueño. Control en consulta si reaparecen síntomas.',
        tratamiento: ['Hábitos saludables del sueño'],
        comentario: 'Eficiencia de sueño normal. Arquitectura del sueño conservada. Escasos eventos respiratorios. Se descarta AOS.',
        informe_fragmento: 'El análisis respiratorio mostró 2 apneas (0 centrales, 0 mixtas y 2 obstructivas), 5 hipopneas, lo que da un ÍNDICE DE APNEA-HIPOPNEA (IAH) de 1.1. La saturación media de oxígeno fue 97% y la mínima 94%, con un CT-90 de 0%. Diagnóstico: No compatible con Apnea Obstructiva del Sueño.',
        informe_completo: `| | |
| :--- | :--- |
| **Edad:** 32 años | **Tipo de estudio:** hospitalaria |
| **Altura:** 165 cm | **Médico que envía al paciente:** — |
| **Peso:** 58 kgs | **IMC:** 21.3 kg/m² |
| **Perímetro cuello:** 32 cm | **Tensión Arterial:** 115/72 |
| **Perímetro cintura:** 72 cm | |
| **Perímetro cadera:** 96 cm | |

**<u>HISTORIA CLÍNICA:</u>** Sin antecedentes de interés, con somnolencia diurna (Epworth 4).

**<u>PSICOFÁRMACOS:</u>** Ninguno

**<u>RESUMEN:</u>** El paciente dice que ha dormido bien. El período total de registro fue 452 minutos, con un tiempo total de sueño de 398.5 minutos y una eficiencia del sueño de 88.1%. El 45.2% del tiempo estuvo en decúbito supino.

La latencia del sueño fue de 18 minutos y la latencia REM de 95 minutos. Durante el período de sueño presentó 1 despertares y estuvo despierto un total de 15.5 minutos.

El Hipnograma mostró los siguientes porcentajes. Sueño no REM: 3.2% **N1**, 48.5% **N2**, 23.1% **N3**. Sueño REM: 25.2% **R**.

El índice total de arousals (microdespertares) por hora fue de 5.2 y el índice de arousals relacionados con eventos respiratorios fue 0.3.

Se registraron movimientos periódicos de piernas (PLMs) con un índice de PLM de 4.2 y un índice de arousals por PLMs de 0.1.

El análisis respiratorio mostró 2 apneas (0 centrales, 0 mixtas y 2 obstructivas), 5 hipopneas, (apneas+hipopneas: 7), lo que da un **ÍNDICE DE APNEA-HIPOPNEA (IAH)** por hora de sueño de **1.1**.

El IAH en supino fue de 1.5, en comparación con el **IAH no supino** que fue de 0.8. El **IAH en REM** fue 2.1, y el **IAH en sueño no REM** fue de 0.7.

La **saturación media** de oxígeno fue 97 y la desaturación más baja fue 94, con un **CT-90 de 0%**. Las desaturaciones iguales o superiores del 3% por hora fueron **0.8**.

**<u>COMENTARIO:</u>** Eficiencia de sueño normal. Arquitectura del sueño conservada. Escasos eventos respiratorios. Se descarta AOS.

**<u>DIAGNÓSTICO:</u>** *No compatible con Apnea Obstructiva del Sueño*

**<u>RECOMENDACIÓN:</u>** Hábitos saludables del sueño. Control en consulta si reaparecen síntomas.`
    },
    {
        id: 5,
        nombre: 'Paciente 5',
        demograficos: {
            edad: 61,
            sexo: 'Hombre',
            altura: 175,
            peso: 78,
            imc: 25.5,
            perimetro_cuello: 38,
            perimetro_cintura: 94,
            perimetro_cadera: 102,
            tension_arterial: '132/78'
        },
        antecedentes: ['Hipertensión arterial'],
        sintomas: ['Roncador', 'Somnolencia diurna'],
        farmacos: ['Enalapril'],
        epworth: 6,
        tipo_estudio: 'Polisomnografía hospitalaria',
        sueno: {
            percepcion: 'Bien',
            tiempo_registro: 440,
            tiempo_total: 375,
            eficiencia: 85.2,
            latencia: 25,
            latencia_rem: 110,
            despertares: 2,
            vigilia_intrasueno: 22,
            porcentaje_supino: 62.3
        },
        arquitectura: { N1: 4.5, N2: 52.3, N3: 19.8, REM: 23.4 },
        respiratorio: {
            apneas_total: 5,
            apneas_centrales: 1,
            apneas_mixtas: 0,
            apneas_obstructivas: 4,
            hipopneas: 12,
            eventos_total: 17,
            iah: 2.7,
            iah_supino: 3.5,
            iah_no_supino: 1.8,
            iah_rem: 4.2,
            iah_nrem: 2.1
        },
        oximetria: {
            spo2_media: 96,
            spo2_min: 92,
            ct90: 0,
            desaturaciones_3pct: 1.8
        },
        plm: { index: 12, arousals_plm: 0.5 },
        arousals: { total: 8.5, respiratorios: 1.2 },
        diagnostico: 'No compatible con Apnea Obstructiva del Sueño',
        severidad: 'ninguna',
        severidad_label: 'Sin AOS',
        recomendacion: 'Hábitos saludables y dietéticos del sueño.',
        tratamiento: ['Hábitos saludables del sueño'],
        comentario: 'Eficiencia de sueño normal. Ronquidos ocasionales sin eventos respiratorios significativos.',
        informe_fragmento: 'El análisis respiratorio mostró 5 apneas (1 centrales, 0 mixtas y 4 obstructivas), 12 hipopneas, lo que da un ÍNDICE DE APNEA-HIPOPNEA (IAH) de 2.7. La saturación media de oxígeno fue 96% y la mínima 92%, con un CT-90 de 0%. Diagnóstico: No compatible con Apnea Obstructiva del Sueño.',
        informe_completo: `| | |
| :--- | :--- |
| **Edad:** 61 años | **Tipo de estudio:** hospitalaria |
| **Altura:** 175 cm | **Médico que envía al paciente:** — |
| **Peso:** 78 kgs | **IMC:** 25.5 kg/m² |
| **Perímetro cuello:** 38 cm | **Tensión Arterial:** 132/78 |
| **Perímetro cintura:** 94 cm | |
| **Perímetro cadera:** 102 cm | |

**<u>HISTORIA CLÍNICA:</u>** Hipertensión arterial controlada, con somnolencia diurna (Epworth 6).

**<u>PSICOFÁRMACOS:</u>** Enalapril

**<u>RESUMEN:</u>** El paciente dice que ha dormido bien. El período total de registro fue 440 minutos, con un tiempo total de sueño de 375 minutos y una eficiencia del sueño de 85.2%. El 62.3% del tiempo estuvo en decúbito supino.

La latencia del sueño fue de 25 minutos y la latencia REM de 110 minutos. Durante el período de sueño presentó 2 despertares y estuvo despierto un total de 22 minutos.

El Hipnograma mostró los siguientes porcentajes. Sueño no REM: 4.5% **N1**, 52.3% **N2**, 19.8% **N3**. Sueño REM: 23.4% **R**.

El índice total de arousals (microdespertares) por hora fue de 8.5 y el índice de arousals relacionados con eventos respiratorios fue 1.2.

Se registraron movimientos periódicos de piernas (PLMs) con un índice de PLM de 12 y un índice de arousals por PLMs de 0.5.

El análisis respiratorio mostró 5 apneas (1 centrales, 0 mixtas y 4 obstructivas), 12 hipopneas, (apneas+hipopneas: 17), lo que da un **ÍNDICE DE APNEA-HIPOPNEA (IAH)** por hora de sueño de **2.7**.

El IAH en supino fue de 3.5, en comparación con el **IAH no supino** que fue de 1.8. El **IAH en REM** fue 4.2, y el **IAH en sueño no REM** fue de 2.1.

La **saturación media** de oxígeno fue 96 y la desaturación más baja fue 92, con un **CT-90 de 0%**. Las desaturaciones iguales o superiores del 3% por hora fueron **1.8**.

**<u>COMENTARIO:</u>** Eficiencia de sueño normal. Arquitectura del sueño conservada. Ronquidos ocasionales sin eventos respiratorios significativos.

**<u>DIAGNÓSTICO:</u>** *No compatible con Apnea Obstructiva del Sueño*

**<u>RECOMENDACIÓN:</u>** Hábitos saludables y dietéticos del sueño.`
    },
    {
        id: 6,
        nombre: 'Paciente 6',
        demograficos: {
            edad: 45,
            sexo: 'Mujer',
            altura: 162,
            peso: 65,
            imc: 24.8,
            perimetro_cuello: 34,
            perimetro_cintura: 82,
            perimetro_cadera: 100,
            tension_arterial: '120/75'
        },
        antecedentes: ['Ansiedad generalizada'],
        sintomas: ['Roncadora ocasional', 'Insomnio de conciliación'],
        farmacos: ['Lorazepam'],
        epworth: 8,
        tipo_estudio: 'Polisomnografía hospitalaria',
        sueno: {
            percepcion: 'Regular',
            tiempo_registro: 445,
            tiempo_total: 360,
            eficiencia: 80.9,
            latencia: 42,
            latencia_rem: 105,
            despertares: 3,
            vigilia_intrasueno: 28,
            porcentaje_supino: 55
        },
        arquitectura: { N1: 4.8, N2: 51, N3: 20.5, REM: 23.7 },
        respiratorio: {
            apneas_total: 3,
            apneas_centrales: 0,
            apneas_mixtas: 0,
            apneas_obstructivas: 3,
            hipopneas: 8,
            eventos_total: 11,
            iah: 1.8,
            iah_supino: 2.3,
            iah_no_supino: 1.2,
            iah_rem: 3,
            iah_nrem: 1.3
        },
        oximetria: {
            spo2_media: 97,
            spo2_min: 93,
            ct90: 0,
            desaturaciones_3pct: 1.2
        },
        plm: { index: 8.5, arousals_plm: 0.2 },
        arousals: { total: 7.2, respiratorios: 0.5 },
        diagnostico: 'No compatible con Apnea Obstructiva del Sueño',
        severidad: 'ninguna',
        severidad_label: 'Sin AOS',
        recomendacion: 'Hábitos saludables del sueño. Valorar optimización del tratamiento ansiolítico.',
        tratamiento: ['Hábitos saludables del sueño'],
        comentario: 'Eficiencia de sueño ligeramente reducida por ansiedad. Latencia aumentada. Arquitectura conservada. Se descarta AOS.',
        informe_fragmento: 'El análisis respiratorio mostró 3 apneas (0 centrales, 0 mixtas y 3 obstructivas), 8 hipopneas, lo que da un ÍNDICE DE APNEA-HIPOPNEA (IAH) de 1.8. La saturación media de oxígeno fue 97% y la mínima 93%, con un CT-90 de 0%. Diagnóstico: No compatible con Apnea Obstructiva del Sueño.',
        informe_completo: `| | |
| :--- | :--- |
| **Edad:** 45 años | **Tipo de estudio:** hospitalaria |
| **Altura:** 162 cm | **Médico que envía al paciente:** — |
| **Peso:** 65 kgs | **IMC:** 24.8 kg/m² |
| **Perímetro cuello:** 34 cm | **Tensión Arterial:** 120/75 |
| **Perímetro cintura:** 82 cm | |
| **Perímetro cadera:** 100 cm | |

**<u>HISTORIA CLÍNICA:</u>** Ansiedad generalizada, con somnolencia diurna (Epworth 8).

**<u>PSICOFÁRMACOS:</u>** Lorazepam

**<u>RESUMEN:</u>** El paciente dice que ha dormido regular. El período total de registro fue 445 minutos, con un tiempo total de sueño de 360 minutos y una eficiencia del sueño de 80.9%. El 55% del tiempo estuvo en decúbito supino.

La latencia del sueño fue de 42 minutos y la latencia REM de 105 minutos. Durante el período de sueño presentó 3 despertares y estuvo despierto un total de 28 minutos.

El Hipnograma mostró los siguientes porcentajes. Sueño no REM: 4.8% **N1**, 51% **N2**, 20.5% **N3**. Sueño REM: 23.7% **R**.

El índice total de arousals (microdespertares) por hora fue de 7.2 y el índice de arousals relacionados con eventos respiratorios fue 0.5.

Se registraron movimientos periódicos de piernas (PLMs) con un índice de PLM de 8.5 y un índice de arousals por PLMs de 0.2.

El análisis respiratorio mostró 3 apneas (0 centrales, 0 mixtas y 3 obstructivas), 8 hipopneas, (apneas+hipopneas: 11), lo que da un **ÍNDICE DE APNEA-HIPOPNEA (IAH)** por hora de sueño de **1.8**.

El IAH en supino fue de 2.3, en comparación con el **IAH no supino** que fue de 1.2. El **IAH en REM** fue 3, y el **IAH en sueño no REM** fue de 1.3.

La **saturación media** de oxígeno fue 97 y la desaturación más baja fue 93, con un **CT-90 de 0%**. Las desaturaciones iguales o superiores del 3% por hora fueron **1.2**.

**<u>COMENTARIO:</u>** Eficiencia de sueño ligeramente reducida, posiblemente relacionada con ansiedad. Latencia de sueño aumentada. Arquitectura conservada. Se descarta AOS.

**<u>DIAGNÓSTICO:</u>** *No compatible con Apnea Obstructiva del Sueño*

**<u>RECOMENDACIÓN:</u>** Hábitos saludables del sueño. Valorar optimización del tratamiento ansiolítico.`
    },
    {
        id: 7,
        nombre: 'Paciente 7',
        demograficos: {
            edad: 50,
            sexo: 'Hombre',
            altura: 178,
            peso: 85,
            imc: 26.8,
            perimetro_cuello: 39,
            perimetro_cintura: 98,
            perimetro_cadera: 104,
            tension_arterial: '135/82'
        },
        antecedentes: ['Dislipemia'],
        sintomas: ['Roncador', 'Apneas observadas'],
        farmacos: ['Atorvastatina'],
        epworth: 7,
        tipo_estudio: 'Polisomnografía hospitalaria',
        sueno: {
            percepcion: 'Bien',
            tiempo_registro: 435,
            tiempo_total: 370,
            eficiencia: 85.1,
            latencia: 22,
            latencia_rem: 98,
            despertares: 2,
            vigilia_intrasueno: 20,
            porcentaje_supino: 58
        },
        arquitectura: { N1: 3.8, N2: 53.5, N3: 18.2, REM: 24.5 },
        respiratorio: {
            apneas_total: 8,
            apneas_centrales: 1,
            apneas_mixtas: 0,
            apneas_obstructivas: 7,
            hipopneas: 14,
            eventos_total: 22,
            iah: 3.6,
            iah_supino: 5.2,
            iah_no_supino: 1.8,
            iah_rem: 4.8,
            iah_nrem: 3
        },
        oximetria: {
            spo2_media: 96,
            spo2_min: 91,
            ct90: 0,
            desaturaciones_3pct: 2.8
        },
        plm: { index: 10.2, arousals_plm: 0.3 },
        arousals: { total: 9.8, respiratorios: 2.5 },
        diagnostico: 'No compatible con Apnea Obstructiva del Sueño',
        severidad: 'ninguna',
        severidad_label: 'Sin AOS',
        recomendacion: 'Hábitos saludables del sueño. Control de peso.',
        tratamiento: ['Hábitos saludables del sueño'],
        comentario: 'Eficiencia normal. Algunos eventos respiratorios sin alcanzar criterio AOS. Ronquidos intermitentes.',
        informe_fragmento: 'El análisis respiratorio mostró 8 apneas (1 centrales, 0 mixtas y 7 obstructivas), 14 hipopneas, lo que da un ÍNDICE DE APNEA-HIPOPNEA (IAH) de 3.6. La saturación media de oxígeno fue 96% y la mínima 91%, con un CT-90 de 0%. Diagnóstico: No compatible con Apnea Obstructiva del Sueño.',
        informe_completo: `| | |
| :--- | :--- |
| **Edad:** 50 años | **Tipo de estudio:** hospitalaria |
| **Altura:** 178 cm | **Médico que envía al paciente:** — |
| **Peso:** 85 kgs | **IMC:** 26.8 kg/m² |
| **Perímetro cuello:** 39 cm | **Tensión Arterial:** 135/82 |
| **Perímetro cintura:** 98 cm | |
| **Perímetro cadera:** 104 cm | |

**<u>HISTORIA CLÍNICA:</u>** Dislipemia, con somnolencia diurna (Epworth 7).

**<u>PSICOFÁRMACOS:</u>** Atorvastatina

**<u>RESUMEN:</u>** El paciente dice que ha dormido bien. El período total de registro fue 435 minutos, con un tiempo total de sueño de 370 minutos y una eficiencia del sueño de 85.1%. El 58% del tiempo estuvo en decúbito supino.

La latencia del sueño fue de 22 minutos y la latencia REM de 98 minutos. Durante el período de sueño presentó 2 despertares y estuvo despierto un total de 20 minutos.

El Hipnograma mostró los siguientes porcentajes. Sueño no REM: 3.8% **N1**, 53.5% **N2**, 18.2% **N3**. Sueño REM: 24.5% **R**.

El índice total de arousals (microdespertares) por hora fue de 9.8 y el índice de arousals relacionados con eventos respiratorios fue 2.5.

Se registraron movimientos periódicos de piernas (PLMs) con un índice de PLM de 10.2 y un índice de arousals por PLMs de 0.3.

El análisis respiratorio mostró 8 apneas (1 centrales, 0 mixtas y 7 obstructivas), 14 hipopneas, (apneas+hipopneas: 22), lo que da un **ÍNDICE DE APNEA-HIPOPNEA (IAH)** por hora de sueño de **3.6**.

El IAH en supino fue de 5.2, en comparación con el **IAH no supino** que fue de 1.8. El **IAH en REM** fue 4.8, y el **IAH en sueño no REM** fue de 3.

La **saturación media** de oxígeno fue 96 y la desaturación más baja fue 91, con un **CT-90 de 0%**. Las desaturaciones iguales o superiores del 3% por hora fueron **2.8**.

**<u>COMENTARIO:</u>** Eficiencia de sueño normal. Algunos eventos respiratorios sin alcanzar criterio de AOS. Ronquidos intermitentes.

**<u>DIAGNÓSTICO:</u>** *No compatible con Apnea Obstructiva del Sueño*

**<u>RECOMENDACIÓN:</u>** Hábitos saludables del sueño. Control de peso.`
    },
    {
        id: 8,
        nombre: 'Paciente 8',
        demograficos: {
            edad: 55,
            sexo: 'Hombre',
            altura: 180,
            peso: 92,
            imc: 28.4,
            perimetro_cuello: 41,
            perimetro_cintura: 102,
            perimetro_cadera: 106,
            tension_arterial: '140/85'
        },
        antecedentes: ['Hipertensión arterial', 'Diabetes mellitus tipo 2'],
        sintomas: ['Roncador', 'Apneas observadas', 'Somnolencia diurna'],
        farmacos: ['Metformina', 'Losartán'],
        epworth: 10,
        tipo_estudio: 'Polisomnografía hospitalaria',
        sueno: {
            percepcion: 'Regular',
            tiempo_registro: 430,
            tiempo_total: 345,
            eficiencia: 80.2,
            latencia: 35,
            latencia_rem: 115,
            despertares: 4,
            vigilia_intrasueno: 30,
            porcentaje_supino: 68.5
        },
        arquitectura: { N1: 5.2, N2: 54.8, N3: 16.5, REM: 23.5 },
        respiratorio: {
            apneas_total: 15,
            apneas_centrales: 2,
            apneas_mixtas: 1,
            apneas_obstructivas: 12,
            hipopneas: 35,
            eventos_total: 50,
            iah: 8.7,
            iah_supino: 12.5,
            iah_no_supino: 4.2,
            iah_rem: 10.5,
            iah_nrem: 7.8
        },
        oximetria: {
            spo2_media: 95,
            spo2_min: 89,
            ct90: 2.5,
            desaturaciones_3pct: 6.8
        },
        plm: { index: 14, arousals_plm: 1.2 },
        arousals: { total: 12.5, respiratorios: 4.8 },
        diagnostico: 'Apnea Obstructiva del Sueño leve',
        severidad: 'leve',
        severidad_label: 'AOS Leve',
        recomendacion: 'Hábitos saludables del sueño. Control de peso. Evitar decúbito supino. Control en 6 meses.',
        tratamiento: ['Hábitos saludables del sueño', 'Control de peso', 'Terapia posicional'],
        comentario: 'Eficiencia ligeramente reducida. Eventos respiratorios predominantemente en supino. AOS leve posicional.',
        informe_fragmento: 'El análisis respiratorio mostró 15 apneas (2 centrales, 1 mixtas y 12 obstructivas), 35 hipopneas, lo que da un ÍNDICE DE APNEA-HIPOPNEA (IAH) de 8.7. La saturación media de oxígeno fue 95% y la mínima 89%, con un CT-90 de 2.5%. Diagnóstico: Apnea Obstructiva del Sueño leve.',
        informe_completo: `| | |
| :--- | :--- |
| **Edad:** 55 años | **Tipo de estudio:** hospitalaria |
| **Altura:** 180 cm | **Médico que envía al paciente:** — |
| **Peso:** 92 kgs | **IMC:** 28.4 kg/m² |
| **Perímetro cuello:** 41 cm | **Tensión Arterial:** 140/85 |
| **Perímetro cintura:** 102 cm | |
| **Perímetro cadera:** 106 cm | |

**<u>HISTORIA CLÍNICA:</u>** Hipertensión arterial, diabetes mellitus tipo 2, con somnolencia diurna (Epworth 10).

**<u>PSICOFÁRMACOS:</u>** Metformina, Losartán

**<u>RESUMEN:</u>** El paciente dice que ha dormido regular. El período total de registro fue 430 minutos, con un tiempo total de sueño de 345 minutos y una eficiencia del sueño de 80.2%. El 68.5% del tiempo estuvo en decúbito supino.

La latencia del sueño fue de 35 minutos y la latencia REM de 115 minutos. Durante el período de sueño presentó 4 despertares y estuvo despierto un total de 30 minutos.

El Hipnograma mostró los siguientes porcentajes. Sueño no REM: 5.2% **N1**, 54.8% **N2**, 16.5% **N3**. Sueño REM: 23.5% **R**.

El índice total de arousals (microdespertares) por hora fue de 12.5 y el índice de arousals relacionados con eventos respiratorios fue 4.8.

Se registraron movimientos periódicos de piernas (PLMs) con un índice de PLM de 14 y un índice de arousals por PLMs de 1.2.

El análisis respiratorio mostró 15 apneas (2 centrales, 1 mixtas y 12 obstructivas), 35 hipopneas, (apneas+hipopneas: 50), lo que da un **ÍNDICE DE APNEA-HIPOPNEA (IAH)** por hora de sueño de **8.7**.

El IAH en supino fue de 12.5, en comparación con el **IAH no supino** que fue de 4.2. El **IAH en REM** fue 10.5, y el **IAH en sueño no REM** fue de 7.8.

La **saturación media** de oxígeno fue 95 y la desaturación más baja fue 89, con un **CT-90 de 2.5%**. Las desaturaciones iguales o superiores del 3% por hora fueron **6.8**.

**<u>COMENTARIO:</u>** Eficiencia de sueño ligeramente reducida. Eventos respiratorios predominantemente en decúbito supino. AOS leve con componente posicional.

**<u>DIAGNÓSTICO:</u>** *Apnea Obstructiva del Sueño leve*

**<u>RECOMENDACIÓN:</u>** Hábitos saludables y dietéticos del sueño. Control de peso. Evitar decúbito supino. Control en 6 meses.`
    },
    {
        id: 9,
        nombre: 'Paciente 9',
        demograficos: {
            edad: 52,
            sexo: 'Mujer',
            altura: 160,
            peso: 72,
            imc: 28.1,
            perimetro_cuello: 35,
            perimetro_cintura: 90,
            perimetro_cadera: 108,
            tension_arterial: '128/76'
        },
        antecedentes: ['Menopausia', 'Insomnio'],
        sintomas: ['Roncadora', 'Somnolencia diurna'],
        farmacos: ['Gabapentina'],
        epworth: 9,
        tipo_estudio: 'Polisomnografía hospitalaria',
        sueno: {
            percepcion: 'Regular',
            tiempo_registro: 448,
            tiempo_total: 330,
            eficiencia: 73.7,
            latencia: 55,
            latencia_rem: 130,
            despertares: 5,
            vigilia_intrasueno: 38,
            porcentaje_supino: 52
        },
        arquitectura: { N1: 6.1, N2: 55.2, N3: 14.8, REM: 23.9 },
        respiratorio: {
            apneas_total: 12,
            apneas_centrales: 1,
            apneas_mixtas: 0,
            apneas_obstructivas: 11,
            hipopneas: 28,
            eventos_total: 40,
            iah: 7.3,
            iah_supino: 10.2,
            iah_no_supino: 4.5,
            iah_rem: 9,
            iah_nrem: 6.5
        },
        oximetria: {
            spo2_media: 95,
            spo2_min: 90,
            ct90: 1.8,
            desaturaciones_3pct: 5.5
        },
        plm: { index: 22, arousals_plm: 2.5 },
        arousals: { total: 11.8, respiratorios: 3.5 },
        diagnostico: 'Apnea Obstructiva del Sueño leve',
        severidad: 'leve',
        severidad_label: 'AOS Leve',
        recomendacion: 'Hábitos saludables del sueño. Control de peso. Terapia posicional.',
        tratamiento: ['Hábitos saludables del sueño', 'Control de peso', 'Terapia posicional'],
        comentario: 'Eficiencia reducida con latencia aumentada multifactorial. PLM ligeramente elevados. AOS leve.',
        informe_fragmento: 'El análisis respiratorio mostró 12 apneas (1 centrales, 0 mixtas y 11 obstructivas), 28 hipopneas, lo que da un ÍNDICE DE APNEA-HIPOPNEA (IAH) de 7.3. La saturación media de oxígeno fue 95% y la mínima 90%, con un CT-90 de 1.8%. Diagnóstico: Apnea Obstructiva del Sueño leve.',
        informe_completo: `| | |
| :--- | :--- |
| **Edad:** 52 años | **Tipo de estudio:** hospitalaria |
| **Altura:** 160 cm | **Médico que envía al paciente:** — |
| **Peso:** 72 kgs | **IMC:** 28.1 kg/m² |
| **Perímetro cuello:** 35 cm | **Tensión Arterial:** 128/76 |
| **Perímetro cintura:** 90 cm | |
| **Perímetro cadera:** 108 cm | |

**<u>HISTORIA CLÍNICA:</u>** Menopausia, insomnio, con somnolencia diurna (Epworth 9).

**<u>PSICOFÁRMACOS:</u>** Gabapentina

**<u>RESUMEN:</u>** El paciente dice que ha dormido regular. El período total de registro fue 448 minutos, con un tiempo total de sueño de 330 minutos y una eficiencia del sueño de 73.7%. El 52% del tiempo estuvo en decúbito supino.

La latencia del sueño fue de 55 minutos y la latencia REM de 130 minutos. Durante el período de sueño presentó 5 despertares y estuvo despierto un total de 38 minutos.

El Hipnograma mostró los siguientes porcentajes. Sueño no REM: 6.1% **N1**, 55.2% **N2**, 14.8% **N3**. Sueño REM: 23.9% **R**.

El índice total de arousals (microdespertares) por hora fue de 11.8 y el índice de arousals relacionados con eventos respiratorios fue 3.5.

Se registraron movimientos periódicos de piernas (PLMs) con un índice de PLM de 22 y un índice de arousals por PLMs de 2.5.

El análisis respiratorio mostró 12 apneas (1 centrales, 0 mixtas y 11 obstructivas), 28 hipopneas, (apneas+hipopneas: 40), lo que da un **ÍNDICE DE APNEA-HIPOPNEA (IAH)** por hora de sueño de **7.3**.

El IAH en supino fue de 10.2, en comparación con el **IAH no supino** que fue de 4.5. El **IAH en REM** fue 9, y el **IAH en sueño no REM** fue de 6.5.

La **saturación media** de oxígeno fue 95 y la desaturación más baja fue 90, con un **CT-90 de 1.8%**. Las desaturaciones iguales o superiores del 3% por hora fueron **5.5**.

**<u>COMENTARIO:</u>** Eficiencia de sueño reducida con latencia aumentada, posiblemente multifactorial. PLM ligeramente elevados. AOS leve.

**<u>DIAGNÓSTICO:</u>** *Apnea Obstructiva del Sueño leve*

**<u>RECOMENDACIÓN:</u>** Hábitos saludables del sueño. Control de peso. Valorar terapia posicional.`
    },
    {
        id: 10,
        nombre: 'Paciente 10',
        demograficos: {
            edad: 35,
            sexo: 'Hombre',
            altura: 182,
            peso: 95,
            imc: 28.7,
            perimetro_cuello: 43,
            perimetro_cintura: 96,
            perimetro_cadera: 103,
            tension_arterial: '125/78'
        },
        antecedentes: [],
        sintomas: ['Roncador', 'Apneas observadas', 'Somnolencia diurna'],
        farmacos: [],
        epworth: 11,
        tipo_estudio: 'Polisomnografía hospitalaria',
        sueno: {
            percepcion: 'Bien',
            tiempo_registro: 425,
            tiempo_total: 380,
            eficiencia: 89.4,
            latencia: 12,
            latencia_rem: 88,
            despertares: 1,
            vigilia_intrasueno: 12,
            porcentaje_supino: 70
        },
        arquitectura: { N1: 3, N2: 49.5, N3: 22.8, REM: 24.7 },
        respiratorio: {
            apneas_total: 20,
            apneas_centrales: 0,
            apneas_mixtas: 0,
            apneas_obstructivas: 20,
            hipopneas: 22,
            eventos_total: 42,
            iah: 6.6,
            iah_supino: 10.8,
            iah_no_supino: 1.2,
            iah_rem: 8.5,
            iah_nrem: 5.8
        },
        oximetria: {
            spo2_media: 96,
            spo2_min: 91,
            ct90: 0.5,
            desaturaciones_3pct: 4.8
        },
        plm: { index: 3.5, arousals_plm: 0 },
        arousals: { total: 10.2, respiratorios: 5 },
        diagnostico: 'Apnea Obstructiva del Sueño leve, posicional',
        severidad: 'leve',
        severidad_label: 'AOS Leve',
        recomendacion: 'Terapia posicional. Control en 1 año.',
        tratamiento: ['Hábitos saludables del sueño', 'Terapia posicional'],
        comentario: 'Eficiencia normal. AOS leve con claro componente posicional. Sin hipoxia significativa.',
        informe_fragmento: 'El análisis respiratorio mostró 20 apneas (0 centrales, 0 mixtas y 20 obstructivas), 22 hipopneas, lo que da un ÍNDICE DE APNEA-HIPOPNEA (IAH) de 6.6. La saturación media de oxígeno fue 96% y la mínima 91%, con un CT-90 de 0.5%. Diagnóstico: Apnea Obstructiva del Sueño leve, posicional.',
        informe_completo: `| | |
| :--- | :--- |
| **Edad:** 35 años | **Tipo de estudio:** hospitalaria |
| **Altura:** 182 cm | **Médico que envía al paciente:** — |
| **Peso:** 95 kgs | **IMC:** 28.7 kg/m² |
| **Perímetro cuello:** 43 cm | **Tensión Arterial:** 125/78 |
| **Perímetro cintura:** 96 cm | |
| **Perímetro cadera:** 103 cm | |

**<u>HISTORIA CLÍNICA:</u>** Sin antecedentes relevantes, con somnolencia diurna (Epworth 11).

**<u>PSICOFÁRMACOS:</u>** Ninguno

**<u>RESUMEN:</u>** El paciente dice que ha dormido bien. El período total de registro fue 425 minutos, con un tiempo total de sueño de 380 minutos y una eficiencia del sueño de 89.4%. El 70% del tiempo estuvo en decúbito supino.

La latencia del sueño fue de 12 minutos y la latencia REM de 88 minutos. Durante el período de sueño presentó 1 despertares y estuvo despierto un total de 12 minutos.

El Hipnograma mostró los siguientes porcentajes. Sueño no REM: 3% **N1**, 49.5% **N2**, 22.8% **N3**. Sueño REM: 24.7% **R**.

El índice total de arousals (microdespertares) por hora fue de 10.2 y el índice de arousals relacionados con eventos respiratorios fue 5.

Se registraron movimientos periódicos de piernas (PLMs) con un índice de PLM de 3.5 y un índice de arousals por PLMs de 0.

El análisis respiratorio mostró 20 apneas (0 centrales, 0 mixtas y 20 obstructivas), 22 hipopneas, (apneas+hipopneas: 42), lo que da un **ÍNDICE DE APNEA-HIPOPNEA (IAH)** por hora de sueño de **6.6**.

El IAH en supino fue de 10.8, en comparación con el **IAH no supino** que fue de 1.2. El **IAH en REM** fue 8.5, y el **IAH en sueño no REM** fue de 5.8.

La **saturación media** de oxígeno fue 96 y la desaturación más baja fue 91, con un **CT-90 de 0.5%**. Las desaturaciones iguales o superiores del 3% por hora fueron **4.8**.

**<u>COMENTARIO:</u>** Eficiencia de sueño normal. AOS leve con claro componente posicional. Sin hipoxia significativa.

**<u>DIAGNÓSTICO:</u>** *Apnea Obstructiva del Sueño leve, posicional*

**<u>RECOMENDACIÓN:</u>** Hábitos saludables del sueño. Terapia posicional. Control en 1 año.`
    },
    {
        id: 11,
        nombre: 'Paciente 11',
        demograficos: {
            edad: 68,
            sexo: 'Mujer',
            altura: 155,
            peso: 70,
            imc: 29.1,
            perimetro_cuello: 35,
            perimetro_cintura: 95,
            perimetro_cadera: 110,
            tension_arterial: '145/82'
        },
        antecedentes: ['Hipertensión arterial', 'Artrosis'],
        sintomas: ['Roncadora', 'Somnolencia diurna'],
        farmacos: ['Amlodipino', 'Paracetamol'],
        epworth: 8,
        tipo_estudio: 'Polisomnografía hospitalaria',
        sueno: {
            percepcion: 'Regular',
            tiempo_registro: 450,
            tiempo_total: 340,
            eficiencia: 75.6,
            latencia: 45,
            latencia_rem: 120,
            despertares: 6,
            vigilia_intrasueno: 42,
            porcentaje_supino: 60
        },
        arquitectura: { N1: 5.5, N2: 56, N3: 13.5, REM: 25 },
        respiratorio: {
            apneas_total: 18,
            apneas_centrales: 3,
            apneas_mixtas: 0,
            apneas_obstructivas: 15,
            hipopneas: 30,
            eventos_total: 48,
            iah: 8.5,
            iah_supino: 11,
            iah_no_supino: 5.8,
            iah_rem: 10.2,
            iah_nrem: 7.5
        },
        oximetria: {
            spo2_media: 94,
            spo2_min: 88,
            ct90: 4.2,
            desaturaciones_3pct: 7.5
        },
        plm: { index: 32, arousals_plm: 3.5 },
        arousals: { total: 13, respiratorios: 3.8 },
        diagnostico: 'Apnea Obstructiva del Sueño leve',
        severidad: 'leve',
        severidad_label: 'AOS Leve',
        recomendacion: 'Hábitos saludables del sueño. Control de peso. Seguimiento.',
        tratamiento: ['Hábitos saludables del sueño', 'Control de peso'],
        comentario: 'Eficiencia reducida. PLM elevados sin impacto significativo. AOS leve con desaturaciones leves.',
        informe_fragmento: 'El análisis respiratorio mostró 18 apneas (3 centrales, 0 mixtas y 15 obstructivas), 30 hipopneas, lo que da un ÍNDICE DE APNEA-HIPOPNEA (IAH) de 8.5. La saturación media de oxígeno fue 94% y la mínima 88%, con un CT-90 de 4.2%. Diagnóstico: Apnea Obstructiva del Sueño leve.',
        informe_completo: `| | |
| :--- | :--- |
| **Edad:** 68 años | **Tipo de estudio:** hospitalaria |
| **Altura:** 155 cm | **Médico que envía al paciente:** — |
| **Peso:** 70 kgs | **IMC:** 29.1 kg/m² |
| **Perímetro cuello:** 35 cm | **Tensión Arterial:** 145/82 |
| **Perímetro cintura:** 95 cm | |
| **Perímetro cadera:** 110 cm | |

**<u>HISTORIA CLÍNICA:</u>** Hipertensión arterial, artrosis, con somnolencia diurna (Epworth 8).

**<u>PSICOFÁRMACOS:</u>** Amlodipino, Paracetamol

**<u>RESUMEN:</u>** El paciente dice que ha dormido regular. El período total de registro fue 450 minutos, con un tiempo total de sueño de 340 minutos y una eficiencia del sueño de 75.6%. El 60% del tiempo estuvo en decúbito supino.

La latencia del sueño fue de 45 minutos y la latencia REM de 120 minutos. Durante el período de sueño presentó 6 despertares y estuvo despierto un total de 42 minutos.

El Hipnograma mostró los siguientes porcentajes. Sueño no REM: 5.5% **N1**, 56% **N2**, 13.5% **N3**. Sueño REM: 25% **R**.

El índice total de arousals (microdespertares) por hora fue de 13 y el índice de arousals relacionados con eventos respiratorios fue 3.8.

Se registraron movimientos periódicos de piernas (PLMs) con un índice de PLM de 32 y un índice de arousals por PLMs de 3.5.

El análisis respiratorio mostró 18 apneas (3 centrales, 0 mixtas y 15 obstructivas), 30 hipopneas, (apneas+hipopneas: 48), lo que da un **ÍNDICE DE APNEA-HIPOPNEA (IAH)** por hora de sueño de **8.5**.

El IAH en supino fue de 11, en comparación con el **IAH no supino** que fue de 5.8. El **IAH en REM** fue 10.2, y el **IAH en sueño no REM** fue de 7.5.

La **saturación media** de oxígeno fue 94 y la desaturación más baja fue 88, con un **CT-90 de 4.2%**. Las desaturaciones iguales o superiores del 3% por hora fueron **7.5**.

**<u>COMENTARIO:</u>** Eficiencia de sueño reducida. PLM elevados sin impacto significativo. AOS leve con desaturaciones leves.

**<u>DIAGNÓSTICO:</u>** *Apnea Obstructiva del Sueño leve*

**<u>RECOMENDACIÓN:</u>** Hábitos saludables del sueño. Control de peso. Seguimiento en consulta.`
    },
    {
        id: 12,
        nombre: 'Paciente 12',
        demograficos: {
            edad: 58,
            sexo: 'Hombre',
            altura: 170,
            peso: 88,
            imc: 30.4,
            perimetro_cuello: 42,
            perimetro_cintura: 105,
            perimetro_cadera: 108,
            tension_arterial: '142/88'
        },
        antecedentes: ['Hipertensión arterial', 'ERGE'],
        sintomas: ['Roncador', 'Apneas observadas', 'Somnolencia diurna'],
        farmacos: ['Omeprazol', 'Valsartán'],
        epworth: 12,
        tipo_estudio: 'Polisomnografía hospitalaria',
        sueno: {
            percepcion: 'Regular',
            tiempo_registro: 438,
            tiempo_total: 350,
            eficiencia: 79.9,
            latencia: 32,
            latencia_rem: 108,
            despertares: 4,
            vigilia_intrasueno: 28,
            porcentaje_supino: 72
        },
        arquitectura: { N1: 5.8, N2: 53, N3: 17.2, REM: 24 },
        respiratorio: {
            apneas_total: 25,
            apneas_centrales: 2,
            apneas_mixtas: 1,
            apneas_obstructivas: 22,
            hipopneas: 55,
            eventos_total: 80,
            iah: 13.7,
            iah_supino: 18.5,
            iah_no_supino: 5.2,
            iah_rem: 16,
            iah_nrem: 12.5
        },
        oximetria: {
            spo2_media: 94,
            spo2_min: 87,
            ct90: 8.5,
            desaturaciones_3pct: 12
        },
        plm: { index: 11, arousals_plm: 0.8 },
        arousals: { total: 15.2, respiratorios: 7.5 },
        diagnostico: 'Apnea Obstructiva del Sueño leve',
        severidad: 'leve',
        severidad_label: 'AOS Leve',
        recomendacion: 'Control de peso. Terapia posicional. Valorar DAM. Control en 3-6 meses.',
        tratamiento: ['Hábitos saludables del sueño', 'Control de peso', 'Terapia posicional', 'Valorar DAM'],
        comentario: 'Eficiencia reducida. IAH leve alto con componente posicional marcado. Hipoxia leve intermitente.',
        informe_fragmento: 'El análisis respiratorio mostró 25 apneas (2 centrales, 1 mixtas y 22 obstructivas), 55 hipopneas, lo que da un ÍNDICE DE APNEA-HIPOPNEA (IAH) de 13.7. La saturación media de oxígeno fue 94% y la mínima 87%, con un CT-90 de 8.5%. Diagnóstico: Apnea Obstructiva del Sueño leve.',
        informe_completo: `| | |
| :--- | :--- |
| **Edad:** 58 años | **Tipo de estudio:** hospitalaria |
| **Altura:** 170 cm | **Médico que envía al paciente:** — |
| **Peso:** 88 kgs | **IMC:** 30.4 kg/m² |
| **Perímetro cuello:** 42 cm | **Tensión Arterial:** 142/88 |
| **Perímetro cintura:** 105 cm | |
| **Perímetro cadera:** 108 cm | |

**<u>HISTORIA CLÍNICA:</u>** Hipertensión arterial, ERGE, con somnolencia diurna (Epworth 12).

**<u>PSICOFÁRMACOS:</u>** Omeprazol, Valsartán

**<u>RESUMEN:</u>** El paciente dice que ha dormido regular. El período total de registro fue 438 minutos, con un tiempo total de sueño de 350 minutos y una eficiencia del sueño de 79.9%. El 72% del tiempo estuvo en decúbito supino.

La latencia del sueño fue de 32 minutos y la latencia REM de 108 minutos. Durante el período de sueño presentó 4 despertares y estuvo despierto un total de 28 minutos.

El Hipnograma mostró los siguientes porcentajes. Sueño no REM: 5.8% **N1**, 53% **N2**, 17.2% **N3**. Sueño REM: 24% **R**.

El índice total de arousals (microdespertares) por hora fue de 15.2 y el índice de arousals relacionados con eventos respiratorios fue 7.5.

Se registraron movimientos periódicos de piernas (PLMs) con un índice de PLM de 11 y un índice de arousals por PLMs de 0.8.

El análisis respiratorio mostró 25 apneas (2 centrales, 1 mixtas y 22 obstructivas), 55 hipopneas, (apneas+hipopneas: 80), lo que da un **ÍNDICE DE APNEA-HIPOPNEA (IAH)** por hora de sueño de **13.7**.

El IAH en supino fue de 18.5, en comparación con el **IAH no supino** que fue de 5.2. El **IAH en REM** fue 16, y el **IAH en sueño no REM** fue de 12.5.

La **saturación media** de oxígeno fue 94 y la desaturación más baja fue 87, con un **CT-90 de 8.5%**. Las desaturaciones iguales o superiores del 3% por hora fueron **12**.

**<u>COMENTARIO:</u>** Eficiencia de sueño reducida. IAH en rango leve alto con componente posicional marcado. Hipoxia leve intermitente.

**<u>DIAGNÓSTICO:</u>** *Apnea Obstructiva del Sueño leve*

**<u>RECOMENDACIÓN:</u>** Hábitos saludables del sueño. Control de peso. Terapia posicional. Valorar DAM. Control en 3-6 meses.`
    },
    {
        id: 13,
        nombre: 'Paciente 13',
        demograficos: {
            edad: 52,
            sexo: 'Hombre',
            altura: 176,
            peso: 98,
            imc: 31.6,
            perimetro_cuello: 43,
            perimetro_cintura: 110,
            perimetro_cadera: 112,
            tension_arterial: '148/90'
        },
        antecedentes: ['Hipertensión arterial', 'Diabetes mellitus tipo 2', 'Dislipemia'],
        sintomas: ['Roncador', 'Apneas observadas', 'Somnolencia diurna'],
        farmacos: ['Metformina', 'Enalapril', 'Simvastatina'],
        epworth: 14,
        tipo_estudio: 'Polisomnografía hospitalaria',
        sueno: {
            percepcion: 'Regular',
            tiempo_registro: 440,
            tiempo_total: 335,
            eficiencia: 76.1,
            latencia: 40,
            latencia_rem: 125,
            despertares: 5,
            vigilia_intrasueno: 35,
            porcentaje_supino: 75
        },
        arquitectura: { N1: 6.2, N2: 55.5, N3: 15, REM: 23.3 },
        respiratorio: {
            apneas_total: 45,
            apneas_centrales: 3,
            apneas_mixtas: 2,
            apneas_obstructivas: 40,
            hipopneas: 65,
            eventos_total: 110,
            iah: 19.7,
            iah_supino: 28.5,
            iah_no_supino: 8.2,
            iah_rem: 22,
            iah_nrem: 18.5
        },
        oximetria: {
            spo2_media: 93,
            spo2_min: 84,
            ct90: 15.2,
            desaturaciones_3pct: 18
        },
        plm: { index: 8.5, arousals_plm: 0.5 },
        arousals: { total: 18.5, respiratorios: 10.2 },
        diagnostico: 'Apnea Obstructiva del Sueño moderada',
        severidad: 'moderada',
        severidad_label: 'AOS Moderada',
        recomendacion: 'Control de peso. Valorar CPAP. Titulación de CPAP.',
        tratamiento: ['Hábitos saludables del sueño', 'Control de peso', 'Valorar CPAP', 'Titulación CPAP'],
        comentario: 'Eficiencia reducida. AOS moderada con componente posicional. Hipoxia intermitente moderada.',
        informe_fragmento: 'El análisis respiratorio mostró 45 apneas (3 centrales, 2 mixtas y 40 obstructivas), 65 hipopneas, lo que da un ÍNDICE DE APNEA-HIPOPNEA (IAH) de 19.7. La saturación media de oxígeno fue 93% y la mínima 84%, con un CT-90 de 15.2%. Diagnóstico: Apnea Obstructiva del Sueño moderada.',
        informe_completo: `| | |
| :--- | :--- |
| **Edad:** 52 años | **Tipo de estudio:** hospitalaria |
| **Altura:** 176 cm | **Médico que envía al paciente:** — |
| **Peso:** 98 kgs | **IMC:** 31.6 kg/m² |
| **Perímetro cuello:** 43 cm | **Tensión Arterial:** 148/90 |
| **Perímetro cintura:** 110 cm | |
| **Perímetro cadera:** 112 cm | |

**<u>HISTORIA CLÍNICA:</u>** Hipertensión arterial, diabetes mellitus tipo 2, dislipemia, con somnolencia diurna (Epworth 14).

**<u>PSICOFÁRMACOS:</u>** Metformina, Enalapril, Simvastatina

**<u>RESUMEN:</u>** El paciente dice que ha dormido regular. El período total de registro fue 440 minutos, con un tiempo total de sueño de 335 minutos y una eficiencia del sueño de 76.1%. El 75% del tiempo estuvo en decúbito supino.

La latencia del sueño fue de 40 minutos y la latencia REM de 125 minutos. Durante el período de sueño presentó 5 despertares y estuvo despierto un total de 35 minutos.

El Hipnograma mostró los siguientes porcentajes. Sueño no REM: 6.2% **N1**, 55.5% **N2**, 15% **N3**. Sueño REM: 23.3% **R**.

El índice total de arousals (microdespertares) por hora fue de 18.5 y el índice de arousals relacionados con eventos respiratorios fue 10.2.

Se registraron movimientos periódicos de piernas (PLMs) con un índice de PLM de 8.5 y un índice de arousals por PLMs de 0.5.

El análisis respiratorio mostró 45 apneas (3 centrales, 2 mixtas y 40 obstructivas), 65 hipopneas, (apneas+hipopneas: 110), lo que da un **ÍNDICE DE APNEA-HIPOPNEA (IAH)** por hora de sueño de **19.7**.

El IAH en supino fue de 28.5, en comparación con el **IAH no supino** que fue de 8.2. El **IAH en REM** fue 22, y el **IAH en sueño no REM** fue de 18.5.

La **saturación media** de oxígeno fue 93 y la desaturación más baja fue 84, con un **CT-90 de 15.2%**. Las desaturaciones iguales o superiores del 3% por hora fueron **18**.

**<u>COMENTARIO:</u>** Eficiencia de sueño reducida. AOS moderada con componente posicional. Hipoxia intermitente moderada.

**<u>DIAGNÓSTICO:</u>** *Apnea Obstructiva del Sueño moderada*

**<u>RECOMENDACIÓN:</u>** Hábitos saludables y dietéticos del sueño. Control de peso. Valorar iniciar CPAP. Titulación de CPAP.`
    },
    {
        id: 14,
        nombre: 'Paciente 14',
        demograficos: {
            edad: 56,
            sexo: 'Mujer',
            altura: 158,
            peso: 82,
            imc: 32.8,
            perimetro_cuello: 37,
            perimetro_cintura: 104,
            perimetro_cadera: 118,
            tension_arterial: '138/82'
        },
        antecedentes: ['Hipotiroidismo', 'Fibromialgia'],
        sintomas: ['Roncadora', 'Apneas observadas', 'Somnolencia diurna'],
        farmacos: ['Levotiroxina', 'Pregabalina', 'Duloxetina'],
        epworth: 13,
        tipo_estudio: 'Polisomnografía hospitalaria',
        sueno: {
            percepcion: 'Mal',
            tiempo_registro: 455,
            tiempo_total: 310,
            eficiencia: 68.1,
            latencia: 65,
            latencia_rem: 145,
            despertares: 7,
            vigilia_intrasueno: 55,
            porcentaje_supino: 65
        },
        arquitectura: { N1: 7.5, N2: 54, N3: 12.5, REM: 26 },
        respiratorio: {
            apneas_total: 35,
            apneas_centrales: 1,
            apneas_mixtas: 0,
            apneas_obstructivas: 34,
            hipopneas: 55,
            eventos_total: 90,
            iah: 17.4,
            iah_supino: 25,
            iah_no_supino: 8.5,
            iah_rem: 20,
            iah_nrem: 16
        },
        oximetria: {
            spo2_media: 92,
            spo2_min: 82,
            ct90: 22.5,
            desaturaciones_3pct: 15.5
        },
        plm: { index: 35, arousals_plm: 4 },
        arousals: { total: 16, respiratorios: 8.5 },
        diagnostico: 'Apnea Obstructiva del Sueño moderada, con hipoxia nocturna moderada',
        severidad: 'moderada',
        severidad_label: 'AOS Moderada + Hipoxia',
        recomendacion: 'Iniciar CPAP. Titulación de CPAP hospitalaria.',
        tratamiento: ['Hábitos saludables del sueño', 'Iniciar CPAP', 'Titulación CPAP hospitalaria'],
        comentario: 'Eficiencia baja. Latencia muy aumentada. PLM elevados. AOS moderada con hipoxia moderada. Posible contribución farmacológica.',
        informe_fragmento: 'El análisis respiratorio mostró 35 apneas (1 centrales, 0 mixtas y 34 obstructivas), 55 hipopneas, lo que da un ÍNDICE DE APNEA-HIPOPNEA (IAH) de 17.4. La saturación media de oxígeno fue 92% y la mínima 82%, con un CT-90 de 22.5%. Diagnóstico: Apnea Obstructiva del Sueño moderada, con hipoxia nocturna moderada.',
        informe_completo: `| | |
| :--- | :--- |
| **Edad:** 56 años | **Tipo de estudio:** hospitalaria |
| **Altura:** 158 cm | **Médico que envía al paciente:** — |
| **Peso:** 82 kgs | **IMC:** 32.8 kg/m² |
| **Perímetro cuello:** 37 cm | **Tensión Arterial:** 138/82 |
| **Perímetro cintura:** 104 cm | |
| **Perímetro cadera:** 118 cm | |

**<u>HISTORIA CLÍNICA:</u>** Hipotiroidismo, fibromialgia, con somnolencia diurna (Epworth 13).

**<u>PSICOFÁRMACOS:</u>** Levotiroxina, Pregabalina, Duloxetina

**<u>RESUMEN:</u>** El paciente dice que ha dormido mal. El período total de registro fue 455 minutos, con un tiempo total de sueño de 310 minutos y una eficiencia del sueño de 68.1%. El 65% del tiempo estuvo en decúbito supino.

La latencia del sueño fue de 65 minutos y la latencia REM de 145 minutos. Durante el período de sueño presentó 7 despertares y estuvo despierto un total de 55 minutos.

El Hipnograma mostró los siguientes porcentajes. Sueño no REM: 7.5% **N1**, 54% **N2**, 12.5% **N3**. Sueño REM: 26% **R**.

El índice total de arousals (microdespertares) por hora fue de 16 y el índice de arousals relacionados con eventos respiratorios fue 8.5.

Se registraron movimientos periódicos de piernas (PLMs) con un índice de PLM de 35 y un índice de arousals por PLMs de 4.

El análisis respiratorio mostró 35 apneas (1 centrales, 0 mixtas y 34 obstructivas), 55 hipopneas, (apneas+hipopneas: 90), lo que da un **ÍNDICE DE APNEA-HIPOPNEA (IAH)** por hora de sueño de **17.4**.

El IAH en supino fue de 25, en comparación con el **IAH no supino** que fue de 8.5. El **IAH en REM** fue 20, y el **IAH en sueño no REM** fue de 16.

La **saturación media** de oxígeno fue 92 y la desaturación más baja fue 82, con un **CT-90 de 22.5%**. Las desaturaciones iguales o superiores del 3% por hora fueron **15.5**.

**<u>COMENTARIO:</u>** Eficiencia de sueño baja. Latencia muy aumentada. PLM elevados. AOS moderada con hipoxia moderada. Posible contribución farmacológica.

**<u>DIAGNÓSTICO:</u>** *Apnea Obstructiva del Sueño moderada, con hipoxia nocturna moderada*

**<u>RECOMENDACIÓN:</u>** Hábitos saludables del sueño. Iniciar tratamiento con CPAP. Titulación de CPAP hospitalaria.`
    },
    {
        id: 15,
        nombre: 'Paciente 15',
        demograficos: {
            edad: 47,
            sexo: 'Hombre',
            altura: 174,
            peso: 95,
            imc: 31.4,
            perimetro_cuello: 42,
            perimetro_cintura: 108,
            perimetro_cadera: 110,
            tension_arterial: '145/88'
        },
        antecedentes: ['Hipertensión arterial'],
        sintomas: ['Roncador', 'Apneas observadas', 'Somnolencia diurna intensa'],
        farmacos: ['Amlodipino'],
        epworth: 15,
        tipo_estudio: 'Polisomnografía hospitalaria',
        sueno: {
            percepcion: 'Regular',
            tiempo_registro: 430,
            tiempo_total: 340,
            eficiencia: 79.1,
            latencia: 30,
            latencia_rem: 100,
            despertares: 3,
            vigilia_intrasueno: 25,
            porcentaje_supino: 80
        },
        arquitectura: { N1: 5, N2: 52, N3: 18.5, REM: 24.5 },
        respiratorio: {
            apneas_total: 55,
            apneas_centrales: 5,
            apneas_mixtas: 2,
            apneas_obstructivas: 48,
            hipopneas: 50,
            eventos_total: 105,
            iah: 18.5,
            iah_supino: 26,
            iah_no_supino: 6.5,
            iah_rem: 24,
            iah_nrem: 16.5
        },
        oximetria: {
            spo2_media: 92,
            spo2_min: 83,
            ct90: 18.5,
            desaturaciones_3pct: 16.5
        },
        plm: { index: 6, arousals_plm: 0.2 },
        arousals: { total: 20.5, respiratorios: 12 },
        diagnostico: 'Apnea Obstructiva del Sueño moderada',
        severidad: 'moderada',
        severidad_label: 'AOS Moderada',
        recomendacion: 'Iniciar CPAP. Titulación de CPAP.',
        tratamiento: ['Hábitos saludables del sueño', 'Iniciar CPAP', 'Titulación CPAP'],
        comentario: 'AOS moderada con predominio supino y REM. Arousals frecuentes. Hipoxia moderada intermitente.',
        informe_fragmento: 'El análisis respiratorio mostró 55 apneas (5 centrales, 2 mixtas y 48 obstructivas), 50 hipopneas, lo que da un ÍNDICE DE APNEA-HIPOPNEA (IAH) de 18.5. La saturación media de oxígeno fue 92% y la mínima 83%, con un CT-90 de 18.5%. Diagnóstico: Apnea Obstructiva del Sueño moderada.',
        informe_completo: `| | |
| :--- | :--- |
| **Edad:** 47 años | **Tipo de estudio:** hospitalaria |
| **Altura:** 174 cm | **Médico que envía al paciente:** — |
| **Peso:** 95 kgs | **IMC:** 31.4 kg/m² |
| **Perímetro cuello:** 42 cm | **Tensión Arterial:** 145/88 |
| **Perímetro cintura:** 108 cm | |
| **Perímetro cadera:** 110 cm | |

**<u>HISTORIA CLÍNICA:</u>** Hipertensión arterial, con somnolencia diurna (Epworth 15).

**<u>PSICOFÁRMACOS:</u>** Amlodipino

**<u>RESUMEN:</u>** El paciente dice que ha dormido regular. El período total de registro fue 430 minutos, con un tiempo total de sueño de 340 minutos y una eficiencia del sueño de 79.1%. El 80% del tiempo estuvo en decúbito supino.

La latencia del sueño fue de 30 minutos y la latencia REM de 100 minutos. Durante el período de sueño presentó 3 despertares y estuvo despierto un total de 25 minutos.

El Hipnograma mostró los siguientes porcentajes. Sueño no REM: 5% **N1**, 52% **N2**, 18.5% **N3**. Sueño REM: 24.5% **R**.

El índice total de arousals (microdespertares) por hora fue de 20.5 y el índice de arousals relacionados con eventos respiratorios fue 12.

Se registraron movimientos periódicos de piernas (PLMs) con un índice de PLM de 6 y un índice de arousals por PLMs de 0.2.

El análisis respiratorio mostró 55 apneas (5 centrales, 2 mixtas y 48 obstructivas), 50 hipopneas, (apneas+hipopneas: 105), lo que da un **ÍNDICE DE APNEA-HIPOPNEA (IAH)** por hora de sueño de **18.5**.

El IAH en supino fue de 26, en comparación con el **IAH no supino** que fue de 6.5. El **IAH en REM** fue 24, y el **IAH en sueño no REM** fue de 16.5.

La **saturación media** de oxígeno fue 92 y la desaturación más baja fue 83, con un **CT-90 de 18.5%**. Las desaturaciones iguales o superiores del 3% por hora fueron **16.5**.

**<u>COMENTARIO:</u>** AOS moderada con predominio supino y en REM. Arousals frecuentes relacionados con eventos respiratorios. Hipoxia moderada intermitente.

**<u>DIAGNÓSTICO:</u>** *Apnea Obstructiva del Sueño moderada*

**<u>RECOMENDACIÓN:</u>** Hábitos saludables del sueño. Iniciar tratamiento con CPAP. Titulación de CPAP.`
    },
    {
        id: 16,
        nombre: 'Paciente 16',
        demograficos: {
            edad: 60,
            sexo: 'Hombre',
            altura: 168,
            peso: 90,
            imc: 31.9,
            perimetro_cuello: 44,
            perimetro_cintura: 112,
            perimetro_cadera: 109,
            tension_arterial: '150/92'
        },
        antecedentes: ['Hipertensión arterial', 'EPOC leve'],
        sintomas: ['Roncador', 'Apneas observadas', 'Somnolencia diurna'],
        farmacos: ['Tiotropio', 'Irbesartán'],
        epworth: 16,
        tipo_estudio: 'Polisomnografía hospitalaria',
        sueno: {
            percepcion: 'Mal',
            tiempo_registro: 435,
            tiempo_total: 320,
            eficiencia: 73.6,
            latencia: 48,
            latencia_rem: 135,
            despertares: 6,
            vigilia_intrasueno: 42,
            porcentaje_supino: 82
        },
        arquitectura: { N1: 7, N2: 56.5, N3: 12, REM: 24.5 },
        respiratorio: {
            apneas_total: 65,
            apneas_centrales: 5,
            apneas_mixtas: 3,
            apneas_obstructivas: 57,
            hipopneas: 45,
            eventos_total: 110,
            iah: 20.6,
            iah_supino: 28,
            iah_no_supino: 7.8,
            iah_rem: 26.5,
            iah_nrem: 18.8
        },
        oximetria: {
            spo2_media: 90,
            spo2_min: 80,
            ct90: 30,
            desaturaciones_3pct: 22
        },
        plm: { index: 18, arousals_plm: 1.5 },
        arousals: { total: 22, respiratorios: 14.5 },
        diagnostico: 'Apnea Obstructiva del Sueño moderada, con hipoxia nocturna moderada-grave',
        severidad: 'moderada',
        severidad_label: 'AOS Moderada + Hipoxia',
        recomendacion: 'Iniciar CPAP. Titulación hospitalaria. Optimizar EPOC.',
        tratamiento: ['Iniciar CPAP', 'Titulación CPAP hospitalaria', 'Optimizar tratamiento EPOC'],
        comentario: 'Eficiencia baja. AOS moderada con hipoxia significativa potenciada por EPOC. Componente posicional marcado.',
        informe_fragmento: 'El análisis respiratorio mostró 65 apneas (5 centrales, 3 mixtas y 57 obstructivas), 45 hipopneas, lo que da un ÍNDICE DE APNEA-HIPOPNEA (IAH) de 20.6. La saturación media de oxígeno fue 90% y la mínima 80%, con un CT-90 de 30%. Diagnóstico: Apnea Obstructiva del Sueño moderada, con hipoxia nocturna moderada-grave.',
        informe_completo: `| | |
| :--- | :--- |
| **Edad:** 60 años | **Tipo de estudio:** hospitalaria |
| **Altura:** 168 cm | **Médico que envía al paciente:** — |
| **Peso:** 90 kgs | **IMC:** 31.9 kg/m² |
| **Perímetro cuello:** 44 cm | **Tensión Arterial:** 150/92 |
| **Perímetro cintura:** 112 cm | |
| **Perímetro cadera:** 109 cm | |

**<u>HISTORIA CLÍNICA:</u>** Hipertensión arterial, EPOC leve, exfumador, con somnolencia diurna (Epworth 16).

**<u>PSICOFÁRMACOS:</u>** Tiotropio, Irbesartán

**<u>RESUMEN:</u>** El paciente dice que ha dormido mal. El período total de registro fue 435 minutos, con un tiempo total de sueño de 320 minutos y una eficiencia del sueño de 73.6%. El 82% del tiempo estuvo en decúbito supino.

La latencia del sueño fue de 48 minutos y la latencia REM de 135 minutos. Durante el período de sueño presentó 6 despertares y estuvo despierto un total de 42 minutos.

El Hipnograma mostró los siguientes porcentajes. Sueño no REM: 7% **N1**, 56.5% **N2**, 12% **N3**. Sueño REM: 24.5% **R**.

El índice total de arousals (microdespertares) por hora fue de 22 y el índice de arousals relacionados con eventos respiratorios fue 14.5.

Se registraron movimientos periódicos de piernas (PLMs) con un índice de PLM de 18 y un índice de arousals por PLMs de 1.5.

El análisis respiratorio mostró 65 apneas (5 centrales, 3 mixtas y 57 obstructivas), 45 hipopneas, (apneas+hipopneas: 110), lo que da un **ÍNDICE DE APNEA-HIPOPNEA (IAH)** por hora de sueño de **20.6**.

El IAH en supino fue de 28, en comparación con el **IAH no supino** que fue de 7.8. El **IAH en REM** fue 26.5, y el **IAH en sueño no REM** fue de 18.8.

La **saturación media** de oxígeno fue 90 y la desaturación más baja fue 80, con un **CT-90 de 30%**. Las desaturaciones iguales o superiores del 3% por hora fueron **22**.

**<u>COMENTARIO:</u>** Eficiencia baja. AOS moderada con hipoxia significativa, potenciada por EPOC leve de base. Componente posicional marcado.

**<u>DIAGNÓSTICO:</u>** *Apnea Obstructiva del Sueño moderada, con hipoxia nocturna moderada-grave*

**<u>RECOMENDACIÓN:</u>** Iniciar tratamiento con CPAP. Titulación de CPAP hospitalaria. Optimizar tratamiento EPOC.`
    },
    {
        id: 17,
        nombre: 'Paciente 17',
        demograficos: {
            edad: null,
            sexo: null,
            altura: null,
            peso: null,
            imc: null,
            perimetro_cuello: 41,
            perimetro_cintura: 103,
            perimetro_cadera: 107,
            tension_arterial: null
        },
        antecedentes: [],
        sintomas: ['Roncador', 'Somnolencia diurna'],
        farmacos: [],
        epworth: 12,
        tipo_estudio: 'Poligrafía domiciliaria (Alice Night One)',
        sueno: {
            percepcion: 'Regular',
            tiempo_registro: 380,
            tiempo_total: null,
            eficiencia: null,
            latencia: null,
            latencia_rem: null,
            despertares: null,
            vigilia_intrasueno: null,
            porcentaje_supino: 70
        },
        arquitectura: null,
        respiratorio: {
            apneas_total: 42,
            apneas_centrales: 2,
            apneas_mixtas: 1,
            apneas_obstructivas: 39,
            hipopneas: 55,
            eventos_total: 97,
            iah: 15.3,
            iah_supino: 22,
            iah_no_supino: 5.8,
            iah_rem: null,
            iah_nrem: null
        },
        oximetria: {
            spo2_media: 93,
            spo2_min: 85,
            ct90: 12,
            desaturaciones_3pct: 14.5
        },
        plm: null,
        arousals: null,
        diagnostico: 'Apnea Obstructiva del Sueño moderada',
        severidad: 'moderada',
        severidad_label: 'AOS Moderada',
        recomendacion: 'Valorar CPAP. Realizar PSG completa para titulación.',
        tratamiento: ['Hábitos saludables del sueño', 'Valorar CPAP', 'PSG completa'],
        comentario: 'Poligrafía con AOS moderada. Se recomienda PSG hospitalaria para confirmación y titulación.',
        informe_fragmento: 'El análisis respiratorio mostró 42 apneas (2 centrales, 1 mixtas y 39 obstructivas), 55 hipopneas, lo que da un ÍNDICE DE APNEA-HIPOPNEA (IAH) de 15.3. La saturación media de oxígeno fue 93% y la mínima 85%, con un CT-90 de 12%. Diagnóstico: Apnea Obstructiva del Sueño moderada.',
        informe_completo: `**<u>HISTORIA CLÍNICA:</u>** Roncador habitual (Epworth 12).

| | | |
| :--- | :--- | :--- |
| **Perímetro cuello:** 41 cm | **Perímetro cintura:** 103 cm | **Perímetro cadera:** 107 cm |

***Procedimiento:*** Estudio nocturno de sueño realizado en el domicilio del paciente utilizando un sistema de registro digital portátil (Alice Night One, Philips Respironics).

**<u>RESUMEN:</u>** El paciente dice que ha dormido regular. El tiempo de registro fue de 380 minutos. Se detectaron un total de 42 apneas, de las cuales 39 fueron obstructivas, 1 mixtas y 2 centrales. Se detectaron 55 hipopneas. **El ÍNDICE DE APNEA-HIPOPNEA fue 15.3/h.**

El paciente pasó 266 minutos en posición supina, con un IAH supino de 22/h en comparación con el IAH no supino de 5.8/h.

La saturación de oxígeno media fue **93%** y alcanzó un valor mínimo del **85%**, con **CT-90 de 12%**. El índice de desaturaciones ≥3% por hora fue de **14.5**.

**<u>COMENTARIO:</u>** Poligrafía con eventos respiratorios frecuentes. AOS moderada. Se recomienda PSG hospitalaria para confirmar y titular.

**<u>DIAGNÓSTICO:</u>** *Apnea Obstructiva del Sueño moderada*

**<u>RECOMENDACIÓN:</u>** Hábitos saludables del sueño. Valorar CPAP. Realizar PSG completa para titulación.`
    },
    {
        id: 18,
        nombre: 'Paciente 18',
        demograficos: {
            edad: 58,
            sexo: 'Hombre',
            altura: 172,
            peso: 110,
            imc: 37.2,
            perimetro_cuello: 46,
            perimetro_cintura: 125,
            perimetro_cadera: 118,
            tension_arterial: '155/95'
        },
        antecedentes: ['Hipertensión arterial', 'Diabetes mellitus tipo 2', 'Síndrome metabólico'],
        sintomas: ['Roncador', 'Apneas observadas', 'Somnolencia diurna intensa'],
        farmacos: ['Metformina', 'Insulina glargina', 'Enalapril', 'Atorvastatina'],
        epworth: 18,
        tipo_estudio: 'Polisomnografía hospitalaria',
        sueno: {
            percepcion: 'Mal',
            tiempo_registro: 440,
            tiempo_total: 290,
            eficiencia: 65.9,
            latencia: 50,
            latencia_rem: 150,
            despertares: 8,
            vigilia_intrasueno: 65,
            porcentaje_supino: 85
        },
        arquitectura: { N1: 9.5, N2: 58, N3: 8.5, REM: 24 },
        respiratorio: {
            apneas_total: 180,
            apneas_centrales: 8,
            apneas_mixtas: 5,
            apneas_obstructivas: 167,
            hipopneas: 55,
            eventos_total: 235,
            iah: 48.6,
            iah_supino: 55,
            iah_no_supino: 20.5,
            iah_rem: 52,
            iah_nrem: 47
        },
        oximetria: {
            spo2_media: 88,
            spo2_min: 72,
            ct90: 45,
            desaturaciones_3pct: 42
        },
        plm: { index: 5, arousals_plm: 0.2 },
        arousals: { total: 35, respiratorios: 28 },
        diagnostico: 'Apnea Obstructiva del Sueño grave, con hipoxia nocturna grave',
        severidad: 'grave',
        severidad_label: 'AOS Grave + Hipoxia Grave',
        recomendacion: 'CPAP urgente. Titulación hospitalaria. Control de peso. Valorar cirugía bariátrica.',
        tratamiento: ['CPAP urgente', 'Titulación hospitalaria', 'Control de peso', 'Valorar cirugía bariátrica'],
        comentario: 'Eficiencia muy baja. Arquitectura fragmentada. AOS grave con hipoxia grave. Síndrome metabólico asociado.',
        informe_fragmento: 'El análisis respiratorio mostró 180 apneas (8 centrales, 5 mixtas y 167 obstructivas), 55 hipopneas, lo que da un ÍNDICE DE APNEA-HIPOPNEA (IAH) de 48.6. La saturación media de oxígeno fue 88% y la mínima 72%, con un CT-90 de 45%. Diagnóstico: Apnea Obstructiva del Sueño grave, con hipoxia nocturna grave.',
        informe_completo: `| | |
| :--- | :--- |
| **Edad:** 58 años | **Tipo de estudio:** hospitalaria |
| **Altura:** 172 cm | **Médico que envía al paciente:** — |
| **Peso:** 110 kgs | **IMC:** 37.2 kg/m² |
| **Perímetro cuello:** 46 cm | **Tensión Arterial:** 155/95 |
| **Perímetro cintura:** 125 cm | |
| **Perímetro cadera:** 118 cm | |

**<u>HISTORIA CLÍNICA:</u>** Hipertensión arterial, diabetes mellitus tipo 2, síndrome metabólico, con somnolencia diurna (Epworth 18).

**<u>PSICOFÁRMACOS:</u>** Metformina, Insulina glargina, Enalapril, Atorvastatina

**<u>RESUMEN:</u>** El paciente dice que ha dormido mal. El período total de registro fue 440 minutos, con un tiempo total de sueño de 290 minutos y una eficiencia del sueño de 65.9%. El 85% del tiempo estuvo en decúbito supino.

La latencia del sueño fue de 50 minutos y la latencia REM de 150 minutos. Durante el período de sueño presentó 8 despertares y estuvo despierto un total de 65 minutos.

El Hipnograma mostró los siguientes porcentajes. Sueño no REM: 9.5% **N1**, 58% **N2**, 8.5% **N3**. Sueño REM: 24% **R**.

El índice total de arousals (microdespertares) por hora fue de 35 y el índice de arousals relacionados con eventos respiratorios fue 28.

Se registraron movimientos periódicos de piernas (PLMs) con un índice de PLM de 5 y un índice de arousals por PLMs de 0.2.

El análisis respiratorio mostró 180 apneas (8 centrales, 5 mixtas y 167 obstructivas), 55 hipopneas, (apneas+hipopneas: 235), lo que da un **ÍNDICE DE APNEA-HIPOPNEA (IAH)** por hora de sueño de **48.6**.

El IAH en supino fue de 55, en comparación con el **IAH no supino** que fue de 20.5. El **IAH en REM** fue 52, y el **IAH en sueño no REM** fue de 47.

La **saturación media** de oxígeno fue 88 y la desaturación más baja fue 72, con un **CT-90 de 45%**. Las desaturaciones iguales o superiores del 3% por hora fueron **42**.

**<u>COMENTARIO:</u>** Eficiencia de sueño muy baja. Arquitectura fragmentada con predominio N1-N2. AOS grave con hipoxia grave. Síndrome metabólico asociado.

**<u>DIAGNÓSTICO:</u>** *Apnea Obstructiva del Sueño grave, con hipoxia nocturna grave*

**<u>RECOMENDACIÓN:</u>** Iniciar tratamiento con CPAP urgente. Titulación de CPAP hospitalaria. Control de peso estricto. Valorar cirugía bariátrica.`
    },
    {
        id: 19,
        nombre: 'Paciente 19',
        demograficos: {
            edad: 49,
            sexo: 'Hombre',
            altura: 175,
            peso: 105,
            imc: 34.3,
            perimetro_cuello: 45,
            perimetro_cintura: 118,
            perimetro_cadera: 115,
            tension_arterial: '148/92'
        },
        antecedentes: ['Hipertensión arterial resistente', 'Fibrilación auricular paroxística'],
        sintomas: ['Roncador', 'Apneas observadas', 'Somnolencia diurna'],
        farmacos: ['Apixabán', 'Bisoprolol', 'Espironolactona'],
        epworth: 17,
        tipo_estudio: 'Polisomnografía hospitalaria',
        sueno: {
            percepcion: 'Mal',
            tiempo_registro: 435,
            tiempo_total: 305,
            eficiencia: 70.1,
            latencia: 42,
            latencia_rem: 140,
            despertares: 7,
            vigilia_intrasueno: 52,
            porcentaje_supino: 78
        },
        arquitectura: { N1: 8.8, N2: 56.5, N3: 10.2, REM: 24.5 },
        respiratorio: {
            apneas_total: 150,
            apneas_centrales: 12,
            apneas_mixtas: 8,
            apneas_obstructivas: 130,
            hipopneas: 60,
            eventos_total: 210,
            iah: 41.3,
            iah_supino: 50,
            iah_no_supino: 18,
            iah_rem: 48,
            iah_nrem: 38.5
        },
        oximetria: {
            spo2_media: 89,
            spo2_min: 74,
            ct90: 38,
            desaturaciones_3pct: 38.5
        },
        plm: { index: 7.5, arousals_plm: 0.5 },
        arousals: { total: 32, respiratorios: 25 },
        diagnostico: 'Apnea Obstructiva del Sueño grave, con hipoxia nocturna grave',
        severidad: 'grave',
        severidad_label: 'AOS Grave + Hipoxia Grave',
        recomendacion: 'CPAP urgente. Titulación hospitalaria. Control cardiológico.',
        tratamiento: ['CPAP urgente', 'Titulación hospitalaria', 'Control cardiológico'],
        comentario: 'AOS grave con hipoxia grave. FA paroxística asociada. HTA resistente probablemente secundaria a AOS.',
        informe_fragmento: 'El análisis respiratorio mostró 150 apneas (12 centrales, 8 mixtas y 130 obstructivas), 60 hipopneas, lo que da un ÍNDICE DE APNEA-HIPOPNEA (IAH) de 41.3. La saturación media de oxígeno fue 89% y la mínima 74%, con un CT-90 de 38%. Diagnóstico: Apnea Obstructiva del Sueño grave, con hipoxia nocturna grave.',
        informe_completo: `| | |
| :--- | :--- |
| **Edad:** 49 años | **Tipo de estudio:** hospitalaria |
| **Altura:** 175 cm | **Médico que envía al paciente:** — |
| **Peso:** 105 kgs | **IMC:** 34.3 kg/m² |
| **Perímetro cuello:** 45 cm | **Tensión Arterial:** 148/92 |
| **Perímetro cintura:** 118 cm | |
| **Perímetro cadera:** 115 cm | |

**<u>HISTORIA CLÍNICA:</u>** Hipertensión arterial resistente, arritmia (FA paroxística), con somnolencia diurna (Epworth 17).

**<u>PSICOFÁRMACOS:</u>** Apixabán, Bisoprolol, Espironolactona

**<u>RESUMEN:</u>** El paciente dice que ha dormido mal. El período total de registro fue 435 minutos, con un tiempo total de sueño de 305 minutos y una eficiencia del sueño de 70.1%. El 78% del tiempo estuvo en decúbito supino.

La latencia del sueño fue de 42 minutos y la latencia REM de 140 minutos. Durante el período de sueño presentó 7 despertares y estuvo despierto un total de 52 minutos.

El Hipnograma mostró los siguientes porcentajes. Sueño no REM: 8.8% **N1**, 56.5% **N2**, 10.2% **N3**. Sueño REM: 24.5% **R**.

El índice total de arousals (microdespertares) por hora fue de 32 y el índice de arousals relacionados con eventos respiratorios fue 25.

Se registraron movimientos periódicos de piernas (PLMs) con un índice de PLM de 7.5 y un índice de arousals por PLMs de 0.5.

El análisis respiratorio mostró 150 apneas (12 centrales, 8 mixtas y 130 obstructivas), 60 hipopneas, (apneas+hipopneas: 210), lo que da un **ÍNDICE DE APNEA-HIPOPNEA (IAH)** por hora de sueño de **41.3**.

El IAH en supino fue de 50, en comparación con el **IAH no supino** que fue de 18. El **IAH en REM** fue 48, y el **IAH en sueño no REM** fue de 38.5.

La **saturación media** de oxígeno fue 89 y la desaturación más baja fue 74, con un **CT-90 de 38%**. Las desaturaciones iguales o superiores del 3% por hora fueron **38.5**.

**<u>COMENTARIO:</u>** AOS grave con hipoxia grave. FA paroxística asociada. HTA resistente probablemente secundaria a AOS. Prioridad tratamiento.

**<u>DIAGNÓSTICO:</u>** *Apnea Obstructiva del Sueño grave, con hipoxia nocturna grave*

**<u>RECOMENDACIÓN:</u>** Iniciar CPAP urgente. Titulación hospitalaria. Control cardiológico.`
    },
    {
        id: 20,
        nombre: 'Paciente 20',
        demograficos: {
            edad: null,
            sexo: null,
            altura: null,
            peso: null,
            imc: null,
            perimetro_cuello: 44,
            perimetro_cintura: 120,
            perimetro_cadera: 116,
            tension_arterial: null
        },
        antecedentes: [],
        sintomas: ['Roncador', 'Apneas observadas', 'Somnolencia diurna'],
        farmacos: [],
        epworth: 15,
        tipo_estudio: 'Poligrafía domiciliaria (Alice Night One)',
        sueno: {
            percepcion: 'Mal',
            tiempo_registro: 360,
            tiempo_total: null,
            eficiencia: null,
            latencia: null,
            latencia_rem: null,
            despertares: null,
            vigilia_intrasueno: null,
            porcentaje_supino: 80
        },
        arquitectura: null,
        respiratorio: {
            apneas_total: 250,
            apneas_centrales: 5,
            apneas_mixtas: 3,
            apneas_obstructivas: 242,
            hipopneas: 35,
            eventos_total: 285,
            iah: 47.5,
            iah_supino: 55,
            iah_no_supino: 25,
            iah_rem: null,
            iah_nrem: null
        },
        oximetria: {
            spo2_media: 86,
            spo2_min: 68,
            ct90: 55,
            desaturaciones_3pct: 50
        },
        plm: null,
        arousals: null,
        diagnostico: 'Apnea Obstructiva del Sueño grave con hipoxemia nocturna grave',
        severidad: 'grave',
        severidad_label: 'AOS Grave + Hipoxemia',
        recomendacion: 'CPAP urgente. Titulación hospitalaria.',
        tratamiento: ['CPAP urgente', 'Titulación CPAP hospitalaria'],
        comentario: 'Poligrafía con eventos obstructivos muy frecuentes. AOS grave con hipoxemia severa.',
        informe_fragmento: 'El análisis respiratorio mostró 250 apneas (5 centrales, 3 mixtas y 242 obstructivas), 35 hipopneas, lo que da un ÍNDICE DE APNEA-HIPOPNEA (IAH) de 47.5. La saturación media de oxígeno fue 86% y la mínima 68%, con un CT-90 de 55%. Diagnóstico: Apnea Obstructiva del Sueño grave con hipoxemia nocturna grave.',
        informe_completo: `**<u>HISTORIA CLÍNICA:</u>** Roncador con paradas respiratorias presenciadas (Epworth 15).

| | | |
| :--- | :--- | :--- |
| **Perímetro cuello:** 44 cm | **Perímetro cintura:** 120 cm | **Perímetro cadera:** 116 cm |

***Procedimiento:*** Estudio nocturno de sueño realizado en el domicilio del paciente utilizando un sistema de registro digital portátil (Alice Night One, Philips Respironics).

**<u>RESUMEN:</u>** El paciente dice que ha dormido mal. El tiempo de registro fue de 360 minutos. Se detectaron un total de 250 apneas, de las cuales 242 fueron obstructivas, 3 mixtas y 5 centrales. Se detectaron 35 hipopneas. **El ÍNDICE DE APNEA-HIPOPNEA fue 47.5/h.**

El paciente pasó 288 minutos en posición supina, con un IAH supino de 55/h en comparación con el IAH no supino de 25/h.

La saturación de oxígeno media fue **86%** y alcanzó un valor mínimo del **68%**, con **CT-90 de 55%**. El índice de desaturaciones ≥3% por hora fue de **50**.

**<u>COMENTARIO:</u>** Poligrafía con eventos obstructivos muy frecuentes. AOS grave con hipoxemia severa. Prioridad alta para tratamiento.

**<u>DIAGNÓSTICO:</u>** *Apnea Obstructiva del Sueño grave con hipoxemia nocturna grave*

**<u>RECOMENDACIÓN:</u>** Iniciar CPAP urgente. Titulación de CPAP hospitalaria.`
    },
    {
        id: 21,
        nombre: 'Paciente 21',
        demograficos: {
            edad: 28,
            sexo: 'Hombre',
            altura: 180,
            peso: 75,
            imc: 23.1,
            perimetro_cuello: 37,
            perimetro_cintura: 82,
            perimetro_cadera: 95,
            tension_arterial: '118/70'
        },
        antecedentes: [],
        sintomas: ['Somnolencia diurna leve'],
        farmacos: [],
        epworth: 3,
        tipo_estudio: 'Polisomnografía hospitalaria',
        sueno: {
            percepcion: 'Bien',
            tiempo_registro: 460,
            tiempo_total: 415,
            eficiencia: 90.2,
            latencia: 14,
            latencia_rem: 82,
            despertares: 0,
            vigilia_intrasueno: 10,
            porcentaje_supino: 40
        },
        arquitectura: { N1: 2.5, N2: 47, N3: 24.5, REM: 26 },
        respiratorio: {
            apneas_total: 1,
            apneas_centrales: 0,
            apneas_mixtas: 0,
            apneas_obstructivas: 1,
            hipopneas: 3,
            eventos_total: 4,
            iah: 0.6,
            iah_supino: 0.8,
            iah_no_supino: 0.4,
            iah_rem: 1,
            iah_nrem: 0.4
        },
        oximetria: {
            spo2_media: 98,
            spo2_min: 95,
            ct90: 0,
            desaturaciones_3pct: 0.4
        },
        plm: { index: 2, arousals_plm: 0 },
        arousals: { total: 4.5, respiratorios: 0.2 },
        diagnostico: 'No compatible con Apnea Obstructiva del Sueño',
        severidad: 'ninguna',
        severidad_label: 'Sin AOS',
        recomendacion: 'No precisa seguimiento. Hábitos saludables del sueño.',
        tratamiento: ['Hábitos saludables del sueño'],
        comentario: 'Estudio completamente normal. Arquitectura del sueño óptima.',
        informe_fragmento: 'El análisis respiratorio mostró 1 apneas (0 centrales, 0 mixtas y 1 obstructivas), 3 hipopneas, lo que da un ÍNDICE DE APNEA-HIPOPNEA (IAH) de 0.6. La saturación media de oxígeno fue 98% y la mínima 95%, con un CT-90 de 0%. Diagnóstico: No compatible con Apnea Obstructiva del Sueño.',
        informe_completo: `| | |
| :--- | :--- |
| **Edad:** 28 años | **Tipo de estudio:** hospitalaria |
| **Altura:** 180 cm | **Médico que envía al paciente:** — |
| **Peso:** 75 kgs | **IMC:** 23.1 kg/m² |
| **Perímetro cuello:** 37 cm | **Tensión Arterial:** 118/70 |
| **Perímetro cintura:** 82 cm | |
| **Perímetro cadera:** 95 cm | |

**<u>HISTORIA CLÍNICA:</u>** Sin antecedentes relevantes, con somnolencia diurna (Epworth 3).

**<u>PSICOFÁRMACOS:</u>** Ninguno

**<u>RESUMEN:</u>** El paciente dice que ha dormido bien. El período total de registro fue 460 minutos, con un tiempo total de sueño de 415 minutos y una eficiencia del sueño de 90.2%. El 40% del tiempo estuvo en decúbito supino.

La latencia del sueño fue de 14 minutos y la latencia REM de 82 minutos. Durante el período de sueño presentó 0 despertares y estuvo despierto un total de 10 minutos.

El Hipnograma mostró los siguientes porcentajes. Sueño no REM: 2.5% **N1**, 47% **N2**, 24.5% **N3**. Sueño REM: 26% **R**.

El índice total de arousals (microdespertares) por hora fue de 4.5 y el índice de arousals relacionados con eventos respiratorios fue 0.2.

Se registraron movimientos periódicos de piernas (PLMs) con un índice de PLM de 2 y un índice de arousals por PLMs de 0.

El análisis respiratorio mostró 1 apneas (0 centrales, 0 mixtas y 1 obstructivas), 3 hipopneas, (apneas+hipopneas: 4), lo que da un **ÍNDICE DE APNEA-HIPOPNEA (IAH)** por hora de sueño de **0.6**.

El IAH en supino fue de 0.8, en comparación con el **IAH no supino** que fue de 0.4. El **IAH en REM** fue 1, y el **IAH en sueño no REM** fue de 0.4.

La **saturación media** de oxígeno fue 98 y la desaturación más baja fue 95, con un **CT-90 de 0%**. Las desaturaciones iguales o superiores del 3% por hora fueron **0.4**.

**<u>COMENTARIO:</u>** Estudio completamente normal. Arquitectura del sueño óptima. Sin eventos respiratorios significativos.

**<u>DIAGNÓSTICO:</u>** *No compatible con Apnea Obstructiva del Sueño*

**<u>RECOMENDACIÓN:</u>** No precisa seguimiento específico. Hábitos saludables del sueño.`
    },
    {
        id: 22,
        nombre: 'Paciente 22',
        demograficos: {
            edad: 63,
            sexo: 'Mujer',
            altura: 160,
            peso: 68,
            imc: 26.6,
            perimetro_cuello: 34,
            perimetro_cintura: 88,
            perimetro_cadera: 104,
            tension_arterial: '130/78'
        },
        antecedentes: ['Síndrome piernas inquietas', 'Ferropenia'],
        sintomas: ['Roncadora', 'Somnolencia diurna', 'Piernas inquietas'],
        farmacos: ['Pramipexol', 'Hierro oral'],
        epworth: 9,
        tipo_estudio: 'Polisomnografía hospitalaria',
        sueno: {
            percepcion: 'Mal',
            tiempo_registro: 445,
            tiempo_total: 310,
            eficiencia: 69.7,
            latencia: 60,
            latencia_rem: 140,
            despertares: 8,
            vigilia_intrasueno: 50,
            porcentaje_supino: 48
        },
        arquitectura: { N1: 8, N2: 52, N3: 14, REM: 26 },
        respiratorio: {
            apneas_total: 10,
            apneas_centrales: 0,
            apneas_mixtas: 0,
            apneas_obstructivas: 10,
            hipopneas: 20,
            eventos_total: 30,
            iah: 5.8,
            iah_supino: 8,
            iah_no_supino: 3.5,
            iah_rem: 7.5,
            iah_nrem: 5
        },
        oximetria: {
            spo2_media: 95,
            spo2_min: 90,
            ct90: 1.5,
            desaturaciones_3pct: 4.5
        },
        plm: { index: 65, arousals_plm: 8.5 },
        arousals: { total: 14.5, respiratorios: 2 },
        diagnostico: 'Apnea Obstructiva del Sueño leve. Movimiento periódico de piernas grave.',
        severidad: 'leve',
        severidad_label: 'AOS Leve + PLM Grave',
        recomendacion: 'Optimizar tratamiento SPI. Control de ferritina. Seguimiento en 3 meses.',
        tratamiento: ['Hábitos saludables del sueño', 'Optimizar tratamiento SPI', 'Control ferritina'],
        comentario: 'Eficiencia baja. PLM muy elevados como causa principal de fragmentación. AOS leve concomitante.',
        informe_fragmento: 'El análisis respiratorio mostró 10 apneas (0 centrales, 0 mixtas y 10 obstructivas), 20 hipopneas, lo que da un ÍNDICE DE APNEA-HIPOPNEA (IAH) de 5.8. La saturación media de oxígeno fue 95% y la mínima 90%, con un CT-90 de 1.5%. Diagnóstico: Apnea Obstructiva del Sueño leve. Movimiento periódico de piernas grave..',
        informe_completo: `| | |
| :--- | :--- |
| **Edad:** 63 años | **Tipo de estudio:** hospitalaria |
| **Altura:** 160 cm | **Médico que envía al paciente:** — |
| **Peso:** 68 kgs | **IMC:** 26.6 kg/m² |
| **Perímetro cuello:** 34 cm | **Tensión Arterial:** 130/78 |
| **Perímetro cintura:** 88 cm | |
| **Perímetro cadera:** 104 cm | |

**<u>HISTORIA CLÍNICA:</u>** Síndrome de piernas inquietas, ferropenia, con somnolencia diurna (Epworth 9).

**<u>PSICOFÁRMACOS:</u>** Pramipexol, Hierro oral

**<u>RESUMEN:</u>** El paciente dice que ha dormido mal. El período total de registro fue 445 minutos, con un tiempo total de sueño de 310 minutos y una eficiencia del sueño de 69.7%. El 48% del tiempo estuvo en decúbito supino.

La latencia del sueño fue de 60 minutos y la latencia REM de 140 minutos. Durante el período de sueño presentó 8 despertares y estuvo despierto un total de 50 minutos.

El Hipnograma mostró los siguientes porcentajes. Sueño no REM: 8% **N1**, 52% **N2**, 14% **N3**. Sueño REM: 26% **R**.

El índice total de arousals (microdespertares) por hora fue de 14.5 y el índice de arousals relacionados con eventos respiratorios fue 2.

Se registraron movimientos periódicos de piernas (PLMs) con un índice de PLM de 65 y un índice de arousals por PLMs de 8.5.

El análisis respiratorio mostró 10 apneas (0 centrales, 0 mixtas y 10 obstructivas), 20 hipopneas, (apneas+hipopneas: 30), lo que da un **ÍNDICE DE APNEA-HIPOPNEA (IAH)** por hora de sueño de **5.8**.

El IAH en supino fue de 8, en comparación con el **IAH no supino** que fue de 3.5. El **IAH en REM** fue 7.5, y el **IAH en sueño no REM** fue de 5.

La **saturación media** de oxígeno fue 95 y la desaturación más baja fue 90, con un **CT-90 de 1.5%**. Las desaturaciones iguales o superiores del 3% por hora fueron **4.5**.

**<u>COMENTARIO:</u>** Eficiencia baja. PLM muy elevados con arousals asociados como causa principal de fragmentación. AOS leve concomitante.

**<u>DIAGNÓSTICO:</u>** *Apnea Obstructiva del Sueño leve. Movimiento periódico de piernas grave.*

**<u>RECOMENDACIÓN:</u>** Hábitos saludables del sueño. Optimizar tratamiento SPI. Control de ferritina. Seguimiento en 3 meses.`
    },
    {
        id: 23,
        nombre: 'Paciente 23',
        demograficos: {
            edad: null,
            sexo: null,
            altura: null,
            peso: null,
            imc: null,
            perimetro_cuello: 43,
            perimetro_cintura: 108,
            perimetro_cadera: 112,
            tension_arterial: null
        },
        antecedentes: [],
        sintomas: ['Roncador', 'Somnolencia diurna'],
        farmacos: [],
        epworth: 14,
        tipo_estudio: 'Poligrafía domiciliaria (Alice Night One)',
        sueno: {
            percepcion: 'Regular',
            tiempo_registro: 395,
            tiempo_total: null,
            eficiencia: null,
            latencia: null,
            latencia_rem: null,
            despertares: null,
            vigilia_intrasueno: null,
            porcentaje_supino: 75
        },
        arquitectura: null,
        respiratorio: {
            apneas_total: 55,
            apneas_centrales: 3,
            apneas_mixtas: 0,
            apneas_obstructivas: 52,
            hipopneas: 60,
            eventos_total: 115,
            iah: 17.5,
            iah_supino: 24,
            iah_no_supino: 6.5,
            iah_rem: null,
            iah_nrem: null
        },
        oximetria: {
            spo2_media: 92,
            spo2_min: 84,
            ct90: 16,
            desaturaciones_3pct: 16
        },
        plm: null,
        arousals: null,
        diagnostico: 'Apnea Obstructiva del Sueño moderada',
        severidad: 'moderada',
        severidad_label: 'AOS Moderada',
        recomendacion: 'Realizar PSG completa. Valorar CPAP.',
        tratamiento: ['PSG completa', 'Valorar CPAP'],
        comentario: 'AOS moderada en poligrafía. PSG hospitalaria recomendable.',
        informe_fragmento: 'El análisis respiratorio mostró 55 apneas (3 centrales, 0 mixtas y 52 obstructivas), 60 hipopneas, lo que da un ÍNDICE DE APNEA-HIPOPNEA (IAH) de 17.5. La saturación media de oxígeno fue 92% y la mínima 84%, con un CT-90 de 16%. Diagnóstico: Apnea Obstructiva del Sueño moderada.',
        informe_completo: `**<u>HISTORIA CLÍNICA:</u>** Roncador con somnolencia diurna (Epworth 14).

| | | |
| :--- | :--- | :--- |
| **Perímetro cuello:** 43 cm | **Perímetro cintura:** 108 cm | **Perímetro cadera:** 112 cm |

***Procedimiento:*** Estudio nocturno de sueño realizado en el domicilio del paciente utilizando un sistema de registro digital portátil (Alice Night One, Philips Respironics).

**<u>RESUMEN:</u>** El paciente dice que ha dormido regular. El tiempo de registro fue de 395 minutos. Se detectaron un total de 55 apneas, de las cuales 52 fueron obstructivas, 0 mixtas y 3 centrales. Se detectaron 60 hipopneas. **El ÍNDICE DE APNEA-HIPOPNEA fue 17.5/h.**

El paciente pasó 296.2 minutos en posición supina, con un IAH supino de 24/h en comparación con el IAH no supino de 6.5/h.

La saturación de oxígeno media fue **92%** y alcanzó un valor mínimo del **84%**, con **CT-90 de 16%**. El índice de desaturaciones ≥3% por hora fue de **16**.

**<u>COMENTARIO:</u>** AOS moderada en poligrafía. Recomendable PSG hospitalaria para evaluación completa y titulación.

**<u>DIAGNÓSTICO:</u>** *Apnea Obstructiva del Sueño moderada*

**<u>RECOMENDACIÓN:</u>** Realizar PSG completa. Valorar CPAP.`
    },
    {
        id: 24,
        nombre: 'Paciente 24',
        demograficos: {
            edad: 42,
            sexo: 'Hombre',
            altura: 170,
            peso: 135,
            imc: 46.7,
            perimetro_cuello: 50,
            perimetro_cintura: 140,
            perimetro_cadera: 135,
            tension_arterial: '165/100'
        },
        antecedentes: ['Obesidad mórbida', 'Insuficiencia cardíaca', 'Diabetes mellitus tipo 2', 'Síndrome metabólico'],
        sintomas: ['Roncador', 'Apneas observadas', 'Somnolencia diurna intensa', 'Cefalea matutina'],
        farmacos: ['Furosemida', 'Metformina', 'Insulina', 'Ramipril', 'Bisoprolol'],
        epworth: 20,
        tipo_estudio: 'Polisomnografía hospitalaria',
        sueno: {
            percepcion: 'Mal',
            tiempo_registro: 420,
            tiempo_total: 250,
            eficiencia: 59.5,
            latencia: 55,
            latencia_rem: 180,
            despertares: 12,
            vigilia_intrasueno: 80,
            porcentaje_supino: 90
        },
        arquitectura: { N1: 12, N2: 60, N3: 5.5, REM: 22.5 },
        respiratorio: {
            apneas_total: 350,
            apneas_centrales: 25,
            apneas_mixtas: 15,
            apneas_obstructivas: 310,
            hipopneas: 40,
            eventos_total: 390,
            iah: 93.6,
            iah_supino: 98,
            iah_no_supino: 52,
            iah_rem: 88,
            iah_nrem: 95
        },
        oximetria: {
            spo2_media: 80,
            spo2_min: 55,
            ct90: 82,
            desaturaciones_3pct: 88
        },
        plm: { index: 3, arousals_plm: 0.1 },
        arousals: { total: 45, respiratorios: 38 },
        diagnostico: 'Apnea Obstructiva del Sueño muy grave, con hipoxemia muy grave. Componente central.',
        severidad: 'grave',
        severidad_label: 'AOS Muy Grave + Hipoxemia Muy Grave',
        recomendacion: 'CPAP urgente. Titulación inmediata. Cirugía bariátrica. Seguimiento cardiológico.',
        tratamiento: ['CPAP urgente', 'Titulación hospitalaria inmediata', 'Cirugía bariátrica', 'Seguimiento cardiológico'],
        comentario: 'AOS muy grave con IAH extremo. Obesidad mórbida. Hipoxemia muy grave con componente central (overlap). IC asociada. Caso alta complejidad.',
        informe_fragmento: 'El análisis respiratorio mostró 350 apneas (25 centrales, 15 mixtas y 310 obstructivas), 40 hipopneas, lo que da un ÍNDICE DE APNEA-HIPOPNEA (IAH) de 93.6. La saturación media de oxígeno fue 80% y la mínima 55%, con un CT-90 de 82%. Diagnóstico: Apnea Obstructiva del Sueño muy grave, con hipoxemia muy grave. Componente central..',
        informe_completo: `| | |
| :--- | :--- |
| **Edad:** 42 años | **Tipo de estudio:** hospitalaria |
| **Altura:** 170 cm | **Médico que envía al paciente:** — |
| **Peso:** 135 kgs | **IMC:** 46.7 kg/m² |
| **Perímetro cuello:** 50 cm | **Tensión Arterial:** 165/100 |
| **Perímetro cintura:** 140 cm | |
| **Perímetro cadera:** 135 cm | |

**<u>HISTORIA CLÍNICA:</u>** Obesidad mórbida, síndrome metabólico, insuficiencia cardíaca, diabetes mellitus tipo 2, con somnolencia diurna (Epworth 20).

**<u>PSICOFÁRMACOS:</u>** Furosemida, Metformina, Insulina, Ramipril, Bisoprolol

**<u>RESUMEN:</u>** El paciente dice que ha dormido mal. El período total de registro fue 420 minutos, con un tiempo total de sueño de 250 minutos y una eficiencia del sueño de 59.5%. El 90% del tiempo estuvo en decúbito supino.

La latencia del sueño fue de 55 minutos y la latencia REM de 180 minutos. Durante el período de sueño presentó 12 despertares y estuvo despierto un total de 80 minutos.

El Hipnograma mostró los siguientes porcentajes. Sueño no REM: 12% **N1**, 60% **N2**, 5.5% **N3**. Sueño REM: 22.5% **R**.

El índice total de arousals (microdespertares) por hora fue de 45 y el índice de arousals relacionados con eventos respiratorios fue 38.

Se registraron movimientos periódicos de piernas (PLMs) con un índice de PLM de 3 y un índice de arousals por PLMs de 0.1.

El análisis respiratorio mostró 350 apneas (25 centrales, 15 mixtas y 310 obstructivas), 40 hipopneas, (apneas+hipopneas: 390), lo que da un **ÍNDICE DE APNEA-HIPOPNEA (IAH)** por hora de sueño de **93.6**.

El IAH en supino fue de 98, en comparación con el **IAH no supino** que fue de 52. El **IAH en REM** fue 88, y el **IAH en sueño no REM** fue de 95.

La **saturación media** de oxígeno fue 80 y la desaturación más baja fue 55, con un **CT-90 de 82%**. Las desaturaciones iguales o superiores del 3% por hora fueron **88**.

**<u>COMENTARIO:</u>** AOS muy grave con IAH extremo. Obesidad mórbida. Hipoxemia muy grave con componente central sugestivo de overlap syndrome. Insuficiencia cardíaca asociada. Caso de alta complejidad.

**<u>DIAGNÓSTICO:</u>** *Apnea Obstructiva del Sueño muy grave, con hipoxemia nocturna muy grave. Componente central.*

**<u>RECOMENDACIÓN:</u>** CPAP urgente. Titulación hospitalaria inmediata. Cirugía bariátrica. Seguimiento estrecho cardiológico.`
    },
    {
        id: 25,
        nombre: 'Paciente 25',
        demograficos: {
            edad: 70,
            sexo: 'Mujer',
            altura: 158,
            peso: 62,
            imc: 24.8,
            perimetro_cuello: 33,
            perimetro_cintura: 85,
            perimetro_cadera: 102,
            tension_arterial: '138/80'
        },
        antecedentes: ['Osteoporosis'],
        sintomas: ['Roncadora ocasional'],
        farmacos: ['Calcio', 'Vitamina D'],
        epworth: 5,
        tipo_estudio: 'Polisomnografía hospitalaria',
        sueno: {
            percepcion: 'Bien',
            tiempo_registro: 440,
            tiempo_total: 370,
            eficiencia: 84.1,
            latencia: 28,
            latencia_rem: 100,
            despertares: 3,
            vigilia_intrasueno: 22,
            porcentaje_supino: 50
        },
        arquitectura: { N1: 4.5, N2: 54, N3: 16.5, REM: 25 },
        respiratorio: {
            apneas_total: 4,
            apneas_centrales: 1,
            apneas_mixtas: 0,
            apneas_obstructivas: 3,
            hipopneas: 10,
            eventos_total: 14,
            iah: 2.3,
            iah_supino: 3,
            iah_no_supino: 1.5,
            iah_rem: 3.5,
            iah_nrem: 1.8
        },
        oximetria: {
            spo2_media: 96,
            spo2_min: 92,
            ct90: 0,
            desaturaciones_3pct: 1.5
        },
        plm: { index: 18, arousals_plm: 1.5 },
        arousals: { total: 8, respiratorios: 1 },
        diagnostico: 'No compatible con Apnea Obstructiva del Sueño',
        severidad: 'ninguna',
        severidad_label: 'Sin AOS',
        recomendacion: 'Hábitos saludables del sueño.',
        tratamiento: ['Hábitos saludables del sueño'],
        comentario: 'Eficiencia aceptable para la edad. Arquitectura conservada. PLM ligeramente elevados sin impacto. Se descarta AOS.',
        informe_fragmento: 'El análisis respiratorio mostró 4 apneas (1 centrales, 0 mixtas y 3 obstructivas), 10 hipopneas, lo que da un ÍNDICE DE APNEA-HIPOPNEA (IAH) de 2.3. La saturación media de oxígeno fue 96% y la mínima 92%, con un CT-90 de 0%. Diagnóstico: No compatible con Apnea Obstructiva del Sueño.',
        informe_completo: `| | |
| :--- | :--- |
| **Edad:** 70 años | **Tipo de estudio:** hospitalaria |
| **Altura:** 158 cm | **Médico que envía al paciente:** — |
| **Peso:** 62 kgs | **IMC:** 24.8 kg/m² |
| **Perímetro cuello:** 33 cm | **Tensión Arterial:** 138/80 |
| **Perímetro cintura:** 85 cm | |
| **Perímetro cadera:** 102 cm | |

**<u>HISTORIA CLÍNICA:</u>** Osteoporosis, con somnolencia diurna (Epworth 5).

**<u>PSICOFÁRMACOS:</u>** Calcio, Vitamina D

**<u>RESUMEN:</u>** El paciente dice que ha dormido bien. El período total de registro fue 440 minutos, con un tiempo total de sueño de 370 minutos y una eficiencia del sueño de 84.1%. El 50% del tiempo estuvo en decúbito supino.

La latencia del sueño fue de 28 minutos y la latencia REM de 100 minutos. Durante el período de sueño presentó 3 despertares y estuvo despierto un total de 22 minutos.

El Hipnograma mostró los siguientes porcentajes. Sueño no REM: 4.5% **N1**, 54% **N2**, 16.5% **N3**. Sueño REM: 25% **R**.

El índice total de arousals (microdespertares) por hora fue de 8 y el índice de arousals relacionados con eventos respiratorios fue 1.

Se registraron movimientos periódicos de piernas (PLMs) con un índice de PLM de 18 y un índice de arousals por PLMs de 1.5.

El análisis respiratorio mostró 4 apneas (1 centrales, 0 mixtas y 3 obstructivas), 10 hipopneas, (apneas+hipopneas: 14), lo que da un **ÍNDICE DE APNEA-HIPOPNEA (IAH)** por hora de sueño de **2.3**.

El IAH en supino fue de 3, en comparación con el **IAH no supino** que fue de 1.5. El **IAH en REM** fue 3.5, y el **IAH en sueño no REM** fue de 1.8.

La **saturación media** de oxígeno fue 96 y la desaturación más baja fue 92, con un **CT-90 de 0%**. Las desaturaciones iguales o superiores del 3% por hora fueron **1.5**.

**<u>COMENTARIO:</u>** Eficiencia de sueño aceptable para la edad. Arquitectura del sueño conservada. PLM ligeramente elevados sin impacto. Se descarta AOS.

**<u>DIAGNÓSTICO:</u>** *No compatible con Apnea Obstructiva del Sueño*

**<u>RECOMENDACIÓN:</u>** Hábitos saludables del sueño.`
    },
    {
        id: 26,
        nombre: 'Paciente 26',
        demograficos: {
            edad: 38,
            sexo: 'Hombre',
            altura: 175,
            peso: 72,
            imc: 23.5,
            perimetro_cuello: 40,
            perimetro_cintura: 85,
            perimetro_cadera: 95,
            tension_arterial: '122/74'
        },
        antecedentes: ['Desviación septal'],
        sintomas: ['Roncador', 'Apneas observadas', 'Somnolencia diurna'],
        farmacos: [],
        epworth: 10,
        tipo_estudio: 'Polisomnografía hospitalaria',
        sueno: {
            percepcion: 'Bien',
            tiempo_registro: 435,
            tiempo_total: 385,
            eficiencia: 88.5,
            latencia: 15,
            latencia_rem: 90,
            despertares: 2,
            vigilia_intrasueno: 15,
            porcentaje_supino: 65
        },
        arquitectura: { N1: 3.5, N2: 50, N3: 21.5, REM: 25 },
        respiratorio: {
            apneas_total: 15,
            apneas_centrales: 0,
            apneas_mixtas: 0,
            apneas_obstructivas: 15,
            hipopneas: 30,
            eventos_total: 45,
            iah: 7,
            iah_supino: 12,
            iah_no_supino: 2,
            iah_rem: 9.5,
            iah_nrem: 6
        },
        oximetria: {
            spo2_media: 96,
            spo2_min: 91,
            ct90: 0.8,
            desaturaciones_3pct: 5
        },
        plm: { index: 4, arousals_plm: 0 },
        arousals: { total: 11, respiratorios: 5.5 },
        diagnostico: 'Apnea Obstructiva del Sueño leve, posicional',
        severidad: 'leve',
        severidad_label: 'AOS Leve',
        recomendacion: 'Terapia posicional. Valorar corrección septal. Control en 1 año.',
        tratamiento: ['Terapia posicional', 'Valorar corrección septal'],
        comentario: 'AOS leve con predominio posicional en paciente no obeso. Posible factor anatómico (desviación septal, cuello grueso constitucional).',
        informe_fragmento: 'El análisis respiratorio mostró 15 apneas (0 centrales, 0 mixtas y 15 obstructivas), 30 hipopneas, lo que da un ÍNDICE DE APNEA-HIPOPNEA (IAH) de 7. La saturación media de oxígeno fue 96% y la mínima 91%, con un CT-90 de 0.8%. Diagnóstico: Apnea Obstructiva del Sueño leve, posicional.',
        informe_completo: `| | |
| :--- | :--- |
| **Edad:** 38 años | **Tipo de estudio:** hospitalaria |
| **Altura:** 175 cm | **Médico que envía al paciente:** — |
| **Peso:** 72 kgs | **IMC:** 23.5 kg/m² |
| **Perímetro cuello:** 40 cm | **Tensión Arterial:** 122/74 |
| **Perímetro cintura:** 85 cm | |
| **Perímetro cadera:** 95 cm | |

**<u>HISTORIA CLÍNICA:</u>** Desviación septal, con somnolencia diurna (Epworth 10).

**<u>PSICOFÁRMACOS:</u>** Ninguno

**<u>RESUMEN:</u>** El paciente dice que ha dormido bien. El período total de registro fue 435 minutos, con un tiempo total de sueño de 385 minutos y una eficiencia del sueño de 88.5%. El 65% del tiempo estuvo en decúbito supino.

La latencia del sueño fue de 15 minutos y la latencia REM de 90 minutos. Durante el período de sueño presentó 2 despertares y estuvo despierto un total de 15 minutos.

El Hipnograma mostró los siguientes porcentajes. Sueño no REM: 3.5% **N1**, 50% **N2**, 21.5% **N3**. Sueño REM: 25% **R**.

El índice total de arousals (microdespertares) por hora fue de 11 y el índice de arousals relacionados con eventos respiratorios fue 5.5.

Se registraron movimientos periódicos de piernas (PLMs) con un índice de PLM de 4 y un índice de arousals por PLMs de 0.

El análisis respiratorio mostró 15 apneas (0 centrales, 0 mixtas y 15 obstructivas), 30 hipopneas, (apneas+hipopneas: 45), lo que da un **ÍNDICE DE APNEA-HIPOPNEA (IAH)** por hora de sueño de **7**.

El IAH en supino fue de 12, en comparación con el **IAH no supino** que fue de 2. El **IAH en REM** fue 9.5, y el **IAH en sueño no REM** fue de 6.

La **saturación media** de oxígeno fue 96 y la desaturación más baja fue 91, con un **CT-90 de 0.8%**. Las desaturaciones iguales o superiores del 3% por hora fueron **5**.

**<u>COMENTARIO:</u>** AOS leve con claro predominio posicional en paciente no obeso. Posible factor anatómico (desviación septal, cuello grueso constitucional).

**<u>DIAGNÓSTICO:</u>** *Apnea Obstructiva del Sueño leve, posicional*

**<u>RECOMENDACIÓN:</u>** Terapia posicional. Valorar corrección septal. Control en 1 año.`
    },
    {
        id: 27,
        nombre: 'Paciente 27',
        demograficos: {
            edad: 65,
            sexo: 'Hombre',
            altura: 170,
            peso: 82,
            imc: 28.4,
            perimetro_cuello: 40,
            perimetro_cintura: 100,
            perimetro_cadera: 104,
            tension_arterial: '140/85'
        },
        antecedentes: ['EPOC moderado'],
        sintomas: ['Roncador', 'Apneas observadas', 'Somnolencia diurna'],
        farmacos: ['Budesonida/Formoterol', 'Tiotropio'],
        epworth: 11,
        tipo_estudio: 'Polisomnografía hospitalaria',
        sueno: {
            percepcion: 'Mal',
            tiempo_registro: 445,
            tiempo_total: 300,
            eficiencia: 67.4,
            latencia: 55,
            latencia_rem: 145,
            despertares: 7,
            vigilia_intrasueno: 58,
            porcentaje_supino: 70
        },
        arquitectura: { N1: 8.5, N2: 55, N3: 11, REM: 25.5 },
        respiratorio: {
            apneas_total: 35,
            apneas_centrales: 8,
            apneas_mixtas: 2,
            apneas_obstructivas: 25,
            hipopneas: 50,
            eventos_total: 85,
            iah: 17,
            iah_supino: 22,
            iah_no_supino: 10,
            iah_rem: 20,
            iah_nrem: 15.5
        },
        oximetria: {
            spo2_media: 88,
            spo2_min: 75,
            ct90: 42,
            desaturaciones_3pct: 18
        },
        plm: { index: 15, arousals_plm: 1 },
        arousals: { total: 18.5, respiratorios: 8 },
        diagnostico: 'Apnea Obstructiva del Sueño moderada con hipoxia nocturna grave. Overlap syndrome.',
        severidad: 'moderada',
        severidad_label: 'AOS Moderada + Overlap',
        recomendacion: 'Iniciar CPAP con O₂ suplementario. Titulación hospitalaria. Optimizar EPOC.',
        tratamiento: ['Iniciar CPAP', 'O₂ suplementario', 'Titulación hospitalaria', 'Optimizar EPOC'],
        comentario: 'AOS moderada con hipoxia desproporcionada por EPOC (overlap syndrome). Apneas centrales asociadas. Prioridad alta.',
        informe_fragmento: 'El análisis respiratorio mostró 35 apneas (8 centrales, 2 mixtas y 25 obstructivas), 50 hipopneas, lo que da un ÍNDICE DE APNEA-HIPOPNEA (IAH) de 17. La saturación media de oxígeno fue 88% y la mínima 75%, con un CT-90 de 42%. Diagnóstico: Apnea Obstructiva del Sueño moderada con hipoxia nocturna grave. Overlap syndrome..',
        informe_completo: `| | |
| :--- | :--- |
| **Edad:** 65 años | **Tipo de estudio:** hospitalaria |
| **Altura:** 170 cm | **Médico que envía al paciente:** — |
| **Peso:** 82 kgs | **IMC:** 28.4 kg/m² |
| **Perímetro cuello:** 40 cm | **Tensión Arterial:** 140/85 |
| **Perímetro cintura:** 100 cm | |
| **Perímetro cadera:** 104 cm | |

**<u>HISTORIA CLÍNICA:</u>** EPOC moderado, exfumador (40 paquetes-año), con somnolencia diurna (Epworth 11).

**<u>PSICOFÁRMACOS:</u>** Budesonida/Formoterol, Tiotropio

**<u>RESUMEN:</u>** El paciente dice que ha dormido mal. El período total de registro fue 445 minutos, con un tiempo total de sueño de 300 minutos y una eficiencia del sueño de 67.4%. El 70% del tiempo estuvo en decúbito supino.

La latencia del sueño fue de 55 minutos y la latencia REM de 145 minutos. Durante el período de sueño presentó 7 despertares y estuvo despierto un total de 58 minutos.

El Hipnograma mostró los siguientes porcentajes. Sueño no REM: 8.5% **N1**, 55% **N2**, 11% **N3**. Sueño REM: 25.5% **R**.

El índice total de arousals (microdespertares) por hora fue de 18.5 y el índice de arousals relacionados con eventos respiratorios fue 8.

Se registraron movimientos periódicos de piernas (PLMs) con un índice de PLM de 15 y un índice de arousals por PLMs de 1.

El análisis respiratorio mostró 35 apneas (8 centrales, 2 mixtas y 25 obstructivas), 50 hipopneas, (apneas+hipopneas: 85), lo que da un **ÍNDICE DE APNEA-HIPOPNEA (IAH)** por hora de sueño de **17**.

El IAH en supino fue de 22, en comparación con el **IAH no supino** que fue de 10. El **IAH en REM** fue 20, y el **IAH en sueño no REM** fue de 15.5.

La **saturación media** de oxígeno fue 88 y la desaturación más baja fue 75, con un **CT-90 de 42%**. Las desaturaciones iguales o superiores del 3% por hora fueron **18**.

**<u>COMENTARIO:</u>** AOS moderada con hipoxia desproporcionada por EPOC de base (overlap syndrome). Apneas centrales asociadas. Prioridad alta para tratamiento con CPAP y O₂.

**<u>DIAGNÓSTICO:</u>** *Apnea Obstructiva del Sueño moderada con hipoxia nocturna grave. Overlap syndrome (AOS + EPOC)*

**<u>RECOMENDACIÓN:</u>** Iniciar CPAP. Titulación hospitalaria con oxígeno suplementario. Optimizar tratamiento EPOC.`
    },
    {
        id: 28,
        nombre: 'Paciente 28',
        demograficos: {
            edad: 62,
            sexo: 'Mujer',
            altura: 155,
            peso: 95,
            imc: 39.5,
            perimetro_cuello: 39,
            perimetro_cintura: 115,
            perimetro_cadera: 125,
            tension_arterial: '155/92'
        },
        antecedentes: ['Obesidad', 'Hipertensión arterial', 'Diabetes mellitus tipo 2', 'Depresión'],
        sintomas: ['Roncadora', 'Apneas observadas', 'Somnolencia diurna intensa'],
        farmacos: ['Metformina', 'Valsartán', 'Sertralina', 'Trazodona'],
        epworth: 16,
        tipo_estudio: 'Polisomnografía hospitalaria',
        sueno: {
            percepcion: 'Mal',
            tiempo_registro: 450,
            tiempo_total: 280,
            eficiencia: 62.2,
            latencia: 62,
            latencia_rem: 160,
            despertares: 9,
            vigilia_intrasueno: 72,
            porcentaje_supino: 82
        },
        arquitectura: { N1: 10, N2: 57.5, N3: 7.5, REM: 25 },
        respiratorio: {
            apneas_total: 120,
            apneas_centrales: 5,
            apneas_mixtas: 3,
            apneas_obstructivas: 112,
            hipopneas: 70,
            eventos_total: 190,
            iah: 40.7,
            iah_supino: 48,
            iah_no_supino: 15,
            iah_rem: 45,
            iah_nrem: 38
        },
        oximetria: {
            spo2_media: 87,
            spo2_min: 70,
            ct90: 48,
            desaturaciones_3pct: 38
        },
        plm: { index: 12, arousals_plm: 1 },
        arousals: { total: 30, respiratorios: 22 },
        diagnostico: 'Apnea Obstructiva del Sueño grave, con hipoxia nocturna grave',
        severidad: 'grave',
        severidad_label: 'AOS Grave + Hipoxia Grave',
        recomendacion: 'Iniciar CPAP. Titulación hospitalaria. Control de peso. Valorar cirugía bariátrica.',
        tratamiento: ['Iniciar CPAP', 'Titulación hospitalaria', 'Control de peso', 'Valorar cirugía bariátrica'],
        comentario: 'AOS grave con hipoxia grave en mujer con obesidad y múltiples comorbilidades. Arquitectura muy fragmentada. Psicofármacos pueden contribuir.',
        informe_fragmento: 'El análisis respiratorio mostró 120 apneas (5 centrales, 3 mixtas y 112 obstructivas), 70 hipopneas, lo que da un ÍNDICE DE APNEA-HIPOPNEA (IAH) de 40.7. La saturación media de oxígeno fue 87% y la mínima 70%, con un CT-90 de 48%. Diagnóstico: Apnea Obstructiva del Sueño grave, con hipoxia nocturna grave.',
        informe_completo: `| | |
| :--- | :--- |
| **Edad:** 62 años | **Tipo de estudio:** hospitalaria |
| **Altura:** 155 cm | **Médico que envía al paciente:** — |
| **Peso:** 95 kgs | **IMC:** 39.5 kg/m² |
| **Perímetro cuello:** 39 cm | **Tensión Arterial:** 155/92 |
| **Perímetro cintura:** 115 cm | |
| **Perímetro cadera:** 125 cm | |

**<u>HISTORIA CLÍNICA:</u>** Obesidad, hipertensión arterial, diabetes mellitus tipo 2, depresión, con somnolencia diurna (Epworth 16).

**<u>PSICOFÁRMACOS:</u>** Metformina, Valsartán, Sertralina, Trazodona

**<u>RESUMEN:</u>** El paciente dice que ha dormido mal. El período total de registro fue 450 minutos, con un tiempo total de sueño de 280 minutos y una eficiencia del sueño de 62.2%. El 82% del tiempo estuvo en decúbito supino.

La latencia del sueño fue de 62 minutos y la latencia REM de 160 minutos. Durante el período de sueño presentó 9 despertares y estuvo despierto un total de 72 minutos.

El Hipnograma mostró los siguientes porcentajes. Sueño no REM: 10% **N1**, 57.5% **N2**, 7.5% **N3**. Sueño REM: 25% **R**.

El índice total de arousals (microdespertares) por hora fue de 30 y el índice de arousals relacionados con eventos respiratorios fue 22.

Se registraron movimientos periódicos de piernas (PLMs) con un índice de PLM de 12 y un índice de arousals por PLMs de 1.

El análisis respiratorio mostró 120 apneas (5 centrales, 3 mixtas y 112 obstructivas), 70 hipopneas, (apneas+hipopneas: 190), lo que da un **ÍNDICE DE APNEA-HIPOPNEA (IAH)** por hora de sueño de **40.7**.

El IAH en supino fue de 48, en comparación con el **IAH no supino** que fue de 15. El **IAH en REM** fue 45, y el **IAH en sueño no REM** fue de 38.

La **saturación media** de oxígeno fue 87 y la desaturación más baja fue 70, con un **CT-90 de 48%**. Las desaturaciones iguales o superiores del 3% por hora fueron **38**.

**<u>COMENTARIO:</u>** AOS grave con hipoxia grave en mujer con obesidad y múltiples comorbilidades. Arquitectura del sueño muy fragmentada. Psicofármacos pueden contribuir a hipoxia.

**<u>DIAGNÓSTICO:</u>** *Apnea Obstructiva del Sueño grave, con hipoxia nocturna grave*

**<u>RECOMENDACIÓN:</u>** Iniciar CPAP. Titulación hospitalaria. Control de peso. Valorar cirugía bariátrica.`
    },
    {
        id: 29,
        nombre: 'Paciente 29',
        demograficos: {
            edad: 40,
            sexo: 'Mujer',
            altura: 168,
            peso: 60,
            imc: 21.3,
            perimetro_cuello: 32,
            perimetro_cintura: 70,
            perimetro_cadera: 94,
            tension_arterial: '110/68'
        },
        antecedentes: [],
        sintomas: ['Somnolencia diurna leve'],
        farmacos: [],
        epworth: 5,
        tipo_estudio: 'Polisomnografía hospitalaria',
        sueno: {
            percepcion: 'Bien',
            tiempo_registro: 450,
            tiempo_total: 405,
            eficiencia: 90,
            latencia: 15,
            latencia_rem: 85,
            despertares: 1,
            vigilia_intrasueno: 12,
            porcentaje_supino: 42
        },
        arquitectura: { N1: 2.8, N2: 48, N3: 23.5, REM: 25.7 },
        respiratorio: {
            apneas_total: 1,
            apneas_centrales: 0,
            apneas_mixtas: 0,
            apneas_obstructivas: 1,
            hipopneas: 4,
            eventos_total: 5,
            iah: 0.7,
            iah_supino: 1,
            iah_no_supino: 0.5,
            iah_rem: 1.2,
            iah_nrem: 0.5
        },
        oximetria: {
            spo2_media: 98,
            spo2_min: 95,
            ct90: 0,
            desaturaciones_3pct: 0.3
        },
        plm: { index: 3, arousals_plm: 0 },
        arousals: { total: 4.8, respiratorios: 0.2 },
        diagnostico: 'No compatible con Apnea Obstructiva del Sueño',
        severidad: 'ninguna',
        severidad_label: 'Sin AOS',
        recomendacion: 'No precisa tratamiento específico.',
        tratamiento: ['Hábitos saludables del sueño'],
        comentario: 'Estudio completamente normal. Sin eventos respiratorios.',
        informe_fragmento: 'El análisis respiratorio mostró 1 apneas (0 centrales, 0 mixtas y 1 obstructivas), 4 hipopneas, lo que da un ÍNDICE DE APNEA-HIPOPNEA (IAH) de 0.7. La saturación media de oxígeno fue 98% y la mínima 95%, con un CT-90 de 0%. Diagnóstico: No compatible con Apnea Obstructiva del Sueño.',
        informe_completo: `| | |
| :--- | :--- |
| **Edad:** 40 años | **Tipo de estudio:** hospitalaria |
| **Altura:** 168 cm | **Médico que envía al paciente:** — |
| **Peso:** 60 kgs | **IMC:** 21.3 kg/m² |
| **Perímetro cuello:** 32 cm | **Tensión Arterial:** 110/68 |
| **Perímetro cintura:** 70 cm | |
| **Perímetro cadera:** 94 cm | |

**<u>HISTORIA CLÍNICA:</u>** Sin antecedentes relevantes, con somnolencia diurna (Epworth 5).

**<u>PSICOFÁRMACOS:</u>** Ninguno

**<u>RESUMEN:</u>** El paciente dice que ha dormido bien. El período total de registro fue 450 minutos, con un tiempo total de sueño de 405 minutos y una eficiencia del sueño de 90%. El 42% del tiempo estuvo en decúbito supino.

La latencia del sueño fue de 15 minutos y la latencia REM de 85 minutos. Durante el período de sueño presentó 1 despertares y estuvo despierto un total de 12 minutos.

El Hipnograma mostró los siguientes porcentajes. Sueño no REM: 2.8% **N1**, 48% **N2**, 23.5% **N3**. Sueño REM: 25.7% **R**.

El índice total de arousals (microdespertares) por hora fue de 4.8 y el índice de arousals relacionados con eventos respiratorios fue 0.2.

Se registraron movimientos periódicos de piernas (PLMs) con un índice de PLM de 3 y un índice de arousals por PLMs de 0.

El análisis respiratorio mostró 1 apneas (0 centrales, 0 mixtas y 1 obstructivas), 4 hipopneas, (apneas+hipopneas: 5), lo que da un **ÍNDICE DE APNEA-HIPOPNEA (IAH)** por hora de sueño de **0.7**.

El IAH en supino fue de 1, en comparación con el **IAH no supino** que fue de 0.5. El **IAH en REM** fue 1.2, y el **IAH en sueño no REM** fue de 0.5.

La **saturación media** de oxígeno fue 98 y la desaturación más baja fue 95, con un **CT-90 de 0%**. Las desaturaciones iguales o superiores del 3% por hora fueron **0.3**.

**<u>COMENTARIO:</u>** Estudio completamente normal. Sin eventos respiratorios.

**<u>DIAGNÓSTICO:</u>** *No compatible con Apnea Obstructiva del Sueño*

**<u>RECOMENDACIÓN:</u>** No precisa tratamiento específico.`
    },
    {
        id: 30,
        nombre: 'Paciente 30',
        demograficos: {
            edad: null,
            sexo: null,
            altura: null,
            peso: null,
            imc: null,
            perimetro_cuello: 39,
            perimetro_cintura: 100,
            perimetro_cadera: 106,
            tension_arterial: null
        },
        antecedentes: [],
        sintomas: ['Roncador', 'Somnolencia diurna'],
        farmacos: [],
        epworth: 10,
        tipo_estudio: 'Poligrafía domiciliaria (Alice Night One)',
        sueno: {
            percepcion: 'Regular',
            tiempo_registro: 370,
            tiempo_total: null,
            eficiencia: null,
            latencia: null,
            latencia_rem: null,
            despertares: null,
            vigilia_intrasueno: null,
            porcentaje_supino: 60
        },
        arquitectura: null,
        respiratorio: {
            apneas_total: 18,
            apneas_centrales: 1,
            apneas_mixtas: 0,
            apneas_obstructivas: 17,
            hipopneas: 25,
            eventos_total: 43,
            iah: 7,
            iah_supino: 10.5,
            iah_no_supino: 3.5,
            iah_rem: null,
            iah_nrem: null
        },
        oximetria: {
            spo2_media: 95,
            spo2_min: 89,
            ct90: 3,
            desaturaciones_3pct: 5.5
        },
        plm: null,
        arousals: null,
        diagnostico: 'Apnea Obstructiva del Sueño leve',
        severidad: 'leve',
        severidad_label: 'AOS Leve',
        recomendacion: 'Terapia posicional. Control en 6 meses con PSG completa.',
        tratamiento: ['Hábitos saludables del sueño', 'Terapia posicional'],
        comentario: 'Poligrafía con AOS leve posicional. Se recomienda PSG completa.',
        informe_fragmento: 'El análisis respiratorio mostró 18 apneas (1 centrales, 0 mixtas y 17 obstructivas), 25 hipopneas, lo que da un ÍNDICE DE APNEA-HIPOPNEA (IAH) de 7. La saturación media de oxígeno fue 95% y la mínima 89%, con un CT-90 de 3%. Diagnóstico: Apnea Obstructiva del Sueño leve.',
        informe_completo: `**<u>HISTORIA CLÍNICA:</u>** Roncador con somnolencia (Epworth 10).

| | | |
| :--- | :--- | :--- |
| **Perímetro cuello:** 39 cm | **Perímetro cintura:** 100 cm | **Perímetro cadera:** 106 cm |

***Procedimiento:*** Estudio nocturno de sueño realizado en el domicilio del paciente utilizando un sistema de registro digital portátil (Alice Night One, Philips Respironics).

**<u>RESUMEN:</u>** El paciente dice que ha dormido regular. El tiempo de registro fue de 370 minutos. Se detectaron un total de 18 apneas, de las cuales 17 fueron obstructivas, 0 mixtas y 1 centrales. Se detectaron 25 hipopneas. **El ÍNDICE DE APNEA-HIPOPNEA fue 7/h.**

El paciente pasó 222 minutos en posición supina, con un IAH supino de 10.5/h en comparación con el IAH no supino de 3.5/h.

La saturación de oxígeno media fue **95%** y alcanzó un valor mínimo del **89%**, con **CT-90 de 3%**. El índice de desaturaciones ≥3% por hora fue de **5.5**.

**<u>COMENTARIO:</u>** Poligrafía con AOS leve posicional. Se recomienda PSG completa para evaluación detallada.

**<u>DIAGNÓSTICO:</u>** *Apnea Obstructiva del Sueño leve*

**<u>RECOMENDACIÓN:</u>** Hábitos saludables del sueño. Terapia posicional. Control en 6 meses con PSG completa.`
    }

];

// Helper: get severity info for a metric value
function getSeverity(metricKey, value) {
    if (value === null || value === undefined) return { label: 'N/D', color: '#9E9E9E', level: -1 };
    const ref = REFERENCE_RANGES[metricKey];
    if (!ref) return { label: '?', color: '#9E9E9E', level: -1 };

    for (const range of ref.ranges) {
        if ('max' in range) {
            // Lower is better (IAH, CT90, PLM, arousals)
            if (value < range.max) return { label: range.label, color: range.color, level: range.level };
        } else if ('min' in range) {
            // Higher is better (SpO2, eficiencia)
            if (value >= range.min) return { label: range.label, color: range.color, level: range.level };
        }
    }
    return { label: '?', color: '#9E9E9E', level: -1 };
}

// Helper: get severity badge color
function getSeverityBadge(severidad) {
    const map = {
        'ninguna': { label: 'Sin AOS', color: '#4CAF50', bg: '#E8F5E9' },
        'leve': { label: 'AOS Leve', color: '#FFC107', bg: '#FFF8E1' },
        'moderada': { label: 'AOS Moderada', color: '#FF9800', bg: '#FFF3E0' },
        'grave': { label: 'AOS Grave', color: '#F44336', bg: '#FFEBEE' }
    };
    return map[severidad] || { label: severidad, color: '#9E9E9E', bg: '#F5F5F5' };
}

// Simple markdown to HTML converter (no library dependency)
function mdToHtml(md) {
    let html = md
        // Tables: convert markdown tables to HTML
        .replace(/^(\|.+\|)\n(\|[\s:|-]+\|)\n((?:\|.+\|\n?)*)/gm, function(match, header, sep, body) {
            const ths = header.split('|').filter(c => c.trim() !== '').map(c => `<th>${c.trim()}</th>`).join('');
            const rows = body.trim().split('\n').map(row => {
                const tds = row.split('|').filter(c => c.trim() !== '').map(c => `<td>${c.trim()}</td>`).join('');
                return `<tr>${tds}</tr>`;
            }).join('');
            return `<table class="data-table"><thead><tr>${ths}</tr></thead><tbody>${rows}</tbody></table>`;
        })
        // Bold + italic
        .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
        // Bold
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // Line breaks (double newline = paragraph)
        .replace(/\n\n/g, '</p><p>')
        // Single newline = br
        .replace(/\n/g, '<br>');
    return '<p>' + html + '</p>';
}

// Compute population statistics for a metric across all patients
function computePopulationStats(metricKey) {
    const values = PATIENTS.map(p => {
        switch (metricKey) {
            case 'iah': return p.respiratorio.iah;
            case 'spo2_media': return p.oximetria.spo2_media;
            case 'spo2_min': return p.oximetria.spo2_min;
            case 'ct90': return p.oximetria.ct90;
            case 'eficiencia': return p.sueno.eficiencia;
            case 'plm_index': return p.plm ? p.plm.index : null;
            case 'arousals': return p.arousals ? p.arousals.total : null;
            case 'desaturaciones': return p.oximetria.desaturaciones_3pct;
            default: return null;
        }
    }).filter(v => v !== null && v !== undefined);

    if (values.length === 0) return null;

    const sorted = [...values].sort((a, b) => a - b);
    const n = sorted.length;
    const sum = sorted.reduce((a, b) => a + b, 0);
    const mean = sum / n;
    const median = n % 2 === 0 ? (sorted[n/2 - 1] + sorted[n/2]) / 2 : sorted[Math.floor(n/2)];
    const min = sorted[0];
    const max = sorted[n - 1];
    const q1 = sorted[Math.floor(n * 0.25)];
    const q3 = sorted[Math.floor(n * 0.75)];

    return { values: sorted, mean, median, min, max, q1, q3, n };
}

// Get percentile rank of a value in the population
function getPercentileRank(metricKey, value) {
    if (value === null || value === undefined) return null;
    const stats = computePopulationStats(metricKey);
    if (!stats) return null;
    const below = stats.values.filter(v => v < value).length;
    return Math.round((below / stats.n) * 100);
}

// Helper: Group numeric metrics by quartiles
function groupMetricByQuartile(metricKey, value) {
    const stats = computePopulationStats(metricKey);
    if (!stats || value === null) return null;
    if (value <= stats.q1) return 'Bajo';
    if (value <= stats.median) return 'Medio-Bajo';
    if (value <= stats.q3) return 'Medio-Alto';
    return 'Alto';
}

// Helper: Build knowledge graph variables (filtered by relevance)
function getKGVariables(patientIds = null) {
    const patients = patientIds ? PATIENTS.filter(p => patientIds.includes(p.id)) : PATIENTS;
    const vars = { Paciente: [], Síntomas: [], Antecedentes: [], Fármacos: [], Diagnóstico: [], Tratamiento: [], Métricas: [] };
    
    patients.forEach(p => {
        // Pacientes
        if (!vars.Paciente.includes(p.nombre)) vars.Paciente.push(p.nombre);

        // Síntomas
        p.sintomas.forEach(s => { if (!vars.Síntomas.includes(s)) vars.Síntomas.push(s); });

        // Antecedentes
        p.antecedentes.forEach(a => { if (!vars.Antecedentes.includes(a)) vars.Antecedentes.push(a); });

        // Fármacos
        p.farmacos.forEach(f => { if (!vars.Fármacos.includes(f)) vars.Fármacos.push(f); });

        // Diagnóstico (simplified)
        const diagType = p.severidad === 'ninguna' ? 'Sin AOS' : `AOS ${p.severidad}`;
        if (!vars.Diagnóstico.includes(diagType)) vars.Diagnóstico.push(diagType);

        // Tratamiento (top 2 only)
        p.tratamiento.slice(0, 2).forEach(t => { if (!vars.Tratamiento.includes(t)) vars.Tratamiento.push(t); });

        // Métricas (grouped by quartile)
        const iahGroup = groupMetricByQuartile('iah', p.respiratorio.iah);
        const spo2Group = groupMetricByQuartile('spo2_media', p.oximetria.spo2_media);
        const ct90Group = groupMetricByQuartile('ct90', p.oximetria.ct90);
        if (iahGroup) {
            const iahLabel = `IAH ${iahGroup}`;
            if (!vars.Métricas.includes(iahLabel)) vars.Métricas.push(iahLabel);
        }
        if (spo2Group) {
            const spo2Label = `SpO₂ ${spo2Group}`;
            if (!vars.Métricas.includes(spo2Label)) vars.Métricas.push(spo2Label);
        }
        if (ct90Group) {
            const ct90Label = `CT90 ${ct90Group}`;
            if (!vars.Métricas.includes(ct90Label)) vars.Métricas.push(ct90Label);
        }
    });
    
    return vars;
}
