function changeColors(CARD_CLASS_LIST, COLOR) {
  Array.from(CARD_CLASS_LIST).forEach((element) => {
    if (element.startsWith("bg-") || element.startsWith("text-")) {
      CARD_CLASS_LIST.remove(element);
    }
  });
  const COLRS = COLOR.split(" ");
  cardForm.classList.add(COLRS[0], COLRS[1]);
}
