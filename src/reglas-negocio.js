export const descuentoEstado = {
    "nuevo-precintado": 0.25,
    "usado-como-nuevo": 0.00,
    "usado-caja-danada": -0.15,
    "Solo-cartucho": -0.30

};

export const obtenerDescuentoVolumen = function (unidades){
    if (unidades >= 4) return 0.10;
    if (unidades == 2 && unidades == 3) return 0.05;
    return 0.00;
};

export function UmbralBajo (productos){
    return productos.map((producto) => {
        const aviso = producto.stock < 3 ? "⚠️ Stock bajo" : " ";
    });
}