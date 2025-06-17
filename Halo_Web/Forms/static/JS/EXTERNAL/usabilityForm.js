document.getElementById("usability-form").addEventListener("submit", function (e) {
      e.preventDefault();

      let output = "<h5>Resultados:</h5><ul class='list-group'>";
      let completado = true;

      for (let i = 1; i <= 10; i++) {
        const respuesta = document.querySelector(`input[name="q${i}"]:checked`);
        if (respuesta) {
          output += `<li class='list-group-item'>Pregunta ${i}: ${respuesta.value} estrellas</li>`;
        } else {
          output += `<li class='list-group-item text-danger'>Pregunta ${i}: No respondida</li>`;
          completado = false;
        }
      }

      output += "</ul>";
      if (!completado) {
        output += "<p class='text-danger mt-2'>Por favor, responde todas las preguntas.</p>";
      }

      document.getElementById("resultados").innerHTML = output;
    });