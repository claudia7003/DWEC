// Bloque 4 · Eventos y delegación
// Explicación: web de DWEC → Practicar → UD5 · DOM y eventos → Bloque 4 (y los apartados 9, 10 y 11 de la UD5).
// Comprueba con:  docker compose run --rm web npm run comprobar 4

// 👀 EJEMPLO RESUELTO ─────────────────────────────────────────────────────────
// Cada clic suma uno y lo enseña en el propio botón: «Pulsado 1», «Pulsado 2»…
// El contador vive en la closure: no hace falta una variable global.
export function contarClics(boton) {
  let n = 0;
  boton.addEventListener("click", () => {
    n++;
    boton.textContent = `Pulsado ${n}`;
  });
}

// 🪜 ESCALERA ──────────────────────────────────────────────────────────────────
// 🪜 1 · Cuando se pulse Enter en el campo, llama a alEnter(valor del campo). Con otras teclas, nada.
//        (pista: evento keydown y e.key)
export function alPulsarTecla(campo, alEnter) {
  throw new Error("Sin hacer");
}

// ✍️ TU TURNO ─────────────────────────────────────────────────────────────────
// ✍️ 1 · DELEGACIÓN. Pon UN SOLO listener de click en la lista (ninguno en los botones).
//        Cuando se pulse un botón con data-accion, llama a acciones[esaAccion](isbn de su tarjeta).
//        conectarAcciones(lista, { prestar: (isbn) => …, devolver: (isbn) => … })
//        Ojo: si se pulsa el <span> de DENTRO del botón, e.target es el span, no el botón (pista: closest).
//        Así, aunque se vuelvan a pintar las tarjetas, los botones nuevos funcionan solos.
export function conectarAcciones(lista, acciones) {
  throw new Error("Sin hacer");
}

// ✍️ 2 · Al pulsar el enlace, que NO navegue y llame a alPulsar(su href, tal como está en el HTML).
export function noSalirDelEnlace(enlace, alPulsar) {
  throw new Error("Sin hacer");
}

// ✍️ 3 · Lanza desde el elemento un evento propio "libro:cambio" con `detalle` dentro,
//        que SUBA por el árbol (para que lo pueda escuchar el body o la página entera).
export function avisarCambio(elemento, detalle) {
  throw new Error("Sin hacer");
}
