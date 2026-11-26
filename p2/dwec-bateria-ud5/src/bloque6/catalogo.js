// Bloque 6 · Integrador: el catálogo en la página
// Explicación: web de DWEC → Practicar → UD5 · DOM y eventos → Bloque 6.
// Comprueba con:  docker compose run --rm web npm run comprobar 6
//
// Usa TUS funciones de los bloques 3, 4 y 5 (ya están importadas). La página es:
//   <main id="app">
//     <input type="search"> <p class="contador"></p>
//     <section><ul class="lista"></ul><p class="vacio">No hay libros</p></section>
//     <form> titulo, autor y paginas, cada uno con su [data-error-de], y un botón </form>
//   </main>
//
// ✍️ iniciarCatalogo(raiz, libros):
//   1. Guarda los libros en una variable (el MODELO) y pinta la lista y el contador.
//   2. Botones Prestar / Devolver (delegación): cambia ese libro en el modelo y vuelve a pintar.
//   3. Formulario: cada alta válida añade un libro al modelo { ...datos, isbn: inventado, prestado: false }
//      y vuelve a pintar.
//   4. Buscador: mientras se escribe (evento input), se ven solo los libros cuyo título contiene
//      el texto (sin distinguir mayúsculas). El contador sigue contando TODOS.
//   La regla de oro: se cambia el MODELO y se repinta desde él. Nunca se lee el estado del HTML.
import { pintarCatalogo, pintarContador } from "../bloque3/crear.js";
import { conectarAcciones } from "../bloque4/eventos.js";
import { conectarAlta } from "../bloque5/formulario.js";

export function iniciarCatalogo(raiz, libros) {
  throw new Error("Sin hacer");
}
