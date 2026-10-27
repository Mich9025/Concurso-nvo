// Apps Script de la hoja PRIVADA de inscripciones (no la del ranking: esa es pública).
// Instalación:
// 1. Crear una hoja nueva en Google Sheets (sin compartir públicamente).
// 2. Extensiones > Apps Script, pegar este archivo y guardar.
// 3. Configuración del proyecto > Propiedades del script: agregar SECRETO con una clave larga.
// 4. Implementar > Nueva implementación > Aplicación web.
//    Ejecutar como: Yo. Quién tiene acceso: Cualquier usuario.
// 5. Copiar la URL /exec a REGISTRO_SCRIPT_URL y la clave a REGISTRO_SECRETO en Vercel.
const NOMBRE_PESTANA = "Inscripciones";
const ENCABEZADOS = ["FECHA", "CÉDULA", "TELÉFONO", "NOMBRES", "APELLIDOS", "CIUDAD", "CORREO", "CONSENTIMIENTO"];

function doPost(e) {
  const datos = JSON.parse(e.postData.contents);
  const secreto = PropertiesService.getScriptProperties().getProperty("SECRETO");
  if (!secreto || datos.secreto !== secreto) {
    return responder({ estado: "error", error: "No autorizado" });
  }

  const bloqueo = LockService.getScriptLock();
  bloqueo.waitLock(10000);
  try {
    const hoja = obtenerHoja();
    const cedulas = hoja.getLastRow() > 1
      ? hoja.getRange(2, 2, hoja.getLastRow() - 1, 1).getValues().map((f) => String(f[0]))
      : [];
    if (cedulas.includes(datos.cedula)) {
      return responder({ estado: "duplicado" });
    }

    hoja.appendRow([
      new Date(),
      // El apóstrofo evita que Sheets convierta cédula y teléfono en números
      "'" + datos.cedula,
      "'" + datos.telefono,
      datos.nombres,
      datos.apellidos,
      datos.area,
      datos.correo,
      "Sí",
    ]);
    return responder({ estado: "ok" });
  } finally {
    bloqueo.releaseLock();
  }
}

function obtenerHoja() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  let hoja = libro.getSheetByName(NOMBRE_PESTANA);
  if (!hoja) {
    hoja = libro.insertSheet(NOMBRE_PESTANA);
    hoja.appendRow(ENCABEZADOS);
    hoja.setFrozenRows(1);
  }
  return hoja;
}

function responder(objeto) {
  return ContentService.createTextOutput(JSON.stringify(objeto)).setMimeType(ContentService.MimeType.JSON);
}
