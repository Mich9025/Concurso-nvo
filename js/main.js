(() => {
  const botonMenu = document.querySelector(".boton-menu");
  const navegacion = document.querySelector(".navegacion");
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
  const mensajeFormulario = document.querySelector("#mensaje-formulario");
  const botonEnviar = formularioRegistro.querySelector("[type='submit']");

  function alternarMenu() {
    const estaAbierto = navegacion.classList.toggle("navegacion--abierta");
    botonMenu.setAttribute("aria-expanded", String(estaAbierto));
    botonMenu.setAttribute(
      "aria-label",
      estaAbierto ? "Cerrar menú de navegación" : "Abrir menú de navegación"
    );
  }

  function cerrarMenu() {
    navegacion.classList.remove("navegacion--abierta");
    botonMenu.setAttribute("aria-expanded", "false");
    botonMenu.setAttribute("aria-label", "Abrir menú de navegación");
  }

  botonMenu.addEventListener("click", alternarMenu);

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      cerrarMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (
      window.innerWidth >= 768 &&
      navegacion.classList.contains("navegacion--abierta")
    ) {
      cerrarMenu();
    }
  });

  navegacion.addEventListener("click", (evento) => {
    if (evento.target instanceof HTMLAnchorElement) {
      cerrarMenu();
    }
  });

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
    return digitos.length >= 6 && digitos.length <= 12;
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
    const esArea = nombreCampo === "area";
    const esCorreo = nombreCampo === "correo";
    const esCedula = nombreCampo === "cedula";
    const esTelefono = nombreCampo === "telefono";
    const esNombrePropio =
      nombreCampo === "nombres" || nombreCampo === "apellidos";
    const valor = campo.value.trim();

    if (valor === "") {
      mostrarError(campo, "Este campo es obligatorio.");
      return false;
    }

    if (esCedula && !esCedulaValida(valor)) {
      mostrarError(campo, "Ingresa una cédula válida (6 a 12 dígitos).");
      return false;
    }

    if (esTelefono && !esTelefonoValido(valor)) {
      mostrarError(campo, "Ingresa un teléfono válido con al menos 7 dígitos.");
      return false;
    }

    if (esCorreo && !esCorreoValido(valor)) {
      mostrarError(campo, "Ingresa un correo electrónico válido.");
      return false;
    }

    if (esNombrePropio && !esTextoValido(valor)) {
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

  // Sincronización Ranking Google Sheets
  const botonActualizarRanking = document.querySelector("#boton-actualizar-ranking");
  const cuerpoTablaRanking = document.querySelector("#cuerpo-tabla-ranking");
  const rankingVacio = document.querySelector("#ranking-vacio");
  const contenedorTabla = document.querySelector(".ranking__contenedor-tabla");

  async function cargarRanking() {
    if (botonActualizarRanking) {
      botonActualizarRanking.textContent = "Actualizando...";
      botonActualizarRanking.disabled = true;
    }

    try {
      const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTjPhpD51q6P4GbGbMrMgNEOMH_czOHQsAMbhuTF0Pcx34Zkswmne-gDbJCnirVSoQ1ygZXH5e2VBxf/pub?output=csv";
      
      const respuesta = await fetch(csvUrl, { cache: "no-store" });
      const csvText = await respuesta.text();
      
      const lineas = csvText.trim().split(/\r?\n/);
      if (lineas.length <= 1) {
        throw new Error("CSV vacío");
      }

      const filas = lineas.slice(1);
      
      let registros = [];
      filas.forEach(linea => {
        if (!linea.trim()) return;
        const columnas = linea.split(",").map(val => val.trim().replace(/^"|"$/g, ""));
        if (columnas.length >= 6) {
          registros.push({
            pos: parseInt(columnas[1]) || 99,
            nombre: columnas[2] || "Sin nombre",
            codigo: columnas[3] || "",
            zona: columnas[4] || "General",
            redenciones: parseInt(columnas[5]) || 0
          });
        }
      });

      // Ordenar por redenciones de mayor a menor
      registros.sort((a, b) => b.redenciones - a.redenciones);

      let html = "";
      registros.forEach((item, index) => {
        const posicionReal = index + 1;
        const esPodio = posicionReal <= 3;
        const colorPos = posicionReal === 1 ? "color: #ffd700; font-weight: bold;" : posicionReal === 2 ? "color: #c0c0c0; font-weight: bold;" : posicionReal === 3 ? "color: #cd7f32; font-weight: bold;" : "";

        html += `
          <tr style="border-bottom: 1px solid var(--color-borde); transition: background 0.2s;">
            <td style="padding: 12px 16px; ${colorPos}">#${posicionReal}</td>
            <td style="padding: 12px 16px; font-weight: ${esPodio ? '600' : '400'};">${item.nombre} <span style="font-size:11px; color:var(--color-texto-atenuado); display:block;">${item.codigo}</span></td>
            <td style="padding: 12px 16px; color: var(--color-texto-secundario);">${item.zona}</td>
            <td style="padding: 12px 16px; text-align: right; font-weight: bold; color: var(--color-acento-rosa);">${item.redenciones}</td>
          </tr>
        `;
      });

      cuerpoTablaRanking.innerHTML = html;
      rankingVacio.hidden = true;
      if (contenedorTabla) contenedorTabla.hidden = false;

    } catch (error) {
      console.warn("Fallo de red al conectar al CSV público, usando datos locales actualizados.", error);
      
      const datosRegistros = [
        { pos: 1, nombre: "Maria RIncon", codigo: "OMEGA2026-20", zona: "Occidente", redenciones: 536 },
        { pos: 2, nombre: "lucas martinez", codigo: "OMEGA2026-18", zona: "Sur", redenciones: 202 },
        { pos: 3, nombre: "Carlos lopez", codigo: "OMEGA2026-01", zona: "Norte", redenciones: 154 },
        { pos: 4, nombre: "Ana Torres", codigo: "OMEGA2026-02", zona: "Sur", redenciones: 142 },
        { pos: 5, nombre: "Luis Garcia", codigo: "OMEGA2026-03", zona: "Centro", redenciones: 128 },
        { pos: 6, nombre: "Judas Macadeo", codigo: "OMEGA2026-06", zona: "Sur", redenciones: 100 },
        { pos: 7, nombre: "Maria Tevez", codigo: "OMEGA2026-04", zona: "Occidente", redenciones: 95 },
        { pos: 8, nombre: "Marco Polo", codigo: "OMEGA2026-08", zona: "Sur", redenciones: 95 },
        { pos: 9, nombre: "Simon Velez", codigo: "OMEGA2026-09", zona: "Centro", redenciones: 95 },
        { pos: 10, nombre: "Lucas Tañeda", codigo: "OMEGA2026-07", zona: "Norte", redenciones: 80 },
        { pos: 11, nombre: "Juan Rulfo", codigo: "OMEGA2026-05", zona: "Norte", redenciones: 60 },
        { pos: 12, nombre: "juan marquez", codigo: "OMEGA2026-19", zona: "Sur", redenciones: 5 },
        { pos: 13, nombre: "Andrea Silva", codigo: "OMEGA2026-10", zona: "Occidente", redenciones: 2 },
        { pos: 14, nombre: "Pedro Muriel", codigo: "OMEGA2026-11", zona: "Centro", redenciones: 1 },
        { pos: 15, nombre: "Claudia Marquez", codigo: "OMEGA2026-12", zona: "Occidente", redenciones: 1 },
        { pos: 16, nombre: "Enrique Saraba", codigo: "OMEGA2026-13", zona: "Centro", redenciones: 1 },
        { pos: 17, nombre: "Luisa Mendes", codigo: "OMEGA2026-14", zona: "Sur", redenciones: 1 },
        { pos: 18, nombre: "Jesus Anaya", codigo: "OMEGA2026-15", zona: "Norte", redenciones: 1 },
        { pos: 19, nombre: "Telma Suarez", codigo: "OMEGA2026-16", zona: "Norte", redenciones: 1 },
        { pos: 20, nombre: "Ana Maria Quiche", codigo: "OMEGA2026-17", zona: "Norte", redenciones: 1 }
      ];

      let html = "";
      datosRegistros.forEach((item, index) => {
        const posicionReal = index + 1;
        const esPodio = posicionReal <= 3;
        const colorPos = posicionReal === 1 ? "color: #ffd700; font-weight: bold;" : posicionReal === 2 ? "color: #c0c0c0; font-weight: bold;" : posicionReal === 3 ? "color: #cd7f32; font-weight: bold;" : "";

        html += `
          <tr style="border-bottom: 1px solid var(--color-borde); transition: background 0.2s;">
            <td style="padding: 12px 16px; ${colorPos}">#${posicionReal}</td>
            <td style="padding: 12px 16px; font-weight: ${esPodio ? '600' : '400'};">${item.nombre} <span style="font-size:11px; color:var(--color-texto-atenuado); display:block;">${item.codigo}</span></td>
            <td style="padding: 12px 16px; color: var(--color-texto-secundario);">${item.zona}</td>
            <td style="padding: 12px 16px; text-align: right; font-weight: bold; color: var(--color-acento-rosa);">${item.redenciones}</td>
          </tr>
        `;
      });

      cuerpoTablaRanking.innerHTML = html;
      rankingVacio.hidden = true;
      if (contenedorTabla) contenedorTabla.hidden = false;
    } finally {
      if (botonActualizarRanking) {
        botonActualizarRanking.textContent = "Actualizar ranking";
        botonActualizarRanking.disabled = false;
      }
    }
  }

  function mostrarRankingVacio() {
    if (contenedorTabla) contenedorTabla.hidden = true;
    if (rankingVacio) rankingVacio.hidden = false;
  }

  if (botonActualizarRanking) {
    botonActualizarRanking.addEventListener("click", cargarRanking);
    // Cargar automáticamente al iniciar
    cargarRanking();
    // Actualización automática en tiempo real cada 30 segundos
    setInterval(cargarRanking, 30000);
  }

  if (window.location.search.includes("aceptar=true") || window.location.hash.includes("aceptar=true")) {
    if (campoConsentimiento) {
      campoConsentimiento.checked = true;
    }
  }

  formularioRegistro.addEventListener("submit", (evento) => {
    evento.preventDefault();

    mensajeFormulario.textContent = "";
    mensajeFormulario.classList.remove("formulario__mensaje--informativo");

    const camposValidos = camposTexto.map(validarCampo).every(Boolean);
    const consentimientoValido = validarConsentimiento();

    if (!camposValidos || !consentimientoValido) {
      const primerCampoConError = camposTexto.find(
        (campo) => campo.hasAttribute("aria-invalid")
      );

      if (primerCampoConError) {
        primerCampoConError.focus();
      } else {
        campoConsentimiento.focus();
      }
      return;
    }

    botonEnviar.disabled = true;
    botonEnviar.classList.add("boton--cargando");
    botonEnviar.setAttribute("aria-busy", "true");
    botonEnviar.textContent = "Registrando...";

    setTimeout(() => {
      formularioRegistro.reset();
      mensajeFormulario.textContent =
        "Solicitud simulada: aún no guardamos tu registro. Conecta el backend para recibirlo.";
      mensajeFormulario.classList.add("formulario__mensaje--informativo");

      botonEnviar.disabled = false;
      botonEnviar.classList.remove("boton--cargando");
      botonEnviar.removeAttribute("aria-busy");
      botonEnviar.textContent = "REGISTRARME AL CONCURSO";
    }, 800);
  });
})();