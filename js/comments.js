// comments.js - Versión corregida para usar cliente global de Supabase con manejo de errores

// Obtener comentarios desde Supabase
async function getComments() {
    try {
        // Verificar que Supabase esté disponible
        if (!window.supabaseClient) {
            console.error('❌ Error: Cliente de Supabase no inicializado');
            return [];
        }

        const { data, error } = await window.supabaseClient
            .from('comments')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error obteniendo comentarios:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error inesperado:', error);
        return [];
    }
}

// Guardar comentario en Supabase
async function saveComment(nombre, comentario) {
    try {
        // Verificar que Supabase esté disponible
        if (!window.supabaseClient) {
            console.error('❌ Error: Cliente de Supabase no inicializado');
            return false;
        }

        const { error } = await window.supabaseClient
            .from('comments')
            .insert([
                { 
                    name: nombre || 'Anónimo', 
                    comment: comentario,
                    created_at: new Date().toISOString()
                }
            ]);

        if (error) {
            console.error('Error guardando comentario:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error inesperado:', error);
        return false;
    }
}

// Mostrar comentarios
async function mostrarComentarios() {
    const contenedor = document.getElementById('comments-container');
    if (!contenedor) return;
    
    // Mostrar estado de carga
    contenedor.innerHTML = '<div class="loading">Cargando comentarios...</div>';
    
    try {
        // Obtener comentarios de Supabase
        const comentarios = await getComments();
        
        contenedor.innerHTML = '';
        
        if (!comentarios || comentarios.length === 0) {
            contenedor.innerHTML = `
                <div class="no-comments">
                    <i class="fas fa-comment-slash"></i>
                    <p>No hay comentarios todavía. ¡Sé el primero en comentar!</p>
                </div>
            `;
            return;
        }
        
        console.log('Mostrando', comentarios.length, 'comentarios');
        
        comentarios.forEach(comentario => {
            const elemento = document.createElement('div');
            elemento.className = 'comment';
            
            // Formatear fecha
            const fecha = new Date(comentario.created_at);
            const fechaFormateada = fecha.toLocaleString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            elemento.innerHTML = `
                <div class="comment-header">
                    <div class="comment-avatar">
                        ${comentario.name ? comentario.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div class="comment-user-info">
                        <span class="comment-user">${comentario.name || 'Usuario'}</span>
                        <span class="comment-date">${fechaFormateada}</span>
                    </div>
                </div>
                <div class="comment-text">${comentario.comment}</div>
                <div class="comment-actions">
                    <button class="btn-like" onclick="likeComment(${comentario.id})">
                        <i class="far fa-thumbs-up"></i> Me gusta
                    </button>
                </div>
            `;
            contenedor.appendChild(elemento);
        });
        
    } catch (error) {
        console.error('Error al cargar comentarios:', error);
        contenedor.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error al cargar los comentarios</p>
                <button onclick="mostrarComentarios()" class="btn-retry">
                    <i class="fas fa-redo"></i> Reintentar
                </button>
            </div>
        `;
    }
}

// Agregar comentario
async function agregarComentario() {
    const nombreInput = document.getElementById('comment-name');
    const textoInput = document.getElementById('comment-text');
    
    const nombre = nombreInput ? nombreInput.value.trim() : 'Anónimo';
    const texto = textoInput.value.trim();
    
    // Validaciones
    if (!texto) {
        mostrarNotificacion('Por favor escribe un comentario', 'error');
        return;
    }
    
    if (texto.length > 500) {
        mostrarNotificacion('El comentario no puede exceder los 500 caracteres', 'error');
        return;
    }
    
    if (nombre && nombre.length > 50) {
        mostrarNotificacion('El nombre no puede exceder los 50 caracteres', 'error');
        return;
    }
    
    try {
        // Guardar comentario en Supabase
        const success = await saveComment(nombre, texto);
        
        if (success) {
            // Limpiar formulario
            if (nombreInput) nombreInput.value = '';
            textoInput.value = '';
            document.getElementById('char-remaining').textContent = '500';
            
            mostrarNotificacion('¡Comentario publicado con éxito!', 'success');
            
            // Recargar comentarios
            await mostrarComentarios();
            
            // Scroll al primer comentario
            const primerComentario = document.querySelector('.comment');
            if (primerComentario) {
                primerComentario.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            mostrarNotificacion('Error al publicar el comentario. Intenta nuevamente.', 'error');
        }
        
    } catch (error) {
        console.error('Error al agregar comentario:', error);
        mostrarNotificacion('Error al publicar el comentario. Intenta nuevamente.', 'error');
    }
}

// Contador de caracteres
function actualizarContadorCaracteres() {
    const textoInput = document.getElementById('comment-text');
    if (!textoInput) return;
    
    const texto = textoInput.value;
    const contador = document.getElementById('char-remaining');
    if (!contador) return;
    
    const caracteresRestantes = 500 - texto.length;
    
    contador.textContent = caracteresRestantes;
    
    // Cambiar color según caracteres restantes
    if (caracteresRestantes < 50) {
        contador.style.color = '#e74c3c';
    } else if (caracteresRestantes < 100) {
        contador.style.color = '#f39c12';
    } else {
        contador.style.color = '#7f8c8d';
    }
}

// Función para mostrar notificaciones (si no existe)
function mostrarNotificacion(mensaje, tipo = 'info') {
    // Si ya existe una función de notificación, usar esa
    if (window.mostrarNotificacion && window.mostrarNotificacion !== mostrarNotificacion) {
        return window.mostrarNotificacion(mensaje, tipo);
    }
    
    // Crear notificación básica
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.textContent = mensaje;
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        z-index: 10000;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    if (tipo === 'error') {
        notificacion.style.background = '#e74c3c';
    } else if (tipo === 'success') {
        notificacion.style.background = '#27ae60';
    } else if (tipo === 'warning') {
        notificacion.style.background = '#f39c12';
    } else {
        notificacion.style.background = '#3498db';
    }
    
    document.body.appendChild(notificacion);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        if (notificacion.parentNode) {
            notificacion.parentNode.removeChild(notificacion);
        }
    }, 5000);
}

// Función para dar like a comentarios (opcional)
async function likeComment(commentId) {
    try {
        mostrarNotificacion('¡Gracias por tu like!', 'success');
    } catch (error) {
        console.error('Error al dar like:', error);
    }
}

// Inicializar la sección de comentarios
async function initComments() {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initComments, 100);
        });
        return;
    }
    
    // Cargar comentarios iniciales
    await mostrarComentarios();
    
    // Configurar evento para el botón de enviar comentario
    const submitBtn = document.getElementById('submit-comment');
    if (submitBtn) {
        submitBtn.addEventListener('click', agregarComentario);
    }
    
    // Configurar contador de caracteres
    const commentText = document.getElementById('comment-text');
    if (commentText) {
        commentText.addEventListener('input', actualizarContadorCaracteres);
        // Inicializar contador
        actualizarContadorCaracteres();
    }
    
    // Configurar envío con Enter (pero permitir Shift+Enter para nuevas líneas)
    if (commentText) {
        commentText.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                agregarComentario();
            }
        });
    }
    
    // Configurar evento para el tab de comentarios
    const comentariosTab = document.querySelector('[data-tab="comentarios"]');
    if (comentariosTab) {
        comentariosTab.addEventListener('click', async () => {
            await mostrarComentarios();
        });
    }
    
    // Si la sección de comentarios ya está visible, cargarla
    const comentariosSection = document.getElementById('comentarios');
    if (comentariosSection && !comentariosSection.hasAttribute('hidden')) {
        await mostrarComentarios();
    }
}

// Función para cargar más comentarios (paginación)
async function cargarMasComentarios() {
    try {
        mostrarNotificacion('Cargando más comentarios...', 'info');
        
        // Simular carga adicional
        setTimeout(async () => {
            await mostrarComentarios();
            mostrarNotificacion('Comentarios actualizados', 'success');
        }, 1000);
        
    } catch (error) {
        console.error('Error al cargar más comentarios:', error);
        mostrarNotificacion('Error al cargar más comentarios', 'error');
    }
}

// Añadir funciones al global
window.agregarComentario = agregarComentario;
window.likeComment = likeComment;
window.cargarMasComentarios = cargarMasComentarios;
window.mostrarComentarios = mostrarComentarios;

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('✅ comments.js inicializado - Usando cliente global de Supabase');
        initComments();
    });
} else {
    console.log('✅ comments.js inicializado - Usando cliente global de Supabase');
    initComments();
}