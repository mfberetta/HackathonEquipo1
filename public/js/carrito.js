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
//Métodos de la API de carritos, en los métodos se incorpora el token en el header.
let url = "/api/carritos/" + localStorage.getItem('email') + "/usuario"
fetch (url, {
    method: 'GET',
    headers: {
      'authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
  })
    .then(resp => resp.json())
    .then(carritos => {
        let html =''
        carritos.forEach(carrito => {
            let htmlSegment = 
                `<div class="card">
                    <div class="container">
                        <p><b>Carrito Id: ${carrito.id}</b></p>
                        <p>Fecha / Hora: ${carrito.fyh}</p> 
                        <p>e-mail: ${carrito.email}</p> 
                        <p>Direccion: ${carrito.direccion}</p> 
                        <button class="btn btn-danger" onclick="deleteCarrito('${carrito.id}')">Eliminar</button>
                        <button class="btn btn-info" onclick="getCarrito('${carrito.id}')">Ver</button>
                    </div>
                    <div class="container">
                        <b>Agrega / Quita producto</b>
                        <p>Id Producto:<input type="text" id="idProd-${carrito.id}" value=""></p> 
                        <button class="btn btn-success" onclick="addProducto('${carrito.id}')">Agregar</button>
                        <button class="btn btn-warning" onclick="delProducto('${carrito.id}')">Quitar</button>
                    </div>
                    <div class="container">
                        <button class="btn btn-primary" onclick="finalizarCompra('${carrito.id}')">Comprar</button> 
                    </div>
                </div>`
            html += htmlSegment
        })
        document.getElementById("vistaCarritos").innerHTML = html
    })

function deleteCarrito(id){
    fetch('/api/carritos/' + id, {
        method: 'DELETE',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    })
        .then(res => res.text())
        .then(res => {
            alert(res)
            location.reload();
            return false;
        })
}

function getCarrito(id){
    fetch('/api/carritos/' + id + '/productos', {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    })
        .then(res => res.text())
        .then(res => {
            alert(res)
            location.reload();
            return false;
        })
}

function addCarrito(){
    fetch('/api/carritos', {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
        ,
        body: JSON.stringify({
            direccion: document.getElementById('direccion').value,
            email: localStorage.getItem('email')
        })
    })
        .then(res => res.text())
            .then(res => {
                alert(res)
                location.reload();
                return false;
            })
        .catch(error => {
            console.log(error)
            alert("addCarrito")
            location.reload()
            return false
        })
}

function addProducto(id){
    if(!document.getElementById('idProd-'+id).value) alert('Debe ingresar un producto')
    else{
        //Obtiene el producto
        fetch('/api/productos/' + document.getElementById('idProd-'+id).value, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .then(producto => producto.text())
            .then(producto => {
                if (producto == '{"error":"producto no encontrado"}'){ //Si el producto no existe
                    alert(producto)
                    location.reload();
                    return false;
                }
                fetch('/api/carritos/' + id + '/productos/' + document.getElementById('idProd-'+id).value, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                })
                    .then(res => res.text())
                    .then(res => {
                        alert(res)
                        location.reload();
                        return false;
                    })
            })
    }
}   

function delProducto(id){
    if(!document.getElementById('idProd-'+id).value) alert('Debe ingresar un producto')
    else{
        fetch('/api/carritos/' + id + '/productos/' +  document.getElementById('idProd-'+id).value, {
            method: 'DELETE',
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
}

function finalizarCompra(id){
    fetch('/api/carritos/' + id + '/venta', {
        method: 'POST',
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