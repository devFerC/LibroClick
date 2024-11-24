const libros = [
  // Ficción
  { id: 1, titulo: "1984", autor: "George Orwell", precio: 15.99, categoria: "Ficción", imagen: "images/001.jpg" },
  { id: 2, titulo: "El Señor de los Anillos", autor: "J.R.R. Tolkien", precio: 25.99, categoria: "Ficción", imagen: "images/002.jpg" },
  { id: 3, titulo: "Cien Años de Soledad", autor: "Gabriel García Márquez", precio: 18.99, categoria: "Ficción", imagen: "images/002.jpg" },
  { id: 4, titulo: "Dune", autor: "Frank Herbert", precio: 22.99, categoria: "Ficción", imagen: "images/002.jpg" },
  { id: 5, titulo: "Crónica de una Muerte Anunciada", autor: "Gabriel García Márquez", precio: 12.99, categoria: "Ficción", imagen: "images/002.jpg" },
  { id: 6, titulo: "Harry Potter y la Piedra Filosofal", autor: "J.K. Rowling", precio: 14.99, categoria: "Ficción", imagen: "images/002.jpg" },
  { id: 7, titulo: "Juego de Tronos", autor: "George R.R. Martin", precio: 19.99, categoria: "Ficción", imagen: "images/002.jpg" },
  { id: 8, titulo: "El Hobbit", autor: "J.R.R. Tolkien", precio: 17.99, categoria: "Ficción", imagen: "images/002.jpg" },

  // No Ficción
  { id: 9, titulo: "Sapiens: De Animales a Dioses", autor: "Yuval Noah Harari", precio: 20.99, categoria: "No Ficción", imagen: "images/002.jpg" },
  { id: 10, titulo: "Educated", autor: "Tara Westover", precio: 18.99, categoria: "No Ficción", imagen: "images/002.jpg" },
  { id: 11, titulo: "El Poder de los Hábitos", autor: "Charles Duhigg", precio: 16.99, categoria: "No Ficción", imagen: "images/002.jpg" },
  { id: 12, titulo: "Homo Deus", autor: "Yuval Noah Harari", precio: 22.99, categoria: "No Ficción", imagen: "images/002.jpg" },
  { id: 13, titulo: "El Gen", autor: "Siddhartha Mukherjee", precio: 21.99, categoria: "No Ficción", imagen: "images/002.jpg" },
  { id: 14, titulo: "Cómo Hacer Amigos e Influir en las Personas", autor: "Dale Carnegie", precio: 13.99, categoria: "No Ficción", imagen: "images/002.jpg" },
  { id: 15, titulo: "La Breve Historia de Todo", autor: "Bill Bryson", precio: 19.99, categoria: "No Ficción", imagen: "images/002.jpg" },
  { id: 16, titulo: "Steve Jobs", autor: "Walter Isaacson", precio: 24.99, categoria: "No Ficción", imagen: "images/002.jpg" },
];
// Cargar carrito desde LocalStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Cargar catálogo completo solo si el usuario está en index.html
function cargarCatalogoCompleto() {
  const catalogo = document.getElementById("catalogo");
  if (!catalogo) return; // Salir si no existe un contenedor de catálogo (es decir, no estamos en index.html)

  // Limpiar el contenido previo del catálogo
  catalogo.innerHTML = "";

  libros.forEach(libro => {
    const div = document.createElement("div");
    div.classList.add("book-card");
    div.innerHTML = `
     <a href="detalle-libro.html?id=${libro.id}">
        <img src="${libro.imagen}" alt="${libro.titulo}">
      </a>
      <h3>
        <a href="detalle-libro.html?id=${libro.id}">${libro.titulo}</a>
      </h3>
      <p>${libro.autor}</p>
      <p>$${libro.precio}</p>
      <button onclick="agregarAlCarrito(${libro.id})">Agregar al carrito</button>
    `;
    catalogo.appendChild(div);
  });
}

// Cargar libros de una categoría específica
function cargarLibrosPorCategoria(categoria) {
  const catalogo = document.getElementById("catalogo");
  if (!catalogo) return; // Salir si no existe un contenedor de catálogo

  // Limpiar el contenido previo del catálogo para evitar duplicados
  catalogo.innerHTML = "";

  // Filtrar los libros según la categoría
  const librosFiltrados = libros.filter(libro => libro.categoria === categoria);

  // Añadir los libros al contenedor
  librosFiltrados.forEach(libro => {
    const div = document.createElement("div");
    div.classList.add("book-card");
    div.innerHTML = `
       <a href="detalle-libro.html?id=${libro.id}">
        <img src="${libro.imagen}" alt="${libro.titulo}">
      </a>
      <h3>
        <a href="detalle-libro.html?id=${libro.id}">${libro.titulo}</a>
      </h3>
      <p>${libro.autor}</p>
      <p>$${libro.precio}</p>
      <button onclick="agregarAlCarrito(${libro.id})">Agregar al carrito</button>
    `;
    catalogo.appendChild(div);
  });
}

// Evento para cargar el contenido dependiendo de la página
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  if (body.classList.contains("index")) {
    // Cargar catálogo completo solo en la página principal
    cargarCatalogoCompleto();
  } else if (body.classList.contains("ficcion")) {
    // Cargar solo los libros de ficción
    cargarLibrosPorCategoria("Ficción");
  } else if (body.classList.contains("no-ficcion")) {
    // Cargar solo los libros de no ficción
    cargarLibrosPorCategoria("No Ficción");
  }

  // Mostrar carrito (esta función puede ejecutarse en todas las páginas)
  mostrarCarrito();
});

