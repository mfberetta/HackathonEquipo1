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

//Envio mensaje via socket con el usuario (mail) para filtrar los mensajes
const email = location.pathname.split('/')[2] //obtiene el mail de la URL
socket.emit('email', email)

//Recibe mensajes del usuario (mail) a través del socket
socket.on('mensajesUsuario', manejarEventoMensajes)
async function manejarEventoMensajes(mensajes) {
    const recursoRemoto = await fetch('../plantillas/tabla-mensajes.hbs')
    const textoPlantilla = await recursoRemoto.text()
    const functionTemplate = Handlebars.compile(textoPlantilla)
    const html = functionTemplate({ mensajes })
    document.getElementById('mensajes').innerHTML = html
}
/*-----------------------------------------------------------------------*/
//Filtra mensajes propios del usuario logueado
function eliminarFiltroMensajes(){
    location.href = '/chat'
}