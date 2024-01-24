import dataPeliculas from "./peliculas.json" assert { type: "json" };

document.addEventListener("DOMContentLoaded", () => {
  const contenedorPrincipal = document.getElementById("contenedor-principal");
  const peliculaElegida = [];

  const añadirMensajePeliculaSeleccionada = (peliculaElegida) => {
    const contenedorTextoCompra = document.getElementsByClassName(
      "contenedorTextoCompra"
    )[0];
    const textoContenedorCompra = document.createElement("p");
    textoContenedorCompra.classList.add("peliculaSeleccionada");
    textoContenedorCompra.style.display = "block";

    textoContenedorCompra.textContent = `Esta por comprar entradas para la pelicula:  ${peliculaElegida.titulo}.`;
    contenedorTextoCompra.appendChild(textoContenedorCompra);
  };

  const añadirPrecioEntradas = (valorTotal) => {
    const contenedorConfirmarCompra =
      document.getElementsByClassName("confirmarCompra")[0];
    const textoValorEntradas = document.createElement("p");
    textoValorEntradas.classList.add("seleccionarEntradas");
    textoValorEntradas.style.display = "block";
    textoValorEntradas.textContent = `El valor total es de: ${valorTotal}`;
    contenedorConfirmarCompra.appendChild(textoValorEntradas);
  };

  const realizarCompra = (peliculaElegida) => {
    const contenedorCompraEntradas = document.getElementById(
      "contenedor-compra-entradas"
    );
    contenedorCompraEntradas.style.display = "flex";

    const contenedorPeliculaSeleccionada = document.getElementsByClassName(
      "peliculaSeleccionada"
    )[0];

    const botonCalcular = document.getElementsByClassName("botonCalcular")[0];

    botonCalcular.addEventListener("click", () => {
      const inputEntradas = document.getElementById("entradas").value;
      const numeroDeEntradas = parseInt(inputEntradas);
      if (numeroDeEntradas > 0) {
        const valorTotal = numeroDeEntradas * 2000;
        localStorage.setItem("entradas", JSON.stringify(valorTotal));
        localStorage.setItem("pelicula", JSON.stringify(peliculaElegida));
        const contenedorPrecioEntradas = document.getElementsByClassName(
          "seleccionarEntradas"
        )[0];
        if (contenedorPrecioEntradas) {
          contenedorPrecioEntradas.remove();
          añadirPrecioEntradas(valorTotal);
        }
      }
    });

    if (contenedorPeliculaSeleccionada) {
      contenedorPeliculaSeleccionada.remove();
      añadirMensajePeliculaSeleccionada(peliculaElegida);
    }

    const botonFinalizar = document.getElementsByClassName("botonFinalizar")[0];

    botonFinalizar.addEventListener("click", () => {
      const entradasLocalStorage = JSON.parse(localStorage.getItem("entradas"));
      const peliculaLocalStorage = JSON.parse(localStorage.getItem("pelicula"));

      if (entradasLocalStorage > 0) {
        alert(
          `Gracias por su compra! Su función es para la película ${peliculaLocalStorage.titulo} y el precio de su compra fue de ${entradasLocalStorage}$`
        );
      } else {
        alert("Ingrese el numero de entradas antes de finalizar");
      }
    });
  };

  const insertarPeliculas = () => {
    const peliculasAgregadas = [];
    const contenedorPeliculas_1 = document.createElement("div");
    const contenedorPeliculas_2 = document.createElement("div");
    contenedorPeliculas_1.classList.add("contenedorPeliculas_1");
    contenedorPeliculas_2.classList.add("contenedorPeliculas_2");

    dataPeliculas.forEach((pelicula) => {
      const contenedorPelicula = document.createElement("div");
      contenedorPelicula.classList.add("pelicula");
      const tituloPelicula = document.createElement("h2");
      tituloPelicula.textContent = pelicula.titulo;

      const imagenPelicula = document.createElement("img");
      imagenPelicula.src = pelicula.imagen;
      imagenPelicula.alt = pelicula.titulo;
      imagenPelicula.classList.add("imagen");

      const descripcionPelicula = document.createElement("p");
      descripcionPelicula.textContent = pelicula.descripcion;

      const botonAgregarPelicula = document.createElement("button");
      botonAgregarPelicula.classList.add("boton");
      botonAgregarPelicula.textContent = "Seleccionar";

      botonAgregarPelicula.addEventListener("click", () => {
        if (peliculaElegida.length === 1) {
          peliculaElegida.splice(0, 1);
          peliculaElegida.push(pelicula);
          realizarCompra(pelicula);
        } else {
          peliculaElegida.push(pelicula);
          realizarCompra(pelicula);
        }
        alert(
          `Ha seleccionado la película: ${pelicula.titulo}\n Proceda a la sección de confirmar compra.`
        );
      });

      contenedorPelicula.appendChild(tituloPelicula);
      contenedorPelicula.appendChild(imagenPelicula);
      contenedorPelicula.appendChild(descripcionPelicula);
      contenedorPelicula.appendChild(botonAgregarPelicula);

      peliculasAgregadas.push(pelicula);
      if (peliculasAgregadas.length <= 3) {
        contenedorPeliculas_1.appendChild(contenedorPelicula);
      } else {
        contenedorPeliculas_2.appendChild(contenedorPelicula);
      }

      contenedorPrincipal.appendChild(contenedorPeliculas_1);
      contenedorPrincipal.appendChild(contenedorPeliculas_2);
    });
  };

  insertarPeliculas();
});
