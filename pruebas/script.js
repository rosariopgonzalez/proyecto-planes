// --- 1. CONFIGURACIÓN DE LOS DATOS ---

// Tu base de planes (Igual que siempre)
const baseDePlanes = [
    { titulo: "🎬 Maratón Cyberpunk", lugar: "casa", momento: "noche", clima: "frio", ritmo: "chill", descripcion: "Hamburguesas, apagamos las luces y vemos Blade Runner.", link: "https://imdb.com" },
    { titulo: "🕹️ Torneo de Arcade", lugar: "salimos", momento: "noche", clima: "lindo", ritmo: "movido", descripcion: "Salimos a buscar un bar de juegos o un local de arcades.", link: "https://maps.google.com" },
    { titulo: "🧺 Picnic Hackerspace", lugar: "salimos", momento: "dia", clima: "lindo", ritmo: "chill", descripcion: "Lona, mates y a tirarse al sol en el parque.", link: "#" },
    { titulo: "🍕 Cocinar alta pizza", lugar: "casa", momento: "noche", clima: "lindo", ritmo: "movido", descripcion: "Masa casera, música al palo y a cocinar juntos.", link: "#" }
];

// Las preguntas que van a aparecer como Pop-ups
const preguntas = [
    {
        texto: "¿Salimos a explorar o nos quedamos en la base?",
        opcion1: { texto: "En Casa 🏠", valor: "casa" },
        opcion2: { texto: "Afuera 🌆", valor: "salimos" },
        categoria: "lugar"
    },
    {
        texto: "Horario del servidor:",
        opcion1: { texto: "De Día ☀️", valor: "dia" },
        opcion2: { texto: "De Noche 🌙", valor: "noche" },
        categoria: "momento"
    },
    {
        texto: "Estado del clima exterior:",
        opcion1: { texto: "Está lindo 😎", valor: "lindo" },
        opcion2: { texto: "Hace frío/llueve 🥶", valor: "frio" },
        categoria: "clima"
    },
    {
        texto: "Nivel de energía requerido:",
        opcion1: { texto: "Modo Chill ☕", valor: "chill" },
        opcion2: { texto: "Modo Movido 🔥", valor: "movido" },
        categoria: "ritmo"
    }
];

// Variables para llevar el control
let indiceActual = 0;
let respuestasUsuario = {};

// --- 2. FUNCIONES DEL SISTEMA ---

// Función para apagar un div y prender otro
function cambiarPantalla(idOcultar, idMostrar) {
    document.getElementById(idOcultar).classList.add('oculto');
    document.getElementById(idMostrar).classList.remove('oculto');
}

// Botón "READY?"
function iniciarSistema() {
    cambiarPantalla('pantalla-landing', 'pantalla-preguntas');
    mostrarSiguientePregunta();
}

// Muestra la pregunta actual en el HTML
function mostrarSiguientePregunta() {
    const pregunta = preguntas[indiceActual];
    
    // Actualizamos los textos en pantalla
    document.getElementById('indicador-nivel').innerText = `NIVEL ${indiceActual + 1} / ${preguntas.length}`;
    document.getElementById('texto-pregunta').innerText = pregunta.texto;
    
    // Configuramos el botón 1
    const btn1 = document.getElementById('btn-opcion1');
    btn1.innerText = pregunta.opcion1.texto;
    btn1.onclick = function() { registrarRespuesta(pregunta.categoria, pregunta.opcion1.valor); };

    // Configuramos el botón 2
    const btn2 = document.getElementById('btn-opcion2');
    btn2.innerText = pregunta.opcion2.texto;
    btn2.onclick = function() { registrarRespuesta(pregunta.categoria, pregunta.opcion2.valor); };
}

// Guarda lo que eligió y avanza
function registrarRespuesta(categoria, valorElegido) {
    respuestasUsuario[categoria] = valorElegido;
    indiceActual++; // Pasamos a la siguiente

    if (indiceActual < preguntas.length) {
        // Si quedan preguntas, mostramos la que sigue
        mostrarSiguientePregunta();
    } else {
        // Si terminamos, pasamos a la pantalla de carga
        procesarResultados();
    }
}

// La pantalla falsa de carga
function procesarResultados() {
    cambiarPantalla('pantalla-preguntas', 'pantalla-cargando');

    // setTimeout retrasa una acción. Acá esperamos 3000 milisegundos (3 segundos)
    setTimeout(function() {
        calcularPlan();
        cambiarPantalla('pantalla-cargando', 'pantalla-resultado');
    }, 3000);
}

// Filtra los planes y muestra el final
function calcularPlan() {
    const planesFiltrados = baseDePlanes.filter(plan => {
        return plan.lugar === respuestasUsuario.lugar &&
               plan.momento === respuestasUsuario.momento &&
               plan.clima === respuestasUsuario.clima &&
               plan.ritmo === respuestasUsuario.ritmo;
    });

    const contenedor = document.getElementById('contenido-resultado');

    if (planesFiltrados.length > 0) {
        const planElegido = planesFiltrados[Math.floor(Math.random() * planesFiltrados.length)];
        contenedor.innerHTML = `
            <h2 class="texto-cyber">¡PLAN ENCONTRADO!</h2>
            <h3>${planElegido.titulo}</h3>
            <p>${planElegido.descripcion}</p>
            <a href="${planElegido.link}" target="_blank" class="btn-neon mt-20" style="display:inline-block; text-decoration:none;">
                [ VER OPCIONES ]
            </a>
        `;
    } else {
        contenedor.innerHTML = `
            <h2 style="color: var(--neon-magenta);">ERROR 404</h2>
            <p>No se encontraron planes para estos parámetros.</p>
            <p>Protocolo de emergencia: Abrazos y delivery.</p>
        `;
    }
}

// Botón para volver a empezar
function reiniciarSistema() {
    indiceActual = 0;
    respuestasUsuario = {};
    cambiarPantalla('pantalla-resultado', 'pantalla-landing');
}

// --- CONFIGURACIÓN DE PARTICLES.JS ---
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
        // 👇 Colores Cyberpunk: Violeta, Rojo y Cyan
        "color": { "value": ["#b026ff", "#ff003c", "#00f3ff"] },
        "shape": { "type": "circle" },
        "opacity": { 
            "value": 0.5, 
            "random": true, 
            "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } 
        },
        "size": { 
            "value": 3, 
            "random": true, 
            "anim": { "enable": false } 
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#b026ff", // Líneas violetas
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2, // Velocidad a la que flotan
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": { "enable": true, "mode": "grab" }, // Se conectan al mouse
            "onclick": { "enable": true, "mode": "push" }, // Salen más si hacés click
            "resize": true
        },
        "modes": {
            "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
            "push": { "particles_nb": 4 }
        }
    },
    "retina_detect": true
});