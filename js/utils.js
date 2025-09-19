// utils.js - Versión corregida para evitar errores y mejorar compatibilidad

// Mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = 'success') {
    // Si ya existe una función de notificación, usar esa
    if (window.mostrarNotificacion && window.mostrarNotificacion !== mostrarNotificacion) {
        return window.mostrarNotificacion(mensaje, tipo);
    }
    
    const notification = document.getElementById('notification');
    if (!notification) {
        // Crear notificación si no existe
        const notificationElement = document.createElement('div');
        notificationElement.id = 'notification';
        notificationElement.className = 'notification';
        document.body.appendChild(notificationElement);
        return mostrarNotificacion(mensaje, tipo); // Llamar recursivamente
    }
    
    // Agregar icono según el tipo
    let icono = '';
    switch(tipo) {
        case 'success':
            icono = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icono = '<i class="fas fa-exclamation-circle"></i>';
            break;
        case 'warning':
            icono = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        case 'info':
            icono = '<i class="fas fa-info-circle"></i>';
            break;
        default:
            icono = '<i class="fas fa-bell"></i>';
    }
    
    notification.innerHTML = `${icono} ${mensaje}`;
    notification.className = `notification ${tipo}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// Crear efecto de confeti
function crearConfeti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    document.body.appendChild(confettiContainer);
    
    // Colores del confeti (rojo, amarillo, blanco)
    const colors = ['#e31837', '#f9a826', '#ffffff'];
    
    // Crear partículas de confeti
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.top = '-10px';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.opacity = '0';
        
        confettiContainer.appendChild(confetti);
        
        // Animación
        const animation = confetti.animate([
            { 
                top: '-10px',
                opacity: 0,
                transform: 'rotate(0deg)'
            },
            { 
                top: '25%',
                opacity: 1,
                transform: 'rotate(180deg)'
            },
            { 
                top: '100%',
                opacity: 0,
                transform: 'rotate(360deg)'
            }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
        });
        
        // Eliminar después de la animación
        animation.onfinish = () => {
            confetti.remove();
        };
    }
    
    // Eliminar contenedor después de 5 segundos
    setTimeout(() => {
        if (confettiContainer.parentNode) {
            confettiContainer.remove();
        }
    }, 5000);
}

// Crear partículas de fondo
function crearParticulas() {
    // Verificar si ya existen partículas
    if (document.querySelector('.background-particles')) {
        return;
    }
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'background-particles';
    document.body.appendChild(particlesContainer);
    
    // Crear partículas
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Tamaño y posición aleatorios
        const size = Math.random() * 10 + 2;
        const posX = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 15;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        // Color aleatorio (rojo, amarillo o naranja)
        const colors = [
            'rgba(227, 24, 55, 0.5)',
            'rgba(249, 168, 38, 0.5)',
            'rgba(255, 140, 0, 0.5)'
        ];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
}

// Actualizar contador regresivo
function actualizarContador() {
    // Usar window.festivalData para compatibilidad
    const festivalData = window.festivalData || { 
        fechaInicio: '2025-10-02', 
        fechaFin: '2025-10-05' 
    };
    
    const ahora = new Date();
    const inicioFestival = new Date(festivalData.fechaInicio);
    const finFestival = new Date(festivalData.fechaFin);
    finFestival.setHours(23, 59, 59, 999);
    
    let mensaje = '';
    let estado = '';
    
    if (ahora > finFestival) {
        mensaje = 'El festival ha concluido. ¡Gracias por participar!';
        estado = 'finalizado';
    } else if (ahora < inicioFestival) {
        // El festival aún no ha comenzado
        const diferencia = inicioFestival - ahora;
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
        
        mensaje = `El festival inicia en: ${dias}d ${horas}h ${minutos}m ${segundos}s`;
        estado = 'proximamente';
    } else {
        // El festival está en curso
        const diferencia = finFestival - ahora;
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
        
        mensaje = `El festival termina en: ${dias}d ${horas}h ${minutos}m ${segundos}s`;
        estado = 'en-curso';
    }
    
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        countdownElement.textContent = mensaje;
        countdownElement.className = 'countdown ' + estado;
    }
}

// Verificar si es necesario actualizar (cada 24 horas)
function verificarActualizacionDiaria() {
    // Usar window.festivalData para compatibilidad
    const festivalData = window.festivalData || { 
        ultimaActualizacion: new Date().toISOString() 
    };
    
    const ahora = new Date();
    const ultimaActualizacion = new Date(festivalData.ultimaActualizacion || new Date());
    const horasDesdeUltimaActualizacion = (ahora - ultimaActualizacion) / (1000 * 60 * 60);
    
    if (horasDesdeUltimaActualizacion >= 24) {
        // Reiniciar votos diarios en localStorage
        localStorage.removeItem('votosHoy');
        
        // Actualizar fecha de última actualización
        festivalData.ultimaActualizacion = ahora.toISOString();
        
        // Guardar datos si la función existe
        if (typeof window.guardarDatos === 'function') {
            window.guardarDatos();
        }
        
        mostrarNotificacion('¡El sistema se ha actualizado! Ya puedes votar nuevamente.', 'info');
    }
}

// Añadir funciones al ámbito global
window.mostrarNotificacion = mostrarNotificacion;
window.crearConfeti = crearConfeti;
window.crearParticulas = crearParticulas;
window.actualizarContador = actualizarContador;
window.verificarActualizacionDiaria = verificarActualizacionDiaria;

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('✅ utils.js inicializado');
        // Crear partículas de fondo
        setTimeout(crearParticulas, 1000);
    });
} else {
    console.log('✅ utils.js inicializado');
    setTimeout(crearParticulas, 1000);
}