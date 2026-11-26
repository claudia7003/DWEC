// Bloque 3 · Crear nodos sin XSS y pintar desde el modelo
// Explicación: web de DWEC → Practicar → UD5 · DOM y eventos → Bloque 3 (y los apartados 6, 7 y 8 de la UD5).
// Comprueba con:  docker compose run --rm web npm run comprobar 3

// 👀 EJEMPLO RESUELTO ─────────────────────────────────────────────────────────
// Crear → configurar → devolver (quien la llame decidirá dónde la inserta).
// textContent mete TEXTO: aunque `texto` traiga etiquetas, se ven tal cual y no se ejecuta nada.
export function crearEtiqueta(texto) {
  const span = document.createElement("span");
  span.className = "etiqueta";
  span.textContent = texto;
  return span;
}

// ✍️ TU TURNO ─────────────────────────────────────────────────────────────────
// ✍️ 1 · La tarjeta de un libro { isbn, titulo, autor, prestado }:
//          <article class="libro [prestado]" data-isbn="…">
//            <h3>título</h3> <p>autor</p>
//            <button type="button" data-accion="prestar|devolver">Prestar|Devolver</button>
//          </article>
//        Con createElement y textContent: el título y el autor los escribe el usuario, NUNCA con innerHTML.
export function crearTarjeta(libro) {
  throw new Error("Sin hacer");
}

// ✍️ 2 · Pinta TODOS los libros en la lista (una tarjeta por libro), sustituyendo lo que hubiera.
//        Si llamas dos veces, no se duplican (pista: replaceChildren).
//        Además, en el padre de la lista hay un <p class="vacio">: oculto (hidden = true) si hay libros,
//        visible si no hay ninguno.
export function pintarCatalogo(lista, libros) {
  throw new Error("Sin hacer");
}

// ✍️ 3 · Escribe en el elemento: "3 libros · 2 prestados".
export function pintarContador(elemento, libros) {
  throw new Error("Sin hacer");
}
