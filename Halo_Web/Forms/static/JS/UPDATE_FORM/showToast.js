
function showFormsToast(id,isRegister){
const msg= isRegister ? `You have registred a new step! ${id}!` : `Step ${id} modified succesfully!`
const msg_color=isRegister ? 'success' : 'info'

showToast(msg,msg_color)
}

function showToast(msg,msg_color){
const container = document.getElementById('toast-container');
if (container.children.length >= 5) {
    container.removeChild(container.firstChild); // Quita el más antiguo
}
const toast = document.createElement('div');
toast.className = `toast align-items-center bg-${msg_color} border-0`;
toast.setAttribute('role', 'alert');
toast.setAttribute('aria-live', 'assertive');
toast.setAttribute('aria-atomic', 'true');
toast.innerHTML = `
    <div class="d-flex">
    <div class="toast-body">
        ${msg}
    </div>
    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
    </div>
`;

container.appendChild(toast);

const bsToast = new bootstrap.Toast(toast, { delay: 10000 });
bsToast.show();
}