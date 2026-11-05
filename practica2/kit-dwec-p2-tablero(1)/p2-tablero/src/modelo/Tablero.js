// Tablero.js — Bloque A · ✍️ A3 (el tablero) y A5 (reglas).
// En el bloque C volverás aquí para ✍️ C4 (toJSON y desdeJSON).
// El tablero TIENE tres columnas: es composición, no hereda de nadie.
import { Columna } from "./Columna.js";
import { ColumnaLlenaError, MovimientoNoPermitidoError } from "./errores.js";
import { Tarea } from "./Tarea.js";
import { TareaRecurrente } from "./TareaRecurrente.js";
import { aDatos, desdeDatos } from "./serializar.js";

export class Tablero {
  static COLUMNAS = Object.freeze(["Por hacer", "En curso", "Hecho"]);
  static VERSION_DATOS = 1; // (bloque C) si algún día cambia el formato guardado, se sube
  // Privado: #columnas, un Map nombre → Columna
  #columnas = new Map();

  // ✍️ A3 ──────────────────────────────────────────────────────────────────────
  constructor(limiteEnCurso = 3) {
    // Crea las tres columnas; solo «En curso» lleva límite WIP (limiteEnCurso)

    for (let nombrecolumna of Tablero.COLUMNAS){
      let nuevaColumna = null;

      if(nombrecolumna === "En curso"){
        nuevaColumna = new Columna(nombrecolumna, limiteEnCurso);
      } else {
        nuevaColumna = new Columna(nombrecolumna);
      }
      
      this.#columnas.set(nombrecolumna, nuevaColumna);
    }
  }

  // static desde(datos, limiteEnCurso): un Tablero con una tarea por cada objeto de datos
  //   (usa crearTarea)
  static desde(datos, limiteEnCurso){
    const nuevoTablero = new Tablero(limiteEnCurso);
    //Datos son las tareas 
    for(const tareas of datos){
      nuevoTablero.crearTarea(tareas);
    }
    return nuevoTablero;
  }

  // columna(nombre): la Columna, o un Error si no existe (que el mensaje lleve el nombre)
  // get columnas: array con las tres columnas, en orden
  columna(nombre){
    if(this.#columnas.has(nombre)){
      //Queremos devolver el objeto que está guardado dentro del mapa
      return this.#columnas.get(nombre);
    }else {
      throw new Error("No existe la columna " + nombre);
    }
  }

  get columnas(){
    const ordenado = [];
    for(const nombreTareas of Tablero.COLUMNAS){
      ordenado.push(this.columna(nombreTareas));
    }
    return ordenado;
  }

  // crearTarea(datos): TareaRecurrente si datos trae cadaDias, Tarea si no → a «Por hacer»
  //   y la devuelve. datos es un objeto { titulo, prioridad, limite, cadaDias }: saca cada campo
  //   y pásaselo al constructor, en su orden (new Tarea(datos) NO vale: espera el título)

  crearTarea(datos){
    let tarea = null;
    if(datos.cadaDias){
      tarea = new TareaRecurrente(datos.titulo, datos.prioridad, datos.limite, datos.cadaDias);
    }else{
      tarea = new Tarea(datos.titulo, datos.prioridad, datos.limite);
    }

    this.columna("Por hacer").agregar(tarea);
    return tarea;
  }

  // buscar(id): la tarea, esté en la columna que esté, o null
  // dondeEsta(id): la Columna donde está, o null

  buscar(id){
    for(const columna of this.columnas){
      //Buscar por id o preguntar si contiene 
      if(columna.has(id)){
        return columna.buscar(id);
    }
  }
   return null;
}

  dondeEsta(id){
    for(const columna of this.columnas){
      if(columna.has(id)){
        return columna;
    }
  }
  return null;
}

  // mover(id, destino): Error si no existe la tarea · Error si la columna destino está llena
  //   (¡comprueba ANTES de quitarla de su columna, o se perdería!) · la mueve y la devuelve

  mover(id, destino){
    //Vamos a necesitar this.buscar(id) this.dondeEsta(id) this.columna(destino)
    //Primero paso: Comprobaciones, Error si no existe la tarea this.buscar(id) y this.dondeEsta(id) = null
    // Error si columna destino llena limiteWip
    //Segundo paso: Extraer o eliminar tareas de origen, añadirla a la columna de destino, devolver la tareas con un return 
    const colDestino = this.columna(destino);

    if(!this.buscar(id) || this.dondeEsta(id) === null){
      throw new Error("Error");
    }
    if(colDestino.llena()){
      throw new Error("Error");
    }

    const colOrigen = this.dondeEsta(id);
    const tarea = colOrigen.quitar(id);
    colDestino.agregar(tarea);
    return tarea;
  }

  // completar(id): la mueve a «Hecho» y añade a «Por hacer» lo que devuelva tarea.alCompletar()
  //   ⚠️ Sin preguntar si es recurrente: eso es el polimorfismo
  completar(id){ 
    const tarea = this.mover(id, "Hecho");
    const nuevaTarea = tarea.alCompletar();
        if(nuevaTarea !== null){
          this.columna("Por hacer").agregar(nuevaTarea);
        }
  }
  // resumen(hoy = new Date()): { porHacer, enCurso, hecho, vencidas }
  //   vencidas = las que estaVencida(hoy) y NO están en «Hecho»

  resumen(hoy = new Date()){
   return {
    porHacer:this.columna("Por hacer").tareas, 
    enCurso:this.columna("En curso").tareas, 
    hecho:this.columna("Hecho").tareas, 
    vencidas: todasLasTareas.filter(tarea => tarea.estaVencida(hoy) && this.dondeEsta(tarea.id) !== "Hecho")
  };

  }
  // ✍️ A5 · Reglas (vuelves a mover y completar) ─────────────────────────────────
  //   - Columna llena → ColumnaLlenaError (en vez de un Error cualquiera)
  //   - Sacar una tarea de «Hecho», o «moverla» a la columna en la que ya está →
  //     MovimientoNoPermitidoError. Todo se comprueba ANTES de tocar nada.
  //   Pista: mover y completar hacen casi lo mismo. Un método privado #trasladar(id, destino)
  //   con las comprobaciones evita escribirlas dos veces.

  // ✍️ C4 (bloque C) ────────────────────────────────────────────────────────────
  // toJSON(): { version, limiteEnCurso, columnas: { "Por hacer": [datos…], … } }
  //   JSON.stringify(tablero) lo llama solo. Sin él sale "{}": los # no se ven. Usa aDatos.

  /** Lo contrario de toJSON: el MISMO tablero (columnas, ids y límite WIP). Lanza si no encaja. */
  static desdeJSON(datos) {
    throw new Error("Sin hacer");
  }
}

// Comprueba con:  docker compose run --rm web npm test bloque-a
(void Columna,
  ColumnaLlenaError,
  MovimientoNoPermitidoError,
  Tarea,
  TareaRecurrente,
  aDatos,
  desdeDatos); // (borra esta línea cuando los uses)
