// pruebas.mjs — Las pruebas de cada bloque de la batería de la UD5. Puedes leerlas: dicen QUÉ se espera, no CÓMO hacerlo.
// Cada prueba monta una página de verdad con happy-dom (un navegador sin ventana) y prueba tu código sobre ella.
import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { inspect } from "node:util";

if (!globalThis.document) GlobalRegistrator.register({ url: "http://localhost/" });

// ───────────────────────── utilidades ─────────────────────────
const muestra = (v) => inspect(v, { depth: 4, breakLength: Infinity, compact: true });
function igual(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const ka = Object.keys(a);
  const kb = Object.keys(b);
  return ka.length === kb.length && ka.every((k) => igual(a[k], b[k]));
}
// Monta una página con este HTML y devuelve el body
function pagina(html) {
  document.body.innerHTML = html;
  return document.body;
}
const $ = (sel) => document.querySelector(sel);
function predicciones(datos) {
  return ({ pred }) => {
    const p = pred.predicciones ?? {};
    const claves = Object.keys(datos);
    const sinContestar = claves.filter((k) => p[k] === undefined);
    if (sinContestar.length === claves.length) return "pendiente";
    if (sinContestar.length > 0) return `Te faltan: ${sinContestar.join(", ")}`;
    const falladas = claves.filter((k) => !igual(p[k], datos[k][1]));
    const info = claves.map((k) => {
      const [expresion, valor, porque, pista] = datos[k];
      return falladas.includes(k)
        ? `✘ ${k} · ${expresion}  → no es ${muestra(p[k])}. Pista: ${pista}`
        : `✔ ${k} · ${expresion}  → ${muestra(valor)}: ${porque}`;
    });
    if (falladas.length > 0) return { mal: `${claves.length - falladas.length}/${claves.length} bien. Revisa: ${falladas.join(", ")} → pruébalas en la consola del navegador (F12)`, info };
    return { bien: true, info };
  };
}
const CATALOGO = `<section id="catalogo"><ul class="lista">
  <li class="libro" data-isbn="111" data-paginas="300"><h3>Momo</h3><button type="button" data-accion="prestar"><span>Prestar</span></button></li>
  <li class="libro prestado" data-isbn="222" data-paginas="600"><h3>Dune</h3><button type="button" data-accion="devolver">Devolver</button></li>
  <li class="libro" data-isbn="333" data-paginas="180"><h3>El Principito</h3><button type="button" data-accion="prestar">Prestar</button></li>
</ul></section><aside id="lateral"><p>Novedades</p></aside>`;

