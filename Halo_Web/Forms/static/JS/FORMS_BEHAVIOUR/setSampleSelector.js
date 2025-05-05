function setSampleSelector(){
    const sourceSelector=document.getElementById("sampleId")
    const userSamples=JSON.parse(sessionStorage.getItem("userSamples"))
    for (const [key, value] of Object.entries(userSamples)) {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = value;
        sourceSelector.appendChild(option);
    }
    sourceSelector.value=sessionStorage.getItem("source_id")
    //Each time you choose another value, the source_id change
    sourceSelector.addEventListener("change",()=>sessionStorage.setItem("source_id",sourceSelector.value))
}