const btnIniciarJuegp = document.getElementById('iniciar-juego')
const btnAgregarPalabra = document.getElementById('agregar-palabra')

const txtPalbra = document.getElementById('txt-palabra')
const btnGuardarYEmpezar = document.getElementById('guardar-empezar')
const btnCancelar = document.getElementById('cancelar')

const canvas = document.getElementById('canva')
const btnNuevoJuego = document.getElementById('nuevo-juego')
const btnDesistir = document.getElementById('desistir')
const lineas = document.getElementById('words')
const letrasIncorrectas = document.getElementById('palabras-incorrectas')
const input = document.getElementById('input-movil')
const msgGanaste = document.getElementById('ganaste')
const msgPerdiste = document.getElementById('perdiste')

let myCanva = canvas.getContext("2d")
myCanva.fillStyle = "#0A3871"
myCanva.strokeStyle = "#0A3871"


const palabras = ["LENGUAJE", "CODIGO", "LIBRERIA", "BUG", "DOMINIO", "HOSTING", "SCRUM", "FRONTEND", "BACKEND", "MOVIL", "LINUX", "JAVA", "HTML", "CSS"]
let palabraEnJuego = []
let palabraEnJuegoAux = []
let intentos = 10
let letrasEquivocadas = []
let juegoTerminado = false;
let enJuego = true;

btnIniciarJuegp.addEventListener("click", iniciarJuego)

btnAgregarPalabra.addEventListener("click", agregarPalabraSection)

btnGuardarYEmpezar.addEventListener("click", agregarPalabra)

btnCancelar.addEventListener("click", cancelar)

btnNuevoJuego.addEventListener("click", nuevoJuego)

btnDesistir.addEventListener("click", desistir)

input.addEventListener('input', (event) => {
    getTeclaPulsada(event.data)
    input.value = ""
})

document.addEventListener('keydown', (event) => {
    if (!((event.keyCode != 32) && (event.keyCode < 65) || (event.keyCode > 90) && (event.keyCode < 97) || (event.keyCode > 122))) {
        getTeclaPulsada(event.key)
    }
}, false);


function iniciarJuego() {
    document.querySelector('.botones').style.display = "none";
    document.querySelector('.juego').style.display = "flex";
    nuevoJuego()
}

function agregarPalabraSection() {
    document.querySelector('.botones').style.display = "none";
    document.querySelector('.ingresar-palabra').style.display = "flex";
}

function agregarPalabra() {
    let nuevaPalabra = txtPalbra.value.toUpperCase()
    if (nuevaPalabra != "") {
        palabras.push(nuevaPalabra)
        cancelar()
    }
}

function cancelar() {
    document.querySelector('.botones').style.display = "flex";
    document.querySelector('.ingresar-palabra').style.display = "none";
}

function nuevoJuego() {
    juegoTerminado = false
    intentos = 10
    letrasIncorrectas.innerHTML = ""
    lineas.innerHTML = ""
    msgGanaste.style.display = "none"
    msgPerdiste.style.display = "none"
    input.style.display = "block"
    letrasEquivocadas = []
    myCanva.clearRect(0, 0, canvas.width, canvas.height)

    palabraEnJuego = escogerPalabra().split("")
    palabraEnJuegoAux = []
    console.log(palabraEnJuego)

    let i = 0
    palabraEnJuego.forEach(e => {
        const element = document.createElement('span')
        element.classList.add("linea")
        element.setAttribute('id', 'linea' + i)
        lineas.appendChild(element)
        i++
    })

}

function escogerPalabra() {
    let indexRandom = Math.floor(Math.random() * (palabras.length));
    return palabras[indexRandom]
}

function desistir() {
    document.querySelector('.botones').style.display = "flex";
    document.querySelector('.juego').style.display = "none";
}

function getTeclaPulsada(tecla) {
    if (!juegoTerminado || intentos > 0) {
        const letra = tecla.toUpperCase()

        let i = 0
        if (palabraEnJuego.indexOf(letra) >= 0) {

            let index = palabraEnJuego.indexOf(letra)
            while (index !== -1) {
                palabraEnJuegoAux[index] = letra
                index = palabraEnJuego.indexOf(letra, index + 1)
            }
            console.log(palabraEnJuegoAux)

            palabraEnJuego.forEach(e => {
                if (e == letra) {
                    document.getElementById('linea' + i).innerHTML = letra
                }
                i++
            })
        } else {
           
            if (letrasEquivocadas.indexOf(letra) < 0) {
                intentos--
                console.log(intentos)
                dibujarAhoracado(intentos)
                letrasEquivocadas[letrasEquivocadas.length] = letra
                letrasIncorrectas.innerHTML = letrasEquivocadas.join(" ").toString()
            }
        }

        if (palabraEnJuego.join("") === palabraEnJuegoAux.join("")) {
            juegoTerminado = true
            input.style.display = "none"
            msgGanaste.style.display = "block"
        }

        if (intentos == 0) {
            juegoTerminado = true
            input.style.display = "none"
            msgPerdiste.style.display = "block"
        }
    }

}

function dibujarAhoracado(n) {
    myCanva.beginPath()
    switch(n) {
        case 9: 
            myCanva.fillRect(0, 190, 200, 10)
            break
        case 8:
            myCanva.fillRect(40,0,10,200);
            break
        case 7: 
            myCanva.fillRect(40,0,80,10);
            break
        case 6:
            myCanva.fillRect(110,0,10,40);
            break
        case 5:
            myCanva.lineWidth = 8;
            myCanva.arc(114, 58, 20, 0, 2 * Math.PI);
            myCanva.stroke();
            break
        case 4: 
            myCanva.fillRect(110,80,10,40);
            break
        case 3: 
            myCanva.beginPath();
            myCanva.moveTo(114, 118);
            myCanva.lineTo(90, 150);
            myCanva.stroke();
            break
        case 2:
            myCanva.beginPath();
            myCanva.moveTo(114, 118);
            myCanva.lineTo(134, 150);
            myCanva.stroke();
            break
        case 1: 
            myCanva.beginPath();
            myCanva.moveTo(114, 80);
            myCanva.lineTo(90, 100);
            myCanva.stroke();
            break
        case 0: 
            myCanva.beginPath();
            myCanva.moveTo(114, 80);
            myCanva.lineTo(134, 100);
            myCanva.stroke();
            break 
    }
}