// ───────────────────────── bloques ─────────────────────────
export const BLOQUES = [
  {
    id: "1",
    titulo: "Bloque 1 · El árbol DOM y seleccionar",
    modulos: { m: "src/bloque1/arbol.js", pred: "src/bloque1/predicciones.js" },
    pruebas: [
      {
        id: "1.p",
        texto: "Predicciones",
        fn: predicciones({
          p1: ["<ul><li>a</li><li>b</li><li>c</li></ul> · ul.children.length", 3, "children solo cuenta ELEMENTOS: los tres li", "¿qué hijos cuenta children?"],
          p2: ["<p>Hola</p> · p.childNodes.length", 1, "el texto «Hola» es un nodo de TEXTO: p tiene un hijo, que no es un elemento", "childNodes cuenta todos los nodos, también el texto"],
          p3: ["<ul><li>a</li></ul> · const vivos = ul.children; ul.append(document.createElement('li')); vivos.length", 2, "children es una colección VIVA: se actualiza sola", "¿children es una foto fija o se actualiza?"],
          p4: ["document.createElement('div').tagName", "DIV", "tagName va en MAYÚSCULAS en HTML", "¿mayúsculas o minúsculas?"],
        }),
      },
      { id: "1.E", texto: "👀 Ejemplo: titulos", fn: ({ m }) => (pagina(CATALOGO), igual(m.titulos(document), ["Momo", "Dune", "El Principito"]) || `titulos() da ${muestra(m.titulos(document))}`) },
      { id: "1.e1", texto: "🪜 contar", fn: ({ m }) => (pagina(CATALOGO), m.contar(document, ".libro") === 3 && m.contar(document, ".prestado") === 1) || "contar(document, '.libro') debería dar 3 y '.prestado' 1" },
      {
        id: "1.e2",
        texto: "🪜 primerTitulo (y null si no hay)",
        fn: ({ m }) => {
          pagina(CATALOGO);
          if (m.primerTitulo(document) !== "Momo") return `primerTitulo da ${muestra(m.primerTitulo(document))}`;
          pagina("<p>vacío</p>");
          return m.primerTitulo(document) === null || "si no hay ningún libro debería devolver null (querySelector da null: ¿?. o ??)";
        },
      },
      { id: "1.1", texto: "✍️ prestados", fn: ({ m }) => (pagina(CATALOGO), igual(m.prestados(document), ["Dune"]) || `prestados() da ${muestra(m.prestados(document))}`) },
      {
        id: "1.2",
        texto: "✍️ hijosElemento (sin los nodos de texto)",
        fn: ({ m }) => {
          pagina(CATALOGO);
          const r = m.hijosElemento($(".libro"));
          return igual(r, ["h3", "button"]) || `hijosElemento(primer libro) debería dar ['h3', 'button'] y da ${muestra(r)}`;
        },
      },
      {
        id: "1.3",
        texto: "✍️ seccionDe (subir por el árbol)",
        fn: ({ m }) => {
          pagina(CATALOGO);
          if (m.seccionDe($("button span")) !== "catalogo") return `seccionDe(el span del botón) debería dar 'catalogo' y da ${muestra(m.seccionDe($("button span")))}`;
          return m.seccionDe($("#lateral p")) === null || "un elemento que no está dentro de ningún section debería dar null";
        },
      },
    ],
  },
  {
    id: "2",
    titulo: "Bloque 2 · Leer y modificar: dataset, atributos, classList y closest",
    modulos: { m: "src/bloque2/leer.js", pred: "src/bloque2/predicciones.js" },
    pruebas: [
      {
        id: "2.p",
        texto: "Predicciones",
        fn: predicciones({
          p1: ["<p id='t'><b>Momo</b></p> · t.textContent", "Momo", "textContent es solo el TEXTO, sin etiquetas", "¿incluye las etiquetas?"],
          p2: ["(el mismo p) t.innerHTML", "<b>Momo</b>", "innerHTML es el HTML de dentro, con sus etiquetas", "¿y este?"],
          p3: ["<li data-paginas='42'> · li.dataset.paginas", "42", "dataset SIEMPRE devuelve textos: hay que convertir con Number()", "¿número o texto?"],
          p4: ["<input value='a'> · input.value = 'b'; input.getAttribute('value') === 'a'", true, "el ATRIBUTO es el valor inicial del HTML; la PROPIEDAD value es el valor actual", "repasa el apartado 4.2 de la UD5"],
        }),
      },
      {
        id: "2.E",
        texto: "👀 Ejemplo: isbnDe con closest",
        fn: ({ m }) => (pagina(CATALOGO), m.isbnDe($("button span")) === "111" || "isbnDe(span del primer botón) debería dar '111'"),
      },
      {
        id: "2.e1",
        texto: "🪜 alternarDestacado (classList.toggle)",
        fn: ({ m }) => {
          pagina(CATALOGO);
          const t = $(".libro");
          if (m.alternarDestacado(t) !== true || !t.classList.contains("destacado")) return "la primera vez debe añadir la clase destacado y devolver true";
          return (m.alternarDestacado(t) === false && !t.classList.contains("destacado")) || "la segunda vez debe quitarla y devolver false";
        },
      },
      {
        id: "2.1",
        texto: "✍️ marcarPrestado: clase, data-estado y botón",
        fn: ({ m }) => {
          pagina(CATALOGO);
          const t = $(".libro");
          m.marcarPrestado(t, true);
          if (!t.classList.contains("prestado")) return "falta la clase prestado";
          if (t.dataset.estado !== "prestado") return "data-estado debería ser 'prestado'";
          const b = t.querySelector("button");
          if (b.textContent !== "Devolver" || b.dataset.accion !== "devolver") return "el botón debería decir «Devolver» y tener data-accion='devolver'";
          if (t.classList.length !== 2) return `no borres las otras clases: ${t.className}`;
          m.marcarPrestado(t, false);
          return (!t.classList.contains("prestado") && t.dataset.estado === "disponible" && b.dataset.accion === "prestar") || "al marcarlo como disponible no vuelve atrás";
        },
      },
      {
        id: "2.2",
        texto: "✍️ datosDe: del HTML a un objeto (con números de verdad)",
        fn: ({ m }) => {
          pagina(CATALOGO);
          const r = m.datosDe(document.querySelectorAll(".libro")[1]);
          return igual(r, { isbn: "222", titulo: "Dune", paginas: 600, prestado: true }) || `datosDe(Dune) da ${muestra(r)} (¿paginas es un número?)`;
        },
      },
      {
        id: "2.3",
        texto: "✍️ enlacesExternos (atributos)",
        fn: ({ m }) => {
          pagina(`<p><a href="https://mdn.io">MDN</a> <a href="/local">local</a> <a href="http://x.org">X</a></p>`);
          const n = m.enlacesExternos(document);
          if (n !== 2) return `debería tocar 2 enlaces y dice ${n}`;
          const [a, b, c] = document.querySelectorAll("a");
          if (a.getAttribute("target") !== "_blank" || c.getAttribute("rel") !== "noopener") return "a los externos les falta target='_blank' o rel='noopener'";
          return !b.hasAttribute("target") || "el enlace interno no se toca";
        },
      },
    ],
  },
  {
    id: "3",
    titulo: "Bloque 3 · Crear nodos sin XSS y pintar desde el modelo",
    modulos: { m: "src/bloque3/crear.js", pred: "src/bloque3/predicciones.js" },
    pruebas: [
      {
        id: "3.p",
        texto: "Predicciones",
        fn: predicciones({
          p1: ["const li = document.createElement('li'); ul.append(li); ul.append(li); ul.children.length", 1, "un nodo solo puede estar en UN sitio: el segundo append lo mueve, no lo copia", "¿append copia o mueve?"],
          p2: ["const p = document.createElement('p'); p.textContent = '<img src=x>'; p.innerHTML", "&lt;img src=x&gt;", "con textContent el texto se ESCAPA: no se crea ninguna etiqueta", "¿qué hace textContent con los < y >?"],
          p3: ["(el mismo p) p.children.length", 0, "no hay ningún elemento img: era solo texto. Por eso textContent es seguro", "¿se ha creado un img?"],
          p4: ["const lista = document.createElement('ul'); lista.replaceChildren(a, b); lista.children.length", 2, "replaceChildren quita todo lo que había y pone lo nuevo", "¿añade o sustituye?"],
        }),
      },
      { id: "3.E", texto: "👀 Ejemplo: crearEtiqueta", fn: ({ m }) => { const s = m.crearEtiqueta("Novela"); return (s.tagName === "SPAN" && s.className === "etiqueta" && s.textContent === "Novela") || "crearEtiqueta no crea <span class='etiqueta'>Novela</span>"; } },
      {
        id: "3.1",
        texto: "✍️ crearTarjeta (createElement + textContent)",
        fn: ({ m }) => {
          const t = m.crearTarjeta({ isbn: "111", titulo: "Momo", autor: "Ende", prestado: false });
          if (t.tagName !== "ARTICLE" || !t.classList.contains("libro") || t.dataset.isbn !== "111") return "la tarjeta debe ser <article class='libro' data-isbn='111'>";
          if (t.querySelector("h3")?.textContent !== "Momo" || t.querySelector("p")?.textContent !== "Ende") return "falta el h3 con el título o el p con el autor";
          const b = t.querySelector("button");
          if (!b || b.type !== "button" || b.dataset.accion !== "prestar") return "falta un <button type='button' data-accion='prestar'>";
          const p = m.crearTarjeta({ isbn: "2", titulo: "X", autor: "Y", prestado: true });
          return (p.classList.contains("prestado") && p.querySelector("button").dataset.accion === "devolver") || "un libro prestado: clase prestado y botón data-accion='devolver'";
        },
      },
      {
        id: "3.2",
        texto: "✍️ crearTarjeta no permite XSS",
        fn: ({ m }) => {
          const malo = '<img src=x onerror="alert(1)">';
          const t = m.crearTarjeta({ isbn: "1", titulo: malo, autor: "<b>yo</b>", prestado: false });
          if (t.querySelector("img, b")) return "¡se ha creado una etiqueta a partir del título o del autor! Usa textContent, no innerHTML (XSS)";
          return t.querySelector("h3").textContent === malo || "el título debería verse tal cual, como texto";
        },
      },
      {
        id: "3.3",
        texto: "✍️ pintarCatalogo: sustituye (no acumula) y el aviso de «vacío»",
        fn: ({ m }) => {
          pagina(`<section><ul class="lista"></ul><p class="vacio">No hay libros</p></section>`);
          const lista = $(".lista");
          const libros = [{ isbn: "1", titulo: "A", autor: "x" }, { isbn: "2", titulo: "B", autor: "y" }];
          m.pintarCatalogo(lista, libros);
          m.pintarCatalogo(lista, libros);
          if (lista.children.length !== 2) return `tras pintar dos veces hay ${lista.children.length} tarjetas: ¿vacías la lista antes?`;
          if (!$(".vacio").hidden) return "con libros, el aviso .vacio debe estar oculto (hidden = true)";
          m.pintarCatalogo(lista, []);
          return (lista.children.length === 0 && $(".vacio").hidden === false) || "con la lista vacía, el aviso .vacio debe verse";
        },
      },
      {
        id: "3.4",
        texto: "✍️ pintarContador",
        fn: ({ m }) => {
          const p = document.createElement("p");
          m.pintarContador(p, [{ prestado: true }, { prestado: false }, { prestado: true }]);
          return p.textContent === "3 libros · 2 prestados" || `pintarContador da ${muestra(p.textContent)}`;
        },
      },
    ],
  },
  {
    id: "4",
    titulo: "Bloque 4 · Eventos y delegación",
    modulos: { m: "src/bloque4/eventos.js", pred: "src/bloque4/predicciones.js" },
    pruebas: [
      {
        id: "4.p",
        texto: "Predicciones",
        fn: predicciones({
          p1: ["botón dentro de una lista dentro del body, cada uno con un listener de click que apunta su nombre. Pulsas el botón: el orden", "boton,lista,body", "el evento SUBE (burbuja) desde el que se pulsa hasta el documento", "¿hacia dónde viaja el evento?"],
          p2: ["const f = () => n++; boton.addEventListener('click', f); boton.addEventListener('click', f); boton.click(); n", 1, "la MISMA función añadida dos veces solo se registra una vez", "¿y si fuera una función nueva cada vez, (() => n++)?"],
          p3: ["(el botón hace e.stopPropagation()) ¿llega el click al listener de la lista?", false, "stopPropagation corta la burbuja: los de arriba no se enteran", "repasa el apartado 10.2"],
          p4: ["(listener en la lista, pulsas el botón) e.currentTarget.id", "lista", "currentTarget es donde está el LISTENER; target, lo que se pulsó", "¿quién es currentTarget y quién target?"],
        }),
      },
      { id: "4.E", texto: "👀 Ejemplo: contarClics", fn: ({ m }) => { const b = document.createElement("button"); m.contarClics(b); b.click(); b.click(); return b.textContent === "Pulsado 2" || `tras dos clics dice ${muestra(b.textContent)}`; } },
      {
        id: "4.e1",
        texto: "🪜 alPulsarTecla (Enter)",
        fn: ({ m }) => {
          const i = document.createElement("input");
          const recibidos = [];
          m.alPulsarTecla(i, (v) => recibidos.push(v));
          i.value = "momo";
          i.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));
          i.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
          return igual(recibidos, ["momo"]) || `con «a» no debe hacer nada y con Enter llamar con el valor; llamadas: ${muestra(recibidos)}`;
        },
      },
      {
        id: "4.1",
        texto: "✍️ conectarAcciones: UN listener en la lista (delegación)",
        fn: ({ m }) => {
          pagina(CATALOGO);
          const lista = $(".lista");
          const hechas = [];
          let listeners = 0;
          const original = lista.addEventListener.bind(lista);
          lista.addEventListener = (...a) => { listeners++; return original(...a); };
          for (const b of document.querySelectorAll("button")) b.addEventListener = () => { throw new Error("listener en un botón"); };
          try {
            m.conectarAcciones(lista, { prestar: (i) => hechas.push(`prestar ${i}`), devolver: (i) => hechas.push(`devolver ${i}`) });
          } catch (e) {
            if (e.message === "listener en un botón") return "pones un listener en cada botón: pon UNO solo en la lista (delegación)";
            throw e;
          }
          if (listeners !== 1) return `has puesto ${listeners} listeners en la lista: con uno basta`;
          $("button span").click(); // se pulsa el TEXTO de dentro del botón
          document.querySelectorAll("button")[1].click();
          $("h3").click(); // fuera de un botón: nada
          return igual(hechas, ["prestar 111", "devolver 222"]) || `acciones ejecutadas: ${muestra(hechas)} (¿usas closest para encontrar el botón aunque se pulse lo de dentro?)`;
        },
      },
      {
        id: "4.2",
        texto: "✍️ la delegación sigue funcionando tras repintar",
        fn: ({ m }) => {
          pagina(CATALOGO);
          const lista = $(".lista");
          const hechas = [];
          m.conectarAcciones(lista, { prestar: (i) => hechas.push(i) });
          lista.innerHTML = `<li class="libro" data-isbn="999"><h3>Nuevo</h3><button type="button" data-accion="prestar">Prestar</button></li>`;
          $("button").click();
          return igual(hechas, ["999"]) || "tras sustituir las tarjetas, el botón nuevo no funciona: el listener tiene que estar en la lista, no en los botones";
        },
      },
      {
        id: "4.3",
        texto: "✍️ noSalirDelEnlace (preventDefault)",
        fn: ({ m }) => {
          const a = document.createElement("a");
          a.setAttribute("href", "#ficha-111");
          let recibido = null;
          m.noSalirDelEnlace(a, (h) => (recibido = h));
          const e = new MouseEvent("click", { bubbles: true, cancelable: true });
          a.dispatchEvent(e);
          if (!e.defaultPrevented) return "el enlace sigue navegando: falta preventDefault()";
          return recibido === "#ficha-111" || `debería llamar con el href; llama con ${muestra(recibido)}`;
        },
      },
      {
        id: "4.4",
        texto: "✍️ avisarCambio: un evento propio que sube",
        fn: ({ m }) => {
          pagina(CATALOGO);
          let detalle = null;
          document.body.addEventListener("libro:cambio", (e) => (detalle = e.detail));
          m.avisarCambio($(".libro"), { isbn: "111", prestado: true });
          return igual(detalle, { isbn: "111", prestado: true }) || "el body no recibe «libro:cambio» con el detalle: ¿CustomEvent con detail y bubbles: true?";
        },
      },
    ],
  },
  {
    id: "5",
    titulo: "Bloque 5 · Formularios y validación",
    modulos: { m: "src/bloque5/formulario.js", pred: "src/bloque5/predicciones.js" },
    pruebas: [
      {
        id: "5.p",
        texto: "Predicciones",
        fn: predicciones({
          p1: ["<input type='number' name='paginas' value='12'> · typeof new FormData(form).get('paginas')", "string", "FormData siempre da textos, aunque el campo sea numérico", "¿número o texto?"],
          p2: ["<input required> vacío · input.validity.valueMissing", true, "required + vacío = valueMissing", "repasa la Constraint Validation API (12.4)"],
          p3: ["¿qué evento hay que escuchar para enviar un formulario (también con Enter)?", "submit", "submit salta se envíe como se envíe (botón o Enter), y es el que se cancela con preventDefault para que no recargue", "no es click: piensa en el formulario, no en el botón"],
        }),
      },
      {
        id: "5.E",
        texto: "👀 Ejemplo: leerFormulario",
        fn: ({ m }) => {
          pagina(`<form><input name="titulo" value="  Momo "><input name="autor" value="Ende"><input name="paginas" value="300"></form>`);
          return igual(m.leerFormulario($("form")), { titulo: "Momo", autor: "Ende", paginas: 300 }) || `leerFormulario da ${muestra(m.leerFormulario($("form")))}`;
        },
      },
      {
        id: "5.1",
        texto: "✍️ validarLibro",
        fn: ({ m }) => {
          const casos = [
            [{ titulo: "Momo", autor: "Ende", paginas: 300 }, []],
            [{ titulo: "", autor: "Ende", paginas: null }, ["titulo"]],
            [{ titulo: "x".repeat(61), autor: "", paginas: 0 }, ["titulo", "autor", "paginas"]],
            [{ titulo: "Momo", autor: "Ende", paginas: 2.5 }, ["paginas"]],
            [{ titulo: "Momo", autor: "Ende", paginas: null }, []],
          ];
          for (const [datos, campos] of casos) {
            const r = Object.keys(m.validarLibro(datos)).sort();
            if (!igual(r, [...campos].sort())) return `validarLibro(${muestra(datos)}) da error en ${muestra(r)} y debería ser en ${muestra(campos)}`;
          }
          return true;
        },
      },
      {
        id: "5.2",
        texto: "✍️ mostrarErrores: mensaje, aria-invalid y foco",
        fn: ({ m }) => {
          pagina(`<form><input name="titulo"><span data-error-de="titulo"></span><input name="autor"><span data-error-de="autor"></span></form>`);
          const f = $("form");
          m.mostrarErrores(f, { autor: "El autor es obligatorio" });
          const [t, a] = f.querySelectorAll("input");
          if ($("[data-error-de=autor]").textContent !== "El autor es obligatorio") return "el mensaje no aparece en [data-error-de='autor']";
          if (a.getAttribute("aria-invalid") !== "true" || t.hasAttribute("aria-invalid")) return "solo el campo con error lleva aria-invalid='true'";
          if (document.activeElement !== a) return "el foco debería ir al primer campo con error";
          m.mostrarErrores(f, {});
          return ($("[data-error-de=autor]").textContent === "" && !a.hasAttribute("aria-invalid")) || "al corregirlo, el mensaje y el aria-invalid deben desaparecer";
        },
      },
      {
        id: "5.3",
        texto: "✍️ conectarAlta: submit, validar y guardar",
        fn: ({ m }) => {
          pagina(`<form><input name="titulo"><span data-error-de="titulo"></span><input name="autor"><span data-error-de="autor"></span><input name="paginas"><span data-error-de="paginas"></span><button>Añadir</button></form>`);
          const f = $("form");
          const guardados = [];
          m.conectarAlta(f, (d) => guardados.push(d));
          let e = new Event("submit", { cancelable: true, bubbles: true });
          f.dispatchEvent(e);
          if (!e.defaultPrevented) return "el formulario se envía de verdad (recarga la página): falta preventDefault()";
          if (guardados.length) return "con el formulario vacío NO debe guardar";
          f.titulo.value = "Momo";
          f.autor.value = "Ende";
          e = new Event("submit", { cancelable: true, bubbles: true });
          f.dispatchEvent(e);
          if (!igual(guardados, [{ titulo: "Momo", autor: "Ende", paginas: null }])) return `guarda ${muestra(guardados)}`;
          return f.titulo.value === "" || "tras guardar, el formulario debería vaciarse (form.reset())";
        },
      },
    ],
  },
  {
    id: "6",
    titulo: "Bloque 6 · Integrador: el catálogo en la página",
    modulos: { m: "src/bloque6/catalogo.js" },
    pruebas: [
      {
        id: "6.1",
        texto: "✍️ pinta el catálogo y el contador",
        fn: ({ m }) => {
          montarCatalogo(m);
          if (document.querySelectorAll(".lista .libro").length !== 2) return "deberían verse las 2 tarjetas";
          return $(".contador").textContent === "2 libros · 0 prestados" || `el contador dice ${muestra($(".contador").textContent)}`;
        },
      },
      {
        id: "6.2",
        texto: "✍️ prestar y devolver con los botones",
        fn: ({ m }) => {
          montarCatalogo(m);
          $(".libro[data-isbn='1'] button").click();
          if (!$(".libro[data-isbn='1']").classList.contains("prestado")) return "al pulsar «Prestar» la tarjeta no pasa a prestada";
          if ($(".contador").textContent !== "2 libros · 1 prestados") return "el contador no se actualiza";
          $(".libro[data-isbn='1'] button").click();
          return !$(".libro[data-isbn='1']").classList.contains("prestado") || "al pulsar «Devolver» no vuelve a disponible (¿funciona el botón tras repintar?)";
        },
      },
      {
        id: "6.3",
        texto: "✍️ dar de alta con el formulario",
        fn: ({ m }) => {
          montarCatalogo(m);
          const f = $("form");
          f.titulo.value = "Dune";
          f.autor.value = "Herbert";
          f.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
          if (document.querySelectorAll(".lista .libro").length !== 3) return "el libro nuevo no aparece en la lista";
          f.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
          return document.querySelectorAll(".lista .libro").length === 3 || "con el formulario vacío se ha añadido otro libro";
        },
      },
      {
        id: "6.4",
        texto: "✍️ buscar mientras se escribe (evento input)",
        fn: ({ m }) => {
          montarCatalogo(m);
          const s = $("input[type=search]");
          s.value = "mo";
          s.dispatchEvent(new Event("input", { bubbles: true }));
          const vis = [...document.querySelectorAll(".lista .libro h3")].map((h) => h.textContent);
          if (!igual(vis, ["Momo"])) return `buscando «mo» se ven ${muestra(vis)}`;
          return $(".contador").textContent === "2 libros · 0 prestados" || "el contador cuenta TODOS los libros, no solo los que se ven";
        },
      },
    ],
  },
];

