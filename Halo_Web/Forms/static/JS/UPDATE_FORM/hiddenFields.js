const modifyDict={
    GENOME:(koma)=>hideGenomeFieldsDict[koma] ? showListFields(hideGenomeFieldsDict[koma],false) : [],
    "RAW READS":(koma)=>showRRFieldsDict[koma] ? showListFields(showRRFieldsDict[koma],true) : [],
    "TRIMMED READS":(koma)=>hideTRFieldsDict[koma] ? showListFields(hideTRFieldsDict[koma],false) : []

}

const hideGenomeFieldsDict={
    "GENOME VIRUS": ["txnt","sixteensr","seqdepth","dnae","tems",
                                            "phsa","sals","emet","elac","temo","teml",
                                            "temh","phop","phhi","salo","sall","salw",
                                            "path","extr"]
}

const hideTRFieldsDict={
    METATRANSCRIPTOME:["coverage"]
}

const showRRFieldsDict={
    METAGENOME:["gsiz","sfrac","meca"],
    METATRANSCRIPTOME:["meca"],
    METAVIROME:["meca"],
    PLASMID:["meca"]
}

function showListFields(list,show){
    list.forEach(element => {
        const aux=document.getElementById(element)
        console.log(element)
        if (!show & aux.parentElement)
            document.getElementById(element).parentElement.setAttribute('hidden',null)
        else{
            const parent=document.getElementById(element).parentElement
            if(parent.hasAttribute('hidden'))
                parent.removeAttribute('hidden')
            else
                parent.parentElement.removeAttribute('hidden')
        }
            
    });
}