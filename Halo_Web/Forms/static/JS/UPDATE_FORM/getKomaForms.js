async function getKomaForms() {
    var STEPS;
    await fetch("https://biocom.uib.es/halodb/sequences")
    .then((response) => response.text())
    .then((data) => {
      const PARSED_DATA=JSON.parse(data)
      const KOMA = localStorage.getItem("koma"); // Obtén el "koma" de localStorage
      STEPS = PARSED_DATA[KOMA];
    })
    .catch((error) => console.error("Error loadFixedForms: ", error));
    return STEPS;
}
