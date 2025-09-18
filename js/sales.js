// Funciones relacionadas con ventas
function actualizarVentas(dia, cantidad) {
    if (dia >= 1 && dia <= 4) {
        festivalData.ventas[`dia${dia}`] += cantidad;
        festivalData.ventas.total += cantidad;
        guardarDatos();
        actualizarUIventas();
        return true;
    }
    return false;
}

function obtenerVentasDelDia(dia) {
    if (dia >= 1 && dia <= 4) {
        return festivalData.ventas[`dia${dia}`];
    }
    return 0;
}

function obtenerVentasTotales() {
    return festivalData.ventas.total;
}

function obtenerDiaActualDelFestival() {
    const hoy = new Date();
    const inicio = new Date(festivalData.fechaInicio);
    
    if (hoy < inicio) return 0; // Festival no ha comenzado
    
    const diffTiempo = hoy - inicio;
    const diffDias = Math.floor(diffTiempo / (1000 * 60 * 60 * 24)) + 1;
    
    return Math.min(diffDias, 4); // Máximo 4 días
}

// Actualizar la interfaz con información de ventas
function actualizarUIventas() {
    const ventasDia1 = obtenerVentasDelDia(1);
    const ventasDia2 = obtenerVentasDelDia(2);
    const ventasDia3 = obtenerVentasDelDia(3);
    const ventasDia4 = obtenerVentasDelDia(4);
    const ventasTotales = obtenerVentasTotales();
    
    // Actualizar la sección de información
    const dia1Element = document.getElementById('sales-day1');
    const dia2Element = document.getElementById('sales-day2');
    const dia3Element = document.getElementById('sales-day3');
    const dia4Element = document.getElementById('sales-day4');
    const totalElement = document.getElementById('sales-total');
    
    if (dia1Element) dia1Element.textContent = ventasDia1;
    if (dia2Element) dia2Element.textContent = ventasDia2;
    if (dia3Element) dia3Element.textContent = ventasDia3;
    if (dia4Element) dia4Element.textContent = ventasDia4;
    if (totalElement) totalElement.textContent = ventasTotales;
}

// Simular ventas (para pruebas)
function simularVentas() {
    const diaActual = obtenerDiaActualDelFestival();
    
    if (diaActual > 0 && diaActual <= 4) {
        // Simular entre 50 y 200 ventas por día
        const ventasSimuladas = Math.floor(Math.random() * 151) + 50;
        actualizarVentas(diaActual, ventasSimuladas);
    }
}