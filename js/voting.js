// voting.js - Versión corregida - Fecha: 18/09/2025

// 1. USAR CLIENTE GLOBAL DE SUPABASE CON VERIFICACIÓN
const supabase = window.supabaseClient || null;

// 2. DEFINIR festivalData SI NO EXISTE
const festivalData = window.festivalData || {
    fechaInicio: '2025-09-18', // FECHA ACTUAL DEL FESTIVAL
    ventas: {
        dia1: 0, dia2: 0, dia3: 0, dia4: 0, total: 0
    }
};

// 3. FUNCIÓN getHotdogs() (AGREGAR SI NO EXISTE)
async function getHotdogs() {
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
            console.error('Error obteniendo perros:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error inesperado:', error);
        return [];
    }
}

// 4. FUNCIÓN VOTAR CORREGIDA
async function votar(tipo, id) {
    console.log('Intentando votar por:', tipo, id);
    
    // Verificar que Supabase esté disponible
    if (!supabase) {
        mostrarNotificacion('Error: Sistema de votación no disponible en este momento', 'error');
        return;
    }
    
    const hoy = new Date().toDateString();
    let votosHoy = {};
    
    try {
        votosHoy = JSON.parse(localStorage.getItem('votosHoy') || '{}');
    } catch (e) {
        console.error("Error al leer votos:", e);
        votosHoy = {};
    }
    
    // Verificar si el usuario ya votó hoy
    if (votosHoy[tipo] && votosHoy[tipo].fecha === hoy) {
        mostrarNotificacion('Ya has votado hoy. ¡Vuelve mañana!', 'error');
        return;
    }
    
    try {
        // Obtener votos actuales
        const { data: perro, error: fetchError } = await supabase
            .from('hotdogs')
            .select('votes, name, negocio')
            .eq('id', id)
            .single();

        if (fetchError) {
            throw new Error(`Error al obtener datos: ${fetchError.message}`);
        }

        // Incrementar votos
        const nuevosVotos = (perro.votes || 0) + 1;
        
        // Actualizar en la base de datos
        const { error: updateError } = await supabase
            .from('hotdogs')
            .update({ votes: nuevosVotos })
            .eq('id', id);

        if (updateError) {
            throw new Error(`Error al actualizar votos: ${updateError.message}`);
        }

        // Mostrar confirmación
        mostrarNotificacion(`¡Voto registrado para ${perro.name} de ${perro.negocio || 'el establecimiento'}!`, 'success');
        
        // Guardar que el usuario votó hoy
        votosHoy[tipo] = { fecha: hoy };
        localStorage.setItem('votosHoy', JSON.stringify(votosHoy));
        
        // Recargar los perros para actualizar la UI
        await mostrarPerros();
        
    } catch (error) {
        console.error("Error al votar:", error);
        mostrarNotificacion(`Error al registrar tu voto: ${error.message}`, "error");
    }
}

