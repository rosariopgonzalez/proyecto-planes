// --- CONFIGURACIÓN DE DATOS ---
const baseDePlanes = [
    { titulo: "PELI EN CASA", mood: ["relax", "romantico"], lugar: "casa", momento: "cualquiera", clima: "cualquiera", ritmo: "chill", link: "https://letterboxd.com/itsrosario/list/pelis-para-ver-de-toti-y-ro/" },
    { titulo: "ARCADE", mood: "divertido", lugar: "salimos", momento: "noche", clima: "cualquiera", ritmo: "cualquiera"},
    { titulo: "SALIMOS E IMPROVISAMOS", mood: "romantico", lugar: "casa", momento: "cualquiera", clima: "cualquiera", ritmo:  ["movido", "intermedio"]},
    { titulo: "POOL", mood: "divertido", lugar: "salimos", momento: "cualquiera", clima: "cualquiera", ritmo: "cualquiera"},
    { titulo: "PICNIC", mood: ["divertido", "romantico"], lugar: "salimos", momento: "dia", clima: "lindo", ritmo: "chill"},
    { titulo: "MATES", mood: ["divertido", "romantico"], lugar: "salimos", momento: "dia", clima: "lindo", ritmo: "chill"},
    { titulo: "PIZZAS CASERAS", mood: ["divertido", "romantico"], lugar: "casa", momento: "noche", clima: "cualquiera", ritmo: "intermedio", link: "https://www.donatodesantis.com/masa-basica-pizza"},
    { titulo: "MERIENDA", mood: ["relax", "romantico"], lugar: "salimos", momento: "dia", clima: "cualquiera", ritmo: "chill", link: "https://maps.app.goo.gl/J3e6VySy9CcV4G7L7" },
    { titulo: "PINTAR", mood: ["relax", "divertido"], lugar: "casa", momento: "cualquiera", clima: "cualquiera", ritmo: "chill"},
    { titulo: "MARATÓN DE JUEGOS", mood: ["divertido", "relax"], lugar: "casa", momento: "cualquiera", clima: "cualquiera", ritmo: ["chill", "intermedio"], link: "#" },
    { titulo: "BAR HOPPING", mood: "divertido", lugar: "salimos", momento: "noche", clima: "cualquiera", ritmo:  ["movido", "intermedio"]},
    { titulo: "CAMINATA", mood: ["relax", "romantico"], lugar: "salimos", momento: "dia", clima: "lindo", ritmo: "cualquiera"},
    { titulo: "COLOURHUNT", mood: "divertido", lugar: "salimos", momento: "dia", clima: "lindo", ritmo: ["chill", "intermedio"]},
    { titulo: "CINE", mood: "cualquiera", lugar: "salimos", momento: "noche", clima: "cualquiera", ritmo: ["chill", "intermedio"], link: "https://www.todoshowcase.com/?gad_source=1&gad_campaignid=22796287662&gbraid=0AAAAACzC-vWg4kkkO02IiATgabAo1NwcS&gclid=Cj0KCQjw2_TQBhCnARIsAF3-XhzT7RkkfIamrmGopqap9IeSoPPeX-k1oaxS7KQpEVwpbn0oaynUeaIaAigfEALw_wcB#dropdown_films" },
    { titulo: "MUSEO", mood: ["relax", "romantico"], lugar: "salimos", momento: "dia", clima: "cualquiera", ritmo: ["chill", "intermedio"]},
    { titulo: "MUSICA EN BAR", mood: "divertido", lugar: "salimos", momento: "noche", clima: "cualquiera", ritmo: ["movido", "intermedio"], link: "https://www.instagram.com/planaxia/" },
    { titulo: "NOCHE DE CITA", mood: ["relax", "romantico"], lugar: "salimos", momento: "noche", clima: "cualquiera", ritmo: "cualquiera", link: "https://maps.app.goo.gl/NcRzZewcsDjHNrP19" },
    { titulo: "NOCHE DE TRAGOS", mood: ["relax", "romantico"], lugar: "salimos", momento: "noche", clima: "cualquiera", ritmo: ["chill", "intermedio"], link: "https://maps.app.goo.gl/NcRzZewcsDjHNrP19" },
    { titulo: "CITA EN CASA", mood: "romantico", lugar: "casa", momento: "noche", clima: "cualquiera", ritmo: ["movido", "intermedio"]},
    { titulo: "KARAOKE", mood: ["divertido"], lugar: "casa", momento: "cualquiera", clima: "cualquiera", ritmo: ["movido", "intermedio"], link: "https://youtube.com/playlist?list=PLBB3fNnV-D0Y&si=KWXt9kUYaoDDly2o" },
    { titulo: "PASTAS... ¿CASERAS?", mood: "relax", lugar: "casa", momento: "cualquiera", clima: "frio", ritmo: "intermedio", link: "https://www.donatodesantis.com/pastas"},
    { titulo: "HELADITO", mood: ["relax", "romantico"], lugar: "salimos", momento: "cualquiera", clima: "lindo", ritmo: ["chill", "intermedio"]}
];

