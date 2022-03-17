const formSignup = document.getElementById("formSignup");
formSignup.addEventListener('submit', async e => {

  e.preventDefault()

  const datos = {
    email: formSignup[0].value,
    password: formSignup[1].value,
    password1: formSignup[2].value,
    nombre: formSignup[3].value,
    apellido: formSignup[4].value,
    telefono: formSignup[5].value,
  }

  const respuesta = await fetch('/registro', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  const content = await respuesta.json();

  const { email, access_token } = content

  if (access_token) {
    localStorage.setItem("access_token", access_token)
    localStorage.setItem("email", email)
    location.href = '/'
  } else {
    location.href = '/registro-error'
  }
})