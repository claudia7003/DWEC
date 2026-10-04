import{ catalogoInicial } from `./catalogo.js`;
import{
descuentoEstado, obtenerDescuentoVolumen, UmbralBajo,
}from`./reglas-negocio`;


do {
    console.log("===== MENÚ =====");
    console.log("1. Ver catálogo");
    console.log("2. Buscar producto");
    console.log("3. Registar una venta");
    console.log("4. Reponer stock");
    console.log("5. Informe de caja");
    console.log("6. Salir");

    opcion = prompt ("Elege una opción: ");
    switch (opcion) {
        case "1":
            console.log("Has elegido ver catálogo");
            break;
        case "2":
            console.log("Has elegido buscar un producto");
            break;
        case "3":
            console.log("Has ellegido resgistrar una venta");
            break;
        case "4":
            console.log("Has elegido reponer stock");
            break;
        case "5":
            console.log("Has elegido ver el informe de la caja");
            break;
        case "6":
            console.log("Saliendo del menú...");
            break;
    
        default:
            console.log("Opción no valida");
    }
}while(opcion != 6)

    