const preguntas = [
    { texto: "¿Mood?", opcion1: {texto:"Romantico 👩🏽‍❤️‍💋‍👨🏻", valor: "romantico"}, opcion2: { texto: "Divertido 🕺", valor: "divertido"}, opcion3: { texto: "Relax 🧘🏽", valor: "relax"}, categoria: "mood"},
    { texto: "¿Salimos o nos quedamos?", opcion1: { texto: "En casa 🏠", valor: "casa" }, opcion2: { texto: "Salimos 🌆", valor: "salimos" }, categoria: "lugar" },
    { texto: "¿De día o de noche?", opcion1: { texto: "De Día ☀️", valor: "dia" }, opcion2: { texto: "De Noche 🌙", valor: "noche" }, categoria: "momento" },
    { texto: "¿Cómo está el clima?", opcion1: { texto: "Está lindo 🔥", valor: "lindo" }, opcion2: { texto: "Esta fresco / llueve 🥶", valor: "frio" }, categoria: "clima" },
    { texto: "¿Para cual estamos?", opcion1: { texto: "Algo chill 🪫", valor: "chill" }, opcion3: { texto: "Punto medio ⚖️", valor: "intermedio" }, opcion2: { texto: "Hay pilas 🔋", valor: "movido" }, categoria: "ritmo" }
];

let indiceActual = 0;
let respuestasUsuario = {};

// --- LÓGICA DE NAVEGACIÓN ---

function cambiarPantalla(idOcultar, idMostrar) {
    document.getElementById(idOcultar).classList.add('oculto');
    document.getElementById(idMostrar).classList.remove('oculto');
}

function iniciar() {
    cambiarPantalla('pantalla-inicio', 'pantalla-preguntas');
    mostrarSiguientePregunta();
}

function reboot() {
    location.reload(); 
}

// --- LÓGICA DEL CUESTIONARIO ---

function mostrarSiguientePregunta() {
    const pregunta = preguntas[indiceActual];
    
    document.getElementById('indicador-nivel').innerText = `ETAPA ${indiceActual + 1} / ${preguntas.length}`;
    document.getElementById('texto-pregunta').innerText = pregunta.texto;
    
    const btn1 = document.getElementById('btn-opcion1');
    btn1.innerText = pregunta.opcion1.texto;
    btn1.onclick = () => registrarRespuesta(pregunta.categoria, pregunta.opcion1.valor);

    const btn2 = document.getElementById('btn-opcion2');
    btn2.innerText = pregunta.opcion2.texto;
    btn2.onclick = () => registrarRespuesta(pregunta.categoria, pregunta.opcion2.valor);

    const btn3 = document.getElementById('btn-opcion3');
    
    if (pregunta.opcion3) {
        btn3.innerText = pregunta.opcion3.texto;
        btn3.onclick = () => registrarRespuesta(pregunta.categoria, pregunta.opcion3.valor);
        btn3.classList.remove('oculto');
    } else {
        btn3.classList.add('oculto');
    }
}

function registrarRespuesta(categoria, valor) {
    respuestasUsuario[categoria] = valor;
    indiceActual++;
    (indiceActual < preguntas.length) ? mostrarSiguientePregunta() : procesarResultados();
}

function procesarResultados() {
    cambiarPantalla('pantalla-preguntas', 'pantalla-cargando');
    setTimeout(() => {
        calcularPlan();
        cambiarPantalla('pantalla-cargando', 'pantalla-resultado');
    }, 2000);
}

