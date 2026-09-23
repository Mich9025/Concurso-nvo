// Función de Vercel: devuelve el CSV del ranking publicado en Google Sheets.
// La URL de la hoja vive en la variable de entorno RANKING_CSV_URL
// (Archivo > Compartir > Publicar en la web > CSV).
module.exports = async (req, res) => {
  const urlCsv = process.env.RANKING_CSV_URL;

  if (!urlCsv) {
    res.status(500).json({ error: "Falta la variable de entorno RANKING_CSV_URL" });
    return;
  }

  try {
    const respuesta = await fetch(urlCsv, { cache: "no-store" });
    if (!respuesta.ok) throw new Error(`Google Sheets respondió ${respuesta.status}`);

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    // CDN de Vercel: sirve la copia por 30 s y la refresca en segundo plano.
    res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=60");
    res.status(200).send(await respuesta.text());
  } catch (error) {
    console.error("No se pudo leer el ranking", error);
    res.status(502).json({ error: "No se pudo leer el ranking" });
  }
};
