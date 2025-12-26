let biblioteca = {
    libros: [
        { titulo: "Cien años de soledad", autor: "Gabriel García Márquez", genero: "Realismo mágico", disponible: true },
        { titulo: "1984", autor: "George Orwell", genero: "Distopía", disponible: true }
    ]
};

function leerDatos(callback) {
    setTimeout(() => {
        callback(biblioteca);
    }, 1000); // simula lectura de archivo
}

function escribirDatos(nuevosDatos, callback) {
    setTimeout(() => {
        biblioteca = nuevosDatos;
        callback();
    }, 1000); // simula escritura en archivo
}

function mostrarLibros() {
    leerDatos((datos) => {
        console.log("📚 Inventario de libros:");
        datos.libros.forEach((libro, index) => {
            console.log(
                `${index + 1}. ${libro.titulo} - ${libro.autor} (${libro.disponible ? "Disponible" : "Prestado"})`
            );
        });
        console.log("---------------------------");
    });
}

function agregarLibro(titulo, autor, genero, disponible) {
    const nuevoLibro = { titulo, autor, genero, disponible };

    leerDatos((datos) => {
        datos.libros.push(nuevoLibro);

        escribirDatos(datos, () => {
            console.log(`📘 Libro agregado: "${titulo}"`);
        });
    });
}

function actualizarDisponibilidad(titulo, nuevoEstado) {
    leerDatos((datos) => {
        const libro = datos.libros.find(l => l.titulo === titulo);

        if (!libro) {
            console.log(`❌ Libro "${titulo}" no encontrado.`);
            return;
        }

        libro.disponible = nuevoEstado;

        escribirDatos(datos, () => {
            console.log(`🔄 Estado actualizado: "${titulo}" ahora está ${nuevoEstado ? "Disponible" : "Prestado"}`);
        });
    });
}

mostrarLibros();

setTimeout(() => {
    agregarLibro("El Principito", "Antoine de Saint-Exupery", "Fábula", true);
}, 2000);

setTimeout(() => {
    actualizarDisponibilidad("1984", false);
}, 4000);

setTimeout(() => {
    mostrarLibros();
}, 6000);
