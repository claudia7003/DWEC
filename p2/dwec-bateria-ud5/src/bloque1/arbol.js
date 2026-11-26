// Bloque 1 · El árbol DOM y seleccionar
// Explicación: web de DWEC → Practicar → UD5 · DOM y eventos → Bloque 1 (y los apartados 2 y 3 de la UD5).
// Comprueba con:  docker compose run --rm web npm run comprobar 1
// El comprobador te monta esta página (un catálogo) y te pasa `document` como raiz:
//   <section id="catalogo"><ul class="lista">
//     <li class="libro" data-isbn="111" data-paginas="300"><h3>Momo</h3><button data-accion="prestar"><span>Prestar</span></button></li>
//     <li class="libro prestado" data-isbn="222" data-paginas="600"><h3>Dune</h3><button data-accion="devolver">Devolver</button></li>
//     <li class="libro" data-isbn="333" data-paginas="180"><h3>El Principito</h3><button data-accion="prestar">Prestar</button></li>
//   </ul></section><aside id="lateral"><p>Novedades</p></aside>

// 👀 EJEMPLO RESUELTO ─────────────────────────────────────────────────────────
// Los títulos de todos los libros. querySelectorAll da una NodeList: con [...] la pasamos a array para usar map.
export function titulos(raiz) {
  return [...raiz.querySelectorAll(".libro h3")].map((h) => h.textContent);
}

// 🪜 ESCALERA ──────────────────────────────────────────────────────────────────
// 🪜 1 · ¿Cuántos elementos cumplen el selector?   contar(document, ".libro") → 3
export function contar(raiz, selector) {
  return raiz.querySelectorAll(selector).length;
}

// 🪜 2 · El título del PRIMER libro, o null si no hay ninguno.   primerTitulo(document) → "Momo"
//        (pista: querySelector da null si no encuentra nada; ?. y ?? te ahorran el if)
export function primerTitulo(raiz) {
  return raiz.querySelector(".libro h3")?.textContent ?? null;
}

// ✍️ TU TURNO ─────────────────────────────────────────────────────────────────
// ✍️ 1 · Los títulos de los libros PRESTADOS (los que tienen también la clase prestado).   → ["Dune"]
export function prestados(raiz) {
  return [...raiz.querySelectorAll(".libro.prestado h3")].map((h) => h.textContent);
}

// ✍️ 2 · Los nombres de etiqueta (en minúsculas) de los hijos que son ELEMENTOS, sin los nodos de texto.
//        hijosElemento(primer li) → ["h3", "button"]      (pista: children frente a childNodes; tagName)
export function hijosElemento(nodo) {
  return [...nodo.children].map((e) => e.tagName.toLowerCase());
}

// ✍️ 3 · El id del <section> que contiene al elemento (subiendo por el árbol), o null si no está en ninguno.
//        seccionDe(el <span> del primer botón) → "catalogo" · seccionDe(el <p> del aside) → null
export function seccionDe(elemento) {
  return elemento.closest("section")?.id ?? null;
}
