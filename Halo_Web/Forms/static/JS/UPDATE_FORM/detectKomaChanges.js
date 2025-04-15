function ChangeKoma() {
  /*
    1. Borrar SVGs
    2. CamBiar el color del Card
    3. LoadNext
    */
  const KOMA= localStorage.getItem("koma")
  const KOMA_LABEL = document.getElementById("komaLabel");
  const CARD_CLASS_LIST=Array.from(document.getElementById("cardForm").classList)
  
  KOMA_LABEL.innerText = "Kind of Material: " + KOMA;
  
  CARD_CLASS_LIST.forEach((element) => {
    if (element.startsWith("bg-") || element.startsWith("text-")) 
      CARD_CLASS_LIST.remove(element);
  });
  const COLRS = COLOR_DICT[KOMA].split(" ");
  cardForm.classList.add(COLRS[0], COLRS[1]);
}

