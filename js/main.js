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
    changeStyle(e.target, "#444");
});

zona2.addEventListener("dragleave", e => {
    e.preventDefault();
    changeStyle(e.target, "#888");
});

zona2.addEventListener("drop", e => {
    e.preventDefault();
    changeStyle(e.target, "#888");
    cargarArch(e.dataTransfer.files[0]);
    zona2.style.border = "4px solid #888";
});

const changeStyle = (obj, colorZ) => {
    obj.style.color = colorZ;
    obj.style.border = `4px dashed ${colorZ}`;
}

const cargarArch = ar => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(ar);
    reader.addEventListener("progress", e => {
        let carga = Math.round(e.loaded / ar.size * 100);
        let cargado = document.querySelector(".carga");
        cargado.textContent = `${carga}%`;
        cargado.style.width = `${carga}%`;
    });
    reader.addEventListener("loadend", e => {
        zona2.style.border = "4px solid #1f1";
        zona2.style.color = "#1f1";
    });
    reader.addEventListener("load", e => {
        let video = new Blob([new Uint8Array(e.currentTarget.result)], { type: 'video/mp4' });
        let url = URL.createObjectURL(video);
        let img = document.createElement("VIDEO");
        img.setAttribute("src", url);
        document.querySelector(".resultado2").appendChild(img);
        img.addEventListener("click", (e) => {
            if (!e.currentTarget.paused && !e.currentTarget.ended) {
                e.currentTarget.pause();
            } else {
                e.currentTarget.play();
            }
        });
    });
}

/************************************************** create content Observe ************************************ */

const publicaciones = document.querySelector(".publicaciones");
let contador = 0;

const createPublicacionCode = (name, content) => {
    const container = document.createElement("DIV");
    const comentarios = document.createElement("DIV");
    const nombre = document.createElement("H2");
    const contenido = document.createElement("P");
    const btnComentario = document.createElement("INPUT");
    const btnEnviar = document.createElement("INPUT");

    container.classList.add("publicacion");
    comentarios.classList.add("comentarios");
    btnEnviar.classList.add("enviar");
    btnComentario.classList.add("comentario");

    btnComentario.setAttribute("placeholder", "introduce un comentario");
    nombre.textContent = name;
    contenido.textContent = content;

    btnEnviar.type = "submit";

    comentarios.appendChild(btnComentario);
    comentarios.appendChild(btnEnviar);

    container.appendChild(nombre);
    container.appendChild(contenido);
    container.appendChild(comentarios);

    return container;

}

const cargarMasPublis = entry => {
    if (entry[0].isIntersecting) cargarPublicaciones(4);
}

const observer = new IntersectionObserver(cargarMasPublis);

const cargarPublicaciones = async num => {
    const request = await fetch("datos.txt");
    const content = await request.json();
    const arr = content.content;
    const documentFragment = document.createDocumentFragment();
    for (let i = 0; i < num; i++) {
        if (arr[contador] != undefined) {
            let newPublication = createPublicacionCode(arr[contador].nombre, arr[contador].contenido);
            documentFragment.appendChild(newPublication);
            contador++;
            if (i == num - 1) observer.observe(newPublication);
        } else {
            if (publicaciones.lastElementChild.id !== "nomore") {
                let noMore = document.createElement("H3");
                noMore.textContent = "No hay mas publicaciones";
                noMore.id = "nomore";
                documentFragment.appendChild(noMore);
                publicaciones.appendChild(documentFragment);
                break;
            }
        }
    }
    publicaciones.appendChild(documentFragment);
}

cargarPublicaciones(4);
/************************************************** create content  cache ************************************ */

caches.open("archivos-estaticos").then(cache => {
    cache.addAll(["index.html", "css/style.css", "js/main.js"]);
    cache.keys().then(res => {
        console.log(res);
    });
});

/************************************************** create content service woker ************************************ */
if (navigator.serviceWorker) {
    navigator.serviceWorker.register("js/worker.js");
}

/************************************************** create content canvas ************************************ */

const canvas = document.getElementById('canvas');
const dif = canvas.getBoundingClientRect();
const ctx = canvas.getContext("2d");
let painting, coler, linewidth, difX, difY;

canvas.addEventListener("mousedown", e => {
    difX = e.clientX - dif.left;
    difY = e.clientY - dif.top;
    painting = true;
    coler = document.getElementById("color").value;
    linewidth = document.getElementById("lw").value;
    ctx.beginPath();


});

canvas.addEventListener("mousemove", e => {
    if (painting) {
        dibujar(difX, difY, e.clientX - dif.left, e.clientY - dif.top);
        difX = e.clientX - difX.left;
        difY = e.clientY - difY.top;
    }

});

canvas.addEventListener("mouseup", () => {
    ctx.closePath();
    painting = false;
});

const dibujar = (x1, y1, x2, y2) => {
        ctx.strokeStyle = coler;
        ctx.lineWidth = linewidth;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
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