// sponsors.js - Versión corregida para evitar errores y mejorar compatibilidad

// Mostrar patrocinadores
function mostrarPatrocinadores() {
    const container = document.getElementById('sponsors-container');
    if (!container) {
        console.log('❌ Contenedor de patrocinadores no encontrado');
        return;
    }
    
    // Mostrar estado de carga
    container.innerHTML = '<div class="loading">Cargando patrocinadores...</div>';
    
    // Simular carga con setTimeout para mejor UX
    setTimeout(() => {
        container.innerHTML = '';
        
        // PATROCINADORES CON IMÁGENES LOCALES
        const patrocinadoresEjemplo = [
            {
                nombre: "Distri Salsas",
                imagen: "img/distrisalsas.png",
                descripcion: "Especialistas en salsas y condimentos",
                direccion: "Calle de los Sabores #123",
                telefono: "+57 321 654 9870",
                redes: ["@distrisalsas", "#saborsalsas"],
            },
            {
                nombre: "Nissi",
                imagen: "img/Logo Nissi.png",
                descripcion: "Innovación y calidad en productos",
                direccion: "Avenida Creativa #456",
                telefono: "+57 310 555 1234",
                redes: ["@nissioficial", "#innovacionnissi"],
            },
            {
                nombre: "Oye JB",
                imagen: "img/Logo oye JB.png",
                descripcion: "Música y entretenimiento para todos",
                direccion: "Boulevard Musical #789",
                telefono: "+57 315 777 8888",
                redes: ["@oyejb", "#musicaoye"],
            },
            {
                nombre: "Salsamentaria",
                imagen: "img/SALSAMENTARIA.png",
                descripcion: "Los mejores embutidos y carnes",
                direccion: "Carnicería Principal #101",
                telefono: "+57 320 444 5678",
                redes: ["@salsamentaria", "#carnesquality"],
            },
            {
                nombre: "Next",
                imagen: "img/next.jpg",
                descripcion: "Desarrollo web a medida",
                direccion: "Empresa virtual #202",
                telefono: "322-615-5457  -   314-695-8058",
                redes: ["@nextcol", "#futuronext"],
            }
        ];
        
        if (patrocinadoresEjemplo.length === 0) {
            container.innerHTML = `
                <div class="no-sponsors">
                    <i class="fas fa-handshake" style="font-size: 3rem; color: #f9a826; margin-bottom: 1rem;"></i>
                    <p>Próximamente anunciaremos a nuestros patrocinadores.</p>
                </div>
            `;
            return;
        }
        
        patrocinadoresEjemplo.forEach(patrocinador => {
            const card = document.createElement('div');
            card.className = 'sponsor-card';
            
            // Manejar imágenes que puedan no cargar
            const imagenHTML = patrocinador.imagen ? 
                `<img src="${patrocinador.imagen}" alt="${patrocinador.nombre}" loading="lazy" onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRkZGN0U3Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxPR088L3RleHQ+PC9zdmc+'; this.alt='Logo no disponible'">` :
                `<div class="sponsor-placeholder">${patrocinador.nombre.charAt(0)}</div>`;
            
            card.innerHTML = `
                <div class="sponsor-logo">
                    ${imagenHTML}
                </div>
                <h4>${patrocinador.nombre}</h4>
                <p>${patrocinador.descripcion}</p>
                
                <div class="sponsor-info">
                    <p><i class="fas fa-map-marker-alt"></i> ${patrocinador.direccion}</p>
                    <p><i class="fas fa-phone"></i> ${patrocinador.telefono}</p>
                    <p><i class="fas fa-hashtag"></i> ${patrocinador.redes.join(' ')}</p>
                </div>
                
                <div class="sponsor-social">
                    <a href="https://www.instagram.com/next_dwa/" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                    <a href="https://wa.me/+573146958058" target="_blank" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
                </div>
            `;
            container.appendChild(card);
        });
        
        console.log('✅ Patrocinadores cargados correctamente');
    }, 800);
}

// Añadir función al ámbito global
window.mostrarPatrocinadores = mostrarPatrocinadores;

// Inicializar cuando se accede a la pestaña de patrocinadores
function initSponsors() {
    // Verificar si estamos en la pestaña de patrocinadores
    const sponsorsTab = document.querySelector('[data-tab="patrocinadores"]');
    const sponsorsSection = document.getElementById('patrocinadores');
    
    if (sponsorsTab && sponsorsSection && !sponsorsSection.hasAttribute('hidden')) {
        mostrarPatrocinadores();
    }
    
    // Configurar evento para cuando se haga clic en la pestaña
    if (sponsorsTab) {
        sponsorsTab.addEventListener('click', mostrarPatrocinadores);
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(initSponsors, 100);
    });
} else {
    setTimeout(initSponsors, 100);
}