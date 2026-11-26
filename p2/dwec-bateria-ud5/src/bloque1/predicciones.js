// 🔮 PREDICCIONES · Escribe lo que crees que da cada expresión ANTES de probarla.
// Cambia cada undefined por tu respuesta (un número, true/false o un texto entre comillas).
// Luego: docker compose run --rm web npm run comprobar 1  → te dice el PORQUÉ de las que aciertas y una pista de las que fallas.
// Para probar de verdad: docker compose up → botón «Probar», o en la consola del navegador (F12).
export const predicciones = {
  p1: undefined, // <ul><li>a</li><li>b</li><li>c</li></ul> · ul.children.length
  p2: undefined, // <p>Hola</p> · p.childNodes.length
  p3: undefined, // <ul><li>a</li></ul> · const vivos = ul.children; ul.append(document.createElement("li")); vivos.length
  p4: undefined, // document.createElement("div").tagName
};
