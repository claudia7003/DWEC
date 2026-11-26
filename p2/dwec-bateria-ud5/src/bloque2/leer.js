// Bloque 2 · Leer y modificar: dataset, atributos, classList y closest
// Explicación: web de DWEC → Practicar → UD5 · DOM y eventos → Bloque 2 (y los apartados 4 y 5 de la UD5).
// Comprueba con:  docker compose run --rm web npm run comprobar 2
// La página es el mismo catálogo del bloque 1.

// 👀 EJEMPLO RESUELTO ─────────────────────────────────────────────────────────
// El isbn de la tarjeta a la que pertenece un elemento cualquiera (un botón, el texto de dentro de un botón…).
// closest sube por el árbol hasta el primer antepasado (o él mismo) que cumple el selector.
export function isbnDe(elemento) {
  return elemento.closest("[data-isbn]")?.dataset.isbn ?? null;
}

// 🪜 ESCALERA ──────────────────────────────────────────────────────────────────
// 🪜 1 · Pone la clase destacado si no la tiene y la quita si la tiene. Devuelve si ha quedado puesta.
//        (pista: classList tiene un método que hace justo eso y devuelve true/false)
export function alternarDestacado(tarjeta) {
  throw new Error("Sin hacer");
}

// ✍️ TU TURNO ─────────────────────────────────────────────────────────────────
// ✍️ 1 · Deja la tarjeta como prestada (prestado = true) o disponible (false):
//        - la clase prestado puesta o quitada (sin tocar las demás clases);
//        - data-estado = "prestado" o "disponible";
//        - su botón: texto «Devolver» y data-accion="devolver", o «Prestar» y data-accion="prestar".
export function marcarPrestado(tarjeta, prestado) {
  throw new Error("Sin hacer");
}

// ✍️ 2 · Del HTML al dato: un objeto con lo que dice la tarjeta.
//        datosDe(tarjeta de Dune) → { isbn: "222", titulo: "Dune", paginas: 600, prestado: true }
//        Ojo: paginas tiene que ser un NÚMERO (predicción p3).
export function datosDe(tarjeta) {
  throw new Error("Sin hacer");
}

// ✍️ 3 · A los enlaces EXTERNOS (href que empieza por http) ponles target="_blank" y rel="noopener".
//        Los internos no se tocan. Devuelve cuántos has cambiado.
//        (pista: un selector de atributo, a[href^='…'], y setAttribute)
export function enlacesExternos(raiz) {
  throw new Error("Sin hacer");
}
