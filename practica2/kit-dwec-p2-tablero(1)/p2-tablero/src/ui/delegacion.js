// delegacion.js — Bloque B · ✍️ B3 (delegar).

// ✍️ B3 · delegar(contenedor, tipo, selector, manejador)
//   - UN solo addEventListener, en el contenedor (no en cada botón)
//   - Dentro: el elemento que encaja es evento.target.closest(selector). Si lo hay y está DENTRO
//     del contenedor (contenedor.contains(...)), llama a manejador(elemento, evento)
//   - Devuelve una función que quita el listener (removeEventListener con la MISMA función)
export function delegar(contenedor, tipo, selector, manejador) {
  //PRIMERO DECLARAR LA FUNCION Y DESPUÉS UTILIZAMOS addEventListener()
  const listener = (e) => {
    const encontrado = e.target.closest(selector);
    //Hay que comprobar si existe y si está dentro
    if(encontrado !== null && contenedor.contains(encontrado)){
      return manejador(encontrado, e);
    }else {
      return null;
    }

  };

  contenedor.addEventListener(tipo, listener);
  


  //Devolver una funcion flecha vacia que envuelva la llamada 
  return () => {
    contenedor.removeEventListener(tipo, listener);
  }
  
}

