export const descuentoEstado = {
    "nuevo-precintado": 0.25,
    "usado-como-nuevo": 0.00,
    "usado-caja-danada": -0.15,
    "solo-cartucho": -0.30 // Corregido a minúsculas
};

export const obtenerDescuentoVolumen = function (unidades) {
    if (unidades >= 4) return 0.10;
    if (unidades === 2 || unidades === 3) return 0.05; // Corregido con ||
    return 0.00;
};

export function UmbralBajo(productos) {
    return productos.map((producto) => { //Creamos un nuevo array con el .map 
        const aviso = producto.stock < 3 ? "⚠️ Stock bajo" : " "; //Comprueba si el stock del producto el menor a 3
        return aviso;S  //i la condición anterior es verdadera de devuelve el aviso
    });
}

//Agrega un tramo 10 unidades o más nuevo con un 20% de descuento sin romper lo que tengo, mostrar en el main

export const nuevoTramo = function (unidades){
    if (unidades >= 10) return 0.20;
    
}
console.log(nuevoTramo);