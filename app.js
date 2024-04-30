// MOSTRAR OCULTAR CARRITO

// Variables
const btnMostrarCarrito = document.querySelector('#btn-mostrar-carrito');
const containerCarrito = document.querySelector('.container-carrito');


btnMostrarCarrito.addEventListener('click', mostrarOcultarCarrito);


// Funciones
function mostrarOcultarCarrito(e) {
  e.preventDefault();

  if (containerCarrito.classList.contains('carrito-activo')) {
    containerCarrito.classList.remove('carrito-activo')
  } else {
    containerCarrito.classList.add('carrito-activo')
  }
}






// AÑADIR PRODUCTOS AL CARRITO
// Variables
const listProducts = document.querySelector('.list-products');
const containerProducts = document.querySelector('#container-products');
const btnVaciarCarrito = document.querySelector('.btn-vaciar-carrito');
const tituloCarVacio = document.querySelector('#titulo-carrito-vacio');
const tituloCarContenido = document.querySelector('#titulo-carrito-contenido');
let articulosCarrito = [];


carritoVacio();
function carritoVacio() {
  if (articulosCarrito.length === 0) {
    tituloCarVacio.style.display = 'block';
    tituloCarContenido.style.display = 'none';
  }
}

cargarEventListener();
function cargarEventListener() {
  // Agregar un producto al carrito
  listProducts.addEventListener('click', agregarProducto);

  // Eliminar un producto del carrito
  containerProducts.addEventListener('click', borrarProducto);

  // Vaciar carrito
  btnVaciarCarrito.addEventListener('click', (e) => {
    e.preventDefault();

    articulosCarrito = [];

    carritoHTML();

  })
}


// funciones
function agregarProducto(e) {
  e.preventDefault();

  if (e.target.classList.contains('btn-agregar-carrito')) {
    const productoSeleccionado = e.target.parentElement;
    leerDatosProducto(productoSeleccionado)
  }
}

// Elimina un producto del carrito
function borrarProducto(e) {
  if (e.target.classList.contains('btn-borrar')) {
    const productoId = e.target.getAttribute('data-id');

    articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);

    carritoHTML();
  }
}


// Lee los datos del producto
function leerDatosProducto(producto) {

  const infoProducto = {
    imagen: producto.querySelector('img').src,
    titulo: producto.querySelector('h3').textContent,
    precio: producto.querySelector('p').textContent,
    id: producto.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  }

  const existe = articulosCarrito.some(producto => producto.id === infoProducto.id);
  if (existe) {
    const productos = articulosCarrito.map(producto => {
      if (producto.id === infoProducto.id) {
        producto.cantidad++;
        return producto;
      } else {
        return producto;
      }
    });
    articulosCarrito = [...productos]
  } else {
    articulosCarrito = [...articulosCarrito, infoProducto];
    console.log(articulosCarrito)
  }

  carritoHTML();
}



// Muestra el producto el la sesión del carrito
function carritoHTML() {

  limpiarHTML();

  articulosCarrito.forEach(producto => {
    const { imagen, titulo, precio, id, cantidad } = producto;
    const row = document.createElement('DIV');
    row.classList.add('products')
    row.innerHTML = `
      <img src="${imagen}" width="90" class="product-img">
      <div>
        <h3>${titulo}</h3>
        <p>${precio}</p>
        <span>Cantidad ${cantidad}</span>
      </div>
      <a href="#" class="btn-borrar" data-id="${id}"> X </a>
    `;

    containerProducts.appendChild(row)

  });

  carritoContenido();
  function carritoContenido() {
    if (articulosCarrito.length > 0) {
      tituloCarVacio.style.display = 'none';
      tituloCarContenido.style.display = 'block';
    } else {
      tituloCarVacio.style.display = 'block';
      tituloCarContenido.style.display = 'none';
    }
  }
  console.log(articulosCarrito)
}


function limpiarHTML() {
  while (containerProducts.firstChild) {
    containerProducts.removeChild(containerProducts.firstChild)
  }
}

