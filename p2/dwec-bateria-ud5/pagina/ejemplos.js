// ejemplos.js — Qué enseña la página en cada bloque. No hace falta tocarlo.
//   html:      la página de prueba del bloque (el «escenario»): la ves y la puedes usar.
//   montar:    cómo se conectan TUS funciones al escenario (botones, teclado, formulario…).
//              Lo que pasa sale en el registro: así ves cuándo se llama a cada función y con qué.
//   ejemplos:  código que la página ejecuta con TUS funciones; «espera» es lo que debería salir.
// En el código: escenario = la caja del escenario; $("selector") = el primer elemento del escenario que lo cumple;
// anota(...) escribe en el registro; LIBROS = los libros de ejemplo.
// El comprobador (docker compose run --rm web npm run comprobar N) prueba muchos más casos: esto es para VER y DEPURAR.
const modulos = import.meta.glob("../src/bloque*/*.js");
const cargar = (ruta) => modulos[`../src/${ruta}`]();

const CATALOGO = `<section id="catalogo"><ul class="lista">
  <li class="libro" data-isbn="111" data-paginas="300"><h3>Momo</h3><button type="button" data-accion="prestar"><span>Prestar</span></button></li>
  <li class="libro prestado" data-isbn="222" data-paginas="600"><h3>Dune</h3><button type="button" data-accion="devolver">Devolver</button></li>
  <li class="libro" data-isbn="333" data-paginas="180"><h3>El Principito</h3><button type="button" data-accion="prestar">Prestar</button></li>
</ul></section>`;

const FORMULARIO = `<form>
  <label>Título <input name="titulo"></label><span data-error-de="titulo"></span>
  <label>Autor <input name="autor"></label><span data-error-de="autor"></span>
  <label>Páginas <input name="paginas"></label><span data-error-de="paginas"></span>
  <button>Añadir</button>
</form>`;

