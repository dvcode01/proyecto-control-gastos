export function generarId(){
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
}

export function formatearFecha(fecha){
    const fechaNueva = new Date(fecha);

    // Configuracion de la fecha
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    };

    // Nueva fecha con la configuracion y retorno
    return fechaNueva.toLocaleDateString('es-Es', opciones);
}