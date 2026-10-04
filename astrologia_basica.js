// ===== Astrología Básica =====
// Clave con la que se guardan los datos en localStorage
const CLAVE = 'astrologiaBasica';
// Estado: lista de signos favoritos y filtro de elemento elegido
let estado = { favoritos: [], filtro: 'todos' };
// ===== Referencias a elementos del HTML =====
const tarjetas = document.querySelectorAll('.tarjeta');        // las 12 tarjetas
const contenedor = document.getElementById('tarjetas');        // zona de tarjetas
const filtros = document.querySelectorAll('.filtro');          // botones de filtro
const zonaFiltros = document.getElementById('filtros');        // contenedor de filtros
const contador = document.getElementById('contador');          // texto de favoritos
const btnLimpiar = document.getElementById('btn-limpiar');     // botón quitar favoritos
// ===== Funciones de localStorage =====
// Guarda el estado actual en el navegador (como texto JSON)
function guardar() {
    localStorage.setItem(CLAVE, JSON.stringify(estado));
}
// Carga el estado guardado (si existe) al abrir la página
function cargar() {
    const datos = localStorage.getItem(CLAVE); // lee el texto guardado
    if (datos) {
        const lista = JSON.parse(datos); // convierte el texto a objeto
        // Solo usa los favoritos si realmente son una lista
        if (Array.isArray(lista.favoritos)) estado = { ...estado, ...lista };
    }
}
// ===== Funciones de la interfaz =====
// Dibuja en pantalla todo lo que está guardado en el estado
function actualizar() {
    // Recorre cada tarjeta del HTML
    tarjetas.forEach(tarjeta => {
        // ¿Coincide con el filtro elegido? ("todos" muestra todas)
        const visible = estado.filtro === 'todos' || tarjeta.dataset.elemento === estado.filtro;
        tarjeta.classList.toggle('oculta', !visible);
        // ¿Está en la lista de favoritos? Marca u omite la clase "favorito"
        tarjeta.classList.toggle('favorito', estado.favoritos.includes(tarjeta.dataset.signo));
    });
    // Resalta solo el botón del filtro activo
    filtros.forEach(boton => {
        boton.classList.toggle('activo', boton.dataset.filtro === estado.filtro);
    });
    // Muestra cuántos favoritos hay
    contador.textContent = `⭐ Favoritos: ${estado.favoritos.length}`;
}
// Agrega o quita un signo de la lista de favoritos
function alternarFavorito(signo) {
    if (estado.favoritos.includes(signo)) {
        // Si ya era favorito, lo quita de la lista
        estado.favoritos = estado.favoritos.filter(s => s !== signo);
    } else {
        // Si no lo era, lo agrega
        estado.favoritos.push(signo);
    }
    guardar();
    actualizar();
}
// ===== Eventos =====
// Un solo "oyente" en la zona de tarjetas detecta clic en cualquiera
contenedor.addEventListener('click', (evento) => {
  const tarjeta = evento.target.closest('.tarjeta'); // tarjeta más cercana al clic
  if (!tarjeta) return; // si se hizo clic fuera de una tarjeta, no hace nada
  alternarFavorito(tarjeta.dataset.signo); // usa el data-signo como identificador
});
// Un solo "oyente" en la zona de filtros detecta clic en cualquier botón
zonaFiltros.addEventListener('click', (evento) => {
    const boton = evento.target.closest('.filtro'); // botón más cercano al clic
    if (!boton) return;
    estado.filtro = boton.dataset.filtro; // cambia el filtro elegido
    guardar();
    actualizar();
});
// Botón "Quitar favoritos": vacía la lista (el filtro se conserva)
btnLimpiar.addEventListener('click', () => {
    estado.favoritos = [];
    guardar();
    actualizar();
});
// ===== Inicio =====
// Al cargar la página: lee lo guardado y dibuja
cargar();
actualizar();