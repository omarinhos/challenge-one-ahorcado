const btnIniciarJuegp = document.getElementById('iniciar-juego')
const btnAgregarPalabra = document.getElementById('agregar-palabra')

const palabras = ["LENGUAJE", "CODIGO", "LIBRERIA", "BUG", "DOMINIO", "HOSTING", "SCRUM", "FRONTEND", "BACKEND", "MOVIL", "LINUX", "JAVA", "HTML", "CSS"]
var intentos = 10
var letrasEquivocadas = []

btnIniciarJuegp.addEventListener("click", () => {
    
})

btnAgregarPalabra.addEventListener("click", agregarPalabraSection)

function agregarPalabraSection() {
    document.querySelector('.botones').style.display = "none";
    document.querySelector('.ingresar-palabra').style.display = "flex";
}

function escogerPalabra() {
    const indexRandom = Math.floor(Math.random() * (palabras.length - 0 + 1) + 0);
}