// 1. PRIMERO: Datos del festival (como respaldo local)
const festivalData = {
    fechaInicio: new Date('2025-10-02'),
    fechaFin: new Date('2025-10-05'),
    perros: [
        { 
            id: 1, 
            nombre: "Desafiante", 
            descripcion: "El perro caliente más completo y sabroso que desafía todos los límites", 
            ingredientes: ["Pan Brioche 25cm", "Salsa de la casa", "Papa ripio", "Chorizo de ternera", "Salchicha ranchera", "Pollo", "Cerdo", "Cebolla caramelizada en salsa BBQ", "Triple reacción de queso mozzarella", "Maíz tierno", "Jamón ahumado", "Tocineta", "Salsa especial ahumada"],            negocio: "the renacer",
            direccion: "Calle 17 carrera 16 barrio Villa Libia, detrás de la cancha",
            telefono: "3226155457",
            redes: ["@the_renacerpr"],
            votos: 0,
            imagen: "img/EL RENACERdesafiante.jpg",
            logo:  "logo/renacer.png" // ← Ruta correcta"
        },
        { 
            id: 2, 
            nombre: " El Calentón", 
            descripcion: "Caliente por fuera y cochino por dentro", 
            ingredientes: ["Pan Brioche", "base de salsa de la casa", "salchicha americana", "delicioso tocino carnudo en reduccion de corozo y serveza", "papa chongo", "gratinado de queso con maiz", "Coronado con cebolla crispi y encima salsa mayo chipotle de la casa", "Tocineta", "Maíz", ],
            negocio: "DELY PARK",
            direccion: "Cra 9 19-12, Parque Principal",
            telefono: "3155011579",
            redes: ["@delyparkplaneta"],
            votos: 0,
            imagen: "img/delyparkElCalenton.jpg",
            logo: "logo/delypark.png"
        },
        { 
            id: 3, 
            nombre: "club Dogo", 
            descripcion: "Un monumento de sabores: jugosas carnes, quesos derretidos, cebolla crujiente y salsa alioli, todo en un pan brioche esponjoso.", 
            ingredientes: ["Pan Brioche 25cm", "Salchicha Americana premium", "Pernil de cerdo en salsa Club Dogo", "Queso Cheddar Americano", "Queso costeño", "Cebolla salteada", "Crispy onion", "Mayonesa alioli"],            
            negocio: "Club Dogo",
            direccion: "calle 18 carrera 14, plazoleta del divino niño",
            telefono: "3053095051",
            redes: ["@club.dogoo"],
            votos: 0,
            imagen: "img/clubDogo.jpg",
            logo: "logo/dogo.png"
        },
        
       {
id: 4,
nombre: "",
descripcion: "",
ingredientes: [],
negocio: "Amore Mio",
direccion: " Calle 20 #8-30, segundo piso",
telefono: "3123074609",
redes: ["amoremio.rb"],
votos: 0,
imagen: "img/.jpg",
logo: "logo/Amoremio.png"
},
{
id: 5,
nombre: "",
descripcion: "",
ingredientes: [],
negocio: "Antojitos",
direccion: "calle 17 con carrera 8, esquina",
telefono: "3014815658",
redes: ["antojitosrestaurante_"],
votos: 0,
imagen: "img/.jpg",
logo: "logo/antojitos.png"
},
{
id: 6,
nombre: "",
descripcion: "",
ingredientes: [],
negocio: "Bufalos Mix",
direccion: "crra 5#10 46, planeta rica",
telefono: "3127743747",
redes: ["bufalosmix"],
votos: 0,
imagen: "img/.jpg",
logo: "logo/bufalos.png"
},
{
id: 7,
nombre: "",
descripcion: "",
ingredientes: [],
negocio: "Candil",
direccion: "krr 8 call 17, planeta rica",
telefono: "3008501933",
redes: ["candil.ss"],
votos: 0,
imagen: "img/.jpg",
logo: "logo/candil.png"
},
{
id: 8,
nombre: "",
descripcion: "",
ingredientes: [],
negocio: "La Burguer",
direccion: "crr 10 #15-28",
telefono: "3017954188",
redes: ["l.a.burguer1"],
votos: 0,
imagen: "img/.jpg",
logo: "logo/laburger.png"
},
{
id: 9,
nombre: "",
descripcion: "",
ingredientes: [],
negocio: "Mamma mia ",
direccion: "Gonzalo mejia cr ai, esquina",
telefono: "3178537392",
redes: ["mamamia_planetarica"],
votos: 0,
imagen: "img/.jpg",
logo: "logo/mammamia.png"
},
{
id: 10,
nombre: "",
descripcion: "",
ingredientes: [],
negocio: "Maruburger",
direccion: "crra 9 N20-29",
telefono: "3225003643",
redes: ["maruburguers.pr"],
votos: 0,
imagen: "img/.jpg",
logo: "logo/maru.png"
},
{
id: 11,
nombre: "",
descripcion: "",
ingredientes: [],
negocio: "Donde EL MELLO",
direccion: "",
telefono: "",
redes: ["donde_el.mello"],
votos: 0,
imagen: "img/.jpg",
logo: "logo/mello.png"
},
{
id: 12,
nombre: "",
descripcion: "",
ingredientes: [],
negocio: "Micaela",
direccion: "calle 18 con carrera 10",
telefono: "3206327873",
redes: ["restmicaela"],
votos: 0,
imagen: "img/.jpg",
logo: "logo/micalea.png"
},
{
id: 13,
nombre: "",
descripcion: "",
ingredientes: [],
negocio: "Mistico RestoBar",
direccion: "carra 8 entre 16 y 17",
telefono: "3246116198",
redes: ["mistico.restobarr"],
votos: 0,
imagen: "img/.jpg",
logo: "logo/mistico.png"
},
{
id: 14,
nombre: "",
descripcion: "",
ingredientes: [],
negocio: "Pararada Burguer",
direccion: "calle 20 #6-40, planeta rica",
telefono: "3242616844",
redes: ["paradaburguer_pr"],
votos: 0,
imagen: "img/.jpg",
logo: "logo/parada.png"
},
{
id: 15,
nombre: "",
descripcion: "",
ingredientes: [],
negocio: "el poblado",
direccion: "carra 8 call 19 segundo piso",
telefono: "3016842287",
redes: ["elpoblado_planetarica"],
votos: 0,
imagen: "img/.jpg",
logo: "logo/Poblado.png"
},
{
id: 16,
nombre: "",
descripcion: "",
ingredientes: [],
negocio: "Los Quesudos De Hugo",
direccion: "calle 15 crra 10 esquina",
telefono: "3134610882",
redes: ["losquesudosdehugo"],
votos: 0,
imagen: "img/.jpg",
logo: "logo/quesudos.png"
},
{
id: 17,
nombre: "",
descripcion: "",
ingredientes: [],
negocio: "Rapidogs",
direccion: "",
telefono: "3107074195",
redes: ["rapidogs_pr"],
votos: 0,
imagen: "img/.jpg",
logo: "logo/rapidogs.png"
},
{
id: 18,
nombre: "",
descripcion: "",
ingredientes: [],
negocio: "sazon del barrio",
direccion: "troncal, al lados de los fritos el curramba",
telefono: "3008358089",
redes: ["sazon_delbarrio"],
votos: 0,
imagen: "img/.jpg",
logo: "logo/sazon.png"
},
{
id: 19,
nombre: "",
descripcion: "",
ingredientes: [],
negocio: "Smokin Burguers",
direccion: "calle 17 carrera 9 esquina",
telefono: "3188465641",
redes: ["smokin burguers_planetarica"],
votos: 0,
imagen: "img/.jpg",
logo: "logo/smokin.png"
}


    ],
    comentarios: [],
    ventas: {
        dia1: 0,
        dia2: 0,
        dia3: 0,
        dia4: 0,
        total: 0
    },
    ganadores: []
};