// Función para agregar un libro al carrito
function agregarAlCarrito(id) {
  const libro = libros.find((libro) => libro.id === id);
  const itemEnCarrito = carrito.find((item) => item.id === id);

  if (itemEnCarrito) {
    itemEnCarrito.cantidad += 1;
  } else {
    carrito.push({ ...libro, cantidad: 1 });
  }

  // Guardar carrito en LocalStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));

  alert(`${libro.titulo} fue agregado al carrito`);
}

// Función para mostrar el carrito
function mostrarCarrito() {
  const carritoContainer = document.getElementById("carrito");
  if (!carritoContainer) return; // Salir si no estamos en la página del carrito

  carritoContainer.innerHTML = ""; // Limpiar contenido previo

  if (carrito.length === 0) {
    carritoContainer.innerHTML = "<p>El carrito está vacío</p>";
    return;
  }

  carrito.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("carrito-card"); // Aplicamos la clase para el estilo
    div.innerHTML = `
      <div class="carrito-card-info">
        <h3>${item.titulo}</h3>
        <p><strong>Autor:</strong> ${item.autor}</p>
        <p><strong>Precio:</strong> $${item.precio}</p>
        <p><strong>Cantidad:</strong> ${item.cantidad}</p>
        <button class="btn-eliminar" onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
      </div>
    `;
    carritoContainer.appendChild(div);
  });

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const totalDiv = document.createElement("div");
  totalDiv.classList.add("carrito-total"); // Nueva clase para el estilo del total
  totalDiv.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
  carritoContainer.appendChild(totalDiv);
}


// Función para eliminar un ítem del carrito
function eliminarDelCarrito(id) {
  // Filtrar el carrito para excluir el ítem con el ID seleccionado
  carrito = carrito.filter(item => item.id !== id);

  // Actualizar el carrito en localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // Volver a renderizar el carrito
  mostrarCarrito();
}
// Función para mostrar el catálogo filtrado
function mostrarCatalogoFiltrado(librosFiltrados) {
  const catalogo = document.getElementById("catalogo");
  catalogo.innerHTML = ""; // Limpiar el catálogo antes de mostrar los libros

  if (librosFiltrados.length === 0) {
    catalogo.innerHTML = "<p>No se encontraron libros.</p>";
    return;
  }

  librosFiltrados.forEach(libro => {
    const div = document.createElement("div");
    div.classList.add("book-card");
    div.innerHTML = `
      <a href="detalle-libro.html?id=${libro.id}">
        <img src="${libro.imagen}" alt="${libro.titulo}">
      </a>
      <h3>
        <a href="detalle-libro.html?id=${libro.id}">${libro.titulo}</a>
      </h3>
      <p>${libro.autor}</p>
      <p>$${libro.precio}</p>
      <button onclick="agregarAlCarrito(${libro.id})">Agregar al carrito</button>
    `;
    catalogo.appendChild(div);
  });
}

// Función para buscar libros
function buscarLibros() {
  const inputBuscar = document.getElementById("input-buscar");
  const textoBuscar = inputBuscar.value.trim().toLowerCase(); // Convertir a minúsculas para evitar sensibilidad a mayúsculas/minúsculas

  // Filtrar los libros cuyo título contenga el texto de búsqueda
  const librosFiltrados = libros.filter(libro =>
    libro.titulo.toLowerCase().includes(textoBuscar)
  );

  mostrarCatalogoFiltrado(librosFiltrados); // Mostrar los resultados filtrados
}

// Evento para el botón de búsqueda
document.addEventListener("DOMContentLoaded", () => {
  const btnBuscar = document.getElementById("btn-buscar");
  const inputBuscar = document.getElementById("input-buscar");

  // Buscar al hacer clic en el botón
  btnBuscar.addEventListener("click", buscarLibros);

  // Buscar automáticamente al escribir en el campo de búsqueda
  inputBuscar.addEventListener("input", buscarLibros);

  // Mostrar el catálogo completo inicialmente
  cargarCatalogoCompleto();
});

// Función para obtener el extracto de Wikipedia
async function obtenerDetalleDeWikipedia(titulo) {
  // Primera URL: búsqueda con el título original
  let url = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(titulo)}`;
  
  try {
    let response = await fetch(url);
    if (response.status === 404) {
      // Si no se encuentra, intenta con "libro" añadido al título
      url = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(titulo + " libro")}`;
      response = await fetch(url);
    }

    if (!response.ok) throw new Error("No se encontró información en Wikipedia");

    const data = await response.json();
    return data.extract; // Devuelve el extracto del artículo
  } catch (error) {
    console.error("Error:", error);
    return "No se pudo obtener información del libro en Wikipedia.";
  }
}


// Mostrar detalle en la página
document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const libroId = parseInt(params.get("id"));

  const libro = libros.find(l => l.id === libroId);
  if (!libro) {
    document.getElementById("detalle-libro").innerHTML = "<p>Libro no encontrado.</p>";
    return;
  }

  const detalleContainer = document.getElementById("detalle-libro");
  const extracto = await obtenerDetalleDeWikipedia(libro.titulo);

  detalleContainer.innerHTML = `
    <img src="${libro.imagen}" alt="${libro.titulo}">
    <h2>${libro.titulo}</h2>
    <p><strong>Autor:</strong> ${libro.autor}</p>
    <p><strong>Precio:</strong> $${libro.precio}</p>
    <p><strong>Categoría:</strong> ${libro.categoria}</p>
    <p><strong>Descripción:</strong> ${extracto}</p>
    <button onclick="agregarAlCarrito(${libro.id})">Agregar al carrito</button>
  `;
});
