//
/*
    CPSample se encarga de realizar un Checkpoint temporal de la información introducida en
    el Formulario "Sample". Se guardan los campos en LocalStorage para evitar
    almacenar en la base de datos información incompleta y minimizar los accesos a esta.
    También permitirá la vuelta atrás, por si el usuario desea modificar algún dato
*/

function CPSample() {
  var form = document.getElementById("Sample");
  //Obtenemos el formulario Sample y sus campos inputs
  var inputs = form.getElementsByTagName("input");
  //Los campos select se tratan por separado,
  /*
  var select = form.getElementsByTagName("select")[0];
  var unidad = select[select.selectedIndex].value;
  //Guardamos la pareja key-value en LS
  localStorage.setItem(select.name, unidad);
  */
  for (var value of inputs) {
    if (value.type != "submit" && (value.type != "radio" || value.checked)) {
      if (value.type == "radio") {
        localStorage.setItem("ssizetype", value.value);
      } else {
        localStorage.setItem(value.name, value.value);
      }
    }
  }
  var etapaAct = STEPS_NAME[Number(localStorage.getItem("actualStep"))];
  document.getElementById("Etapa").innerHTML = etapaAct;
  /*
  for (var id of TEST) {
    console.log("Almacenado como " + id + ":" + localStorage.getItem(id));
  }
  */
}
