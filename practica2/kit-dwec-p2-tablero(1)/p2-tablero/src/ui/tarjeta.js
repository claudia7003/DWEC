// tarjeta.js — Bloque B · 👀 EJEMPLO RESUELTO (crearTarjeta) y ✍️ B1 (pintarLista).
import { formatear } from "../modelo/fechas.js";

/** Tarea → <article class="tarjeta tarjeta--alta" data-id="3"> con su título y su límite */
export function crearTarjeta(tarea, hoy = new Date()) {
  const tarjeta = document.createElement("article");
  tarjeta.classList.add("tarjeta", `tarjeta--${tarea.prioridad}`);
  tarjeta.classList.toggle("tarjeta--vencida", tarea.estaVencida(hoy));
  tarjeta.dataset.id = tarea.id; // en el HTML: data-id="3" (siempre texto)
  
  //Boton nuevo en tarjeta con fecha limite
  if (tarea.estado === 'Por hacer' && tarea.limite) {

    tarjeta.append(crearBoton('Cambiar urgencia y empezar', 'urgencia'));

  }

  const titulo = document.createElement("h3");
  titulo.textContent = tarea.titulo; // textContent, NUNCA innerHTML con lo que escribe el usuario
  tarjeta.append(titulo);

  if (tarea.limite) {
    const limite = document.createElement("p");
    limite.className = "tarjeta__limite";
    limite.textContent = `Límite: ${formatear(tarea.limite)}`;
    tarjeta.append(limite);
  }
  return tarjeta;
}

// ✍️ B1 · pintarLista(contenedor, tareas, hoy = new Date())
//   - Vacía el contenedor y pone una tarjeta por tarea (usa crearTarjeta), en el mismo orden.
//   - Pintar dos veces NO puede duplicar: primero vacía. Pista: contenedor.replaceChildren(...)
//   - Sin tareas: deja SOLO un <p class="vacia">Sin tareas</p>
export function pintarLista(contenedor, tareas, hoy = new Date()) {
  //Comprobar si hay tareas o si el array está vacio 
  //Si hay tareas crear una tarjeta por cada una usando la funcion crearTarjeta(tarea, hoy)
  //Si NO hay tareas mostrar mensaje <p class="vacia">Si tareas</p>
  contenedor.replaceChildren();
  
  const elementos = [];
  if (tareas.length === 0){
    const error = document.createElement("p");
    error.className = "vacia";
    error.textContent = "Sin tareas";
    elementos.push(error);

  }else{
      tareas.forEach(tarea => {
        elementos.push(crearTarjeta(tarea, hoy));
      });
    }
  
   return contenedor.replaceChildren(...elementos);

   
}
