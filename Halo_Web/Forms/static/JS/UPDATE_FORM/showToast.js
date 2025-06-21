/**
 * @module UPDATE_FORM
 */

/**
 * Shows a Toast notifying users performed action
 * @param {int} id 
 * @param {boolean} isRegister 
 */
function showFormsToast(id,isRegister){
    const msg= isRegister ? `You have registred a new step! ${id}!` 
                            : `Step ${id} modified succesfully!`
    const msg_color=isRegister ? 'success' : 'info'
    const toast = document.createElement('div');
    const container = document.getElementById('toast-container');

    if (container.children.length >= 5) {
        container.removeChild(container.firstChild);
    } // Quita el más antiguo

    toast.className = `toast align-items-center bg-${msg_color} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.appendChild(newToastBody(msg))

    container.appendChild(toast);

    const bsToast = new bootstrap.Toast(toast, { delay: 10000 });
    bsToast.show();
}

/**
 * Configure a toast-body with introduced msg
 * @param {String} msg 
 * @returns {HTMLDivElement} toast container
 */
function newToastBody(msg){
    const container= document.createElement("div")
    const toastBody= document.createElement("div")
    const toastBtn= document.createElement("button")

    container.className="d-flex"
    toastBody.className="toast-body"
    toastBody.innerText=msg

    toastBtn.className="btn-close btn-close-white me-2 m-auto"
    toastBtn.setAttribute("data-bs-dismiss","toast")
    toastBtn.ariaLabel="Cerrar"
    
    container.appendChild(toastBody)
    container.appendChild(toastBtn)
    
    return container
}