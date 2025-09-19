// sidebar.js - Versión corregida para evitar errores y mejorar compatibilidad

// Funcionalidad del sidebar para móviles
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    // Verificar que los elementos existan
    if (!sidebar || !sidebarOverlay || !sidebarToggle) {
        console.log('❌ Elementos del sidebar no encontrados');
        return;
    }
    
    // Alternar sidebar
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }
    
    // Event listeners
    sidebarToggle.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', toggleSidebar);
    
    // Cerrar sidebar al seleccionar una pestaña
    const tabButtons = sidebar.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Esperar un poco para que se vea la transición
            setTimeout(toggleSidebar, 300);
            
            // Activar la pestaña correspondiente
            const tab = this.getAttribute('data-tab');
            const mainTabButton = document.querySelector(`.main-nav .tab-button[data-tab="${tab}"]`);
            if (mainTabButton) {
                mainTabButton.click();
            }
        });
    });
    
    // Cerrar sidebar con la tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            toggleSidebar();
        }
    });
    
    console.log('✅ Sidebar inicializado correctamente');
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // Pequeño delay para asegurar que todos los elementos estén cargados
        setTimeout(initSidebar, 100);
    });
} else {
    // El DOM ya está listo
    setTimeout(initSidebar, 100);
}

// Añadir función al ámbito global para que pueda ser llamada desde otros archivos
window.initSidebar = initSidebar;