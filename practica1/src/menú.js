import{ catalogoInicial } from `./catalogo.js`;
import{
descuentoEstado, obtenerDescuentoVolumen, UmbralBajo,
}from`./reglas-negocio`;


import { categorias as categoriasIniciales } from './categorias.js';
import { descuentoEstado, obtenerDescuentoVolumen } from './reglas-negocio.js';

let misProductos = [...categoriasIniciales];

const unidadesVendidas = {};

let opcion;

do {
    console.log("\n===== MENÚ RETROSTOCK =====");
    console.log("1. Ver catálogo");
    console.log("2. Buscar producto");
    console.log("3. Registrar una venta");
    console.log("4. Reponer stock");
    console.log("5. Informe de caja");
    console.log("6. Salir");

    
    opcion = "6"; // Ponemos "6" por defecto para que no se quede en bucle infinito en la prueba inicial.

    switch (opcion) {
        case "1":
            console.log("==== VER CATÁLOGO ====");
            console.log(" 1.1 Todo el catálogo");
            console.log(" 1.2 Filtrar por categoría");
            console.log(" 1.3 Solo productos con stock bajo");
            
            let opcionCatalogo = "1.1"; 

            switch (opcionCatalogo) {
                case "1.1":
                    let catalogoCompleto = misProductos.map(prod => {
                        let estadoStock = prod["unidades-dispon"] < 3 ? "⚠️ Stock bajo" : "";
                        return `${prod.id} - ${prod.titulo} (${prod.plataforma}) - ${prod.categoria} - ${prod["precio-base"]}€ - Stock: ${prod["unidades-dispon"]} ${estadoStock}`;
                    });
                    console.log(catalogoCompleto);
                    break;

                case "1.2":
                    let categoriaBuscada = "RPG"; // Ejemplo de categoría
                    let productosCategoria = misProductos.filter(prod => prod.categoria === categoriaBuscada);
                    
                    if (productosCategoria.length > 0) {
                        console.log(productosCategoria);
                    } else {
                        console.log("No se encuentran productos de esa categoría.");
                    }
                    break;

                case "1.3":
                    let stockBajo = misProductos.filter(prod => prod["unidades-dispon"] < 3);
                    if (stockBajo.length > 0) {
                        console.log("Productos con stock bajo:", stockBajo);
                    } else {
                        console.log("No hay productos con stock bajo.");
                    }
                    break;

                default:
                    console.log("Opción de catálogo no válida");
            }
            break;

        case "2":
            console.log("=== BUSCAR PRODUCTO ===");
            let tipoBusqueda = "2.1"; // 2.1 por ID, 2.2 por título

            switch (tipoBusqueda) {
                case "2.1":
                    let idBuscado = 2;
                    let productoPorId = misProductos.find(prod => prod.id === idBuscado);
                    
                    if (productoPorId) {
                        console.log("¡Producto encontrado!", productoPorId);
                    } else {
                        console.log("No existe ningún producto con ese ID.");
                    }
                    break;

                case "2.2":
                    let tituloBuscado = "Zelda";
                    let productoPorTitulo = misProductos.find(prod => prod.titulo.toLowerCase().includes(tituloBuscado.toLowerCase()));
                    
                    if (productoPorTitulo) {
                        console.log("¡Producto encontrado!", productoPorTitulo);
                    } else {
                        console.log("No existe ningún producto con ese título.");
                    }
                    break;

                default:
                    console.log("Selecciona una opción de búsqueda válida.");
            }
            break;

        case "3":
            console.log("==== REGISTRAR VENTA ====");
            let idVenta = 2;
            let cantidadVenta = 3;

            let productoVenta = misProductos.find(prod => prod.id === idVenta);

            if (!productoVenta) {
                console.log("El producto no existe.");
            } else if (cantidadVenta <= 0) {
                console.log("La cantidad debe ser mayor a 0.");
            } else if (cantidadVenta > productoVenta["unidades-dispon"]) {
                console.log("No hay stock suficiente para esta venta.");
            } else {
                // Aplicar reglas de negocio (Tabla A y Tabla B)
                let ajusteEstado = descuentoEstado[productoVenta["estado-conservacion"]] ?? 0;
                let precioBase = productoVenta["precio-base"];
                let precioConEstado = precioBase * (1 + ajusteEstado);

                let descuentoVolumen = obtenerDescuentoVolumen(cantidadVenta);
                let precioUnitarioFinal = precioConEstado * (1 - descuentoVolumen);
                let totalVenta = precioUnitarioFinal * cantidadVenta;

                console.log(`Precio unitario final: ${precioUnitarioFinal.toFixed(2)} €`);
                console.log(`Total de la venta: ${totalVenta.toFixed(2)} €`);

                
                misProductos = misProductos.map(prod => {
                    if (prod.id === idVenta) {
                        return { ...prod, "unidades-dispon": prod["unidades-dispon"] - cantidadVenta };
                    }
                    return prod;
                });

                
                unidadesVendidas[idVenta] = (unidadesVendidas[idVenta] || 0) + cantidadVenta;
            }
            break;

        case "4":
            console.log("==== REPONER STOCK ====");
            let idRepuesta = 2;
            let cantidadRepuesta = 5;

            misProductos = misProductos.map(prod => {
                if (prod.id === idRepuesta) {
                    return { ...prod, "unidades-dispon": prod["unidades-dispon"] + cantidadRepuesta };
                }
                return prod;
            });
            console.log("Stock reponido correctamente.");
            break;

        case "5":
            console.log("===== INFORME DE CAJA =====");
            
            // Producto más vendido
            let productoMasVendido = misProductos.reduce((masVendido, producto) => {
                let ventasActuales = unidadesVendidas[producto.id] || 0;
                let ventasMaximas = unidadesVendidas[masVendido.id] || 0;
                return ventasActuales > ventasMaximas ? producto : masVendido;
            }, misProductos[0]);

            let cantidadMasVendida = unidadesVendidas[productoMasVendido.id] || 0;
            if (cantidadMasVendida > 0) {
                console.log(`Producto más vendido: ${productoMasVendido.titulo} (${cantidadMasVendida} unidades)`);
            } else {
                console.log("No se ha vendido ningún producto todavía.");
            }

            // Valor total del stock restante
            let valorStock = misProductos.reduce((total, producto) => {
                let precioAjustado = producto["precio-base"] * (1 + (descuentoEstado[producto["estado-conservacion"]] ?? 0));
                return total + (precioAjustado * producto["unidades-dispon"]);
            }, 0);
            console.log(`Valor total del stock restante: ${valorStock.toFixed(2)} €`);

            //AQUI HAY QUE COMPROBAR SI HAY STOCK BAJO
            
            break;

        case "6":
            console.log("=== RESUMEN FINAL =====");
            let totalUnidadesVendidas = Object.values(unidadesVendidas).reduce(
                (total, cantidad) => total + cantidad,
                0
            );
            console.log(`Total de unidades vendidas en la sesión: ${totalUnidadesVendidas}`);
            console.log("Saliendo de la aplicación... ¡Gracias por usar RetroStock!");
            break;

        default:
            console.log("Opción no válida, por favor elige entre 1 y 6.");
    }
} while (opcion !== "6");