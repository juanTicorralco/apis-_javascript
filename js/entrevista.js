/* palindromo  */
/* let frase = "a la catalana banal atacala";

frase = Array.from(frase)

let frace1 = Array();
let frace2 = Array();

for (let i = 0; i < frase.length; i++) {
    if (frase[i] == " ") {
        i = i + 1;
    }
    frace1 += frase[i];
}

frase = frace1.split("");
frase = frase.toString();
frace1 = frase;
frace1 = frace1.split(",");
frace2 = frace1.reverse();
frace2 = frace2.toString()

if (frase == frace2) {
    console.log("es un palindromo");
} else {
    console.log("no es palindromo");
} */

/* ddddddddddddddddddddddddddddddddddddddddddddd */

/* let numero = 195;
let resulatado = 0;
let contador = 0;

for (let i = 2; i < numero; i++) {
    if (numero % i == 0) {
        contador += 1;
    }
}

if (contador > 0) {
    console.log("no es primo");
} else if (numero == 1) {
    console.log("no esta definido como primo y como no primo")
} else {
    console.log("es primo");
} */

//console.log(contador);

/* multiplicar un numero sin el signo */

let numero1 = 4;
let numero2 = 5;
let resultado = 0

for (let i = 0; i < numero2; i++) {
    //console.log(i);
    resultado += numero1;
    //console.log(resultado);
}

console.log(resultado);