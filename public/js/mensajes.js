//Verifica que el token sea válido para mostrar la vista de carritos
(async () => {
    const respuesta = await fetch('/auth', {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
    //Si no es válido redirecciona a login
    if (respuesta.status != 200) {
        return location.href = '/login'
    }
})()
/*-----------------------------------------------------------------------*/
//Websocket de mensajes
const socket = io.connect();
//Envía mensajes al back a través del socket
function enviarMensaje() {
    const mensaje = {
        email: localStorage.getItem('email'),
        tipo: 'usuario',
        texto: document.getElementById('mensaje').value
    }
    socket.emit('new-msg', mensaje);
    formEnviarMensaje.reset()
}
//Recibe mensajes a través del socket
socket.on('mensajes', manejarEventoMensajes)
async function manejarEventoMensajes(mensajes) {
    const recursoRemoto = await fetch('plantillas/tabla-mensajes.hbs')
    const textoPlantilla = await recursoRemoto.text()
    const functionTemplate = Handlebars.compile(textoPlantilla)
    const html = functionTemplate({ mensajes })
    document.getElementById('mensajes').innerHTML = html
}
/*-----------------------------------------------------------------------*/
//Filtra mensajes propios del usuario logueado
function filtrarMensajes() {
    location.href = '/chat/' + localStorage.getItem('email')
}