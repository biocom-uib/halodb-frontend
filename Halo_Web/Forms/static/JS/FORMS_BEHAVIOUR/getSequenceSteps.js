/**
 * Returned the steps associated to an input @param koma
 * @param {string} koma 
 * @returns {Array} list of @param koma sequences
 */
async function getSequenceSteps(koma){
    const sequences=await fetchSecureFile("GET","sequences")
    return sequences[koma]
}