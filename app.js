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


const palabras = ["LENGUAJE", "CODIGO", "LIBRERIA", "BUG", "DOMINIO", "HOSTING", "SCRUM", "FRONTEND", "BACKEND", "MOVIL", "LINUX", "JAVA", "HTML", "CSS"]
let palabraEnJuego = []
let palabraEnJuegoAux = []
let intentos = 10
let letrasEquivocadas = []
let juegoTerminado = false;

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
}

function agregarPalabraSection() {
    document.querySelector('.botones').style.display = "none";
    document.querySelector('.ingresar-palabra').style.display = "flex";
}

function agregarPalabra() {
    let nuevaPalabra = txtPalbra.value.toUpperCase()
    if (nuevaPalabra != "") {
        palabras.push(nuevaPalabra)
    }
    console.log(palabras)
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
    nuevoJuego()
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