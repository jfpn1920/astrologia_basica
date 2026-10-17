//-------------------------------------//
//--|funcionalidad_astrologia_basica|--//
//-------------------------------------//
const CLAVE = "astrologiaBasica";
let estado = {
    favoritos: [],
    filtro: "todos"
};
const tarjetas = document.querySelectorAll(".tarjeta");
const contenedor = document.getElementById("tarjetas");
const filtros = document.querySelectorAll(".filtro");
const zonaFiltros = document.getElementById("filtros");
const contador = document.getElementById("contador");
const btnLimpiar = document.getElementById("btn-limpiar");
//--------------------//
//--|guardar_estado|--//
//--------------------//
function guardar() {
    localStorage.setItem(CLAVE, JSON.stringify(estado));
}
function cargar() {
    const datos = localStorage.getItem(CLAVE);
    if (datos) {
        const lista = JSON.parse(datos);
        if (Array.isArray(lista.favoritos)) {
            estado.favoritos = lista.favoritos;
        }
        if (lista.filtro) {
            estado.filtro = lista.filtro;
        }
    }
}
//---------------------------------//
//--|actualizar_signos_y_filtros|--//
//---------------------------------//
function actualizar() {
    tarjetas.forEach(function(tarjeta) {
        const elemento = tarjeta.dataset.elemento;
        const signo = tarjeta.dataset.signo;
        const visible = estado.filtro === "todos" || elemento === estado.filtro;
        tarjeta.classList.toggle("oculta", !visible);
        tarjeta.classList.toggle("favorito", estado.favoritos.includes(signo));
    });
    filtros.forEach(function(filtro) {
        filtro.classList.toggle("activo", filtro.dataset.filtro === estado.filtro);
    });
    contador.textContent = `⭐ Favoritos: ${estado.favoritos.length}`;
}
//-----------------------------//
//--|alternar_signo_favorito|--//
//-----------------------------//
function alternarFavorito(signo) {
    if (estado.favoritos.includes(signo)) {
        estado.favoritos = estado.favoritos.filter(function(favorito) {
            return favorito !== signo;
        });
    } else {
        estado.favoritos.push(signo);
    }
    guardar();
    actualizar();
}
contenedor.addEventListener("click", function(evento) {
    const tarjeta = evento.target.closest(".tarjeta");
    if (!tarjeta) {
        return;
    }
    alternarFavorito(tarjeta.dataset.signo);
});
//--------------------------//
//--|filtrar_por_elemento|--//
//--------------------------//
zonaFiltros.addEventListener("click", function(evento) {
    const boton = evento.target.closest(".filtro");
    if (!boton) {
        return;
    }
    estado.filtro = boton.dataset.filtro;
    guardar();
    actualizar();
});
//--------------------------------//
//--|quitar_todos_los_favoritos|--//
//--------------------------------//
btnLimpiar.addEventListener("click", function() {
    estado.favoritos = [];
    guardar();
    actualizar();
});
//------------------------//
//--|iniciar_aplicacion|--//
//------------------------//
cargar();
actualizar();