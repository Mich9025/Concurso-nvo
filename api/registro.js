// Función de Vercel: recibe una inscripción y la reenvía al Apps Script de la
// hoja PRIVADA de inscripciones (apps-script/inscripciones.gs).
// Variables de entorno: REGISTRO_SCRIPT_URL (URL /exec del Apps Script) y
// REGISTRO_SECRETO (la misma clave configurada en el script).
const CAMPOS = ["cedula", "telefono", "nombres", "apellidos", "area", "correo"];
const AREAS = ["bogota", "medellin", "cali", "barranquilla", "otra"];

function validar(datos) {
  const limpio = {};
  for (const campo of CAMPOS) {
    const valor = typeof datos[campo] === "string" ? datos[campo].trim() : "";
    if (!valor || valor.length > 120) return null;
    limpio[campo] = valor;
  }

  limpio.cedula = limpio.cedula.replace(/[^0-9]/g, "");
  limpio.telefono = limpio.telefono.replace(/[^0-9]/g, "");
  // Mismas reglas que la validación del formulario (js/main.js)
  if (limpio.cedula.length < 6 || limpio.cedula.length > 12) return null;
  if (limpio.telefono.length < 7 || limpio.telefono.length > 20) return null;
  if (!AREAS.includes(limpio.area)) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(limpio.correo)) return null;
  if (datos.consentimiento !== "on" && datos.consentimiento !== true) return null;

  return limpio;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Método no permitido" });
    return;
  }

  const urlScript = process.env.REGISTRO_SCRIPT_URL;
  const secreto = process.env.REGISTRO_SECRETO;
  if (!urlScript || !secreto) {
    res.status(500).json({ error: "Faltan las variables REGISTRO_SCRIPT_URL o REGISTRO_SECRETO" });
    return;
  }

  let cuerpo = req.body;
  if (typeof cuerpo === "string") {
    try {
      cuerpo = JSON.parse(cuerpo);
    } catch {
      cuerpo = null;
    }
  }

  const datos = cuerpo && validar(cuerpo);
  if (!datos) {
    res.status(400).json({ error: "Datos de inscripción inválidos" });
    return;
  }

  try {
    // Apps Script responde con una redirección 302 a googleusercontent; fetch la sigue.
    const respuesta = await fetch(urlScript, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...datos, secreto }),
    });
    const resultado = await respuesta.json();

    if (resultado.estado === "ok") {
      res.status(201).json({ estado: "ok" });
    } else if (resultado.estado === "duplicado") {
      res.status(409).json({ error: "Esta cédula ya está inscrita" });
    } else {
      throw new Error(resultado.error || "Respuesta inesperada del Apps Script");
    }
  } catch (error) {
    console.error("No se pudo guardar la inscripción", error);
    res.status(502).json({ error: "No se pudo guardar la inscripción" });
  }
};
