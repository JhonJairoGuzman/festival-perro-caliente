// results.js - Actualizado para usar cliente global de Supabase

// Obtener resultados desde Supabase
async function getResults() {
    try {
        const { data, error } = await window.supabaseClient
            .from('hotdogs')
            .select('*')
            .order('votes', { ascending: false });

        if (error) {
            console.error('Error obteniendo resultados:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error inesperado:', error);
        return [];
    }
}

// Obtener ganadores (top 3)
async function getWinners() {
    try {
        const { data, error } = await window.supabaseClient
            .from('hotdogs')
            .select('*')
            .order('votes', { ascending: false })
            .limit(3);

        if (error) {
            console.error('Error obteniendo ganadores:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error inesperado:', error);
        return [];
    }
}

// Mostrar resultados de votación
async function mostrarResultados() {
    const contenedorPerros = document.getElementById('perros-results');
    if (!contenedorPerros) return;
    
    // Mostrar estado de carga
    contenedorPerros.innerHTML = '<div class="loading">Cargando resultados...</div>';
    
    try {
        // Obtener resultados de Supabase
        const perros = await getResults();
        
        contenedorPerros.innerHTML = '';
        
        if (!perros || perros.length === 0) {
            contenedorPerros.innerHTML = '<div class="error-message">No hay resultados disponibles</div>';
            return;
        }
        
        console.log('Mostrando resultados para', perros.length, 'participantes');
        
        // Encontrar el máximo de votos para calcular porcentajes
        const maxVotos = Math.max(...perros.map(p => p.votes || 0), 1);
        const totalVotos = perros.reduce((sum, perro) => sum + (perro.votes || 0), 0);
        
        perros.forEach((perro, index) => {
            const votos = perro.votes || 0;
            const porcentaje = maxVotos > 0 ? (votos / maxVotos) * 100 : 0;
            const porcentajeTotal = totalVotos > 0 ? ((votos / totalVotos) * 100) : 0;
            
            const item = document.createElement('div');
            item.className = 'result-item';
            
            // Determinar clase según el puesto
            let rankClass = '';
            if (index === 0) rankClass = 'first-place';
            else if (index === 1) rankClass = 'second-place';
            else if (index === 2) rankClass = 'third-place';
            
            item.innerHTML = `
                <div class="result-rank ${rankClass}">
                    ${index + 1}°
                    ${index < 3 ? '<i class="fas fa-trophy"></i>' : ''}
                </div>
                <div class="result-info">
                    <h4>${perro.nombre}</h4>
                    <p class="result-business">${perro.negocio}</p>
                    <div class="result-bar-container">
                        <div class="result-bar" style="width: 0%">
                            <span class="result-bar-text">${porcentajeTotal.toFixed(1)}% del total</span>
                        </div>
                    </div>
                    <div class="result-stats">
                        <span class="result-votes">
                            <i class="fas fa-vote-yea"></i> ${votos} votos
                        </span>
                        <span class="result-percentage">
                            ${porcentajeTotal.toFixed(1)}% del total
                        </span>
                    </div>
                </div>
                <div class="result-logo">
                    <img src="${perro.logo}" alt="Logo de ${perro.negocio}" 
                         onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjUiIGZpbGw9IiNmMmY2ZjkiLz48dGV4dCB4PSIyNSIgeT0iMjgiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1iZGRsZSI+TEFCTzwvdGV4dD48L3N2Zz4='">
                </div>
            `;
            contenedorPerros.appendChild(item);
            
            // Animar la barra después de un pequeño delay
            setTimeout(() => {
                const bar = item.querySelector('.result-bar');
                if (bar) {
                    bar.style.width = `${porcentaje}%`;
                    bar.style.transition = 'width 1.5s ease-out';
                }
            }, 100 * index);
        });
        
    } catch (error) {
        console.error('Error al cargar resultados:', error);
        contenedorPerros.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error al cargar los resultados</p>
                <button onclick="mostrarResultados()" class="btn-retry">
                    <i class="fas fa-redo"></i> Reintentar
                </button>
            </div>
        `;
    }
}

// Función para actualizar resultados en tiempo real
async function actualizarResultados() {
    const resultadosSection = document.getElementById('resultados');
    if (resultadosSection && !resultadosSection.hasAttribute('hidden')) {
        await mostrarResultados();
    }
}

// Función para mostrar ganadores (top 3)
async function mostrarGanadores() {
    const winnersContainer = document.getElementById('winners-container');
    if (!winnersContainer) return;
    
    winnersContainer.innerHTML = '<div class="loading">Cargando ganadores...</div>';
    
    try {
        const ganadores = await getWinners();
        
        winnersContainer.innerHTML = '';
        
        if (!ganadores || ganadores.length === 0) {
            winnersContainer.innerHTML = '<div class="error-message">No hay ganadores aún</div>';
            return;
        }
        
        const totalVotos = ganadores.reduce((sum, perro) => sum + (perro.votes || 0), 0);
        
        ganadores.forEach((ganador, index) => {
            const votos = ganador.votes || 0;
            const porcentaje = totalVotos > 0 ? ((votos / totalVotos) * 100) : 0;
            const winnerCard = document.createElement('div');
            winnerCard.className = `winner-card winner-${index + 1}`;
            
            let trophyIcon = '';
            let positionText = '';
            
            switch(index) {
                case 0:
                    trophyIcon = '<i class="fas fa-trophy gold"></i>';
                    positionText = 'PRIMER LUGAR';
                    break;
                case 1:
                    trophyIcon = '<i class="fas fa-trophy silver"></i>';
                    positionText = 'SEGUNDO LUGAR';
                    break;
                case 2:
                    trophyIcon = '<i class="fas fa-trophy bronze"></i>';
                    positionText = 'TERCER LUGAR';
                    break;
            }
            
            winnerCard.innerHTML = `
                <div class="winner-badge">${positionText}</div>
                <div class="winner-image">
                    <img src="${ganador.imagen}" alt="${ganador.nombre}">
                    <div class="winner-overlay">${trophyIcon}</div>
                </div>
                <div class="winner-content">
                    <h3>${ganador.nombre}</h3>
                    <p class="winner-business">${ganador.negocio}</p>
                    <p class="winner-description">${ganador.descripcion}</p>
                    
                    <div class="winner-stats">
                        <div class="stat">
                            <i class="fas fa-vote-yea"></i>
                            <span>${votos} votos</span>
                        </div>
                        <div class="stat">
                            <i class="fas fa-percentage"></i>
                            <span>${porcentaje.toFixed(1)}% del total</span>
                        </div>
                    </div>
                    
                    <div class="winner-contact">
                        <p><i class="fas fa-map-marker-alt"></i> ${ganador.direccion}</p>
                        <p><i class="fas fa-phone"></i> ${ganador.telefono}</p>
                        <p><i class="fas fa-hashtag"></i> ${ganador.redes ? ganador.redes.join(' ') : '@redsocial'}</p>
                    </div>
                </div>
            `;
            
            winnersContainer.appendChild(winnerCard);
        });
        
    } catch (error) {
        console.error('Error al cargar ganadores:', error);
        winnersContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error al cargar los ganadores</p>
            </div>
        `;
    }
}

// Inicializar la sección de resultados
async function initResults() {
    // Configurar evento para el tab de resultados
    const resultadosTab = document.querySelector('[data-tab="resultados"]');
    if (resultadosTab) {
        resultadosTab.addEventListener('click', async () => {
            await mostrarResultados();
        });
    }
    
    // Configurar evento para el tab de ganadores
    const ganadoresTab = document.querySelector('[data-tab="ganadores"]');
    if (ganadoresTab) {
        ganadoresTab.addEventListener('click', async () => {
            await mostrarGanadores();
        });
    }
    
    // Si la sección de resultados ya está visible, cargarla
    const resultadosSection = document.getElementById('resultados');
    if (resultadosSection && !resultadosSection.hasAttribute('hidden')) {
        await mostrarResultados();
    }
    
    // Si la sección de ganadores ya está visible, cargarla
    const ganadoresSection = document.getElementById('ganadores');
    if (ganadoresSection && !ganadoresSection.hasAttribute('hidden')) {
        await mostrarGanadores();
    }
}

// Función para exportar resultados (opcional)
async function exportarResultados() {
    try {
        const perros = await getResults();
        const csvContent = "data:text/csv;charset=utf-8," 
            + "Puesto,Nombre,Negocio,Votos\n" 
            + perros.map((perro, index) => 
                `${index + 1},${perro.nombre},${perro.negocio},${perro.votes || 0}`
            ).join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "resultados_festival_perros.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
    } catch (error) {
        console.error('Error al exportar resultados:', error);
        mostrarNotificacion('Error al exportar resultados', 'error');
    }
}

// Añadir función de exportación al global
window.exportarResultados = exportarResultados;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ results.js inicializado - Usando cliente global de Supabase');
    initResults();
});