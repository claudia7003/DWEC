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

    let opcion;
    switch (opcion) {
        case "1":
            console.log("====VER CATÁLOGO====");
            console.log(" 1.1 Todo el catálogo");
            console.log(" 1.2 Filtrar por categoria");
            console.log(" 1.3 Solo productos con stock");
            let opcionCatalogo;

                switch(opcionCatalogo){
                    case "1.1":
                        let catalogoCompleto = productos.map(producto => {
                            return '${producto.id} - {$producto.titulo} - ${producto.categoria} - ${producto.precio} - Stock= {producto.stock}';
                        });
                        console.log(catalogoCompleto);
                        break;
                    case "1.2":
                        let categoria;
                        let productosCategoria = prodcutos.filter(producto =>
                            producto.categoria
                        );
                        if (productosCategoria.length > 0){
                            console.log(productosCategoria);
                        }else {
                            console.log("No se encuentra producto de esa categoria");
                        }
                        break;
                    case "1.3":
                        let stockBajo = prodcutos.filter(prodcutos =>
                            prodcutos.stock
                        )
                        if (stockBajo.length > 0){
                            console.log("Productos con stock bajo:");
                            console.log(stockBajo);
                        }else {
                            console.log("No se encuentra producto con stock bajo");
                        }
                        break;
                default:
                    console.log("Opcion no válida");
                }

            break;
        case "2":
            console.log("=== BUSCAR PRODUCTO ===");
            console.log("2.1 Buscar por ID");
            console.log("2.2 Buscar por titulo");

            let tipoBusqueda;

                switch (tipoBusqueda) {
                    case "2.1":
                        let idBuscado;
                        let productoPorId = producto.find(producto => 
                            producto.id == idBuscado
                        );
                        if (productoPorId){
                            console.log("Producto encontrado");
                            console.log(productoPorId);
                        }else {
                            console.log("No existe ningun producto con ese OD");
                        }
                        break;
                    case "2.2":
                        let tituloBuscado;
                        let productoPorTitulo = producto.find(producto =>
                            producto.titulo.includes(tituloBuscado)
                        );
                        if(productoPorTitulo){
                            console.log("Producto encontrado:");
                            console.log(productoPorTitulo);
                        }else {
                            console.log("No existe  ningun producto con ese titulo")
                        }
                        break;
                
                    default:
                        console.log("Selecciona una opcion valida");
                }
            break;
        //SIN TERMINAR
        case "3":
            console.log("==== REGISTRAR VENTA ====");
            let idVenta;
            let productoVenta = productos.find(producto => 
                producto.id == idVenta
            );
            if(!productoVenta){
                console.log("No existe");
            }else {
                let cantidadVenta;
                if (cantidadVenta <= 0){
                    console.log("Debe ser mayor a 0");
                }else if (cantidadVenta > productoVenta.stock){
                    console.log("No hay stock suficiente");
                }else {

                }
            }
            break;
        //SIN TERMINAR
        case "4":
            console.log("==== REPONER STOCK ====");
            

            break;
        
        case "5":
            console.log("===== INFORME DE CAJA =====");
            let productoMasVendido = productos.reduce((masVendido, producto) => {
                let ventasActuales = unidadesVendidas[producto.id] || 0;
                let ventasMaximas = unidadesVendidas[masVendido.id] || 0;
                //Si no hay ventas me da 0
                if(ventasActuales > ventasMaximas){
                    return producto;
                }else{
                    return masVendido;
                }
            }, productos[0]);
            if(productoMasVendido){
                let cantidadMasVendida = unidadesVendidas[productoMasVendido.id] || 0;

                if(cantidadMasVendida > 0){
                    console.log("Producto mas vendido: ${productoMasVendido.titulo} (${cantidadMasVendida}")
                }
            }else {
                console.log("No se ha vendido ningun producto");
            }

            let valorStock = productos.reduce((total, producto) => {
                return total + (producto.precio * producto.stock);
            })
            let productosBajoStock = productos.filter(productos =>
                producto.stock <= 5
            );
            if(productosBajoStock.length > 0){
                console.log("Hay productos con stock bajo")
            }else{
                console.log("No hay productos con stock bajo")
            }
            break;
        case "6":
            console.log("=== RESUMEN ===");
            let totalUnidadesVendidas = unidadesVendidas.reduce(
                (total, cantidad) => total + cantidad,
                0
            );

            console.log('Unidades vendidas ${totalUnidadesVendidas}');
            console.log("Saliendo de la aplicacion....");
            break;
    
        default:
            console.log("Opción no valida");
    }
}while(opcion != 6)

    