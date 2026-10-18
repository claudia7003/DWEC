# 🐞 Bloque D · Mi informe de depuración

Rellena una ficha por bug. Sustituye cada `____` por lo que hayas visto TÚ en las DevTools.
Ejemplo de cómo se escribe una variable vista en el panel «Ámbito» (Scope): `i = 1`, `texto = "3"`.

## 👀 Ejemplo (ya resuelto) · Total del ticket

- **Síntoma:** sale 85 € y debería salir 105 €.
- **Breakpoint en:** `caja.js:17` (la línea `const linea = lineas[i];`)
- **Lo que vi:** en la primera parada `i = 1` y `linea` es el Zelda: el Tetris (posición 0) no se suma nunca.
- **Por qué falla:** el bucle empieza en 1 y los arrays empiezan en 0.
- **Arreglo:** `for (let i = 0; ...)`.

## Bug 1 · Añadir unidades

- **Síntoma:** Cuando añadir algo (ya sea una palabra o un numero) no se suma, se añade.
- **Breakpoint en:** `const nuevas`
- **Lo que vi:** Deberia salir las unidades sumadas y no añadidas
- **Por qué falla:** Porque texto usuario lo capta como un string 
- **Arreglo:** `Number(textoDelUsuario)`

## Bug 2 · Stock de cada producto

- **Síntoma:** Sonic tiene stock 0, deberia salir 0. 
- **Breakpoint en:** `const stock = producto.stock || "sin datos";`
- **Lo que vi:** Vi que cuando pulsammos ver stock, Sonic sale sin datos
- **Por qué falla:** No es || sino ?? ya que este nos asegura que si es null o undefined utiliza sin datos
- **Arreglo:** `const stock = producto.stock ?? "sin datos";`

## Bug 3 · Ordenar por precio

- **Síntoma:** No los ordena 
- **Breakpoint en:** `const ordenados = productos.sort((a, b) => a.precio - b.precio);`
- **Lo que vi:** Vi que no se ordenaba como deberia a pesar de tener el .sort
- **Por qué falla:** Porque modifica el array original, hay que hacer una copia
- **Arreglo:** `const ordenados = [...productos].sort((a, b) => a.precio - b.precio);`


## Bug 4 · Descuento por volumen

- **Síntoma:** El precio no se aplica correctamente 
- **Breakpoint en:** `if (unidades > 4)`
- **Lo que vi:** Vi que no se aplica el descuento ya que no entra en el if
- **Por qué falla:** Deberia permitir tambien 4
- **Arreglo:** `if (unidades >= 4) {`
