function komaModelChooserEvent(){
    const komaChooser=document.getElementById("komaChooser")

    if(komaChooser){
        const komaOptions=Array.from(komaChooser.getElementsByTagName("a"))
        komaOptions.forEach(element => {
            element.addEventListener("click",()=>{
                localStorage.setItem("koma",element.innerText)
            })
        });
}
}
