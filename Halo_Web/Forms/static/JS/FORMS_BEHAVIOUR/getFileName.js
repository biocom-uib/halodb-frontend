function addFileInputEvent(){
    const inputs=document.getElementsByTagName("input")
    //Comprobamos que hay algun input del tipo "file" en el fomrulario
    const CONTINUE=Array.from(inputs).some((element) => element.type=="file")
    if (CONTINUE){
        const len=inputs.length
        let pairInputs=[];
        let i=0;
        //Los inputs de tipo file estan acompañados de su label Name justo al lado
        for(;i<len;i++){
            if(inputs[i].type=="file"){
                pairInputs.push([inputs[i],inputs[i+1]])
                i++;
            }
        }
        //Cambiamos el nombre del fichero cada vez que se selecciona uno nuevo
        pairInputs.forEach(element => {
            element[0].addEventListener("change",(event)=>element[1].value=event.target.files[0].name)
        });
    }}