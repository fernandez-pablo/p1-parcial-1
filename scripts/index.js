'use strict';

/*
 * FERNANDEZ, PABLO
 */

//CReo el array que va a contener los discos
let discos = [];

// Aqui cargo el json.js
fetch('discos.json')
    .then(response => response.json())
    .then(data => {
     // Se recorre cada disco en el JSON y se agrega a la lista de discos
    data.forEach(discoData => {
        let disco = new Disco(discoData.nombre, discoData.artista, discoData.id, discoData.portada);

        // Se agregan las pistas al disco
        discoData.pistas.forEach(pistaData => {
            let pista = new Pista(pistaData.nombre, pistaData.duracion);
            disco.agregarPista(pista);
        });

        discos.push(disco);
    });
    // hafo un log para comprobar la carga del json
    console.log("Se han cargado los discos desde el JSON");
    })

    .catch(error => console.error('Error al cargar los discos:', error));





/**
 * Llamada desde un boton. Pide los datos para un disco.
 */
function cargar() {
    let nombre = entradaTexto("Ingresa el nombre del Disco");

    let artista = entradaTexto("Ingrese el artista o banda");

    let id;
    do {
        id = parseInt(prompt("Ingrese el código único del disco (entre 1 y 999):"));
    } while (!entradaCodigo(id, discos));

    let portada = entradaTexto("Ingrese el URL de la portada del Disco");
    // creo el objeto disco con los datos pasados por el usuario
    let disco = new Disco(nombre,artista,id,portada);
    // pido los datos para las pistas
    let seguir;
    do {
        let nombrePista = entradaTexto("Ingrese el nombre de la pista");
        

        let duracion;
        do {
            duracion = parseInt(prompt("Ingrese la duración de la pista en segundos entre 0 y 7200"));
        } while (!entradaDuracion(duracion));

        let pista = new Pista(nombrePista, duracion);
        disco.agregarPista(pista);

        seguir = confirm("¿Querés ingresar otra pista?");
    } while (seguir);
    // Agrego el disco creado al array que contiene todos los objetos disco
    discos.push(disco);
    alert("Felicitaciones se cargo el disco :)");

}


/**
 * funcion buscar disco por ID
*/
function buscarDisco() {
  let dato;
  do {
     dato = parseInt(prompt("Ingrese el código único del disco (entre 1 y 999):"));
    } while (!dato);

  const discoId = discos.find(disco =>disco.id == dato);

  if (discoId) {
    
    let container = document.getElementById('discos');
    container.innerHTML = '';
    
    let discoDiv = document.createElement('div');
    discoDiv.classList.add('disco');
    discoDiv.innerHTML = `
            <img src="${discoId.portada}" alt="Portada de ${discoId.nombre}" width="100">
            <h2>${discoId.nombre}</h2>
            <h3>Autor: ${discoId.artista}</h3>
            <h3>Codigo: ${discoId.id}</h3>
            <h3>Cantidad de pistas: ${discoId.pistas.length}</h3>
            <h3>Duración total: ${discoId.formatearDuracion(discoId.duracionTotal())}</h3>
            <h3>Promedio: ${discoId.formatearDuracion(discoId.duracionPromedio())}</h3>
            <h3>Pista más larga: ${discoId.pistaMasLarga().nombre}</h3>
            <h3>Pistas: </h3>
        `;

        // Pistas
    let listaPistas = document.createElement('ol');
    discoId.pistas.forEach(pista => {
            let pistaItem = document.createElement('li');
            let minutos = Math.floor(pista.duracion / 60);
            let segundos = pista.duracion % 60;
            let tiempo = `${minutos < 10 ? '0' + minutos : minutos}:${segundos < 10 ? '0' + segundos : segundos}`;

            // Si la pista dura mas de 3 minutos le agrego la clase pista-larga
            if (pista.duracion > 180) {
                pistaItem.classList.add('pista-larga');
            }
            pistaItem.textContent = `${pista.nombre} - ${tiempo}`;
            listaPistas.appendChild(pistaItem);
        });
        //agrego al <ol> que va a contener las pistas <li> al div de cada disco y luego a la galeria
        discoDiv.appendChild(listaPistas);
        container.appendChild(discoDiv);
  };

  
  

}

/**
 * Llamada desde un boton. Muestra todos los discos disponibles.
*/

function mostrar() {
    // Contador de discos cargados
    let cantidad = document.getElementById('cantidad');
    if (discos.length === 0) {
        cantidad.innerHTML = '<p>No tenés cargado ningún disco.</p>';
        return; 
    } else {
        cantidad.innerHTML = `<p>Discos cargados: ${discos.length}</p>`;
    }

    // Discos
    let container = document.getElementById('discos');
    container.innerHTML = '';

    discos.forEach(disco => {
        let discoDiv = document.createElement('div');
        discoDiv.classList.add('disco');
        discoDiv.innerHTML = `
            <img src="${disco.portada}" alt="Portada de ${disco.nombre}" width="100">
            <h2>${disco.nombre}</h2>
            <h3>Autor: ${disco.artista}</h3>
            <h3>Codigo: ${disco.id}</h3>
            <h3>Cantidad de pistas: ${disco.pistas.length}</h3>
            <h3>Duración total: ${disco.formatearDuracion(disco.duracionTotal())}</h3>
            <h3>Promedio: ${disco.formatearDuracion(disco.duracionPromedio())}</h3>
            <h3>Pista más larga: ${disco.pistaMasLarga().nombre}</h3>
            <h3>Pistas: </h3>
        `;

        // Pistas
        let listaPistas = document.createElement('ol');
        disco.pistas.forEach(pista => {
            let pistaItem = document.createElement('li');
            let minutos = Math.floor(pista.duracion / 60);
            let segundos = pista.duracion % 60;
            let tiempo = `${minutos < 10 ? '0' + minutos : minutos}:${segundos < 10 ? '0' + segundos : segundos}`;

            // Si la pista dura mas de 3 minutos le agrego la clase pista-larga
            if (pista.duracion > 180) {
                pistaItem.classList.add('pista-larga');
            }
            pistaItem.textContent = `${pista.nombre} - ${tiempo}`;
            listaPistas.appendChild(pistaItem);
        });
        //agrego al <ol> que va a contener las pistas <li> al div de cada disco y luego a la galeria
        discoDiv.appendChild(listaPistas);
        container.appendChild(discoDiv);
    });
};
