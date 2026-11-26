// Bloque 5 · Formularios y validación
// Explicación: web de DWEC → Practicar → UD5 · DOM y eventos → Bloque 5 (y el apartado 12 de la UD5).
// Comprueba con:  docker compose run --rm web npm run comprobar 5

// 👀 EJEMPLO RESUELTO ─────────────────────────────────────────────────────────
// Lee el formulario con FormData y lo convierte en un objeto LIMPIO: textos sin espacios a los lados
// y paginas como número (o null si está vacío). FormData siempre da textos (predicción p1).
export function leerFormulario(form) {
  const d = new FormData(form);
  return {
    titulo: String(d.get("titulo") ?? "").trim(),
    autor: String(d.get("autor") ?? "").trim(),
    paginas: d.get("paginas") === "" || d.get("paginas") === null ? null : Number(d.get("paginas")),
  };
}

// ✍️ TU TURNO ─────────────────────────────────────────────────────────────────
// ✍️ 1 · Valida los datos y devuelve un objeto con UN mensaje por cada campo que está mal ({} si todo bien):
//        - titulo: obligatorio y como mucho 60 caracteres;
//        - autor: obligatorio;
//        - paginas: puede ser null (no es obligatorio); si viene, un número ENTERO mayor que 0.
//        validarLibro({ titulo: "", autor: "Ende", paginas: null }) → { titulo: "El título es obligatorio" }
//        (los textos de los mensajes los eliges tú; el comprobador solo mira QUÉ campos tienen error)
export function validarLibro(datos) {
  throw new Error("Sin hacer");
}

// ✍️ 2 · Enseña los errores en el formulario. Para CADA campo con name:
//        - su mensaje (o "" si no tiene error) en el elemento [data-error-de="nombreDelCampo"];
//        - aria-invalid="true" si tiene error; si no, QUITA el atributo;
//        y al final pon el foco en el primer campo con error.
export function mostrarErrores(form, errores) {
  throw new Error("Sin hacer");
}

// ✍️ 3 · Junta todo: al ENVIAR el formulario (evento submit, también con Enter)
//        - que no se recargue la página;
//        - lee los datos, valida y enseña los errores;
//        - si no hay errores: llama a alGuardar(datos) y vacía el formulario (form.reset()).
export function conectarAlta(form, alGuardar) {
  throw new Error("Sin hacer");
}
