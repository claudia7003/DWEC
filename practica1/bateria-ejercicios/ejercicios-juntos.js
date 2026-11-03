//Escribir una función que valide el acceso. 

function validarAcceso(edad, tieneEntrada){
    if (edad > 12) return "Acceso gratuito";
    if (edad > 12 && edad < 17 && tieneEntrada === true) return "Acceso con descuento";
    if (edad >= 18 && tieneEntrada=== true) return "Acceso normal";
    return "Acceso denegado";
}

//Usando el operador ternario, crea mensaje que valga 
// "Mayor de edad" si edad >= 18, o "Menor de edad" en 
// caso contrario, para edad = 16.

let edad = 16;
let mensaje = (edad >= 18) ? "Mayor de edad" :  "menor de edad";
console.log(mensaje);

//Ahora, con un ternario anidado, crea categoria que valga 
// "Bebé" si edad < 2, "Niño" si edad < 12, "Adolescente" 
// si edad < 18, o "Adulto" en cualquier otro caso. Pruébalo con edad = 8.

let edad2 = 8;
let categoria = (edad < 2) ? "bebé"
                : (edad < 12) ? "Niño"
                : (edad < 18) ? "Adolescente"
                : "Adulto";

//Usa || para crear stockMostrado que muestre producto.stock, o "Sin datos" 
// si no hubiera stock definido. Ejecútalo y observa qué sale.
//Ahora repite el mismo cálculo pero con ?? en vez de ||, llámalo stockCorrecto.
//Explica en un comentario por qué los dos resultados son distintos.
//Usa && para que solo se ejecute console.log("¡Aplica el descuento!") cuando producto.descuento sea true.

const producto = {
  nombre: "Auriculares",
  stock: 0,
  descuento: false
};
// Falsy es 0, devuelve "Sin datos" porque stock es producto.stock
const stockMostrado = producto.stock || "sin datos"; //Sin datos
console.log(stockMostrado);
// ?? Evalúa el lado derecho unicamente si el lado izquierdo es null o undefined 
const stockCorrecto = producto.stock ?? "sin datos"; // 0
console.log(stockCorrecto);

//Escribe una función ciudadDelPedido(pedido) que devuelva la ciudad del cliente, o "Ciudad no especificada" si en algún 
// punto de la cadena (cliente, direccion o ciudad) no existiera. Pruébala con los tres pedidos del array.

const pedidos = [
  { id: 1, cliente: { nombre: "Marta", direccion: { ciudad: "Cádiz" } } },
  { id: 2, cliente: { nombre: "Luis" } }, // sin dirección
  { id: 3, cliente: null }
];

function cuidadDelPedido(pedido){
    return pedido.cliente?.direccion?.ciudad ?? "Ciudad no especificada"
}
console.log(cuidadDelPedido(pedidos[0])); //Cádiz
console.log(cuidadDelPedido(pedidos[1])); // Cuidad no especificada
console.log(cuidadDelPedido(pedidos[2])); // Cuidad no especificada

//Escribe una función diaDeLaSemana(numero) que, usando switch, devuelva:

function diaDeLaSemana(numero) {
    switch(numero){
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            return "Día laboral";
        case 6:
        case 7:
            return "Fin de Semana";

        default : "Número no válido";
        
    }
}

//Escribe un while que simule intentos de login: parte de intentos = 0 y, 
// mientras intentos < 3, imprime `Intento ${intentos + 1} de 3` e incrementa intentos.

let intentos = 0;
while (intentos < 3){
    console.log(`Intento ${intentos + 1} de 3` )
    intentos ++;
}
// Creo una variable que simula si la contraseña es correcta, con true decimos directamente que la contraseña es correcta. 
const contraseñaCorrecta = true;
//Creamos una variable para guardar el resultado de la comprobación
let contraseñaComprobada;
do {
    console.log("Comprobando contraseña...");
    contraseñaComprobada = contraseñaCorrecta;
}while (!contraseñaComprobada0);

