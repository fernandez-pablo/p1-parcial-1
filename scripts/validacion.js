// Función para validar datos del ID código

function entradaCodigo(id, discos) {
    if (isNaN(id) || id < 1 || id > 999 || discos.some(disco => disco.id === id)) {
        alert("Ouch!! El código debe ser un número entre 1 y 999 y no puede estar repetido.");
        return false;
    }
    return true;
}


// Función para validar datos de la duracion de la pista

function entradaDuracion(duracion) {
    if (isNaN(duracion) || duracion < 1 || duracion > 7200) {
        alert("Ouch!! La duración debe ser un número entre 0 y 7200 segundos.");
        return false;
    }
    return true;
}


// Función para validar datos de tipo texto

function entradaTexto(msj = "") {
  let datoValido;
  let texto;
  do {
    texto = prompt(msj);

    if(texto === null) {
      alert("Por favor, completa el campo");
      datoValido = false;
    }
    else if(texto.trim() === "") {
      alert("Ouch!! No dejes el prompt vacío");
      datoValido = false;
    }
    else if(!isNaN(texto)) {
      alert("Ingrese texto solamente por favor");
      datoValido = false;
    }
    else {
      datoValido = true;
    }
    
  } while(!datoValido);
  return texto;

}





