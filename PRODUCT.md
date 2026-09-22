# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Repartidores en moto (motorizados) en Colombia que se inscriben al plan de incentivos NVP. El flujo central es el registro: completan su cédula, teléfono, datos personales, ciudad de servicio y correo para entrar al programa y optar al premio mensual.

## Product Purpose

La landing del plan de incentivos NVP invita a los motorizados a inscribirse en un programa recurrente: cada participante recibe un cupón con código NVP-XXXX-XXXX, suma redenciones por servicios entregados y quien acumula más puntos verificados durante el mes gana un premio de $500.000 COP. El éxito se mide por inscripciones completadas y por la participación sostenida de los motorizados en el programa.

## Positioning

Un plan de incentivos con premio mensual real ($500.000 COP) típico de la operación de reparto, donde el cupón y el ranking hacen visible el progreso de cada motorizado frente a la meta del mes. La motivación competitiva (ranking visible) y el premio recurrente son el mecanismo diferenciador frente a un simple registro de conductores.

## Operating Context

- Los motorizados operan en Bogotá, Medellín, Cali y Barranquilla (ciudades listadas en el formulario).
- Los puntos se validan contra los registros de servicio de la operación NVP.
- El ranking se cierra el último día de cada mes; el premio se otorga al mayor puntaje, con desempate por orden de redención.
- El registro es gratuito y se gestiona con datos reales (cédula vigente, ciudad de servicio).

## Capabilities and Constraints

- Landing single-page en español, estática, sin framework: HTML semántico, CSS con custom properties (BEM) y JS vanilla.
- Secciones: hero con CTA, ranking del mes (top 3, aún con datos "por definir"), cómo funciona (4 pasos), inscripción (formulario de 6 campos + consentimiento) y términos y condiciones (7 cláusulas).
- Sin backend conectado: hoy el formulario simula el envío y muestra un aviso explícito; la recepción real de inscripciones es una decisión abierta (API, WhatsApp, hoja de cálculo, etc.).
- Ranking y nombres de ganadores son placeholders ("por definir"); el producto no debe fabricar datos reales de participantes.
- Marca NVP: paleta navy + neón rosa, tono en español, vinculante.
- Regla de dominio: las redenciones solo cuentan si se verifican contra los registros de servicio; prohibido el doble conteo o datos falsos.

## Brand Commitments

- Nombre distintivo "nvp" (logotipo texto, minúsculas), producto "NVP — plan de incentivos para motorizados".
- Identidad visual confirmada: fondo nocturno (midnight navy), blanco y neón rosa/magenta con resplandor; tarjeta plástica azul oscuro con franja diagonal rosa y código NVP-XXXX-XXXX.
- Acento neón: tokens `--color-acento` (#ff2d78) con variantes hover/active y glow.
- Tono: conciso, directo y orientado a inscripción, en español colombiano.

## Evidence on Hand

- `DESIGN.md`: guía de diseño con tokens y reglas de accesibilidad del programa.
- `assets/tarjeta-nvp.svg`: tarjeta de cupón con código NVP-XXXX-XXXX.
- Textos vigentes: hero (*Plan de incentivos • Motorizados NVP), "GANA $500.000 CADA MES", 4 pasos (Regístrate, Recibe tu cupón, Suma redenciones, Cobra $500.000), formulario (Cédula, Teléfono, Nombres, Apellidos, Área de servicio, Correo) y 7 cláusulas de términos.
- Ausencias que no deben fabricarse: no hay nombres, cupones, puntajes ni inscripciones reales de participantes aún.

## Product Principles

1. La inscripción es el acto central: cualquier elemento debe reducir fricción hacia el registro.
2. El premio y el ranking deben ser visibles y creíbles, sin inventar datos de participantes.
3. La honestidad es no negociable: no comunicar como enviado un registro que aún no llega a un backend.
4. La marca NVP (navy + neón, tono español) es un compromiso, no una sugerencia.
5. Accesibilidad WCAG 2.2 AA y validación de datos reales en cada capa futura.

## Accessibility & Inclusion

- Objetivo: WCAG 2.2 AA. Interacciones operables por teclado, focus visible, contraste AA y etiquetas asociadas a cada campo.
- `prefers-reduced-motion` respetado (la tarjeta flotante no se anima para quienes lo requieran).