//Usa un for clásico (con índice) para sumar solo los valores que están en una 
// posición par del array (índices 0, 2, 4, 6...). Guarda el resultado en sumaPosicionesPares.

const numeros = [5, 12, 8, 3, 20, 7, 14, 1];
let sumaPosicionPares = 0;

for (let i = 0; i < numeros.length; i +=2){
    sumaPosicionPares += numeros[i];
}
console.log(sumaPosicionPares);

//Este código tiene un bug. Ejecútalo, observa la salida "rara", y explica en un 
// comentario qué está pasando y cómo lo arreglarías:

const carrito = ["Camiseta", "Pantalón", "Zapatos"];
carrito.descuentoAplicado = true; // propiedad añadida al array

for (const item in carrito) { //Hay que cambiar in por of para poder observar Camiseta, pantalon, zapatos
  console.log(item);
}

//Antes de ejecutar, predice qué imprime cada console.log:
const equipoA = ["Ana", "Bea"]; 
const equipoB = equipoA;
const equipoC = [...equipoA]; //Esto crea un nuevo array con los elementos de equipoA y añade Diana 

equipoB.push("Carla"); //Al equipoB que ya estaba igualado a equipoA, añadimos Carla
equipoC.push("Diana"); //El equipoC ya estaba igualado al equipoA, solo añadimos Diana.

console.log(equipoA);
console.log(equipoB);
console.log(equipoC);

//Ejecuta el código y anota qué sale realmente en las dos líneas.
//Corrígelo para que precioMasBarato sea de verdad el precio más bajo, sin mutar el array precios original.

const precios = [100, 25, 9, 400, 3];
const precioMasBarato = [...precios].sort((a, b) => a - b); //Para ordenarlos
console.log(precioMasBarato);
console.log(precios); // ¿sigue siendo el array original?
// En las dos primeras lineas sale 100 y [100, 25, 3, 400, 9]


//Usa map() para crear un nuevo array alumnosConLetra de objetos { nombre, letra }, donde letra sea "A" si la nota es ≥ 9, 
// "B" si es ≥ 7, o "C" en cualquier otro caso. 
// Comprueba al final que alumnos no ha cambiado.

const alumnos = [
  { nombre: "Marta", notaSobre10: 7 },
  { nombre: "Iván", notaSobre10: 5.5 },
  { nombre: "Nora", notaSobre10: 9 }
];

const alumnosConLetra = alumnos.map(alumno => ({
  nombre: alumno.nombre,
  letra: alumno.notaSobre10 >= 9
    ? "A"
    : alumno.notaSobre10 >= 7
      ? "B"
      : "C"
}));
console.log(alumnosConLetra);
console.log(alumnos);

//Usando el mismo array alumnos del ejercicio 12, crea aprobados, un array que contenga solo los alumnos con notaSobre10 >= 5.


const alumnos2 = [
  { nombre: "Marta", notaSobre10: 7 },
  { nombre: "Iván", notaSobre10: 5.5 },
  { nombre: "Nora", notaSobre10: 9 }
];

const aprobados = alumnos2.filter((notas) => notas.notaSobre10 >=5
);
console.log(aprobados);

//Usa reduce() para calcular totalGastado, la suma de precio * cantidad de todas las líneas.
//Extra: usa reduce() para crear resumen, un objeto { producto: cantidad } con la cantidad comprada de cada producto 
// (pista: mira el ejemplo de "agrupar por departamento" en tus apuntes).

const compras = [
  { producto: "Libro", precio: 15, cantidad: 2 },
  { producto: "Cuaderno", precio: 3, cantidad: 5 },
  { producto: "Bolígrafo", precio: 1, cantidad: 10 }
];

const totalGastos = compras.reduce((acc, compra) => {
    return acc + compra.precio * compra.cantidad;
}, 0);


const resumen = compras.reduce((acc, compra) => {
    const productos = compra.producto;
    if(!acc[producto]){
        acc[producto] = 0;
    }
    acc[producto] += compra.cantidad;
    return acc;
}, {});
console.log(resumen);
console.log(totalGastos);