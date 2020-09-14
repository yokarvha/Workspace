//entrega 1
function submitEventHandler(evento){
    evento.preventDefault();
    sessionStorage.setItem('logueado', 'true');
    //entrega 2
    var userName = document.getElementById('username').value;
    localStorage.setItem('usuario', userName);
    //fin entrega 2
    window.location.href = 'index.html';
    return true;
}

document.getElementById('formulario-login').addEventListener('submit', submitEventHandler);
//fin entrega 1

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});