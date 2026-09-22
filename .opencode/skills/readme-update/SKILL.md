---
name: readme-update
description: Actualiza o genera archivos README.md profesionales y estandarizados para todos los proyectos empresariales y personales registrados en AGENTS.md, siguiendo el ecosistema PinkyOS.
metadata:
  user-invocable: true
  argument-hint: '[proyecto]'
---

# Skill: readme-update (Versión Avanzada PinkyOS)

Esta skill genera y actualiza de forma automatizada archivos `README.md` de nivel profesional para los proyectos del ecosistema PinkyOS, incorporando estándares modernos de documentación técnica (badges, tablas técnicas, stack, guía de inicio rápido, estado, limitaciones y licencias).

## Estructura estándar generada por proyecto

Cada `README.md` actualizado incluirá:
1. **Cabecera y Badges**: Nombre del proyecto, descripción ejecutiva, badges de versión, estado, tecnología/runtime y licencia.
2. **Descripción de Propósito**: Qué hace el proyecto, qué problema resuelve y su rol dentro del ecosistema.
3. **Stack Tecnológico**: Librerías, lenguajes, frameworks y herramientas base.
4. **Guía de Inicio Rápido (Quick Start)**: Instrucciones claras de clonación, instalación y ejecución.
5. **Arquitectura y Componentes / Módulos**: Estructura principal y guías de referencia.
6. **Notas Técnicas / Límites**: Claridad sobre alcances, supuestos o dependencias externas.
7. **Licencia y Propietario**: Autoría oficial (Jesus Adrian Anaya Sarria - PinkyOS).

## Pasos de Ejecución Automática

1. **Lectura de Contexto**: Lee `AGENTS.md` para extraer la lista oficial de proyectos empresariales y personales con sus respectivos stacks y estados.
2. **Localización de Ficheros**: Busca la ruta de cada proyecto en `C:\Users\adria\Documents\GitHub\` o `C:\Users\adria\Documents\herramientas\`.
3. **Generación / Reescritura del README.md**:
   - Aplica una plantilla enriquecida adaptada al lenguaje y stack específico del proyecto.
   - Traduce todas las descripciones y apartados estrictamente al **español**.
4. **Validación**: Comprueba la correcta escritura y formato Markdown válido en cada repositorio.
