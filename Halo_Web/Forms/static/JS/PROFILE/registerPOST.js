document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Evita el submit clásico
  
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
  
    try {
      const response = await fetch("/registration/SignUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert("Registro exitoso");
        window.location.href = "login/";

      } else {
        alert("Error al registrar: " + (result.error || "Desconocido"));

      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      alert("Ocurrió un error al enviar los datos");
    }
  });
  