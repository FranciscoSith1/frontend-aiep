$(document).ready(function(){

    $("#btn-contacto").on("click", function(){
        const nombre = $("#nombre-contacto").val();
        const apellido = $("#apellido-contacto").val();
        const telefono = $("#telefono-contacto").val();
        const correo = $("#correo-contacto").val();
        const mensaje = $("#mensaje-contacto").val();
        
        const baseUrl = "https://frontend-aiep-default-rtdb.firebaseio.com";
        const url = baseUrl + "/mensajes.json";
        $.ajax(url, {
            method: "POST",
            data: JSON.stringify({nombre, apellido, telefono, correo, mensaje})
        }).done(function(d){
            alert("Mensaje enviado!");
        }).fail(function(d){
            alert("Su mensaje no pudo ser enviado, por favor contacte al administrador.")
        });
    });
    
});