function calcularPlan() {
    const planesFiltrados = baseDePlanes.filter(p => 
        (p.mood === respuestasUsuario.mood || p.mood === "cualquiera" || (Array.isArray(p.mood) && p.mood.includes(respuestasUsuario.mood))) &&
        (p.lugar === respuestasUsuario.lugar || p.lugar === "cualquiera" || (Array.isArray(p.lugar) && p.lugar.includes(respuestasUsuario.lugar))) &&
        (p.momento === respuestasUsuario.momento || p.momento === "cualquiera" || (Array.isArray(p.momento) && p.momento.includes(respuestasUsuario.momento))) &&
        (p.clima === respuestasUsuario.clima || p.clima === "cualquiera" || (Array.isArray(p.clima) && p.clima.includes(respuestasUsuario.clima))) &&
        (p.ritmo === respuestasUsuario.ritmo || p.ritmo === "cualquiera" || (Array.isArray(p.ritmo) && p.ritmo.includes(respuestasUsuario.ritmo))) 
    );
    
    // SECCIÓN DE DIAGNÓSTICO 
    
    console.log("--- REPORTE DEL SISTEMA ---");
    console.log("1. Lo que eligió el usuario:", respuestasUsuario);
    
    const caminata = baseDePlanes.find(p => p.titulo === "CAMINATA");
    if (caminata) {
        console.log("=== DETECTIVE DE CAMINATA ===");
        console.log("¿Mood coincide?:", (caminata.mood === respuestasUsuario.mood), `-> Base: "${caminata.mood}" | Elegido: "${respuestasUsuario.mood}"`);
        console.log("¿Lugar coincide?:", (caminata.lugar === respuestasUsuario.lugar), `-> Base: "${caminata.lugar}" | Elegido: "${respuestasUsuario.lugar}"`);
        console.log("¿Momento coincide?:", (caminata.momento === respuestasUsuario.momento), `-> Base: "${caminata.momento}" | Elegido: "${respuestasUsuario.momento}"`);
        console.log("¿Clima coincide?:", (caminata.clima === respuestasUsuario.clima), `-> Base: "${caminata.clima}" | Elegido: "${respuestasUsuario.clima}"`);
        console.log("¿Ritmo (o cualquiera) coincide?:", (caminata.ritmo === respuestasUsuario.ritmo || caminata.ritmo === "cualquiera"), `-> Base: "${caminata.ritmo}" | Elegido: "${respuestasUsuario.ritmo}"`);
    } else {
        console.error("⚠️ Alerta: No se encontró el objeto CAMINATA en la baseDePlanes");
    }
    console.log("2. Cantidad de planes que sobrevivieron:", planesFiltrados.length);
    console.log("Planes finalistas:", planesFiltrados);

    // ========================================================

    const contenedor = document.getElementById('contenido-resultado');
    contenedor.classList.remove('mision-exito', 'mision-error');
        
    if (planesFiltrados.length > 0) {
        const planElegido = planesFiltrados[Math.floor(Math.random() * planesFiltrados.length)];
        contenedor.classList.add('mision-exito'); 

        let htmlResultado = `
            <div class="alerta-sistema verde">>> TENEMOS PLAN <<</div>
            <h2 class="titulo-glitch titulo-chico">${planElegido.titulo}</h2>
        `;

        if (planElegido.link && planElegido.link !== "" && planElegido.link !== "#") {
            htmlResultado += `
                <div class="caja-btn-abajo">
                    <a href="${planElegido.link}" target="_blank" class="btn-opciones">OPCIONES</a>
                </div>
            `;
        }
        contenedor.innerHTML = htmlResultado;
        
    } else {
        contenedor.classList.add('mision-error'); 
        
        let mensajeAlternativo = "";
        
        if (respuestasUsuario.momento === "dia") {
            // Mensaje si no hay plan y es de día
            mensajeAlternativo = "¿un paseito? ¿jardinería? me agarras desprevenida"; 
        } else {
            // Mensaje original si no hay plan y es de noche (o cualquier otra cosa)
            mensajeAlternativo = "¿vinito y mimos? 7u7";
        }

        // 2. Inyectamos el HTML con la variable del mensaje
        contenedor.innerHTML = `
            <div class="alerta-sistema rojo">>> ERROR: NO HAY PLAN <<</div>
            <h2 class="titulo-glitch titulo-chico"> ${mensajeAlternativo} </h2>
        `;
    }
}

// --- CONFIGURACIÓN DE PARTICLES ---
window.onload = function() {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": ["#b026ff", "#ff003c", "#00f3ff"] },
            "shape": { "type": "circle" },
            "opacity": { 
                "value": 0.5, 
                "random": true, 
                "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } 
            },
            "size": { 
                "value": 3, 
                "random": true 
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#b026ff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2, 
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "grab" },
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            },
            "modes": {
                "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });
};