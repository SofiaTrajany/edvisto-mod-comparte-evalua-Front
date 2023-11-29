function abrirModal(trabajo) {
    document.getElementById('modalContent').innerText = trabajo;
    document.getElementById('myModal').style.display = 'block';
}

function cerrarModal() {
    document.getElementById('myModal').style.display = 'none';
}