//Verifica que el token sea válido para mostrar la vista de productos
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
//Métodos de la API de productos, en los métodos se incorpora el token en el header.
let url = "/api/productos"
fetch (url, {
    method: 'GET',
    headers: {
      'authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
  })
    .then(resp => resp.json())
    .then(productos => {
        let html =''
        productos.forEach(producto => {
            let htmlSegment = 
                `<div class="card">
                    <br>
                    <img src="${producto.foto}" width ="50" height ="50">
                    <div class="container">
                        <p><b>Producto Id: ${producto.id}</b></p>
                        Timestamp:<br><input type="text" id="timestamp-${producto.id}" value="${producto.timestamp}" disabled> 
                        <br>Codigo:<br><input type="text" id="codigo-${producto.id}" value="${producto.codigo}">
                        <br>Nombre:<br><input type="text" id="nombre-${producto.id}" value="${producto.nombre}">
                        <br>Descripcion:<br><input type="text" id="descripcion-${producto.id}" value="${producto.descripcion}"> 
                        <br>Categoria:<br><input type="text" id="categoria-${producto.id}" value="${producto.categoria}"> 
                        <br>URL Foto:<br><input type="text" id="foto-${producto.id}" value="${producto.foto}">
                        <br>Precio:<br><input type="text" id="precio-${producto.id}" value="${producto.precio}">
                        <br>Stock:<p><input type="text" id="stock-${producto.id}" value="${producto.stock}"></p>
                        <button class="btn btn-danger" onclick="deleteProducto('${producto.id}')">Eliminar</button>
                        <button class="btn btn-info" onclick="getProducto('${producto.id}')">Ver</button>
                        <button class="btn btn-success" onclick="updateProducto('${producto.id}')">Update</button>
                    </div>
                </div>`
            html += htmlSegment
        })
        document.getElementById("vistaProductos").innerHTML = html
    })

function deleteProducto(id){
    fetch('/api/productos/' + id, {
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

function getProducto(id){
    fetch('/api/productos/' + id, {
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

function addProducto(){
    fetch('/api/productos', {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
            nombre: document.getElementById('nombre').value,
            descripcion: document.getElementById('descripcion').value,
            categoria: document.getElementById('categoria').value,
            codigo: document.getElementById('codigo').value,
            foto: document.getElementById('foto').value,
            precio: document.getElementById('precio').value,
            stock: document.getElementById('stock').value
        })
    })
        .then(res => res.text()) // or res.json()
            .then(res => {
                alert(res)
                location.reload()
                return false
            })
        .catch(error => {
            console.log(error)
            alert("addProducto")
            location.reload()
            return false
        })
}

function updateProducto(id){
    fetch('/api/productos/' + id, {
        method: 'PUT',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
            timestamp: document.getElementById('timestamp-'+id).value,
            nombre: document.getElementById('nombre-'+id).value,
            descripcion: document.getElementById('descripcion-'+id).value,
            categoria: document.getElementById('categoria-'+id).value,
            codigo: document.getElementById('codigo-'+id).value,
            foto: document.getElementById('foto-'+id).value,
            precio: document.getElementById('precio-'+id).value,
            stock: document.getElementById('stock-'+id).value
        })
    })
        .then(res => res.text()) // or res.json()
        .then(res => {
            alert(res)
            location.reload();
            return false;
        })
}