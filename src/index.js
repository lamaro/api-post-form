import "./styles.css";
import "babel-polyfill";

//Obtengo el form del DOM y los botones de + y -
const $form = document.querySelector(".formulario");
const $formSubmit = document.querySelector(".form_submit");
const $btnMinus = document.querySelector(".minusRow");
const $btnPlus = document.querySelector(".plusRow");

//Función que hace el alta de nuevo documento en la collection de mi api
const addRegistro = async documentoDbParam => {
  //Configuración del fetch, se aclara el method:POST
  const settings = {
    method: "POST",
    body: JSON.stringify(documentoDbParam),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };
  //Completo la URL de mi endpoint POST
  const response = await fetch(
    `https://minimalapirest.herokuapp.com/peliculas`,
    settings
  );
  if (!response.ok) throw Error(response.message);
  try {
    const data = await response.json();
    console.log("Se agregó:", data);
    return data;
  } catch (err) {
    throw err;
  }
};

//Función que agrega los campos de actores
const camposSub = instruccion => {
  let campoNombre = document.createElement("input");
  campoNombre.className = "campos_nombre_actor";
  campoNombre.type = "text";
  campoNombre.placeholder = "Nombre Actor";
  $form.insertBefore(campoNombre, $formSubmit);

  let campoEdad = document.createElement("input");
  campoEdad.className = "campos_edad_actor";
  campoEdad.type = "text";
  campoEdad.placeholder = "Edad Actor";
  $form.insertBefore(campoEdad, $formSubmit);
};

//EVENT LISTENERS
//Creo el eventlistener del form
$form.addEventListener("submit", event => {
  //Evito el comportamiento default
  event.preventDefault();

  //Creo una constante para el formulario
  const formulario = event.target;

  //Obtengo los valores de los campos
  const nombre = formulario.elements["nombre"].value;
  const lanzamiento = formulario.elements["lanzamiento"].value;
  const cover = formulario.elements["cover"].value;

  const $actoresNombresItems = document.querySelectorAll(
    ".campos_nombre_actor"
  );
  const $actoresEdadesItems = document.querySelectorAll(".campos_edad_actor");
  const actores = [];

  for (let index = 0; index < $actoresNombresItems.length; index++) {
    const nombre = $actoresNombresItems[index].value; //Traigo los valores de los campos nombre actor
    const edad = $actoresEdadesItems[index].value; //Traigo los valores de los campos edad actor
    actores.push({ nombre, edad }); //Agrego el nuevo objeto al array de actores
  }

  //Creo el documento con los valores del form.
  //Como las variables se llaman igual que los keys
  //no hace falta hacer nombre:nombre, lanzamiento:lanzamiento, etc...
  const documentoDb = {
    nombre,
    lanzamiento,
    cover,
    actores
  };
  //Llamo a la función async que me hace el POST del documento
  addRegistro(documentoDb);
});

$btnPlus.addEventListener("click", () => {
  camposSub("+");
});

$btnMinus.addEventListener("click", () => {
  //NO ESTA PROGRAMADA, debería quitar los últimos elementos de tipo nombre y edad actor.
  console.log("-");
});
