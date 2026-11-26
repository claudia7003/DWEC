// app.js — Bloque B · ✍️ B4, B5 y B6. Conecta el modelo (el tablero) con la página: pinta, escucha y avisa.
// Usa tus piezas: crearTarjeta/pintarLista, leerFormulario/mostrarErrores y delegar.
// La estructura de la página (ids, data-*) está en index.html y NO se cambia: la usan los tests.
import { ErrorTablero } from "../modelo/errores.js";
import { delegar } from "./delegacion.js";
import { leerFormulario, mostrarErrores } from "./formulario.js";
import { pintarLista } from "./tarjeta.js";

/** Botones de cada tarjeta según su columna: [texto, data-accion] */
const ACCIONES = {
  "Por hacer": [["Empezar →", "empezar"]],
  "En curso": [
    ["← Volver", "volver"],
    ["✓ Completar", "completar"],
  ],
  Hecho: [],
};

// ✍️ B6 · validar(datos) → { campo: "mensaje" } con los errores (objeto vacío si todo está bien)
//   - titulo: obligatorio y como mucho 80 caracteres
//   - cadaDias (si viene): entero mayor que 0. Si es correcto pero no hay limite, el error va
//     en «limite»: una tarea que se repite necesita fecha límite
export function validar(datos) {
  const errores = {} 
  //Comprobar el titulo
  if (!datos.titulo.trim() || datos.titulo.length > 80) {
        errores.titulo = "El título es obligatorio y no puede superar los 80 caracteres";    }

    // Comprobar cadaDias
    if (datos.cadaDias !== undefined) {
        if (!Number.isInteger(datos.cadaDias) || datos.cadaDias <= 0) {
            errores.cadaDias = "Debe ser un número entero mayor que 0";
        }
    }

    // Comprobar limite
    if (
        Number.isInteger(datos.cadaDias) &&
        datos.cadaDias > 0 &&
        datos.limite === null
    ) {
        errores.limite = "Una tarea que se repite necesita fecha límite";
    }

    return errores;
}



/**
 * Arranca la interfaz dentro de raiz (el <main id="app">). Los listeners se ponen UNA vez aquí;
 * pintar() solo cambia nodos, así que repintar no los duplica.
 * opciones.hoy: fecha fija para los tests · opciones.alCambiar(tablero): tras cada cambio (UD6)
 */
