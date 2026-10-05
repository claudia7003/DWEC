# 🎮 RetroStock

Aplicación desarrollada en JavaScript para gestionar el inventario y las ventas de una tienda de videojuegos retro. El proyecto ha sido creado con Vite y desplegado utilizando Docker. 

## 🚀 Ejecución del Proyecto

### Construir la imagen Docker


### Ejecutar el contenedor

```bash
docker run -p 5173:5173 retrostock
```

### Acceder a la aplicación

```text
http://localhost:5173
```

## 📦 Modelo de Datos

Cada producto se representa mediante un objeto con la siguiente estructura:

```javascript
{
  id: Number,
  titulo: String,
  plataforma: String,
  categoria: String,
  precio_base: Number,
  estado_conservacion: String,
  unidades_dispon: Number
}
```

### Estados posibles

```text
nuevo-precintado
usado-como-nuevo
usado-caja-danada
solo-cartucho
```

El catálogo inicial contiene productos de diferentes plataformas, categorías y estados de conservación. Además, todas las modificaciones del inventario se realizan de forma inmutable, generando nuevos arrays en lugar de modificar el original. 

## 💰 Reglas de Negocio

### Ajuste por estado del producto

| Estado | Ajuste |
|---------|---------|
| nuevo-precintado | +25% |
| usado-como-nuevo | 0% |
| usado-caja-danada | -15% |
| solo-cartucho | -30% |

### Descuento por volumen

| Unidades vendidas | Descuento |
|------------------|------------|
| 1 | 0% |
| 2-3 | 5% |
| 4 o más | 10% |

### Stock bajo

Si después de una venta un producto tiene menos de 3 unidades disponibles, aparecerá marcado como:

```text
⚠️ Stock bajo
```



## 🔄 Flujo de la Aplicación y Menú

La aplicación funciona mediante un menú interactivo implementado con un bucle y una estructura `switch`. 

### Opciones disponibles

1. **Ver catálogo**
   - Mostrar todos los productos.
   - Filtrar por categoría.
   - Mostrar únicamente productos con stock bajo.

2. **Buscar producto**
   - Búsqueda por ID.
   - Búsqueda por título.

3. **Registrar una venta**
   - Selección de producto.
   - Validación de stock.
   - Aplicación automática de descuentos.
   - Actualización del inventario.

4. **Reponer stock**
   - Incremento de unidades disponibles.
   - Actualización del inventario sin modificar el original.

5. **Informe de caja**
   - Total facturado.
   - Producto más vendido.
   - Valor total del stock restante.

6. **Salir**
   - Finaliza la aplicación y muestra un resumen de la sesión. 【1-1e63e4】

