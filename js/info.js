// Actualizar información de estadísticas
function actualizarInfoVentas() {
    const totalVotosElement = document.getElementById('total-votos');
    const totalParticipantesElement = document.getElementById('total-participantes');
    const statsDetalleElement = document.getElementById('stats-detalle');
    
    if (totalVotosElement && totalParticipantesElement && statsDetalleElement) {
        const totalVotos = festivalData.perros.reduce((sum, perro) => sum + perro.votos, 0);
        totalVotosElement.textContent = `${totalVotos} votos registrados`;
        
        totalParticipantesElement.textContent = festivalData.perros.length;
        
        // Ordenar por votos (solo mostrar top 5 para no saturar)
        const perrosOrdenados = [...festivalData.perros].sort((a, b) => b.votos - a.votos).slice(0, 5);
        
        statsDetalleElement.innerHTML = '';
        
        if (perrosOrdenados.length === 0) {
            statsDetalleElement.innerHTML = '<p class="no-stats">Aún no hay votos registrados</p>';
            return;
        }
        
        perrosOrdenados.forEach((perro, index) => {
            const statItem = document.createElement('div');
            statItem.className = 'stat-item';
            statItem.innerHTML = `
                <span class="stat-rank">${index + 1}.</span>
                <span class="stat-name">${perro.negocio}</span>
                <span class="stat-votes">${perro.votos} votos</span>
            `;
            statsDetalleElement.appendChild(statItem);
        });
        
        // Mostrar mensaje si hay más participantes
        if (festivalData.perros.length > 5) {
            const masParticipantes = document.createElement('p');
            masParticipantes.className = 'more-participants';
            masParticipantes.textContent = `...y ${festivalData.perros.length - 5} establecimientos más`;
            statsDetalleElement.appendChild(masParticipantes);
        }
    }
}

// Actualizar información del festival
function actualizarInfo() {
    actualizarInfoVentas();
    actualizarUIventas();
    
    // Actualizar contador regresivo
    actualizarCountdown();
    
    // Configurar botón del mapa
    const mapButton = document.getElementById('map-button');
    if (mapButton) {
        mapButton.addEventListener('click', () => {
            window.open('https://www.google.com/maps/place/Planeta+Rica,+Córdoba/', '_blank');
        });
    }
}

// Actualizar contador regresivo
function actualizarCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    const ahora = new Date();
    const inicioFestival = new Date(festivalData.fechaInicio);
    
    if (ahora >= inicioFestival) {
        // Festival en curso
        const finFestival = new Date(festivalData.fechaFin);
        finFestival.setHours(23, 59, 59);
        
        if (ahora <= finFestival) {
            const diff = finFestival - ahora;
            const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            
            countdownElement.innerHTML = `
                <span class="countdown-label">¡Festival en curso!</span>
                <div class="countdown-timer">
                    <span class="countdown-digit">${dias}</span>d 
                    <span class="countdown-digit">${horas}</span>h 
                    <span class="countdown-digit">${minutos}</span>m
                </div>
                <span class="countdown-sublabel">Para que finalice</span>
            `;
        } else {
            countdownElement.innerHTML = `
                <span class="countdown-label">¡Festival concluido!</span>
                <span class="countdown-sublabel">Gracias por participar</span>
            `;
        }
    } else {
        // Festival por comenzar
        const diff = inicioFestival - ahora;
        const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        countdownElement.innerHTML = `
            <span class="countdown-label">Faltan</span>
            <div class="countdown-timer">
                <span class="countdown-digit">${dias}</span>d 
                <span class="countdown-digit">${horas}</span>h 
                <span class="countdown-digit">${minutos}</span>m
            </div>
            <span class="countdown-sublabel">Para el festival</span>
        `;
    }
}