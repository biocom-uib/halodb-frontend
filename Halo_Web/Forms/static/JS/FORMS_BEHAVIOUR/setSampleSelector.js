/**
 * Configure the Sample selector in Sequences forms
 */
function setSampleSelector(){
    const sourceSelector=document.querySelector('select')
    sourceSelector.innerHTML=''
    const userSamples=JSON.parse(sessionStorage.getItem("userSamples"))
    for (const [key, value] of Object.entries(userSamples)) {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = value;
        sourceSelector.appendChild(option);
    }
    sourceSelector.value=sessionStorage.getItem("source_id")

    sourceSelector.addEventListener("change",()=>{
        const ACT_STEP=localStorage.getItem("actualStep")
        if (ACT_STEP==0){
            localStorage.setItem("sampleSrc",sourceSelector.value)
        }else{
            source_list[ACT_STEP-1]=sourceSelector.value
        }
        console.log(`Source id ${sourceSelector.value} del step ${localStorage.getItem("actualStep")}`)})
}