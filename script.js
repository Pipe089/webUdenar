
// ==========================
// SUPABASE CONFIG
// ==========================
const supabaseUrl = 'https://aijzcgphzwcbctizseww.supabase.co';
const supabaseKey = 'sb_publishable_izy35C2L_ACSo_w-L6lWaA_dXC0Z6OP';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);


// ==========================
// AGREGAR DOCENTE + MATERIA + ASIGNACIÓN
// ==========================
async function agregarDocente() {

    const nombre = document.getElementById('nombre-docente').value.trim();
    const materiaNombre = document.getElementById('materia-docente').value.trim();

    if (!nombre || !materiaNombre) {
        alert('Completa todos los campos');
        return;
    }

    try {

        // 1. Insertar docente (o buscar si ya existe)
        const { data: docente, error: errDocente } = await supabaseClient
            .from('docente')
            .insert({ nombre })
            .select('id_docente')
            .single();

        if (errDocente) throw errDocente;

        // 2. Insertar materia (o buscar si ya existe)
        const { data: materia, error: errMateria } = await supabaseClient
            .from('materia')
            .insert({ nombre: materiaNombre })
            .select('id_materia')
            .single();

        if (errMateria) throw errMateria;

        // 3. Crear relación en asignacion
        const { error: errAsignacion } = await supabaseClient
            .from('asignacion')
            .insert({
                id_docente: docente.id_docente,
                id_materia: materia.id_materia,
                fecha: new Date()
            });

        if (errAsignacion) throw errAsignacion;

        alert('Docente y materia registrados correctamente');

        // limpiar
        document.getElementById('nombre-docente').value = '';
        document.getElementById('materia-docente').value = '';

    } catch (error) {
        console.error(error);
        alert('Error: ' + error.message);
    }
}


// ==========================
// ACTUALIZAR DOCENTE
// ==========================
async function actualizarDocente() {

    const nombre = document.getElementById('nombre-docente').value.trim();

    if (!nombre) {
        alert('Escribe un nombre');
        return;
    }

    const { error } = await supabaseClient
        .from('docente')
        .update({ nombre })
        .eq('nombre', nombre);

    if (error) {
        alert('Error al actualizar');
        console.error(error);
    } else {
        alert('Docente actualizado');
    }
}


// ==========================
// ELIMINAR DOCENTE
// ==========================
async function eliminarDocente() {

    const nombre = document.getElementById('nombre-docente').value.trim();

    if (!nombre) {
        alert('Escribe un nombre');
        return;
    }

    const { error } = await supabaseClient
        .from('docente')
        .delete()
        .eq('nombre', nombre);

    if (error) {
        alert('Error al eliminar');
        console.error(error);
    } else {
        alert('Docente eliminado');
    }
}


// ==========================
// EVENTOS
// ==========================
document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('agregar-docente')
        .addEventListener('click', agregarDocente);

    document.getElementById('actualizar-docente')
        .addEventListener('click', actualizarDocente);

    document.getElementById('eliminar-docente')
        .addEventListener('click', eliminarDocente);
});
