# Concurso NVO — Plan de Incentivos para Motorizados

Landing page y plataforma web oficial para el plan de incentivos de motorizados **NVO**, diseñada para motivar la participación, facilitar la inscripción y mostrar el ranking en tiempo real sincronizado desde Google Sheets.

---

## 🚀 Características Principales

- **Ranking en Tiempo Real:** Sincronización automática cada 30 segundos y manual con Google Sheets, a través de la función `api/ranking.js` (la URL de la hoja va en `RANKING_CSV_URL`).
- **Inscripción Optimizada:** Formulario completo con validación estricta de campos (cédula, teléfono, nombres, área y correo) y consentimiento de datos.
- **Diseño Moderno & Accesible:** Estética basada en tokens de diseño (Dark Navy + Neón Rosa/Magenta), cumplimiento de accesibilidad WCAG 2.2 AA y diseño responsivo para móviles y escritorio.
- **Secciones Clave:**
  - Hero con llamada a la acción (CTA) y premio mensual de **$500.000 COP**.
  - Top de motorizados / Ranking general y podio.
  - Explicación de cómo participar en 4 pasos.
  - Términos y condiciones detallados.
- **Navegación por vistas (hash):** `#inicio`, `#ranking` (subpágina del ranking) y `#terminos`; `#registro` lleva al formulario. `terminos.html` redirige a `index.html#terminos`.
- **Diseño:** implementado desde el proyecto de Claude Design "Landing Concurso NVO" (tipografía Nunito, logo `assets/nvo-white.png`).

---

## 🛠️ Stack Tecnológico

- **HTML5 Semántico**
- **CSS3** (Custom Properties, BEM, Variables de diseño)
- **JavaScript (Vanilla ES6+)** con sincronización asíncrona de datos vía `fetch` y CSV parser robusto.
- **Node.js / Express / Serve** para entorno de desarrollo local.

---

## ⚙️ Guía de Inicio Rápido

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/TheYisusByte/Concurso.nvo.git
   cd Concurso.nvo
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo local:**
   ```bash
   npm start
   ```

   > Con `npm start` la función `/api/ranking` no corre y el ranking usa los datos de respaldo. Para probar la integración real usa `npm run dev` (Vercel CLI) con un archivo `.env` basado en `.env.example`.

4. **Abrir en el navegador:**
   Visita [http://localhost:3000](http://localhost:3000).

---

## 🔐 Variables de entorno

| Variable | Descripción |
| --- | --- |
| `RANKING_CSV_URL` | URL del CSV publicado de la hoja del ranking (Google Sheets → Archivo → Compartir → Publicar en la web → CSV). La lee `api/ranking.js`. |

Configúrala en Vercel → Project Settings → Environment Variables.

---

## 📄 Licencia

Este proyecto está bajo la licencia ISC.