function montarCatalogo(m) {
  pagina(`<main id="app"><input type="search"><p class="contador"></p>
    <section><ul class="lista"></ul><p class="vacio">No hay libros</p></section>
    <form><input name="titulo"><span data-error-de="titulo"></span><input name="autor"><span data-error-de="autor"></span>
      <input name="paginas"><span data-error-de="paginas"></span><button>Añadir</button></form></main>`);
  m.iniciarCatalogo($("#app"), [
    { isbn: "1", titulo: "Momo", autor: "Ende", prestado: false },
    { isbn: "2", titulo: "El Principito", autor: "Saint-Exupéry", prestado: false },
  ]);
}

// 💡 Para empezar: lo que enseña el comprobador junto al ejercicio que toca hacer.
// Más ayuda, paso a paso (idea → ejemplo parecido → esqueleto), en la web: «🆘 ¿Atascado?» de cada bloque.
export const EMPEZAR = {
  "1.p": "En predicciones.js cambia cada undefined por lo que crees que da. Si dudas, pruébalo en la consola de la página (F12).",
  "1.e1": "querySelectorAll(selector) da una NodeList con todos los que cumplen el selector. ¿Qué propiedad dice cuántos hay?",
  "1.e2": "querySelector da el PRIMERO (o null). El texto, con .textContent. Si es null: ?. para no reventar y ?? null.",
  "1.1": "Como titulos (el ejemplo), pero con un selector que pida las DOS clases a la vez: .libro.prestado h3",
  "1.2": "nodo.children son solo los elementos (childNodes incluye los textos). Pásalo a array con [...] y map a tagName en minúsculas.",
  "1.3": "closest(\"section\") sube por el árbol hasta el primer <section>. Su id, con ?. y ?? null por si no hay ninguno.",
  "2.p": "En predicciones.js cambia cada undefined por lo que crees que da.",
  "2.e1": "classList.toggle(\"destacado\") pone o quita la clase y devuelve true/false: devuelve lo que te dé.",
  "2.1": "Tres cosas: classList.toggle(\"prestado\", prestado) · dataset.estado = … · y el botón (querySelector) con su texto y su dataset.accion.",
  "2.2": "Un objeto con: dataset.isbn, el textContent del h3, Number(dataset.paginas) y classList.contains(\"prestado\").",
  "2.3": "querySelectorAll(\"a[href^='http']\") da solo los externos. A cada uno, setAttribute(\"target\", …) y (\"rel\", …). Devuelve cuántos.",
  "3.p": "En predicciones.js cambia cada undefined por lo que crees que da.",
  "3.1": "Como crearEtiqueta (el ejemplo), pero con cuatro elementos: article, h3, p y button. Cada texto con textContent; al final art.append(h3, p, boton).",
  "3.2": "Nunca innerHTML con lo que escribe el usuario: textContent lo pone como texto y no se ejecuta nada.",
  "3.3": "lista.replaceChildren(...tarjetas) sustituye todo lo que había. Y el aviso: lista.parentElement.querySelector(\".vacio\").hidden = …",
  "3.4": "Cuenta los prestados con filter(...).length y escribe con textContent: `${total} libros · ${prestados} prestados`.",
  "4.p": "En predicciones.js cambia cada undefined por lo que crees que da.",
  "4.e1": "campo.addEventListener(\"keydown\", (e) => { … }). Dentro: si e.key === \"Enter\", alEnter(campo.value).",
  "4.1": "UN addEventListener(\"click\") en la LISTA. Dentro: e.target.closest(\"button[data-accion]\"); si no hay, return; si hay, su acción y el isbn de su tarjeta.",
  "4.2": "Si conectarAcciones usa delegación (un listener en la lista), esto ya funciona solo. Si no, arréglalo allí.",
  "4.3": "En el listener de click: e.preventDefault() para que no navegue, y alPulsar(enlace.getAttribute(\"href\")).",
  "4.4": "elemento.dispatchEvent(new CustomEvent(\"libro:cambio\", { detail: …, bubbles: true })). Sin bubbles, no sube.",
  "5.p": "En predicciones.js cambia cada undefined por lo que crees que da.",
  "5.1": "Un objeto errores = {} y un if por regla: si el título está vacío → errores.titulo = \"…\". Al final, return errores.",
  "5.2": "Recorre form.querySelectorAll(\"[name]\"): a cada campo, su mensaje en [data-error-de=\"…\"] y aria-invalid puesto o quitado. Después, el foco.",
  "5.3": "form.addEventListener(\"submit\", (e) => { e.preventDefault(); … }): leer → validar → mostrar → si no hay errores, alGuardar y reset.",
  "6.1": "Una variable con los libros (el modelo) y una función pintar() que llame a pintarCatalogo y pintarContador. Llámala al final.",
  "6.2": "conectarAcciones(lista, { prestar: (isbn) => …, devolver: (isbn) => … }): cambia ese libro EN EL MODELO y llama a pintar().",
  "6.3": "conectarAlta(form, (datos) => { añade { ...datos, isbn: inventado, prestado: false } al modelo y pintar() }).",
  "6.4": "Una variable filtro. En el evento input del buscador, guárdalo en minúsculas y pintar(). En pintar, la lista con los que incluyen el filtro.",
};
