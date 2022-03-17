//Verifica que el token sea válido para mostrar la vista de ordenes
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
//Métodos de la API de ordenes, en los métodos se incorpora el token en el header.
let url = "/api/ordenes/" + localStorage.getItem('email') + "/usuario"
fetch (url, {
    method: 'GET',
    headers: {
      'authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
  })
    .then(resp => resp.json())
    .then(ordenes => {
        let html =''
        ordenes.forEach(orden => {
            let htmlSegment = 
                `<div class="card">
                    <div class="container">
                        <br><p><b>Orden Id: ${orden.id}</b></p>
                        e-mail:<br><input type="text" id="email-${orden.id}" value="${orden.email}" disabled> 
                        <br>Estado:<br><input type="text" id="estado-${orden.id}" value="${orden.estado}" disabled>
                        <br>Fecha:<br><input type="text" id="fyh-${orden.id}" value="${orden.fyh}" disabled>
                    </div>
                    <div class="container">   
                        <button class="btn btn-info" onclick="getOrden('${orden.id}')">Ver</button>
                    </div>
                </div>`
            html += htmlSegment
        })
        document.getElementById("vistaOrdenes").innerHTML = html
    })

function getOrden(id){
    fetch('/api/ordenes/' + id, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    })
        .then(res => res.text()) // or res.json()
        .then(res => {
            alert(res)
            location.reload();
            return false;
        })
}
