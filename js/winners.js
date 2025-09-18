// Funciones relacionadas con ganadores

// Determinar ganadores automáticamente
function determinarGanadores() {
    if (!festivalData.perros || festivalData.perros.length === 0) {
        festivalData.ganadores = [];
        return;
    }
    
    // Ordenar perros por votos (de mayor a menor)
    const perrosOrdenados = [...festivalData.perros].sort((a, b) => b.votos - a.votos);
    
    // Asignar premios a los primeros 3 puestos (solo si tienen votos)
    festivalData.ganadores = [];
    
    if (perrosOrdenados[0] && perrosOrdenados[0].votos > 0) {
        festivalData.ganadores.push({
            puesto: 1,
            perro: perrosOrdenados[0],
            premio: "Trofeo del Festival y $5.000.000"
        });
    }
    
    if (perrosOrdenados[1] && perrosOrdenados[1].votos > 0) {
        festivalData.ganadores.push({
            puesto: 2,
            perro: perrosOrdenados[1],
            premio: "Medalla de Plata y $3.000.000"
        });
    }
    
    if (perrosOrdenados[2] && perrosOrdenados[2].votos > 0) {
        festivalData.ganadores.push({
            puesto: 3,
            perro: perrosOrdenados[2],
            premio: "Medalla de Bronce y $1.000.000"
        });
    }
    
    // Guardar cambios
    guardarDatos();
}

// Mostrar ganadores en la UI
function mostrarGanadores() {
    const container = document.getElementById('winners-container');
    if (!container) return;
    
    container.innerHTML = '<div class="loading">Cargando ganadores...</div>';
    
    setTimeout(() => {
        container.innerHTML = '';
        
        // Determinar ganadores si no existen
        if (!festivalData.ganadores || festivalData.ganadores.length === 0) {
            determinarGanadores();
        }
        
        if (festivalData.ganadores.length === 0) {
            container.innerHTML = `
                <div class="no-winners">
                    <i class="fas fa-trophy" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <h3>Aún no hay ganadores</h3>
                    <p>¡Sé el primero en votar y ayuda a decidir los ganadores!</p>
                </div>
            `;
            return;
        }
        
        festivalData.ganadores.forEach(ganador => {
            const winnerCard = document.createElement('div');
            winnerCard.className = `winner-card winner-${ganador.puesto}`;
            
            winnerCard.innerHTML = `
                <div class="winner-medal">
                    ${ganador.puesto === 1 ? '🥇' : ganador.puesto === 2 ? '🥈' : '🥉'}
                </div>
                <div class="winner-image">
                    <img src="${ganador.perro.imagen}" alt="${ganador.perro.nombre}" loading="lazy">
                </div>
                <div class="winner-content">
                    <h3>${ganador.puesto}° Lugar</h3>
                    <h4>${ganador.perro.nombre}</h4>
                    <p class="winner-business">${ganador.perro.negocio}</p>
                    <p class="winner-votes">${ganador.perro.votos} votos</p>
                    <p class="winner-prize">${ganador.premio}</p>
                    <p class="winner-description">${ganador.perro.descripcion}</p>
                    
                    <div class="winner-ingredients">
                        ${ganador.perro.ingredientes.map(ing => `<span class="ingredient-tag">${ing}</span>`).join('')}
                    </div>
                    
                    <div class="winner-contact">
                        <p><i class="fas fa-map-marker-alt"></i> ${ganador.perro.direccion}</p>
                        <p><i class="fas fa-phone"></i> ${ganador.perro.telefono}</p>
                    </div>
                </div>
            `;
            
            container.appendChild(winnerCard);
        });
        
        // Mostrar mensaje si hay más participantes
        if (festivalData.perros.length > 3) {
            const otrosParticipantes = document.createElement('div');
            otrosParticipantes.className = 'other-participants';
            otrosParticipantes.innerHTML = `
                <p>Y ${festivalData.perros.length - 3} establecimientos más compitiendo...</p>
            `;
            container.appendChild(otrosParticipantes);
        }
    }, 500);
}
function mostrarGanadores() {
    const container = document.getElementById('winners-container');
    if (!container) return;
    
    // Mostrar estado de carga
    container.innerHTML = '<div class="loading">Cargando ganadores...</div>';
    
    // Simular carga con setTimeout para mejor UX
    setTimeout(() => {
        container.innerHTML = '';
        
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
            card.innerHTML = `
                <div class="winner-position ${ganador.puesto === 1 ? 'first' : ganador.puesto === 2 ? 'second' : 'third'}">
                    ${ganador.puesto}°
                </div>
                <img src="${ganador.perro.imagen}" alt="${ganador.perro.nombre}" class="winner-image">
                <h3 class="winner-name">${ganador.perro.nombre}</h3>
                <p class="winner-business">${ganador.perro.negocio}</p>
                <div class="winner-votes">${ganador.perro.votos} votos</div>
                <p class="winner-description">${ganador.perro.descripcion}</p>
                <div class="winner-prize">${ganador.premio}</div>
            `;
            container.appendChild(card);
        });
    }, 800);
}

// Verificar si el festival ha terminado para determinar ganadores
function verificarFinFestival() {
    const ahora = new Date();
    const finFestival = new Date(festivalData.fechaFin);
    finFestival.setHours(23, 59, 59, 999);
    
    if (ahora > finFestival && festivalData.ganadores.length === 0) {
        determinarGanadores();
        mostrarNotificacion('¡El festival ha terminado! Los ganadores han sido anunciados.', 'success');
    }
}