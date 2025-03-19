const onSubmit = (event) => async () => {
  const formContainer = document.getElementById("subscribe-form-container");
  const url =
    "https://0c914840.sibforms.com/serve/MUIFALdasdNgiu0ekw0tud3YNnWxg4I1sZMeHevlZvw_47D1oT7aRNlFeHV-jltqJq_qKGQDifguy-EuRc4dZFf9voCQz5fN4cVem3rwOmR7wwkv8ySOmoBfIXum2-Oo0zOa2fXFYWY5zt4xLnqwInLdhXODkHtvOMcQbGA-GUihOtlZkhTmBuw4Lss3ytn_WCF9sIuQgyRiRw9s";
  const loading = formContainer.querySelector(".loading");
  const error = formContainer.querySelector(".error-message");
  const sent = formContainer.querySelector(".sent-message");
  const data = new FormData(event.target);
  const token = await grecaptcha.execute(
    "6Lc4A-AqAAAAACtE925t9msdgPZ_mAuQuAnvaU2H",
    { action: "submit" }
  );
  data.append("g-recaptcha-response", token);
  sent.classList.remove("d-block");
  error.classList.remove("d-block");
  loading.classList.add("d-block");

  fetch(url + "?isAjax=1", {
    method: "POST",
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        loading.classList.remove("d-block");
        error.classList.remove("d-block");
        sent.classList.add("d-block");
        form.reset();
      } else {
        response.json().then((data) => {
          loading.classList.remove("d-block");
          error.classList.add("d-block");
          sent.classList.remove("d-block");
          error.innerHTML =
            "Vaya! Hubo un problema guardando tu email, prueba de nuevo mas tarde.";
        });
      }
    })
    .catch((error) => {
      console.log("error");
      error.innerHTML =
        "Vaya! Hubo un problema guardando tu email, prueba de nuevo mas tarde.";
    });
};

async function handleSubmit(event) {
  event.preventDefault();

  const email = event.target.EMAIL.value;
  const formContainer = document.getElementById("subscribe-form-container");
  const error = formContainer.querySelector(".error-message");

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    error.classList.add("d-block");
    error.innerHTML = "Por favor, introduce un email válido.";
    return;
  }

  grecaptcha.ready(onSubmit(event));
}

(function () {
  "use strict";

  const form = document.getElementById("subscribe-form");
  form.addEventListener("submit", handleSubmit);
})();
