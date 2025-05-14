/**
 * Remove all data stored in LS unless the env
 */
function restoreStorage(){
    const env=localStorage.getItem("env")
    localStorage.clear()
    localStorage.setItem("env",env)
}