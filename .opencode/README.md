<div align="center">

# gobigagency

**Sitio web corporativo de GoBig Agency con blog MDX y contenido dinámico de WordPress.**

[![Estado](https://img.shields.io/badge/estado-activo-success.svg)]()
[![Versión](https://img.shields.io/badge/versi%C3%B3n-0.1.0-blue.svg)]()
[![Node](https://img.shields.io/badge/node-%3E%3D20-green.svg)]()
[![Stack](https://img.shields.io/badge/stack-Next.js+14+%2B+React+18+%2B+MDX-informational.svg)]()

</div>

---

## Descripción General

Sitio de marketing corporativo para GoBig Agency: landings por servicio (branding, diseño, SEO, video, IA, marketing, web), portafolio, equipo, blog y páginas de contacto. Combina contenido local en MDX con entradas y páginas consumidas desde la API REST de WordPress, e incorpora animaciones avanzadas con GSAP.

## Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| Next.js 14 (App Router) | Framework full-stack y enrutado |
| React 18 + TypeScript | Interfaz y tipado estático |
| MDX (next-mdx-remote + gray-matter) | Contenido del blog con componentes embebidos |
| Tailwind CSS 3 + SASS | Estilos utilitarios y hojas globales |
| GSAP (@gsap/react) | Animaciones y scroll triggers |
| Radix UI + class-variance-authority | Componentes accesibles (diálogos, acordeones, menús) |
| Swiper + Embla Carousel | Carruseles y sliders |
| React Hook Form + Zod | Formularios y validación |
| next-themes | Gestión de tema claro/oscuro |
| react-player / react-share / react-fast-marquee | Video embebido, compartir en redes y marquesinas |

## Guía de Inicio Rápido

Requisitos previos: Node.js >= 20.

```bash
git clone <url-del-repositorio>
cd gobigagency
npm install
npm run dev
```

Para producción:

```bash
npm run build
npm run start
```

Nota: el repositorio incluye `pnpm-lock.yaml`; si usas pnpm, ejecuta `pnpm install` en lugar de `npm install`.

## Arquitectura y Componentes

```text
gobigagency/
├── src/
│   ├── app/                      # App Router
│   │   ├── (home)/               # Landing principal: branding, design, seo, video
│   │   ├── (inner-style-1)/      # Plantilla interna: blog, career, faq, service, team, work
│   │   ├── (inner-style-2)/      # Variante de plantilla interna: career
│   │   ├── (inner-style-3)/      # Variante bold: about, blog, contact, service, work
│   │   ├── agencia-ia/           # Vertical de agencia de IA
│   │   ├── blog/                 # Blog (MDX local + WordPress)
│   │   ├── portfolio/            # Portafolio: full-page y normal-page
│   │   ├── [slug]/               # Rutas dinámicas genéricas
│   │   └── contacto/ marketing/ nosotros/   # Páginas corporativas
│   ├── components/               # Familias de componentes: hero, service, work, team,
│   │                             # testimonial, pricing, faq, form, ui, tools/mdx, etc.
│   ├── config/                   # Navegación y configuración del sitio (JSON)
│   ├── content/                  # Contenido por servicio: blogs MDX, services, works,
│   │                             # team, pricings, faqs, testimonials
│   ├── context/                  # Contextos de React
│   ├── lib/                      # animation, gsap-plugins, helper, plugins,
│   │                             # swiper-modules y cliente WordPress REST
│   ├── provider/                 # Providers globales (tema, formularios)
│   ├── styles/                   # SASS global y utilidades
│   └── types/                    # Tipos TypeScript
└── public/assets/                # Fuentes, imágenes e iconos estáticos
```

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | Análisis estático con ESLint (`next lint`) |

## Convenciones y Seguridad

- Commits: Conventional Commits en español (`feat:`, `fix:`, `refactor:`, `chore:`).
- Secretos: nunca hardcodear; usar variables de entorno (`.env` en `.gitignore`).

## Notas Técnicas y Límites

- El nombre interno del paquete es `arolax-react`: el proyecto parte de la plantilla Arolax adaptada a GoBig Agency.
- El cliente de WordPress (`src/lib/wordpress.ts`) consume la API REST pública de `cms.gobigagency.co` con la URL fija en código; no usa variables de entorno.
- No hay tests automatizados ni verificación de tipos configurada como script (`typecheck` ausente).
- Las rutas de contenido duplican estilos entre los tres grupos de plantillas internas; los cambios transversales requieren tocar varias carpetas.
- El repositorio contiene lockfiles duplicados (`package-lock.json` y `pnpm-lock.yaml`): elegir un único gestor de paquetes para evitar derivas de dependencias.

## Licencia

Propietario © 2026 Jesus Adrian Anaya Sarria. Todos los derechos reservados.
