
import { Tarea } from "./Tarea.js";
//import { PresupuestoSuperadoError } from "./errores.js";

export class TareaConGastos extends Tarea {
  #presupuesto;
  #gastos = []; 

  constructor(titulo, prioridad, limite, presupuesto){
    super(titulo, prioridad, limite);
    this.titulo = titulo;
    this.prioridad = prioridad;
    //Devuelve presupuesto si es entero o mayor de 1
    if (!Number.isInteger(presupuesto) || presupuesto < 1){
        throw new RangeError("Debe ser entero o mayor de 1")
    }
    this.#presupuesto = presupuesto;
  }

  get presupuesto(){
    return this.#presupuesto;
  }

  get gastos(){
    //Devuelve un array de enteros privado {concep, importe} está vacio al crearse 
    //Presupuesto de puede leer pero no cambiar 
    return this.#gastos.map((g) => ([...g]));
  }

  gastar(concepto, importe){
    //Comprobamos que importe es entero o mayor que 1 
    if(!Number.isInteger(importe) || importe < 1){
        throw new RangeError("El importe debe ser un entero o más de 1")
    }
    //
    if (this.#gastos.some((g) => g.concepto === concepto)) {
        throw new RangeError(`Ya hay un gasto con el concepto ${concepto}`);
    }
    //Aqui con el .push añadimos concepto, importe en ese orden ya que es lo que pide
        this.#gastos.push({ concepto, importe });
    }

    comprobarPaso(desde, hasta) {
        const gastado = this.#gastos.reduce((suma, g) => suma + g.importe, 0);
            if (hasta === "Hecho" && gastado > this.#presupuesto)
                throw new PresupuestoSuperadoError(gastado, this.#presupuesto);
            }

  }


