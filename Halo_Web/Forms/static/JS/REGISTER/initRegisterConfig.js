function initRegister(){
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    })
  document.addEventListener("submit",()=>{
    const password=document.getElementById("password").value
    const confirmPassword=document.getElementById("confirmPassword").value
    const container=document.querySelector(".card-body")
    let msgContianer=document.getElementById(".alert")
    if(msgContianer)
      msgContianer.innerHTML=""
    else
      {msgContianer=document.createElement("div")
      msgContianer.className="alert alert-danger mt-3"

      }
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regex.test(password)) {
      event.preventDefault()
      msgContianer.innerText = "Your password must have 8 characters, 1 digit & 1 capital letter";
      container.prepend(msgContianer)
      return;
    }
    if (password !== confirmPassword) {
      event.preventDefault()
      msgContianer.innerText = "Password doesn't match!";
      container.prepend(msgContianer)
      return;
  }
  document.querySelector("form").submit()
  })
}