// 5. FUNCIÓN MOSTRAR NOTIFICACIÓN (MEJORADA)
function mostrarNotificacion(mensaje, tipo = 'info') {
    // Si ya existe una función de notificación, usar esa
    if (window.mostrarNotificacion && window.mostrarNotificacion !== mostrarNotificacion) {
        return window.mostrarNotificacion(mensaje, tipo);
    }
    
    // Crear notificación simple si no existe el sistema completo
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
        max-width: 300px;
    `;
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        if (notificacion.parentNode) {
            notificacion.parentNode.removeChild(notificacion);
        }
    }, 3000);
}

// 6. FUNCIÓN OBTENER DÍA ACTUAL (CORREGIDA)
function obtenerDiaActualDelFestival() {
    const hoy = new Date('2025-09-18'); // FECHA ACTUAL
    const inicio = new Date(festivalData.fechaInicio);
    
    if (hoy < inicio) return 0;
    
    const diffTiempo = hoy - inicio;
    const diffDias = Math.floor(diffTiempo / (1000 * 60 * 60 * 24)) + 1;
    
    return Math.min(diffDias, 4);
}

// 7. FUNCIÓN PARA MOSTRAR PERROS (MEJORADA)
async function mostrarPerros() {
    const container = document.getElementById('perros-container');
    if (!container) {
        console.error('No se encontró el contenedor de perros');
        return;
    }
    
    container.innerHTML = '<div class="loading">Cargando opciones...</div>';
    
    try {
        const perros = await getHotdogs();
        
        container.innerHTML = '';
        
        if (!perros || perros.length === 0) {
            container.innerHTML = '<div class="error-message">No hay participantes disponibles</div>';
            return;
        }
        
        console.log('Mostrando', perros.length, 'participantes');
        
        perros.forEach(perro => {
            const card = document.createElement('div');
            card.className = 'card';
            
            // Convertir datos de Supabase a formato español para UI
            const perroData = {
                id: perro.id,
                nombre: perro.name || 'Sin nombre',
                descripcion: perro.description || 'Delicioso perro caliente',
                ingredientes: perro.ingredientes || [],
                negocio: perro.negocio || 'Establecimiento por definir',
                direccion: perro.direccion || 'Dirección por definir',
                telefono: perro.telefono || 'Teléfono por definir',
                redes: perro.redes || ['@redsocial'],
                votos: perro.votes || 0,
                imagen: perro.image || 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=400&h=300&fit=crop',
                logo: perro.logo || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRkZGN0U3Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxPR088L3RleHQ+PC9zdmc+'
            };
            
            card.innerHTML = `
                <div class="card-image-container">
                    <img src="${perroData.imagen}" 
                         alt="${perroData.nombre}" class="card-image" loading="lazy"
                         onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=400&h=300&fit=crop'">
                    <div class="card-logo">
                        <img src="${perroData.logo}" alt="Logo de ${perroData.negocio}" class="logo-circle"
                             onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRkZGN0U3Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxPR088L3RleHQ+PC9zdmc+'; this.alt='Logo no disponible'">
                    </div>
                </div>
                <div class="card-content">
                    <h4>${perroData.nombre}</h4>
                    <p>${perroData.descripcion}</p>
                    
                    <div class="ingredients">
                        ${perroData.ingredientes.filter(ing => ing && ing.trim() !== '').map(ing => 
                            `<span class="ingredient-tag">${ing}</span>`).join('')}
                    </div>
                    
                    <div class="business-info">
                        <p><strong>${perroData.negocio}</strong></p>
                        <p><i class="fas fa-map-marker-alt"></i> ${perroData.direccion}</p>
                        <p><i class="fas fa-phone"></i> ${perroData.telefono}</p>
                        <p><i class="fas fa-hashtag"></i> ${perroData.redes.join(' ')}</p>
                        <p><i class="fas fa-poll"></i> Votos: ${perroData.votos}</p>
                    </div>
                    
                    <button class="vote-btn" data-type="perro" data-id="${perroData.id}">
                        <i class="fas fa-vote-yea"></i> Votar por este perro
                    </button>
                </div>
            `;
            container.appendChild(card);
        });
        
        // Configurar event listeners para botones de votación
        document.querySelectorAll('.vote-btn[data-type="perro"]').forEach(btn => {
            btn.addEventListener('click', async function() {
                const id = parseInt(this.getAttribute('data-id'));
                await votar('perro', id);
            });
        });
        
    } catch (error) {
        console.error('Error al cargar perros:', error);
        container.innerHTML = '<div class="error-message">Error al cargar los participantes. Intenta recargar la página.</div>';
    }
}

// 8. INICIALIZAR LA SECCIÓN DE VOTACIÓN
async function initVoting() {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initVoting, 100);
        });
        return;
    }
    
    await mostrarPerros();
}

// 9. AGREGAR FUNCIONES AL ÁMBITO GLOBAL
window.votar = votar;
window.mostrarPerros = mostrarPerros;
window.mostrarNotificacion = mostrarNotificacion;

// 10. AUTOINICIALIZACIÓN MEJORADA
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('✅ voting.js inicializado - Usando cliente global de Supabase');
        initVoting();
    });
} else {
    console.log('✅ voting.js inicializado - Usando cliente global de Supabase');
    setTimeout(initVoting, 100);
}