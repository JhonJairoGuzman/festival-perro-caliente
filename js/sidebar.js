// Funcionalidad del sidebar para móviles
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const tabButtons = document.querySelectorAll('.sidebar .tab-button');
    
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
});