export const BLOQUES = [
  {
    n: 1,
    // Las predicciones, escritas para poder ejecutarlas (botón «Probar»)
    probar: { p1: "const ul = document.createElement(\"ul\");\nul.innerHTML = \"<li>a</li><li>b</li><li>c</li>\";\nul.children.length", p2: "const p = document.createElement(\"p\");\np.innerHTML = \"Hola\";\np.childNodes.length", p3: "const ul = document.createElement(\"ul\");\nul.innerHTML = \"<li>a</li>\";\nconst vivos = ul.children;\nul.append(document.createElement(\"li\"));\nvivos.length", p4: "document.createElement(\"div\").tagName" },
    titulo: "El árbol DOM y seleccionar",
    modulos: ["bloque1/arbol.js"],
    html: `${CATALOGO}<aside id="lateral"><p>Novedades</p></aside>`,
    ejemplos: [
      { codigo: "titulos(escenario)", espera: '["Momo", "Dune", "El Principito"]', tipo: "👀" },
      { codigo: 'contar(escenario, ".libro")', espera: "3" },
      { codigo: "primerTitulo(escenario)", espera: '"Momo"' },
      { codigo: 'primerTitulo(document.createElement("div"))', espera: "null" },
      { codigo: "prestados(escenario)", espera: '["Dune"]' },
      { codigo: 'hijosElemento($(".libro"))', espera: '["h3", "button"]' },
      { codigo: 'seccionDe($(".libro button span"))', espera: '"catalogo"' },
      { codigo: 'seccionDe($("#lateral p"))', espera: "null" },
    ],
  },
  {
    n: 2,
    // Las predicciones, escritas para poder ejecutarlas (botón «Probar»)
    probar: { p1: "const t = document.createElement(\"p\");\nt.innerHTML = \"<b>Momo</b>\";\nt.textContent", p2: "const t = document.createElement(\"p\");\nt.innerHTML = \"<b>Momo</b>\";\nt.innerHTML", p3: "const li = document.createElement(\"li\");\nli.setAttribute(\"data-paginas\", \"42\");\nli.dataset.paginas", p4: "const input = document.createElement(\"input\");\ninput.setAttribute(\"value\", \"a\");\ninput.value = \"b\";\ninput.getAttribute(\"value\") === \"a\"" },
    titulo: "Leer y modificar: dataset, atributos, classList y closest",
    modulos: ["bloque2/leer.js"],
    html: `${CATALOGO}<p>Enlaces: <a href="https://developer.mozilla.org/es/">MDN</a> · <a href="/ayuda">Ayuda</a> · <a href="http://example.com">Ejemplo</a></p>
<p><small>Pulsa una tarjeta: se destaca o deja de estarlo con TU alternarDestacado.</small></p>`,
    montar: [
      {
        nombre: "clic en una tarjeta → alternarDestacado(tarjeta)",
        codigo: `escenario.addEventListener("click", (e) => {
  const tarjeta = e.target.closest(".libro");
  if (tarjeta) anota("alternarDestacado →", alternarDestacado(tarjeta), "· isbnDe(lo que has pulsado) →", isbnDe(e.target));
});`,
      },
    ],
    ejemplos: [
      { codigo: 'isbnDe($(".libro button span"))', espera: '"111"', tipo: "👀" },
      { codigo: 'datosDe($("[data-isbn=\'222\']"))', espera: '{ isbn: "222", titulo: "Dune", paginas: 600, prestado: true }' },
      {
        codigo:
          'const t = $("[data-isbn=\'111\']");\nmarcarPrestado(t, true);\n[t.className, t.dataset.estado, t.querySelector("button").textContent, t.querySelector("button").dataset.accion]',
        espera: '["libro prestado", "prestado", "Devolver", "devolver"]',
      },
      {
        codigo: 'const t = $("[data-isbn=\'111\']");\nmarcarPrestado(t, false);\n[t.className, t.dataset.estado, t.querySelector("button").textContent]',
        espera: '["libro", "disponible", "Prestar"]',
      },
      { codigo: "enlacesExternos(escenario)", espera: "2" },
      { codigo: 'enlacesExternos(escenario);\n[...escenario.querySelectorAll("a")].map((a) => a.target)', espera: '["_blank", "", "_blank"]' },
    ],
  },
  {
    n: 3,
    // Las predicciones, escritas para poder ejecutarlas (botón «Probar»)
    probar: { p1: "const ul = document.createElement(\"ul\");\nconst li = document.createElement(\"li\");\nul.append(li);\nul.append(li);\nul.children.length", p2: "const p = document.createElement(\"p\");\np.textContent = \"<img src=x>\";\np.innerHTML", p3: "const p = document.createElement(\"p\");\np.textContent = \"<img src=x>\";\np.children.length", p4: "const nuevo = () => document.createElement(\"li\");\nconst lista = document.createElement(\"ul\");\nlista.append(nuevo(), nuevo(), nuevo());\nlista.replaceChildren(nuevo(), nuevo());\nlista.children.length" },
    titulo: "Crear nodos sin XSS y pintar desde el modelo",
    modulos: ["bloque3/crear.js"],
    html: `<p class="contador"></p>
<section><ul class="lista"></ul><p class="vacio">No hay libros</p></section>
<p><button type="button" id="llenar">Pintar los 3 libros</button> <button type="button" id="vaciar">Pintar una lista vacía</button></p>`,
    montar: [
      {
        nombre: "pintarCatalogo(lista, LIBROS) y pintarContador(contador, LIBROS)",
        codigo: `pintarCatalogo($(".lista"), LIBROS);
pintarContador($(".contador"), LIBROS);
anota("Pintados", LIBROS.length, "libros. El tercero tiene un título con HTML: con textContent se ve como texto y no se ejecuta");`,
      },
      {
        nombre: "botones «Pintar…»",
        codigo: `$("#llenar").addEventListener("click", () => { pintarCatalogo($(".lista"), LIBROS); pintarContador($(".contador"), LIBROS); anota("pintarCatalogo con 3 libros"); });
$("#vaciar").addEventListener("click", () => { pintarCatalogo($(".lista"), []); pintarContador($(".contador"), []); anota("pintarCatalogo con []"); });`,
      },
    ],
    ejemplos: [
      { codigo: 'crearEtiqueta("<b>hola</b>").outerHTML', espera: '"<span class=\\"etiqueta\\">&lt;b&gt;hola&lt;/b&gt;</span>"', tipo: "👀" },
      {
        codigo: 'const t = crearTarjeta(LIBROS[1]);\n[t.tagName, t.className, t.dataset.isbn, t.querySelector("h3").textContent, t.querySelector("button").textContent]',
        espera: '["ARTICLE", "libro prestado", "222", "Dune", "Devolver"]',
      },
      { codigo: "crearTarjeta(LIBROS[2]).querySelector(\"img\")", espera: "null" },
      { codigo: 'pintarCatalogo($(".lista"), LIBROS);\npintarCatalogo($(".lista"), LIBROS);\n$(".lista").children.length', espera: "3" },
      { codigo: 'pintarCatalogo($(".lista"), LIBROS);\n$(".vacio").hidden', espera: "true" },
      { codigo: 'pintarCatalogo($(".lista"), []);\nconst oculto = $(".vacio").hidden;\npintarCatalogo($(".lista"), LIBROS);\noculto', espera: "false" },
      { codigo: 'pintarContador($(".contador"), LIBROS);\n$(".contador").textContent', espera: '"3 libros · 2 prestados"' },
    ],
  },
  {
    n: 4,
    // Las predicciones, escritas para poder ejecutarlas (botón «Probar»)
    probar: { p1: "const body = document.createElement(\"div\");\nbody.innerHTML = '<ul id=\"lista\"><li><button id=\"boton\">…</button></li></ul>';\nconst orden = [];\nbody.addEventListener(\"click\", () => orden.push(\"body\"));\nbody.querySelector(\"#lista\").addEventListener(\"click\", () => orden.push(\"lista\"));\nbody.querySelector(\"#boton\").addEventListener(\"click\", () => orden.push(\"boton\"));\nbody.querySelector(\"#boton\").click();\norden.join(\",\")", p2: "let n = 0;\nconst boton = document.createElement(\"button\");\nconst f = () => n++;\nboton.addEventListener(\"click\", f);\nboton.addEventListener(\"click\", f);\nboton.click();\nn", p3: "const lista = document.createElement(\"ul\");\nlista.innerHTML = \"<li><button>…</button></li>\";\nlet llega = false;\nlista.addEventListener(\"click\", () => (llega = true));\nlista.querySelector(\"button\").addEventListener(\"click\", (e) => e.stopPropagation());\nlista.querySelector(\"button\").click();\nllega", p4: "const lista = document.createElement(\"ul\");\nlista.id = \"lista\";\nlista.innerHTML = '<li><button id=\"boton\">…</button></li>';\nlet id;\nlista.addEventListener(\"click\", (e) => (id = e.currentTarget.id));\nlista.querySelector(\"#boton\").click();\nid" },
    titulo: "Eventos y delegación",
    modulos: ["bloque4/eventos.js"],
    html: `<p><button type="button" class="clics">Púlsame</button></p>
<p><input class="campo" placeholder="Escribe algo y pulsa Enter" size="30"></p>
${CATALOGO}
<p><a class="enlace" href="/ayuda">Ir a la ayuda</a> · <span class="origen">Soy el origen del evento</span> <button type="button" id="avisar">avisarCambio(origen, { isbn: "111" })</button></p>`,
    montar: [
      { nombre: 'contarClics($(".clics"))', codigo: 'contarClics($(".clics"));' },
      { nombre: 'alPulsarTecla($(".campo"), alEnter)', codigo: 'alPulsarTecla($(".campo"), (valor) => anota("alEnter(", valor, ")"));' },
      {
        nombre: 'conectarAcciones($(".lista"), { prestar, devolver })',
        codigo: 'conectarAcciones($(".lista"), { prestar: (isbn) => anota("prestar(", isbn, ")"), devolver: (isbn) => anota("devolver(", isbn, ")") });',
      },
      { nombre: 'noSalirDelEnlace($(".enlace"), alPulsar)', codigo: 'noSalirDelEnlace($(".enlace"), (href) => anota("alPulsar(", href, ") y la página NO ha navegado"));' },
      {
        nombre: "el botón llama a avisarCambio; document escucha «libro:cambio»",
        codigo: `document.addEventListener("libro:cambio", (e) => anota("«libro:cambio» ha llegado hasta document con detail", e.detail));
$("#avisar").addEventListener("click", () => avisarCambio($(".origen"), { isbn: "111" }));`,
      },
    ],
    ejemplos: [
      { codigo: 'const b = document.createElement("button");\ncontarClics(b);\nb.click();\nb.click();\nb.textContent', espera: '"Pulsado 2"', tipo: "👀" },
      {
        codigo:
          'const campo = document.createElement("input");\nconst llegan = [];\nalPulsarTecla(campo, (v) => llegan.push(v));\ncampo.value = "hola";\ncampo.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));\ncampo.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));\nllegan',
        espera: '["hola"]',
      },
      {
        codigo:
          'const ul = document.createElement("ul");\nul.innerHTML = \'<li data-isbn="7"><button data-accion="prestar"><span>Prestar</span></button></li>\';\nconst llegan = [];\nconectarAcciones(ul, { prestar: (isbn) => llegan.push(isbn) });\nul.querySelector("span").click();\nllegan',
        espera: '["7"]',
      },
      {
        codigo: 'let detalle = null;\ndocument.addEventListener("libro:cambio", (e) => (detalle = e.detail), { once: true });\navisarCambio($(".origen"), { isbn: "111" });\ndetalle',
        espera: '{ isbn: "111" }',
      },
    ],
  },
  {
    n: 5,
    // Las predicciones, escritas para poder ejecutarlas (botón «Probar»)
    probar: { p1: "const form = document.createElement(\"form\");\nform.innerHTML = '<input type=\"number\" name=\"paginas\" value=\"12\">';\ntypeof new FormData(form).get(\"paginas\")", p2: "const input = document.createElement(\"input\");\ninput.required = true;\ninput.validity.valueMissing", p3: null },
    titulo: "Formularios y validación",
    modulos: ["bloque5/formulario.js"],
    html: `${FORMULARIO}<p><small>Prueba a enviar vacío, con un título muy largo o con páginas «2.5». Al enviar bien, alGuardar sale en el registro.</small></p>`,
    montar: [{ nombre: 'conectarAlta($("form"), alGuardar)', codigo: 'conectarAlta($("form"), (datos) => anota("alGuardar(", datos, ")"));' }],
    ejemplos: [
      {
        codigo: 'const f = $("form");\nf.titulo.value = "  Momo ";\nf.autor.value = "Ende";\nf.paginas.value = "300";\nconst datos = leerFormulario(f);\nf.reset();\ndatos',
        espera: '{ titulo: "Momo", autor: "Ende", paginas: 300 }',
        tipo: "👀",
      },
      { codigo: 'Object.keys(validarLibro({ titulo: "", autor: "Ende", paginas: null }))', espera: '["titulo"]' },
      { codigo: 'Object.keys(validarLibro({ titulo: "x".repeat(61), autor: "", paginas: 2.5 }))', espera: '["titulo", "autor", "paginas"]' },
      { codigo: 'validarLibro({ titulo: "Momo", autor: "Ende", paginas: null })', espera: "{}" },
      {
        codigo: 'mostrarErrores($("form"), { autor: "Falta el autor" });\n[$("[data-error-de=autor]").textContent, $("[name=autor]").getAttribute("aria-invalid"), document.activeElement.name]',
        espera: '["Falta el autor", "true", "autor"]',
      },
      { codigo: 'mostrarErrores($("form"), {});\n[$("[data-error-de=autor]").textContent, $("[name=autor]").hasAttribute("aria-invalid")]', espera: '["", false]' },
    ],
  },
  {
    n: 6,
    titulo: "Integrador: el catálogo en la página",
    modulos: ["bloque3/crear.js", "bloque4/eventos.js", "bloque5/formulario.js", "bloque6/catalogo.js"],
    html: `<main id="app">
  <input type="search" placeholder="Buscar por título"> <p class="contador"></p>
  <section><ul class="lista"></ul><p class="vacio">No hay libros</p></section>
  ${FORMULARIO}
</main>`,
    montar: [{ nombre: "iniciarCatalogo(escenario, LIBROS)", codigo: "iniciarCatalogo(escenario, LIBROS);" }],
    ejemplos: [
      { codigo: '$(".lista").children.length', espera: "3", trasMontar: true },
      { codigo: '$(".contador").textContent', espera: '"3 libros · 2 prestados"', trasMontar: true },
      { codigo: 'LIBROS.filter((l) => l.prestado).length', espera: "2", nota: "tu catálogo no puede cambiar LIBROS: trabaja con una copia", trasMontar: true },
    ],
  },
];

export async function cargarBloque(bloque) {
  const cargados = await Promise.all(bloque.modulos.map(cargar));
  return Object.assign({}, ...cargados);
}

// Las predicciones: el texto de predicciones.js (para leer las expresiones) y tus respuestas
const textos = import.meta.glob("../src/bloque*/predicciones.js", { query: "?raw", import: "default" });
export async function cargarPredicciones(n) {
  const ruta = `../src/bloque${n}/predicciones.js`;
  if (!textos[ruta]) return [];
  const [texto, modulo] = await Promise.all([textos[ruta](), modulos[ruta]()]);
  return [...texto.matchAll(/^\s*(p\d+):.*?\/\/\s*(.+)$/gm)].map(([, clave, expresion]) => ({
    clave,
    expresion: expresion.trim(),
    tuya: modulo.predicciones?.[clave],
  }));
}
