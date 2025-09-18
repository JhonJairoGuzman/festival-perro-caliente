// Configurar eventos de la interfaz
function configurarEventos() {
    // Tabs
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            cambiarTab(tabId);
        });
    });

    // Envío de comentarios
    const submitCommentBtn = document.getElementById('submit-comment');
    if (submitCommentBtn) {
        submitCommentBtn.addEventListener('click', agregarComentario);
    }
    
    // Contador de caracteres para comentarios
    const commentText = document.getElementById('comment-text');
    if (commentText) {
        commentText.addEventListener('input', function() {
            const maxLength = 500;
            const currentLength = this.value.length;
            const remaining = maxLength - currentLength;
            document.getElementById('char-remaining').textContent = remaining;
            
            if (remaining < 50) {
                document.getElementById('char-remaining').style.color = '#e31837';
            } else if (remaining < 100) {
                document.getElementById('char-remaining').style.color = '#f9a826';
            } else {
                document.getElementById('char-remaining').style.color = '#cccccc';
            }
        });
    }
    
    // Botón de mapa
    const mapButton = document.getElementById('map-button');
    if (mapButton) {
        mapButton.addEventListener('click', function() {
            window.open('https://www.google.com/maps/place/Planeta+Rica,+Córdoba/', '_blank');
        });
    }
    
    // Tecla Enter para enviar comentarios
    if (commentText) {
        commentText.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (submitCommentBtn) submitCommentBtn.click();
            }
        });
    }

    // Sidebar para móviles
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle && sidebarOverlay && sidebar) {
        // Abrir sidebar
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Cerrar sidebar
        function closeSidebar() {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        sidebarOverlay.addEventListener('click', closeSidebar);
        
        // Cerrar con Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebar.classList.contains('active')) {
                closeSidebar();
            }
        });
        
        // Navegación desde sidebar
        const sidebarTabs = sidebar.querySelectorAll('.tab-button');
        sidebarTabs.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                cambiarTab(tabId);
                closeSidebar();
            });
        });
    }
}

// Cambiar entre pestañas
async function cambiarTab(tabId) {
    // Desactivar todas las pestañas
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.hidden = true;
        content.classList.remove('active');
    });
    
    // Activar la pestaña seleccionada
    const selectedButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
    const selectedContent = document.getElementById(tabId);
    
    if (selectedButton && selectedContent) {
        selectedButton.classList.add('active');
        selectedButton.setAttribute('aria-selected', 'true');
        selectedContent.hidden = false;
        selectedContent.classList.add('active');
        
        // Scroll suave al principio de la sección
        selectedContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Cargar contenido específico según la pestaña
        try {
            switch(tabId) {
                case 'resultados':
                    if (typeof mostrarResultados === 'function') await mostrarResultados();
                    break;
                case 'ganadores':
                    if (typeof mostrarGanadores === 'function') await mostrarGanadores();
                    break;
                case 'comentarios':
                    if (typeof mostrarComentarios === 'function') await mostrarComentarios();
                    break;
                case 'patrocinadores':
                    if (typeof mostrarPatrocinadores === 'function') await mostrarPatrocinadores();
                    break;
                case 'informacion':
                    if (typeof actualizarInfoVentas === 'function') await actualizarInfoVentas();
                    if (typeof actualizarUIventas === 'function') actualizarUIventas();
                    break;
            }
        } catch (error) {
            console.error(`Error al cargar la pestaña ${tabId}:`, error);
        }
    }
}

// Función para verificar si el festival ha terminado
function verificarFinFestival() {
    const hoy = new Date();
    const finFestival = new Date(festivalData.fechaFin);
    finFestival.setHours(23, 59, 59, 999); // Final del último día
    
    if (hoy > finFestival) {
        const votacionTab = document.querySelector('[data-tab="votacion"]');
        const resultadosTab = document.querySelector('[data-tab="resultados"]');
        
        if (votacionTab) {
            votacionTab.style.opacity = '0.5';
            votacionTab.style.pointerEvents = 'none';
            votacionTab.title = 'El festival ha terminado. La votación está cerrada.';
        }
        
        if (resultadosTab) {
            resultadosTab.click(); // Mostrar resultados automáticamente
        }
        
        mostrarNotificacion('¡El festival ha terminado! Consulta los resultados finales.', 'info');
    }
}

// Función para verificar actualización diaria
function verificarActualizacionDiaria() {
    const hoy = new Date().toDateString();
    const ultimaActualizacion = localStorage.getItem('ultimaActualizacion');
    
    if (ultimaActualizacion !== hoy) {
        localStorage.setItem('ultimaActualizacion', hoy);
        
        // Aquí podrías agregar lógica para resetear votos diarios si es necesario
        // Por ejemplo, si quieres permitir un voto por día por usuario
    }
}

// Inicializar la aplicación
async function initApp() {
    console.log('Inicializando Festival del Perro Caliente...');
    
    try {
        // Primero inicializar los datos locales
        if (typeof inicializarDatos === 'function') inicializarDatos();
        
        // Inicializar Supabase
        if (typeof initializeDatabase === 'function') {
            await initializeDatabase();
        }
        
        // Configurar eventos
        if (typeof configurarEventos === 'function') configurarEventos();
        
        // Mostrar contenido inicial
        if (typeof actualizarContador === 'function') actualizarContador();
        if (typeof mostrarPerros === 'function') await mostrarPerros();
        if (typeof mostrarPatrocinadores === 'function') await mostrarPatrocinadores();
        
        // Configurar intervalos
        if (typeof actualizarContador === 'function') {
            setInterval(actualizarContador, 1000);
        }
        
        if (typeof verificarActualizacionDiaria === 'function') {
            setInterval(verificarActualizacionDiaria, 60000); // Cada minuto
        }
        
        console.log('Aplicación inicializada correctamente');
        
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
        mostrarNotificacion('Error al cargar la aplicación. Por favor, recarga la página.', 'error');
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Pequeño delay para asegurar que todos los recursos estén cargados
    setTimeout(initApp, 100);
});

// Manejar errores no capturados
window.addEventListener('error', function(e) {
    console.error('Error no capturado:', e.error);
    mostrarNotificacion('Ocurrió un error inesperado. Por favor, recarga la página.', 'error');
});

// Manejar promesas rechazadas no capturadas
window.addEventListener('unhandledrejection', function(e) {
    console.error('Promesa rechazada no capturada:', e.reason);
    mostrarNotificacion('Ocurrió un error inesperado. Por favor, recarga la página.', 'error');
    e.preventDefault();
});