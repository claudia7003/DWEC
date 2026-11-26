# DWEC · Batería de ejercicios de la UD5 (DOM y eventos)

**Opcional** y **no cuenta para la nota**: es para practicar la UD5 antes del bloque B de la práctica.

Se trabaja **igual que en la práctica**: todo con `docker compose` (Node y Vite van dentro del contenedor; en tu
ordenador no se instala nada más).

```bash
docker compose run --rm web npm install            # 1 vez, con internet (happy-dom y Vite)
docker compose run --rm web npm run comprobar      # todos los bloques
docker compose run --rm web npm run comprobar 3    # solo el bloque 3 (y el porqué de cada predicción)
docker compose up                                  # la página en http://localhost:5173 (Ctrl+C para pararla)
```

1. Lee la explicación de cada bloque en la web de DWEC: **Practicar → UD5 · DOM y eventos**.
2. Haz los ejercicios de `src/bloque1` … `src/bloque6`, en orden, y compruébalos.
3. Para **ver y depurar** tu código: `docker compose up` y abre **http://localhost:5173**. Cada bloque tiene su
   página de prueba funcionando con tus funciones; se recarga sola cada vez que guardas y, con **F12**, puedes ver el
   HTML cambiar, usar la consola y poner puntos de parada en `src/`.
4. Al terminar, contesta `respuestas.md`.
