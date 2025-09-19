// main.js - Versión corregida para evitar conflictos con otros archivos

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
    if (submitCommentBtn && window.agregarComentario) {
        submitCommentBtn.addEventListener('click', window.agregarComentario);
    }
    
    // Contador de caracteres para comentarios
    const commentText = document.getElementById('comment-text');
    if (commentText) {
        commentText.addEventListener('input', function() {
            const maxLength = 500;
            const currentLength = this.value.length;
            const remaining = maxLength - currentLength;
            const charRemaining = document.getElementById('char-remaining');
            
            if (charRemaining) {
                charRemaining.textContent = remaining;
                
                if (remaining < 50) {
                    charRemaining.style.color = '#e31837';
                } else if (remaining < 100) {
                    charRemaining.style.color = '#f9a826';
                } else {
                    charRemaining.style.color = '#cccccc';
                }
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
    if (commentText && window.agregarComentario) {
        commentText.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                window.agregarComentario();
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
                    if (typeof window.mostrarResultados === 'function') await window.mostrarResultados();
                    break;
                case 'ganadores':
                    if (typeof window.mostrarGanadores === 'function') await window.mostrarGanadores();
                    break;
                case 'comentarios':
                    if (typeof window.mostrarComentarios === 'function') await window.mostrarComentarios();
                    break;
                case 'patrocinadores':
                    if (typeof window.mostrarPatrocinadores === 'function') await window.mostrarPatrocinadores();
                    break;
                case 'informacion':
                    if (typeof window.actualizarInfoVentas === 'function') await window.actualizarInfoVentas();
                    if (typeof window.actualizarUIventas === 'function') window.actualizarUIventas();
                    break;
                case 'votacion':
                    if (typeof window.mostrarPerros === 'function') await window.mostrarPerros();
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
    const finFestival = new Date(window.festivalData?.fechaFin || '2025-10-05');
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
        
        if (typeof window.mostrarNotificacion === 'function') {
            window.mostrarNotificacion('¡El festival ha terminado! Consulta los resultados finales.', 'info');
        }
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

// Función para mostrar notificaciones (compatibilidad)
function mostrarNotificacion(mensaje, tipo = 'info') {
    // Si ya existe una función de notificación, usar esa
    if (window.mostrarNotificacion && window.mostrarNotificacion !== mostrarNotificacion) {
        return window.mostrarNotificacion(mensaje, tipo);
    }
    
    // Crear notificación básica
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
    }, 5000);
}

// Inicializar la aplicación
async function initApp() {
    console.log('Inicializando Festival del Perro Caliente...');
    
    try {
        // Primero inicializar los datos locales
        if (typeof window.inicializarDatos === 'function') window.inicializarDatos();
        
        // Inicializar Supabase
        if (typeof window.initializeDatabase === 'function') {
            await window.initializeDatabase();
        }
        
        // Configurar eventos
        if (typeof configurarEventos === 'function') configurarEventos();
        
        // Mostrar contenido inicial
        if (typeof window.actualizarContador === 'function') window.actualizarContador();
        if (typeof window.mostrarPerros === 'function') await window.mostrarPerros();
        if (typeof window.mostrarPatrocinadores === 'function') await window.mostrarPatrocinadores();
        
        // Verificar fin del festival
        verificarFinFestival();
        
        // Configurar intervalos
        if (typeof window.actualizarContador === 'function') {
            setInterval(window.actualizarContador, 1000);
        }
        
        setInterval(verificarActualizacionDiaria, 60000); // Cada minuto
        
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

// Añadir funciones al ámbito global
window.cambiarTab = cambiarTab;
window.configurarEventos = configurarEventos;
window.mostrarNotificacion = mostrarNotificacion;