export function iniciarApp(raiz, tablero, { hoy = null, alCambiar = () => {} } = {}) {
  const form = raiz.querySelector("#form-alta");
  const aviso = raiz.querySelector("#aviso");
  const columnas = raiz.querySelector("#columnas");
  const resumen = raiz.querySelector("#resumen");

  // ✍️ B4 · pintar(): deja la página igual que el modelo cada vez que se llama, y NO pone listeners
  //   - cada columna ([data-columna="…"]): sus tareas en el orden de ordenadas(), con pintarLista en su
  //     .lista, y en cada .tarjeta sus botones según ACCIONES: <button type="button" data-accion="…">
  //   - el .contador de cada columna: (n), o (n/límite) en la que tiene límite WIP
  //   - [data-dato="progreso"]: hechas ÷ total en %, redondeado (con el tablero vacío, 0 %)
  //   - [data-dato="vencidas"]: las vencidas de tablero.resumen(ahora)
  //   La fecha de hoy: const ahora = hoy ?? new Date();  (los tests pasan una fija)
function pintar() {

    // Obtenemos la fecha que utilizaremos
    const ahora = hoy ?? new Date();

    // Recorremos las tres columnas del tablero
    for (const columna of tablero.columnas) {

        // Buscamos la zona HTML correspondiente
        const zona = raiz.querySelector(
            `[data-columna="${columna.nombre}"]`
        );

        // Buscamos la lista y el contador
        const lista = zona.querySelector(".lista");
        const contador = zona.querySelector(".contador");

        // Pintamos las tareas ordenadas
        pintarLista(lista, columna.ordenadas(), ahora);

        // Actualizamos el contador
        const cantidad = columna.tareas.length;

        if (columna.limiteWip === null) {
            contador.textContent = `(${cantidad})`;
        } else {
            contador.textContent = `(${cantidad}/${columna.limiteWip})`;
        }

        // Creamos los botones de cada tarjeta
        const tarjetas = lista.querySelectorAll(".tarjeta");

        for (const tarjeta of tarjetas) {

            for (const [texto, accion] of ACCIONES[columna.nombre]) {

                const boton = document.createElement("button");

                boton.type = "button";
                boton.dataset.accion = accion;
                boton.textContent = texto;

                tarjeta.append(boton);
            }
        }
    }

    // Obtenemos los datos del resumen
    const datos = tablero.resumen(ahora);

    // Calculamos el total de tareas
    const total = datos.porHacer + datos.enCurso + datos.hecho;

    // Calculamos el progreso evitando dividir entre cero
    const progreso = total === 0
        ? 0
        : Math.round(datos.hecho / total * 100);

    // Mostramos el progreso
    raiz.querySelector('[data-dato="progreso"]').textContent = `${progreso} %`;

    // Mostramos las tareas vencidas
    raiz.querySelector('[data-dato="vencidas"]').textContent = datos.vencidas;
}


      // //Busca dentro de raiz el elemento cuyo atributo data-columna tenga el mismo nombre que la columna que 
    // //estoy recorriendo 

    // raiz.querySelector(`[data-columna="${columna.nombre}"]`);

    // //Busca solamente dentro de la columna que hemos encontrado
    // zona.querySelector(".lista");
    // zona.querySelector(".contador");

  //querySelector() busca elementos y textContent cambia el texto que muestran

  // 👀 Resuelto: avisar("texto") enseña el aviso; avisar("") lo esconde
  function avisar(mensaje) {
    aviso.textContent = mensaje;
    aviso.hidden = mensaje === "";
  }
  
function cambiar(hacer) {
    try {
        hacer();
        avisar("");
        pintar();
        alCambiar(tablero);
        return true;

    } catch (error) {
        if (error instanceof ErrorTablero) {
            avisar(error.message);
            return false;
        } else {
            throw error;
        }
    }
}

  // ✍️ B5 · UN listener, puesto UNA vez aquí (nunca dentro de pintar): clic en los botones de las
  //   tarjetas, con delegar sobre `columnas`. empezar → «En curso», volver → «Por hacer», completar.
  //   Tras cada cambio que sale bien: avisar(""), pintar() y alCambiar(tablero).
  //   Si el tablero lanza un ErrorTablero → avisar(error.message) y no se repinta.
  //   Cualquier otro error → se relanza (es un fallo del programa).
  //   Pista: una función cambiar(accion) con el try/catch te sirve también para el B6.

  //Hay que usar delegar() para crear un Listener 
delegar(columnas, "click", "button[data-accion]", (boton, evento) => {
    const accion = boton.dataset.accion;
    const tarjeta = boton.closest(".tarjeta");
    const id = Number(tarjeta.dataset.id);

    cambiar(() => {
        switch (accion) {
            case "empezar":
                tablero.mover(id, "En curso");
                break;

            case "volver":
                tablero.mover(id, "Por hacer");
                break;

            case "completar":
                tablero.completar(id);
                break;
        }
    });
});

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const datos = leerFormulario(form);

    const errores = validar(datos);

    mostrarErrores(form, errores);

    if (Object.keys(errores).length > 0) {
        return;
    }

    const resultado = cambiar(() => tablero.crearTarea(datos));

    if (resultado) {
        form.reset();
    }
});

    // delegar(contenedor, tipo, selector, manejador)


  // ✍️ B6 · submit de `form`: preventDefault, leerFormulario, validar y mostrarErrores. Si hay errores,
  //   no se crea nada. Si no, tablero.crearTarea(datos) (como un cambio más) y form.reset().

  pintar();
  return {pintar};

  

}

    const crear = (etiqueta, datos) => Object.assign(document.createElement(etiqueta), datos);

    function crearFormulario(tarea) {

        const form = crear("form", { noValidate: true });
    
        form.dataset.form = "urgencia";

        const etiqueta = crear("label", {

            textContent: `Urgencia (1 baja, 2 media, 3 alta) de «${tarea.titulo}»`,
        });

        etiqueta.append(crear("input", { name: "urgencia", type: "number", value: tarea.peso + 1 }));
    
        const error = crear("p", { className: "error" });

        error.dataset.errorDe = "urgencia";

        const enviar = crear("button", { type: "submit", textContent: "Guardar" });

        form.append(etiqueta, error, enviar, crearBoton("Cancelar", "cancelar"));

        return form;

    }

// (borra esta línea cuando los uses)
