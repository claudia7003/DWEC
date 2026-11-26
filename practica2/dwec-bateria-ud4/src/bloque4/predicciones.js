// 🔮 PREDICCIONES · Cambia cada undefined por lo que crees que da. Luego: ./bateria.sh comprobar 4
// Para las tres primeras:  class A { hola() { return "A"; } }
//                          class B extends A { hola() { return "B" + super.hola(); } }
export const predicciones = {
  p1: "BA", // new B().hola()
  p2: true, // new B() instanceof A
  p3: true, // Object.getPrototypeOf(B) === A
  p4: 2, // class X { constructor() { this.n = 1; } } class Y extends X { constructor() { super(); this.n++; } }; new Y().n
};

// Llama a hola() es una instancia de B. Este método devuelve "B" concertado con el resultado de super.hola(), que ejecuta el método de la clase
// padre A devolviendo "A"

//new B() crea una instancia que desciende de B y, por cadena por prototipos, tambien de A. Por tanto, instanceof A evalúa a true.

//En JavaScript, las clases hijas extienden directamente a las clases padres a nivel de funciones constructoras, por lo que el prototipo de la clase B (su [[Prototype]]) es
//la clase A.

//Al instanciar Y, primero se ejecuta el constructor de X que inicializa this.n= 1. Luego, al volver al constructor de Y tras super(), se incrementa this.n en uno
//(1++), resultando en 2.

