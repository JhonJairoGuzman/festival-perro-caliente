// winners.js - Versión corregida para evitar errores y mejorar compatibilidad

// Funciones relacionadas con ganadores

// Determinar ganadores automáticamente
function determinarGanadores() {
    // Usar window.festivalData para compatibilidad
    const festivalData = window.festivalData || { perros: [], ganadores: [] };
    
    if (!festivalData.perros || festivalData.perros.length === 0) {
        festivalData.ganadores = [];
        return;
    }
    
    // Ordenar perros por votos (de mayor a menor)
    const perrosOrdenados = [...festivalData.perros].sort((a, b) => (b.votos || 0) - (a.votos || 0));
    
    // Asignar premios a los primeros 3 puestos (solo si tienen votos)
    festivalData.ganadores = [];
    
    if (perrosOrdenados[0] && (perrosOrdenados[0].votos || 0) > 0) {
        festivalData.ganadores.push({
            puesto: 1,
            perro: perrosOrdenados[0],
            premio: "Trofeo del Festival y $5.000.000"
        });
    }
    
    if (perrosOrdenados[1] && (perrosOrdenados[1].votos || 0) > 0) {
        festivalData.ganadores.push({
            puesto: 2,
            perro: perrosOrdenados[1],
            premio: "Medalla de Plata y $3.000.000"
        });
    }
    
    if (perrosOrdenados[2] && (perrosOrdenados[2].votos || 0) > 0) {
        festivalData.ganadores.push({
            puesto: 3,
            perro: perrosOrdenados[2],
            premio: "Medalla de Bronce y $1.000.000"
        });
    }
    
    // Guardar cambios si la función existe
    if (typeof window.guardarDatos === 'function') {
        window.guardarDatos();
    }
}

// Mostrar ganadores en la UI
function mostrarGanadores() {
    const container = document.getElementById('winners-container');
    if (!container) {
        console.log('❌ Contenedor de ganadores no encontrado');
        return;
    }
    
    // Mostrar estado de carga
    container.innerHTML = '<div class="loading">Cargando ganadores...</div>';
    
    // Simular carga con setTimeout para mejor UX
    setTimeout(() => {
        container.innerHTML = '';
        
        // Usar window.festivalData para compatibilidad
        const festivalData = window.festivalData || { ganadores: [], perros: [] };
        
        // Determinar ganadores si no existen
        if (!festivalData.ganadores || festivalData.ganadores.length === 0) {
            determinarGanadores();
        }
        
        if (festivalData.ganadores.length === 0) {
            container.innerHTML = `
                <div class="no-winners">
                    <i class="fas fa-trophy" style="font-size: 3rem; color: #f9a826; margin-bottom: 1rem;"></i>
                    <p>Los ganadores se anunciarán al finalizar el festival.</p>
                </div>
            `;
            return;
        }
        
        festivalData.ganadores.forEach(ganador => {
            const card = document.createElement('div');
            card.className = 'winner-card';
            
            // Manejar imágenes que puedan no cargar
            const imagenHTML = ganador.perro.imagen ? 
                `<img src="${ganador.perro.imagen}" alt="${ganador.perro.nombre || 'Ganador'}" class="winner-image" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=400&h=300&fit=crop'">` :
                `<div class="winner-image-placeholder">${(ganador.perro.nombre || 'G').charAt(0)}</div>`;
            
            card.innerHTML = `
                <div class="winner-position ${ganador.puesto === 1 ? 'first' : ganador.puesto === 2 ? 'second' : 'third'}">
                    ${ganador.puesto}°
                </div>
                ${imagenHTML}
                <h3 class="winner-name">${ganador.perro.nombre || 'Sin nombre'}</h3>
                <p class="winner-business">${ganador.perro.negocio || 'Establecimiento'}</p>
                <div class="winner-votes">${ganador.perro.votos || 0} votos</div>
                <p class="winner-description">${ganador.perro.descripcion || 'Delicioso perro caliente ganador'}</p>
                <div class="winner-prize">${ganador.premio}</div>
            `;
            container.appendChild(card);
        });
        
        console.log('✅ Ganadores mostrados correctamente');
    }, 800);
}

// Verificar si el festival ha terminado para determinar ganadores
function verificarFinFestival() {
    // Usar window.festivalData para compatibilidad
    const festivalData = window.festivalData || { 
        fechaFin: '2025-10-05', 
        ganadores: [] 
    };
    
    const ahora = new Date();
    const finFestival = new Date(festivalData.fechaFin);
    finFestival.setHours(23, 59, 59, 999);
    
    if (ahora > finFestival && (!festivalData.ganadores || festivalData.ganadores.length === 0)) {
        determinarGanadores();
        
        // Mostrar notificación si la función existe
        if (typeof window.mostrarNotificacion === 'function') {
            window.mostrarNotificacion('¡El festival ha terminado! Los ganadores han sido anunciados.', 'success');
        }
    }
}

// Añadir funciones al ámbito global
window.determinarGanadores = determinarGanadores;
window.mostrarGanadores = mostrarGanadores;
window.verificarFinFestival = verificarFinFestival;

// Inicializar cuando se accede a la pestaña de ganadores
function initWinners() {
    // Verificar si estamos en la pestaña de ganadores
    const winnersTab = document.querySelector('[data-tab="ganadores"]');
    const winnersSection = document.getElementById('ganadores');
    
    if (winnersTab && winnersSection && !winnersSection.hasAttribute('hidden')) {
        mostrarGanadores();
    }
    
    // Configurar evento para cuando se haga clic en la pestaña
    if (winnersTab) {
        winnersTab.addEventListener('click', mostrarGanadores);
    }
    
    // Verificar fin del festival periódicamente
    setInterval(verificarFinFestival, 60000); // Cada minuto
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(initWinners, 100);
    });
} else {
    setTimeout(initWinners, 100);
}