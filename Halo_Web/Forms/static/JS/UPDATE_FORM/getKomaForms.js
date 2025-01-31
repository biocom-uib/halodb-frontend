function getKomaForms(actualStep){
    let urlList=[];
    const KOMA=localStorage.getItem("koma");
    fetch("/static/JSON/komasSteps.json")
    .then((response) =>response.text())
    .then((data) =>{
        const KOMA_DATA=data[KOMA]
        const EXP_STEPS=KOMA_DATA.steps;
        const PATH=data["path"];
        let step,completePath
        for (step in EXP_STEPS){
            completePath=PATH.concat(step.path);
            urlList.append(completePath)
        }
    localStorage.setItem("LastStep",actualStep+Number(KOMA_DATA.stepNumber));
    localStorage.setItem("ExpForm",urlList);
    })
}