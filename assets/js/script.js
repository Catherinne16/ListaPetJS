document.addEventListener('DOMContentLoaded', () => {
    const tareas = [
        { id: 1, descripcion: 'Deslanado', completada: false },
        { id: 2, descripcion: 'Corte de uñas', completada: true  },
        { id: 3, descripcion: 'Corte de pelo', completada: false },
        { id: 4, descripcion: 'Baño', completada: true  },
        { id: 5, descripcion: 'Secado con Turbina', completada: true  },
        { id: 6, descripcion: 'Cepillado', completada: true  },
        { id: 7, descripcion: 'Arreglo de detalles menores', completada: true  },
    ];

    const listaTareas = document.getElementById('lista-tareas');
    const totalTareas = document.getElementById('total-tareas');
    const tareasCompletadas = document.getElementById('tareas-completadas');
    const nuevaTarea = document.getElementById('nueva-tarea');
    const agregarTarea = document.getElementById('agregar-tarea');

    const actualizarListaTareas = () => {
        listaTareas.innerHTML = '';
        tareas.forEach(tarea => {
            const tareaItem = document.createElement('li');
            tareaItem.className = 'tarea' + (tarea.completada ? ' completada' : '');
            tareaItem.innerHTML = `
                <span class="descripcion">${tarea.descripcion}</span>
                <div class="acciones">
                    <input type="checkbox" ${tarea.completada ? 'checked' : ''} onchange="toggleTarea(${tarea.id})">
                    <button onclick="borrarTarea(${tarea.id})">Eliminar</button>
                </div>
            `;
            listaTareas.appendChild(tareaItem);
        });
        actualizarContadores();
    };

    const actualizarContadores = () => {
        totalTareas.textContent = tareas.length;
        tareasCompletadas.textContent = tareas.filter(tarea => tarea.completada).length;
    };

    window.toggleTarea = id => {
        const tarea = tareas.find(tarea => tarea.id === id);
        tarea.completada = !tarea.completada;
        actualizarListaTareas();
    };

    window.borrarTarea = id => {
        const index = tareas.findIndex(tarea => tarea.id === id);
        tareas.splice(index, 1);
        actualizarListaTareas();
    };

    agregarTarea.addEventListener('click', () => {
        const descripcion = nuevaTarea.value.trim();                
        if (descripcion) {
            const nuevaTareaObj = {
                id: tareas.length ? tareas[tareas.length - 1].id + 1 : 1,
                descripcion,
                completada: false
            };
            tareas.push(nuevaTareaObj);
            nuevaTarea.value = '';
            actualizarListaTareas();
        }
    });

    actualizarListaTareas();
});
