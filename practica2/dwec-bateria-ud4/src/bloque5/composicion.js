// Bloque 5 · Composición, Map, Date, Intl y errores propios
// Explicación: web → 4.1 Batería → Bloque 5 (y los apartados 9 y 10 de la UD4).
// Comprueba con:  ./bateria.sh comprobar 5

import { isRunnableDevEnvironment } from "vite";

// 👀 EJEMPLO RESUELTO: un error propio ────────────────────────────────────────
// Heredar de Error permite distinguir «un préstamo no permitido» (se le explica al usuario) de un fallo del programa.
export class PrestamoError extends Error {
  constructor(mensaje, isbn) {
    super(mensaje);
    this.name = this.constructor.name; // "PrestamoError"
    this.isbn = isbn;
  }
}

// 🪜 ESCALERA ──────────────────────────────────────────────────────────────────
// 🪜 1 · La fecha con formato español: formatoFecha(new Date(2026, 10, 3)) → "03/11/2026"
//        (pista: Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" }))
export function formatoFecha(fecha) {
  return new Intl.DateTimeFormat("es-ES", {day: "2-digit" , month: "2-digit", year: "numeric"}).format(fecha);
}

// ✍️ TU TURNO ─────────────────────────────────────────────────────────────────
// ✍️ 1 · La fecha de devolución: `dias` días después de `desde`, a la MISMA hora.
//        - No cambies `desde` (trabaja sobre una copia).
//        - Suma días con setDate, no milisegundos: el 25/10 cambia la hora y ese día dura 25 h.
export function fechaDevolucion(desde, dias) {
  const fecha = new Date(desde);
  fecha.setDate(desde.getDate() + dias);
  return fecha;
}

// ✍️ 2 · Un Socio TIENE préstamos (composición): guárdalos en un Map PRIVADO isbn → fecha de devolución.
//   - constructor(nombre, maximo = 3)
//   - get numPrestamos → cuántos tiene
//   - prestar(isbn, hoy, dias = 14): lanza PrestamoError si ya tiene ese isbn o si ya está en el máximo
//   - devolver(isbn): lanza PrestamoError si no lo tiene
// ✍️ 3 · Y en la misma clase:
//   - vencidos(hoy) → los isbn cuya fecha de devolución es ANTERIOR al día de hoy. Cuenta por días: lo que vence
//     hoy aún no está vencido, sea la hora que sea.
export class Socio {
  #prestamos = new Map();

  constructor(nombre, maximo = 3) {
    this.nombre = nombre;
    this.maximo = maximo;  
  }
  get numPrestamos(){
    return this.#prestamos.size;
  }

  prestar(isbn, hoy, dias = 14){
    if (this.#prestamos.has(isbn)) throw new PrestamoError(`${this.nombre} ya tiene ${isbn}`, isbn);
    if (this.#prestamos.size >= this.maximo) throw new PrestamoError(`${this.nombre} no puede tener más`, isbn);
    this.#prestamos.set(isbn, fechaDevolucion(hoy, dias));
  } 

  devolver(isbn){
    if(!this.#prestamos.delete(isbn)) throw new PrestamoError(`${this.nombre} no tiene ${isbn}`, isbn);

  }

  vencidos(hoy){
    const dias = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    return [...this.#prestamos].filter(([, fecha]) => fecha < dias).map(([isbn]) => this.isbn);
  }
}