// 2. SEGUNDO: Configuración de Supabase
const SUPABASE_URL = 'https://ewipwdgdwhvbitioyqti.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3aXB3ZGdkd2h2Yml0aW95cXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5NzY5MTIsImV4cCI6MjA3MzU1MjkxMn0.nVxvqvJZr1_RAJNq3vqVskQDZlYTWPAGVt7dvjnEjfw';

// 3. TERCERO: Inicializar Supabase
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 4. CUARTO: Funciones para interactuar con Supabase

// Obtener todos los perros calientes
async function getHotdogs() {
    try {
        const { data, error } = await supabase
            .from('hotdogs')
            .select('*')
            .order('name');  // ← Cambiado a 'name' (inglés)
        
        if (error) {
            console.error('Error fetching hotdogs:', error);
            return festivalData.perros;
        }
        
        // Convertir datos de Supabase a formato español para compatibilidad
        const perrosConvertidos = data.map(perro => ({
            id: perro.id,
            nombre: perro.name,           // ← name → nombre
            descripcion: perro.description, // ← description → descripcion
            ingredientes: perro.ingredientes || [],
            negocio: perro.negocio || 'Establecimiento por definir',
            direccion: perro.direccion || 'Dirección por definir',
            telefono: perro.telefono || 'Teléfono por definir',
            redes: perro.redes || ['@redsocial'],
            votos: perro.votes,           // ← votes → votos
            imagen: perro.image,          // ← image → imagen
            logo: perro.logo || 'logo/placeholder.png'
        }));
        
        return perrosConvertidos;
        
    } catch (error) {
        console.error('Error:', error);
        return festivalData.perros;
    }
}

