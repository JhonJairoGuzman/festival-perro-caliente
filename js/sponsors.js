// Mostrar patrocinadores
function mostrarPatrocinadores() {
    const container = document.getElementById('sponsors-container');
    if (!container) return;
    
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
                descripcion: "desarrollo web a medida",
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
            card.innerHTML = `
                <div class="sponsor-logo">
                    <img src="${patrocinador.imagen}" alt="${patrocinador.nombre}" loading="lazy">
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
    }, 800);
}