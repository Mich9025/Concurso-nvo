(() => {
  // ---------------------------------------------------------------------------
  // Navegación entre vistas (Inicio / Ranking / Términos) por hash
  // ---------------------------------------------------------------------------
  const vistas = document.querySelectorAll("main[data-vista]");
  const enlacesNavegacion = document.querySelectorAll(".navegacion__enlace[data-vista]");
  const VISTAS_VALIDAS = ["inicio", "ranking", "terminos"];

  function mostrarVista(nombre) {
    vistas.forEach((vista) => {
      vista.hidden = vista.dataset.vista !== nombre;
    });
    enlacesNavegacion.forEach((enlace) => {
      if (enlace.dataset.vista === nombre) {
        enlace.setAttribute("aria-current", "page");
      } else {
        enlace.removeAttribute("aria-current");
      }
    });
    if (nombre === "ranking") {
      cargarRanking();
    }
  }

  function enrutar() {
    const hash = window.location.hash.replace("#", "");

    if (hash === "registro") {
      mostrarVista("inicio");
      document.querySelector("#registro").scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (VISTAS_VALIDAS.includes(hash)) {
      mostrarVista(hash);
      window.scrollTo(0, 0);
    }
  }

  window.addEventListener("hashchange", enrutar);

  // ---------------------------------------------------------------------------
  // Formulario de inscripción
  // ---------------------------------------------------------------------------
  const formularioRegistro = document.querySelector("#formulario-registro");
  const camposTexto = [
    document.querySelector("#campo-cedula"),
    document.querySelector("#campo-telefono"),
    document.querySelector("#campo-nombres"),
    document.querySelector("#campo-apellidos"),
    document.querySelector("#campo-area"),
    document.querySelector("#campo-correo"),
  ];
  const campoConsentimiento = document.querySelector("#campo-consentimiento");
  const botonEnviar = formularioRegistro.querySelector("[type='submit']");
  const confirmacion = document.querySelector("#confirmacion-registro");

  function mostrarError(campo, mensaje) {
    const contenedorError = document.querySelector(`#error-${campo.name}`);
    campo.classList.add("formulario__entrada--tiene-error");
    campo.setAttribute("aria-invalid", "true");
    contenedorError.textContent = mensaje;
    contenedorError.hidden = false;
  }

  function limpiarError(campo) {
    const contenedorError = document.querySelector(`#error-${campo.name}`);
    campo.classList.remove("formulario__entrada--tiene-error");
    campo.removeAttribute("aria-invalid");
    contenedorError.textContent = "";
    contenedorError.hidden = true;
  }

  function esTextoValido(valor) {
    return /^[A-Za-zÁ-ÿ0-9 .,'-]{2,80}$/.test(valor);
  }

  function esCedulaValida(cedula) {
    const digitos = cedula.replace(/[^0-9]/g, "");
    return /^[0-9.\s]+$/.test(cedula) && digitos.length >= 6 && digitos.length <= 12;
  }

  function esTelefonoValido(telefono) {
    const digitos = telefono.replace(/[^0-9]/g, "");
    return digitos.length >= 7 && /^\+?[0-9][0-9\s()-]{6,19}$/.test(telefono);
  }

  function esCorreoValido(correo) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo.trim());
  }

  function validarCampo(campo) {
    const nombreCampo = campo.name;
    const valor = campo.value.trim();

    if (valor === "") {
      mostrarError(campo, "Este campo es obligatorio.");
      return false;
    }

    if (nombreCampo === "cedula" && !esCedulaValida(valor)) {
      mostrarError(campo, "Ingresa una cédula válida (6 a 12 dígitos).");
      return false;
    }

    if (nombreCampo === "telefono" && !esTelefonoValido(valor)) {
      mostrarError(campo, "Ingresa un teléfono válido con al menos 7 dígitos.");
      return false;
    }

    if (nombreCampo === "correo" && !esCorreoValido(valor)) {
      mostrarError(campo, "Ingresa un correo electrónico válido.");
      return false;
    }

    if ((nombreCampo === "nombres" || nombreCampo === "apellidos") && !esTextoValido(valor)) {
      mostrarError(campo, "Solo letras, números, espacios y los caracteres . , ' -");
      return false;
    }

    limpiarError(campo);
    return true;
  }

  function validarConsentimiento() {
    const esValido = campoConsentimiento.checked;
    const contenedorError = document.querySelector("#error-consentimiento");

    if (!esValido) {
      contenedorError.textContent =
        "Debes aceptar los términos y la política de tratamiento de datos.";
      contenedorError.hidden = false;
      campoConsentimiento.setAttribute("aria-invalid", "true");
    } else {
      contenedorError.textContent = "";
      contenedorError.hidden = true;
      campoConsentimiento.removeAttribute("aria-invalid");
    }

    return esValido;
  }

  camposTexto.forEach((campo) => {
    campo.addEventListener("input", () => {
      if (campo.hasAttribute("aria-invalid")) {
        validarCampo(campo);
      }
    });
  });

  campoConsentimiento.addEventListener("change", () => {
    if (campoConsentimiento.hasAttribute("aria-invalid")) {
      validarConsentimiento();
    }
  });

  // "Acepto, quiero registrarme" desde la vista de términos marca el consentimiento
  document.querySelector("#boton-aceptar-terminos").addEventListener("click", () => {
    campoConsentimiento.checked = true;
    validarConsentimiento();
  });

  if (window.location.search.includes("aceptar=true")) {
    campoConsentimiento.checked = true;
  }

  // Punto de integración con el backend de inscripciones.
  // Hoy es una simulación: reemplazar por el fetch real cuando exista el endpoint.
  function enviarRegistro(datos) {
    return new Promise((resolver) => setTimeout(() => resolver(datos), 800));
  }

  formularioRegistro.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const camposValidos = camposTexto.map(validarCampo).every(Boolean);
    const consentimientoValido = validarConsentimiento();

    if (!camposValidos || !consentimientoValido) {
      const primerCampoConError = camposTexto.find((campo) => campo.hasAttribute("aria-invalid"));
      (primerCampoConError || campoConsentimiento).focus();
      return;
    }

    const datos = Object.fromEntries(new FormData(formularioRegistro));

    botonEnviar.disabled = true;
    botonEnviar.setAttribute("aria-busy", "true");
    botonEnviar.textContent = "Registrando…";

    try {
      await enviarRegistro(datos);
      document.querySelector("#confirmacion-nombre").textContent = datos.nombres.trim();
      document.querySelector("#confirmacion-correo").textContent = datos.correo.trim();
      document.querySelector("#confirmacion-telefono").textContent = datos.telefono.trim();
      formularioRegistro.hidden = true;
      confirmacion.hidden = false;
      confirmacion.focus();
    } finally {
      botonEnviar.disabled = false;
      botonEnviar.removeAttribute("aria-busy");
      botonEnviar.textContent = "Registrarme al concurso";
    }
  });

  // ---------------------------------------------------------------------------
  // Ranking sincronizado desde Google Sheets
  // ---------------------------------------------------------------------------
  // Función de Vercel (api/ranking.js) que lee la hoja desde RANKING_CSV_URL
  const URL_RANKING_CSV = "/api/ranking";
  const INTERVALO_ACTUALIZACION_MS = 30000;

  // Respaldo si el CSV público no responde.
  const REGISTROS_RESPALDO = [
    { nombre: "Maria RIncon", codigo: "OMEGA2026-20", zona: "Occidente", total: 536 },
    { nombre: "lucas martinez", codigo: "OMEGA2026-18", zona: "Sur", total: 202 },
    { nombre: "Carlos lopez", codigo: "OMEGA2026-01", zona: "Norte", total: 154 },
    { nombre: "Ana Torres", codigo: "OMEGA2026-02", zona: "Sur", total: 142 },
    { nombre: "Luis Garcia", codigo: "OMEGA2026-03", zona: "Centro", total: 128 },
    { nombre: "Judas Macadeo", codigo: "OMEGA2026-06", zona: "Sur", total: 100 },
    { nombre: "Maria Tevez", codigo: "OMEGA2026-04", zona: "Occidente", total: 95 },
    { nombre: "Marco Polo", codigo: "OMEGA2026-08", zona: "Sur", total: 95 },
    { nombre: "Simon Velez", codigo: "OMEGA2026-09", zona: "Centro", total: 95 },
    { nombre: "Lucas Tañeda", codigo: "OMEGA2026-07", zona: "Norte", total: 80 },
    { nombre: "Juan Rulfo", codigo: "OMEGA2026-05", zona: "Norte", total: 60 },
    { nombre: "juan marquez", codigo: "OMEGA2026-19", zona: "Sur", total: 5 },
    { nombre: "Andrea Silva", codigo: "OMEGA2026-10", zona: "Occidente", total: 2 },
    { nombre: "Pedro Muriel", codigo: "OMEGA2026-11", zona: "Centro", total: 1 },
    { nombre: "Claudia Marquez", codigo: "OMEGA2026-12", zona: "Occidente", total: 1 },
    { nombre: "Enrique Saraba", codigo: "OMEGA2026-13", zona: "Centro", total: 1 },
    { nombre: "Luisa Mendes", codigo: "OMEGA2026-14", zona: "Sur", total: 1 },
    { nombre: "Jesus Anaya", codigo: "OMEGA2026-15", zona: "Norte", total: 1 },
    { nombre: "Telma Suarez", codigo: "OMEGA2026-16", zona: "Norte", total: 1 },
    { nombre: "Ana Maria Quiche", codigo: "OMEGA2026-17", zona: "Norte", total: 1 },
  ];

  const listaRanking = document.querySelector("#lista-ranking");
  const encabezadoRanking = listaRanking.querySelector(".ranking__fila--encabezado");
  const rankingVacio = document.querySelector("#ranking-vacio");
  const rankingEstado = document.querySelector("#ranking-estado");
  const selectorOrden = document.querySelector("#selector-orden");
  const botonActualizarRanking = document.querySelector("#boton-actualizar-ranking");

  let registrosRanking = [];
  let tieneColumnaMes = false;
  let ordenRanking = "total";
  let cargandoRanking = false;

  function parsearCsv(texto) {
    const filas = [];
    let fila = [];
    let celda = "";
    let entreComillas = false;

    for (let i = 0; i < texto.length; i++) {
      const caracter = texto[i];
      if (entreComillas) {
        if (caracter === '"' && texto[i + 1] === '"') {
          celda += '"';
          i++;
        } else if (caracter === '"') {
          entreComillas = false;
        } else {
          celda += caracter;
        }
      } else if (caracter === '"') {
        entreComillas = true;
      } else if (caracter === ",") {
        fila.push(celda);
        celda = "";
      } else if (caracter === "\n" || caracter === "\r") {
        if (caracter === "\r" && texto[i + 1] === "\n") i++;
        fila.push(celda);
        filas.push(fila);
        fila = [];
        celda = "";
      } else {
        celda += caracter;
      }
    }
    fila.push(celda);
    filas.push(fila);

    return filas.filter((f) => f.some((valor) => valor.trim() !== ""));
  }

  function normalizar(texto) {
    return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toUpperCase();
  }

  // Columnas esperadas: MOTORIZADO, CÓDIGO ÚNICO, ZONA OPERATIVA, REDENCIONES.
  // Si la hoja agrega una columna con "MES" en el encabezado, se habilita el orden "Este mes".
  function convertirFilas(filas) {
    const encabezados = filas[0].map(normalizar);
    const indice = (prueba) => encabezados.findIndex(prueba);

    const iNombre = indice((h) => h.startsWith("MOTORIZADO") || h.startsWith("NOMBRE"));
    const iCodigo = indice((h) => h.startsWith("CODIGO"));
    const iZona = indice((h) => h.startsWith("ZONA") || h.startsWith("AREA") || h.startsWith("CIUDAD"));
    const iMes = indice((h) => h.includes("MES"));
    const iTotal = indice((h) => h.startsWith("REDENCIONES") && !h.includes("MES"));

    if (iNombre === -1 || iTotal === -1) {
      throw new Error("El CSV no tiene las columnas MOTORIZADO y REDENCIONES");
    }

    tieneColumnaMes = iMes !== -1;

    return filas.slice(1).map((columnas) => ({
      nombre: (columnas[iNombre] || "").trim() || "Sin nombre",
      codigo: iCodigo === -1 ? "" : (columnas[iCodigo] || "").trim(),
      zona: iZona === -1 ? "" : (columnas[iZona] || "").trim(),
      mes: tieneColumnaMes ? parseInt(columnas[iMes], 10) || 0 : 0,
      total: parseInt(columnas[iTotal], 10) || 0,
    }));
  }

  // "carlos lopez" -> "Carlos L."
  function nombreConInicial(nombreCompleto) {
    const partes = nombreCompleto.split(/\s+/).filter(Boolean);
    const capitalizar = (p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase();
    if (partes.length < 2) return capitalizar(partes[0] || "");
    return `${capitalizar(partes[0])} ${partes[partes.length - 1].charAt(0).toUpperCase()}.`;
  }

  function crearElemento(etiqueta, clase, texto) {
    const elemento = document.createElement(etiqueta);
    if (clase) elemento.className = clase;
    if (texto !== undefined) elemento.textContent = texto;
    return elemento;
  }

  function pintarRanking() {
    const clave = ordenRanking === "mes" && tieneColumnaMes ? "mes" : "total";
    const ordenados = [...registrosRanking].sort((a, b) => b[clave] - a[clave]);
    const clasesPodio = ["ranking__fila--oro", "ranking__fila--plata", "ranking__fila--bronce"];

    listaRanking.querySelectorAll(".ranking__fila:not(.ranking__fila--encabezado)").forEach((f) => f.remove());
    listaRanking.classList.toggle("ranking__lista--sin-mes", !tieneColumnaMes);
    selectorOrden.hidden = !tieneColumnaMes;

    ordenados.forEach((registro, indice) => {
      const esPodio = indice < 3;
      const fila = crearElemento("li", "ranking__fila");
      if (esPodio) fila.classList.add("ranking__fila--podio", clasesPodio[indice]);

      fila.append(crearElemento("span", "ranking__posicion", String(indice + 1)));

      const persona = crearElemento("div", "ranking__persona");
      const nombre = crearElemento("span", "ranking__nombre", nombreConInicial(registro.nombre));
      if (esPodio) {
        nombre.append(crearElemento("span", "ranking__insignia", indice === 0 ? "🏆 Va ganando" : "Top 3"));
      }
      persona.append(
        nombre,
        crearElemento("span", "ranking__detalle", [registro.codigo, registro.zona].filter(Boolean).join(" · "))
      );
      fila.append(persona);

      const mes = crearElemento("span", "ranking__cifra ranking__celda-mes", String(registro.mes));
      const total = crearElemento("span", "ranking__cifra", String(registro.total));
      (clave === "mes" ? mes : total).classList.add("ranking__cifra--activa");
      mes.setAttribute("aria-label", `${registro.mes} redenciones este mes`);
      total.setAttribute("aria-label", `${registro.total} redenciones totales`);
      fila.append(mes, total);

      listaRanking.append(fila);
    });

    encabezadoRanking.hidden = ordenados.length === 0;
    rankingVacio.hidden = ordenados.length > 0;
  }

  function actualizarEstado(texto) {
    rankingEstado.textContent = `${texto} · Corte mensual el último día de cada mes.`;
  }

  async function cargarRanking() {
    if (cargandoRanking) return;
    cargandoRanking = true;
    botonActualizarRanking.disabled = true;
    botonActualizarRanking.textContent = "Actualizando…";

    try {
      const respuesta = await fetch(URL_RANKING_CSV, { cache: "no-store" });
      if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
      const filas = parsearCsv(await respuesta.text());
      if (filas.length === 0) throw new Error("CSV vacío");

      registrosRanking = convertirFilas(filas);
      const hora = new Date().toLocaleTimeString("es-CO", { hour: "numeric", minute: "2-digit" });
      const fecha = new Date().toLocaleDateString("es-CO", { day: "numeric", month: "long" });
      actualizarEstado(`Actualizado ${fecha}, ${hora}`);
    } catch (error) {
      console.warn("No se pudo leer el ranking desde Google Sheets; se usan datos de respaldo.", error);
      if (registrosRanking.length === 0) {
        tieneColumnaMes = false;
        registrosRanking = REGISTROS_RESPALDO.map((r) => ({ ...r, mes: 0 }));
      }
      actualizarEstado("Sin conexión con la hoja, mostrando últimos datos disponibles");
    } finally {
      pintarRanking();
      cargandoRanking = false;
      botonActualizarRanking.disabled = false;
      botonActualizarRanking.textContent = "Actualizar";
    }
  }

  selectorOrden.addEventListener("click", (evento) => {
    const opcion = evento.target.closest("[data-orden]");
    if (!opcion) return;
    ordenRanking = opcion.dataset.orden;
    selectorOrden.querySelectorAll("[data-orden]").forEach((boton) => {
      boton.setAttribute("aria-pressed", String(boton === opcion));
    });
    pintarRanking();
  });

  botonActualizarRanking.addEventListener("click", cargarRanking);

  // Refresco automático mientras la vista de ranking está visible
  setInterval(() => {
    const vistaRanking = document.querySelector('main[data-vista="ranking"]');
    if (!vistaRanking.hidden && !document.hidden) cargarRanking();
  }, INTERVALO_ACTUALIZACION_MS);

  enrutar();
})();
