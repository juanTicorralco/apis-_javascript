'use strict'

/************************************************** create clock ************************************ */
const addZeros = n => {
    /* if the clock is 0 */
    if (n.toString().length < 2) return "0".concat(n);
    return n;
}
const actualizarHora = () => {
    const time = new Date();
    let hora = addZeros(time.getHours());
    let min = addZeros(time.getMinutes());
    let seg = addZeros(time.getSeconds());

    document.querySelector(".hora").textContent = hora;
    document.querySelector(".min").textContent = min;
    document.querySelector(".seg").textContent = seg;
}

actualizarHora();
setInterval(actualizarHora, 1000);

/************************************************** create color page ************************************ */
let api1 = document.querySelector(".api1");
let api2 = document.querySelector(".api2");
let api3 = document.querySelector(".api3");

const definirColores = () => {
    document.querySelector(".dos").addEventListener("click", () => {
        localStorage.setItem("color", "dos");
        color1();

    });
    document.querySelector(".uno").addEventListener("click", () => {
        localStorage.clear();
        color2();
    });
}

const color = localStorage.getItem("color");

definirColores();

const color1 = () => {
    api1.style.backgroundColor = "var( --Bcolor-3)";
    api2.style.backgroundColor = "var( --Bcolor-3)";
    api3.style.backgroundColor = "var( --Bcolor-3)";
}

const color2 = () => {
    api1.style.backgroundColor = "var(--Bcolor-1)";
    api2.style.backgroundColor = "var(--Bcolor-2)";
    api3.style.backgroundColor = "var(--Bcolor-1)";
}

if (color == "dos") {
    color1();
}

/************************************************** create texturizer ************************************ */
const zona = document.querySelector(".zona");
zona.addEventListener("dragover", (e) => {
    e.preventDefault();
});
zona.addEventListener("drop", (e) => {
    let n = e.dataTransfer.getData("textura");
    zona.style.background = `url("../img/${n}.jpg")`;
});

for (let i = 1; i < document.querySelector(".texturas").children.length + 1; i++) {
    document.querySelector(`.textura${i}`).addEventListener("dragstart", (e) => transferirTexturas(i, e));

}

const transferirTexturas = (n, e) => {
    e.dataTransfer.setData("textura", n);

}

/************************************************** create content FileReader ************************************ */

const archivo = document.getElementById('archivo');
archivo.addEventListener("change", (e) => {
    leerArchivo(archivo.files);
});

const leerArchivo = ar => {
    for (var i = 0; i < ar.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(ar[i]);
        reader.addEventListener("load", (e) => {
            let newImg = `<img src='${e.currentTarget.result}'>`;
            document.querySelector(".resultado").innerHTML += newImg;
        });
    }
}

/************************************************** create content FillReader y DRAG y DROP ************************************ */

const zona2 = document.querySelector(".subir2");

zona2.addEventListener("dragover", e => {
    e.preventDefault();
    changeStyle(e.srcElement, "#444");
});

zona2.addEventListener("dragleave", e => {
    e.preventDefault();
    changeStyle(e.srcElement, "#888");
});

const changeStyle = (obj, colorZ) => {
    obj.style.color = colorZ;
    obj.style.border = `4 px dashed ${colorZ}`;
}

const cargarArch = ar => {
    const reader = new FileReader();
    reader.readAsText(ar);
    reader.addEventListener("load", e => {
        document.querySelector(".resultado2").textContent = e.currentTarget.result;
    });
}


/************************************************** create content ************************************ */
/************************************************** create content ************************************ */
/************************************************** create content ************************************ */
/************************************************** create content ************************************ */
/************************************************** create content ************************************ */
/************************************************** create content ************************************ */
/************************************************** create content ************************************ */
/************************************************** create content ************************************ */
/************************************************** create content ************************************ */
/************************************************** create content ************************************ */
/************************************************** create content ************************************ */
/************************************************** create content ************************************ */
/************************************************** create content ************************************ */
/************************************************** create content ************************************ */
/************************************************** create content ************************************ */