# Concurso NVP — Plan de Incentivos para Motorizados

Landing page y plataforma web oficial para el plan de incentivos de motorizados **NVP**, diseñada para motivar la participación, facilitar la inscripción y mostrar el ranking en tiempo real sincronizado desde Google Sheets.

---

## 🚀 Características Principales

- **Ranking en Tiempo Real:** Sincronización automática cada 30 segundos y manual con Google Sheets (`pub?output=csv`).
- **Inscripción Optimizada:** Formulario completo con validación estricta de campos (cédula, teléfono, nombres, área y correo) y consentimiento de datos.
- **Diseño Moderno & Accesible:** Estética basada en tokens de diseño (Dark Navy + Neón Rosa/Magenta), cumplimiento de accesibilidad WCAG 2.2 AA y diseño responsivo para móviles y escritorio.
- **Secciones Clave:**
  - Hero con llamada a la acción (CTA) y premio mensual de **$500.000 COP**.
  - Top de motorizados / Ranking general y podio.
  - Explicación de cómo participar en 4 pasos.
  - Términos y condiciones detallados.

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

4. **Abrir en el navegador:**
   Visita [http://localhost:3000](http://localhost:3000).

---

## 📄 Licencia

Este proyecto está bajo la licencia ISC.
