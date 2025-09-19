// results.js - Versión corregida para usar cliente global de Supabase

// 1. USAR CLIENTE GLOBAL DE SUPABASE CON VERIFICACIÓN
const supabase = window.supabaseClient;

// 2. FUNCIÓN OBTENER RESULTADOS CORREGIDA
async function getResults() {
    try {
        // Verificar que Supabase esté disponible
        if (!supabase) {
            console.error('❌ Supabase no disponible, usando datos locales');
            return [];
        }

        const { data, error } = await supabase
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

// 3. FUNCIÓN MOSTRAR RESULTADOS (ACTUALIZADA)
async function mostrarResultados() {
    const container = document.getElementById('results-container');
    if (!container) return;
    
    container.innerHTML = '<div class="loading">Cargando resultados...</div>';
    
    try {
        const resultados = await getResults();
        
        container.innerHTML = '';
        
        if (!resultados || resultados.length === 0) {
            container.innerHTML = '<div class="no-results">No hay resultados disponibles</div>';
            return;
        }
        
        console.log('Mostrando', resultados.length, 'resultados');
        
        // Crear tabla de resultados
        const tabla = document.createElement('table');
        tabla.className = 'results-table';
        
        // Encabezado de la tabla
        tabla.innerHTML = `
            <thead>
                <tr>
                    <th>Posición</th>
                    <th>Perro Caliente</th>
                    <th>Establecimiento</th>
                    <th>Votos</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;
        
        const tbody = tabla.querySelector('tbody');
        
        // Llenar tabla con resultados
        resultados.forEach((resultado, index) => {
            const fila = document.createElement('tr');
            
            // Convertir datos de Supabase a formato español
            const resultadoData = {
                posicion: index + 1,
                nombre: resultado.name || 'Sin nombre',
                negocio: resultado.negocio || 'Establecimiento por definir',
                votos: resultado.votes || 0
            };
            
            fila.innerHTML = `
                <td>${resultadoData.posicion}°</td>
                <td>${resultadoData.nombre}</td>
                <td>${resultadoData.negocio}</td>
                <td>${resultadoData.votos}</td>
            `;
            
            // Destacar los primeros 3 puestos
            if (index < 3) {
                fila.classList.add(`top-${index + 1}`);
            }
            
            tbody.appendChild(fila);
        });
        
        container.appendChild(tabla);
        
        // Mostrar ganador
        if (resultados.length > 0) {
            const ganador = resultados[0];
            const ganadorData = {
                nombre: ganador.name || 'Sin nombre',
                negocio: ganador.negocio || 'Establecimiento por definir',
                votos: ganador.votes || 0
            };
            
            const ganadorSection = document.createElement('div');
            ganadorSection.className = 'winner-section';
            ganadorSection.innerHTML = `
                <h3>¡Ganador Actual!</h3>
                <div class="winner-card">
                    <h4>${ganadorData.nombre}</h4>
                    <p>${ganadorData.negocio}</p>
                    <div class="votes-count">${ganadorData.votos} votos</div>
                </div>
            `;
            
            container.appendChild(ganadorSection);
        }
        
    } catch (error) {
        console.error('Error al cargar resultados:', error);
        container.innerHTML = `
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

// 4. FUNCIÓN ACTUALIZAR RESULTADOS EN TIEMPO REAL
async function actualizarResultados() {
    try {
        await mostrarResultados();
        mostrarNotificacion('Resultados actualizados', 'success');
    } catch (error) {
        console.error('Error al actualizar resultados:', error);
        mostrarNotificacion('Error al actualizar resultados', 'error');
    }
}

// 5. FUNCIÓN MOSTRAR NOTIFICACIÓN (COMPATIBILIDAD)
function mostrarNotificacion(mensaje, tipo = 'info') {
    // Si ya existe una función de notificación, usar esa
    if (window.mostrarNotificacion && window.mostrarNotificacion !== mostrarNotificacion) {
        return window.mostrarNotificacion(mensaje, tipo);
    }
    
    // Crear notificación simple
    const notificacion = document.createElement('div');
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${tipo === 'error' ? '#e74c3c' : 
                     tipo === 'success' ? '#27ae60' : 
                     tipo === 'warning' ? '#f39c12' : '#3498db'};
        color: white;
        border-radius: 5px;
        z-index: 10000;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        if (notificacion.parentNode) {
            notificacion.parentNode.removeChild(notificacion);
        }
    }, 3000);
}

// 6. INICIALIZAR RESULTADOS
async function initResults() {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initResults, 100);
        });
        return;
    }
    
    // Cargar resultados iniciales
    await mostrarResultados();
    
    // Configurar botón de actualización
    const refreshBtn = document.getElementById('refresh-results');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', actualizarResultados);
    }
    
    // Si la sección de resultados ya está visible
    const resultsSection = document.getElementById('resultados');
    if (resultsSection && !resultsSection.hasAttribute('hidden')) {
        await mostrarResultados();
    }
}

// 7. AGREGAR FUNCIONES AL ÁMBITO GLOBAL
window.mostrarResultados = mostrarResultados;
window.actualizarResultados = actualizarResultados;
window.mostrarNotificacion = mostrarNotificacion;

// 8. AUTOINICIALIZACIÓN
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('✅ results.js inicializado - Usando cliente global de Supabase');
        initResults();
    });
} else {
    console.log('✅ results.js inicializado - Usando cliente global de Supabase');
    setTimeout(initResults, 100);
}