// Registrar un voto
async function addVote(hotdogId) {
    try {
        // Primero obtenemos el conteo actual de votos
        const { data: currentData, error: fetchError } = await supabase
            .from('hotdogs')
            .select('votes')  // ← Cambiado a 'votes' (inglés)
            .eq('id', hotdogId)
            .single();
        
        if (fetchError) {
            console.error('Error fetching current votes:', fetchError);
            return false;
        }
        
        // Incrementamos el conteo de votos
        const { error } = await supabase
            .from('hotdogs')
            .update({ votes: currentData.votes + 1 })  // ← Cambiado a 'votes'
            .eq('id', hotdogId);
        
        if (error) {
            console.error('Error updating votes:', error);
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

// Obtener resultados
async function getResults() {
    try {
        const { data, error } = await supabase
            .from('hotdogs')
            .select('*')
            .order('votes', { ascending: false });  // ← Cambiado a 'votes'
        
        if (error) {
            console.error('Error fetching results:', error);
            return festivalData.perros;
        }
        
        // Convertir datos de Supabase a formato español
        const resultadosConvertidos = data.map(perro => ({
            id: perro.id,
            nombre: perro.name,
            descripcion: perro.description,
            ingredientes: perro.ingredientes || [],
            negocio: perro.negocio || 'Establecimiento por definir',
            direccion: perro.direccion || 'Dirección por definir',
            telefono: perro.telefono || 'Teléfono por definir',
            redes: perro.redes || ['@redsocial'],
            votos: perro.votes,  // ← votes → votos
            imagen: perro.image,
            logo: perro.logo || 'logo/placeholder.png'
        }));
        
        return resultadosConvertidos;
        
    } catch (error) {
        console.error('Error:', error);
        return festivalData.perros;
    }
}

// Guardar un comentario
async function saveComment(name, comment) {
    try {
        const { error } = await supabase
            .from('comments')
            .insert([{ 
                name: name,         // ← name (inglés)
                comment: comment,   // ← comment (inglés)
                created_at: new Date().toISOString() 
            }]);
        
        if (error) {
            console.error('Error saving comment:', error);
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

// Obtener comentarios
async function getComments() {
    try {
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(20);
        
        if (error) {
            console.error('Error fetching comments:', error);
            return [];
        }
        
        // Convertir a formato español
        const comentariosConvertidos = data.map(comentario => ({
            id: comentario.id,
            nombre: comentario.name,      // ← name → nombre
            comentario: comentario.comment, // ← comment → comentario
            creado_en: comentario.created_at
        }));
        
        return comentariosConvertidos;
        
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

// Obtener estadísticas de ventas
async function getSalesStats() {
    try {
        return festivalData.ventas;
    } catch (error) {
        console.error('Error:', error);
        return festivalData.ventas;
    }
}

// Obtener ganadores
async function getWinners() {
    try {
        const { data, error } = await supabase
            .from('hotdogs')
            .select('*')
            .order('votes', { ascending: false })  // ← Cambiado a 'votes'
            .limit(3);
        
        if (error) {
            console.error('Error fetching winners:', error);
            return [];
        }
        
        // Convertir a formato español
        const ganadoresConvertidos = data.map(perro => ({
            id: perro.id,
            nombre: perro.name,
            descripcion: perro.description,
            ingredientes: perro.ingredientes || [],
            negocio: perro.negocio || 'Establecimiento por definir',
            direccion: perro.direccion || 'Dirección por definir',
            telefono: perro.telefono || 'Teléfono por definir',
            redes: perro.redes || ['@redsocial'],
            votos: perro.votes,  // ← votes → votos
            imagen: perro.image,
            logo: perro.logo || 'logo/placeholder.png'
        }));
        
        return ganadoresConvertidos;
        
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

// Obtener total de votos
async function getTotalVotes() {
    try {
        const { data, error } = await supabase
            .from('hotdogs')
            .select('votes');  // ← Cambiado a 'votes'
        
        if (error) {
            console.error('Error fetching total votes:', error);
            return 0;
        }
        
        return data.reduce((total, item) => total + item.votes, 0);
    } catch (error) {
        console.error('Error:', error);
        return 0;
    }
}

// Inicializar datos desde localStorage (como respaldo)
function inicializarDatos() {
    const datosGuardados = localStorage.getItem('festivalPerrosCalientes');
    if (datosGuardados) {
        try {
            const datos = JSON.parse(datosGuardados);
            
            festivalData.perros = datos.perros || festivalData.perros;
            festivalData.comentarios = datos.comentarios || festivalData.comentarios;
            festivalData.ventas = datos.ventas || festivalData.ventas;
            festivalData.ganadores = datos.ganadores || festivalData.ganadores;
            
            festivalData.ultimaActualizacion = datos.ultimaActualizacion ? new Date(datos.ultimaActualizacion) : new Date();
        } catch (e) {
            console.error("Error al cargar datos guardados:", e);
            festivalData.ultimaActualizacion = new Date();
            guardarDatos();
        }
    } else {
        festivalData.ultimaActualizacion = new Date();
        guardarDatos();
    }
    
    console.log("Datos locales inicializados. Participantes:", festivalData.perros.length);
}

// Guardar datos en localStorage (como respaldo)
function guardarDatos() {
    try {
        localStorage.setItem('festivalPerrosCalientes', JSON.stringify({
            perros: festivalData.perros,
            comentarios: festivalData.comentarios,
            ventas: festivalData.ventas,
            ganadores: festivalData.ganadores,
            ultimaActualizacion: festivalData.ultimaActualizacion
        }));
    } catch (e) {
        console.error("Error al guardar datos locales:", e);
    }
}

// Función para poblar la base de datos inicialmente
async function initializeDatabase() {
    try {
        const { data, error } = await supabase
            .from('hotdogs')
            .select('*')
            .limit(1);
        
        if (error || data.length === 0) {
            console.log("Inicializando base de datos con datos predeterminados...");
            
            // Convertir datos locales a formato inglés para Supabase
            const perrosParaSupabase = festivalData.perros.map(perro => ({
                name: perro.nombre,
                description: perro.descripcion,
                ingredientes: perro.ingredientes,
                negocio: perro.negocio,
                direccion: perro.direccion,
                telefono: perro.telefono,
                redes: perro.redes,
                votes: perro.votos,
                image: perro.imagen,
                logo: perro.logo
            }));
            
            const { error: insertError } = await supabase
                .from('hotdogs')
                .insert(perrosParaSupabase);
            
            if (insertError) {
                console.error('Error initializing database:', insertError);
            } else {
                console.log('Base de datos inicializada exitosamente');
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para resetear datos
async function resetearDatos() {
    if (confirm('¿Estás seguro de que quieres resetear todos los datos? Se perderán todos los votos y comentarios.')) {
        try {
            await supabase.from('hotdogs').update({ votes: 0 });
            await supabase.from('comments').delete().neq('id', 0);
        } catch (error) {
            console.error('Error resetting Supabase data:', error);
        }
        
        localStorage.removeItem('festivalPerrosCalientes');
        localStorage.removeItem('votosHoy');
        
        festivalData.perros.forEach(perro => perro.votos = 0);
        festivalData.ventas = { dia1: 0, dia2: 0, dia3: 0, dia4: 0, total: 0 };
        festivalData.comentarios = [];
        festivalData.ganadores = [];
        
        guardarDatos();
        location.reload();
    }
}

// Añadir función resetearDatos al global
window.resetearDatos = resetearDatos;

// Inicializar datos locales al cargar
document.addEventListener('DOMContentLoaded', function() {
    inicializarDatos();
    initializeDatabase();
});