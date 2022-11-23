const btnIniciarJuegp = document.getElementById('iniciar-juego')
const btnAgregarPalabra = document.getElementById('agregar-palabra')

const txtPalbra = document.getElementById('txt-palabra')
const btnGuardarYEmpezar = document.getElementById('guardar-empezar')
const btnCancelar = document.getElementById('cancelar')

const btnNuevoJuego = document.getElementById('nuevo-juego')
const btnDesistir = document.getElementById('desistir')
const lineas = document.getElementById('words')

const palabras = ["LENGUAJE", "CODIGO", "LIBRERIA", "BUG", "DOMINIO", "HOSTING", "SCRUM", "FRONTEND", "BACKEND", "MOVIL", "LINUX", "JAVA", "HTML", "CSS"]
let intentos = 10
let letrasEquivocadas = []

btnIniciarJuegp.addEventListener("click", iniciarJuego)

btnAgregarPalabra.addEventListener("click", agregarPalabraSection)

btnGuardarYEmpezar.addEventListener("click", agregarPalabra)

btnCancelar.addEventListener("click", cancelar)

btnNuevoJuego.addEventListener("click", nuevoJuego)

btnDesistir.addEventListener("click", desistir)

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
    //const letrasIncorrectas = document.getElementById('palabras-incorrectas')
    //letrasIncorrectas.innerHTML += "A "
    lineas.innerHTML = ""
    letrasEquivocadas = []

    let palabraEnJuego = escogerPalabra().split("")
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