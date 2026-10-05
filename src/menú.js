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
                        
                
                    default:
                        break;
                }
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

    