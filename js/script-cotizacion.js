window.addEventListener('DOMContentLoaded', (e) =>{
    console.log("evento DOMContentLoaded");

    let boton = document.getElementById("btn-cotizacion");
    boton.addEventListener("click", (ev) => {
        try{ 
            let nombre = document.getElementById("nombre-cotizacion").value;
            let apellido = document.getElementById("apellido-cotizacion").value;
            let telefono = document.getElementById("telefono-cotizacion").value;
            let email = document.getElementById("correo-cotizacion").value;
            let estilos = getEstilos();
            let descripcion = document.getElementById("descripcion-cotizacion").value;
            let adjunto = document.getElementById("adjunto-cotizacion").value;
            let cotizacion = {
            nombre,
            apellido,
            telefono,
            email, 
            estilos,
            descripcion,
            adjunto,
            fecha_registro: (new Date()).toISOString()
            };
        //console.log("El nombre del suscriptor es: " + nombre);
        console.dir(cotizacion);
        guardarCotizacion( cotizacion );
        } catch(e){
            mostrarError(e.message);
        }
    });
});

async function guardarCotizacion( cotizacion ) {
    const url = "https://frontend-aiep-default-rtdb.firebaseio.com/cotizaciones.json";
    const respuesta = await fetch(url, {
        method: "POST",
        body: JSON.stringify( cotizacion )
    })
    const data = await respuesta.json();
    mostrarExito("Se envió correcamente su cotización");
};

function mostrarExito(mensaje){
    alert(mensaje);
}

function getEstilos(){
    let inputEstilos = document.querySelectorAll("input[name='estilos']:checked");
    let arrEstilos   = [];

    inputEstilos.forEach( nodoEstilos => arrEstilos.push(nodoEstilos.value) ); 
    if( inputEstilos.length < 1){
        throw new Error("Debe seleccionar al menos un estilos.");
    }
    return arrEstilos;
};

function mostrarError (mensajeDeError){
    document.getElementById("form-mensaje-error").style.display = "block";
    const ul = document.querySelector("#form-mensaje-error ul");
    const li = document.createElement("li");
    const liText = document.createTextNode(mensajeDeError);
    li.appendChild(liText);
    ul.appendChild(li); 
};
