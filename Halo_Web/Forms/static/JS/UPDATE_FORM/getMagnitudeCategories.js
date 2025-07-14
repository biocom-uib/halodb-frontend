function getMagnitudeCategories(){
    const inputList=document.querySelectorAll("input")
    const magnitudesCategories={
        temc:{value:"tems",table:"temperature"},
        phca:{value:"phsa",table:"ph"},
        salc:{value:"sals",table:"salinity"}
    }
    inputList.forEach(item=>{
        const sampleValue=magnitudesCategories[item.id]
        if(sampleValue){
            const referenceField=document.getElementById(sampleValue.value)
            referenceField.addEventListener("change",async ()=>{
                const formatedValue=Number(referenceField.value).toFixed(2)
                const result=await fetchSecureFile("GET",`public/query/${sampleValue.table}/${formatedValue}`)
                item.value=decodeURIComponent(result).split(" (")[0]
            })
            
        }
    })
}