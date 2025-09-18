// voting.js - Versión corregida para solucionar error de votación

// Mostrar perros para votar
async function mostrarPerros() {
    const container = document.getElementById('perros-container');
    if (!container) return;
    
    // Mostrar estado de carga
    container.innerHTML = '<div class="loading">Cargando opciones...</div>';
    
    try {
        // Obtener datos de Supabase
        const perros = await getHotdogs();
        
        container.innerHTML = '';
        
        // Verificar que hay datos
        if (!perros || perros.length === 0) {
            container.innerHTML = '<div class="error-message">No hay participantes disponibles</div>';
            return;
        }
        
        console.log('Mostrando', perros.length, 'participantes');
        
        // Mostrar todos los perros
        perros.forEach(perro => {
            const card = document.createElement('div');
            card.className = 'card';
            
            // Crear el HTML con logo redondo e imagen grande
            card.innerHTML = `
                <div class="card-image-container">
                    <img src="${perro.imagen || 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=400&h=300&fit=crop'}" 
                         alt="${perro.nombre}" class="card-image" loading="lazy">
                    <div class="card-logo">
                        <img src="${perro.logo}" alt="Logo de ${perro.negocio}" class="logo-circle"
                             onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRkZGN0U3Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxPR088L3RleHQ+PC9zdmc+'; this.alt='Logo no disponible'">
                    </div>
                </div>
                <div class="card-content">
                    <h4>${perro.nombre}</h4>
                    <p>${perro.descripcion || 'Delicioso perro caliente'}</p>
                    
                    <div class="ingredients">
                        ${perro.ingredientes && perro.ingredientes.filter(ing => ing && ing.trim() !== '').map(ing => 
                            `<span class="ingredient-tag">${ing}</span>`).join('')}
                    </div>
                    
                    <div class="business-info">
                        <p><strong>${perro.negocio || 'Establecimiento por definir'}</strong></p>
                        <p><i class="fas fa-map-marker-alt"></i> ${perro.direccion || 'Dirección por definir'}</p>
                        <p><i class="fas fa-phone"></i> ${perro.telefono || 'Teléfono por definir'}</p>
                        <p><i class="fas fa-hashtag"></i> ${perro.redes ? perro.redes.join(' ') : '@redsocial'}</p>
                        <p><i class="fas fa-poll"></i> Votos: ${perro.votos || 0}</p>
                    </div>
                    
                    <button class="vote-btn" data-type="perro" data-id="${perro.id}">
                        <i class="fas fa-vote-yea"></i> Votar por este perro
                    </button>
                </div>
            `;
            container.appendChild(card);
        });
        
        // Agregar eventos a los botones de votación
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

// Función para votar por un perro caliente (VERSIÓN CORREGIDA)
async function votar(tipo, id) {
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
    
    // Registrar el voto en Supabase
    if (tipo === 'perro') {
        try {
            // Obtener votos actuales
            const { data: perro, error: fetchError } = await supabase
                .from('hotdogs')
                .select('votes')
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

            // Obtener el perro actualizado para mostrar en la notificación
            const perros = await getHotdogs();
            const perroActualizado = perros.find(p => p.id === id);
            
            if (perroActualizado) {
                mostrarNotificacion(`¡Voto registrado para ${perroActualizado.nombre} de ${perroActualizado.negocio || 'el establecimiento'}!`, 'success');
                
                // Efecto de confeti para celebrar el voto
                if (typeof crearConfeti === 'function') {
                    crearConfeti();
                }
                
                // Registrar una venta por cada voto (simulación)
                const diaActual = obtenerDiaActualDelFestival();
                if (diaActual > 0 && diaActual <= 4) {
                    actualizarVentas(diaActual, 1);
                }
                
                // Actualizar la UI localmente
                const perroElement = document.querySelector(`[data-id="${id}"]`)?.closest('.card');
                if (perroElement) {
                    const votosElement = perroElement.querySelector('.business-info p:last-child');
                    if (votosElement) {
                        votosElement.innerHTML = `<i class="fas fa-poll"></i> Votos: ${nuevosVotos}`;
                    }
                }
            }
            
            // Guardar que el usuario votó hoy
            votosHoy[tipo] = { fecha: hoy };
            try {
                localStorage.setItem('votosHoy', JSON.stringify(votosHoy));
            } catch (e) {
                console.error("Error al guardar voto:", e);
            }
            
            // Actualizar resultados si están visibles
            if (document.getElementById('resultados') && !document.getElementById('resultados').hasAttribute('hidden')) {
                if (typeof mostrarResultados === 'function') {
                    mostrarResultados();
                }
            }
            
            // Actualizar estadísticas si están visibles
            if (document.getElementById('informacion') && !document.getElementById('informacion').hasAttribute('hidden')) {
                if (typeof actualizarInfoVentas === 'function') {
                    actualizarInfoVentas();
                }
            }
            
        } catch (error) {
            console.error("Error al votar:", error);
            mostrarNotificacion(`Error al registrar tu voto: ${error.message}`, "error");
        }
    }
}

// Función para obtener el día actual del festival
function obtenerDiaActualDelFestival() {
    const hoy = new Date();
    const inicio = new Date(festivalData.fechaInicio);
    
    if (hoy < inicio) return 0; // Festival no ha comenzado
    
    const diffTiempo = hoy - inicio;
    const diffDias = Math.floor(diffTiempo / (1000 * 60 * 60 * 24)) + 1;
    
    return Math.min(diffDias, 4); // Máximo 4 días
}

// Función para actualizar ventas
function actualizarVentas(dia, cantidad) {
    if (dia >= 1 && dia <= 4) {
        festivalData.ventas[`dia${dia}`] += cantidad;
        festivalData.ventas.total += cantidad;
        if (typeof guardarDatos === 'function') {
            guardarDatos();
        }
        actualizarUIventas();
        return true;
    }
    return false;
}

// Función para actualizar la UI de ventas
function actualizarUIventas() {
    const ventasDia1 = festivalData.ventas.dia1 || 0;
    const ventasDia2 = festivalData.ventas.dia2 || 0;
    const ventasDia3 = festivalData.ventas.dia3 || 0;
    const ventasDia4 = festivalData.ventas.dia4 || 0;
    const ventasTotales = festivalData.ventas.total || 0;
    
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

// Función para simular ventas (para pruebas)
function simularVentas() {
    const diaActual = obtenerDiaActualDelFestival();
    
    if (diaActual > 0 && diaActual <= 4) {
        // Simular entre 50 y 200 ventas por día
        const ventasSimuladas = Math.floor(Math.random() * 151) + 50;
        actualizarVentas(diaActual, ventasSimuladas);
    }
}

// Función para actualizar información de ventas en la UI
async function actualizarInfoVentas() {
    const totalVotosElement = document.getElementById('total-votos');
    const totalParticipantesElement = document.getElementById('total-participantes');
    const statsDetalleElement = document.getElementById('stats-detalle');
    
    if (totalVotosElement && totalParticipantesElement && statsDetalleElement) {
        try {
            const perros = await getHotdogs();
            const totalVotos = perros.reduce((sum, perro) => sum + (perro.votos || 0), 0);
            totalVotosElement.textContent = `${totalVotos} votos registrados`;
            
            totalParticipantesElement.textContent = perros.length;
            
            // Ordenar por votos
            const perrosOrdenados = [...perros].sort((a, b) => (b.votos || 0) - (a.votos || 0));
            
            statsDetalleElement.innerHTML = '';
            perrosOrdenados.forEach(perro => {
                const statItem = document.createElement('p');
                statItem.innerHTML = `
                    <span>${perro.negocio || 'Establecimiento'}</span>
                    <span class="votos-cantidad">${perro.votos || 0} votos</span>
                `;
                statsDetalleElement.appendChild(statItem);
            });
        } catch (error) {
            console.error('Error al actualizar estadísticas:', error);
        }
    }
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = 'info') {
    // Buscar si ya existe una notificación
    let notificacion = document.querySelector('.notification');
    
    // Si no existe, crearla
    if (!notificacion) {
        notificacion = document.createElement('div');
        notificacion.className = 'notification';
        document.body.appendChild(notificacion);
    }
    
    // Configurar la notificación
    notificacion.textContent = mensaje;
    notificacion.className = `notification ${tipo}`;
    
    // Mostrar la notificación
    notificacion.style.display = 'block';
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notificacion.style.display = 'none';
    }, 3000);
}

// Inicializar la sección de votación
async function initVoting() {
    await mostrarPerros();
    
    // Configurar el evento para el botón de simular ventas (solo para desarrollo)
    const simularBtn = document.getElementById('simular-ventas');
    if (simularBtn && typeof simularVentas === 'function') {
        simularBtn.addEventListener('click', simularVentas);
    }
    
    // Actualizar información de ventas
    if (typeof actualizarInfoVentas === 'function') {
        actualizarInfoVentas();
    }
}