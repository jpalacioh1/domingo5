function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://144.22.59.185:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }    
    })
}

function pintarRespuesta(respuesta){

    let myTable="<table>";
    
    myTable+="<tr>";
    myTable+="<th>name</th>";
    myTable+="<th>description</th>";
 "</tr>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionCategorias("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarCategoria("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}

function guardarInformacionCategorias(){
    let var2 = {
        name:$("#nameCategoria").val(),
        description:$("#descriptionCategoria").val()
        };      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        url:"http://144.22.59.185:8080/api/Category/save",        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()    
        },        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");    
        }
        });
}

function actualizarInformacionCategorias(idElemento){
    let myData={
        id:idElemento,
        name:$("#nameCategoria").val(),
        description:$("#descriptionCategoria").val()
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.59.185:8080/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado1").empty();
            $("#id").val("");
            $("#nameCategoria").val("");
            $("#descriptionCategoria").val("");
            autoInicioCategoria();
            alert("se ha Actualizado correctamente la categoria")
        }
    });
}

function borrarCategoria(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.59.185:8080/api/Category/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado1").empty();
            autoInicioCategoria();
            alert("Se ha Eliminado.")
        }
    });
}

///// TABLA MOTOS /////

function autoInicioMoto(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://144.22.59.185:8080/api/Motorbike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta1(respuesta);
            let $select = $("#select-motorbike");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }    
    })
}

function pintarRespuesta1(respuesta){

    let myTable="<table>";
    
    myTable+="<tr>";
    myTable+="<th>name</th>";
    myTable+="<th>brand</th>";
    myTable+="<th>year</th>";
    myTable+="<th>description</th>";
    myTable+="<th>category</th>";
 "</tr>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].category.name+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionMoto("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarMoto("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado2").html(myTable);
}

function guardarInformacionMoto(){
    let var2 = {
        name:$("#nameMoto").val(),
        brand:$("#brandMoto").val(),
        year:$("#yearMoto").val(),
        description:$("#descriptionMoto").val(),
        category:{id: +$("#select-category").val()},
        };      
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),        
        url:"http://144.22.59.185:8080/api/Motorbike/save",               
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()    
        },        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");    
        }
        });

}

function actualizarInformacionMoto(idElemento){
    let myData={
        id:idElemento,
        name:$("#nameMoto").val(),
        brand:$("#brandMoto").val(),
        year:$("#yearMoto").val(),
        description:$("#descriptionMoto").val(),
        category:{id: +$("#select-category").val()},
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.59.185:8080/api/Motorbike/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado2").empty();
            $("#id").val("");
            $("#nameMoto").val("");
            $("#brandMoto").val("");
            $("#yearMoto").val("");
            $("#descriptionMoto").val("");
            $("select-category").val("");
            autoInicioMoto();
            alert("se ha Actualizado correctamente la moto")
        }
    });

}

function borrarMoto(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.59.185:8080/api/Motorbike/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado2").empty();
            autoInicioMoto();
            alert("Se ha Eliminado.")
        }
    });

}

///// TABLA CLIENTE /////

function autoInicioCliente(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://144.22.59.185:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta2(respuesta);
        }
    
    })

}

function pintarRespuesta2(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
    myTable+="<th>email</th>";
    myTable+="<th>password</th>";
    myTable+="<th>name</th>";
    myTable+="<th>age</th>";
    "</tr>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionCliente("+respuesta[i].idClient+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarCliente("+respuesta[i].idClient+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado3").html(myTable);
}

function guardarInformacionCliente(){
    let var2 = {
        email:$("#emailCliente").val(),
        password:$("#passwordCliente").val(),
        name:$("#nameCliente").val(),
        age:$("#ageCliente").val(),        
        };      
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),        
        url:"http://144.22.59.185:8080/api/Client/save",               
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()    
        },        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
        }
        });

}

function actualizarInformacionCliente(idElemento){
    let myData={
        idClient:idElemento,
        email:$("#emailCliente").val(),
        password:$("#passwordCliente").val(),
        name:$("#nameCliente").val(),
        age:$("#ageCliente").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.59.185:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado3").empty();
            $("#idClient").val("");
            $("#emailCliente").val("");
            $("#passwordCliente").val("");
            $("#nameCliente").val("");
            $("#ageCliente").val("");
            autoInicioCliente();
            alert("se ha Actualizado correctamente el Cliente")
        }
    });

}

function borrarCliente(idElemento){
    let myData={
        idClient:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.59.185:8080/api/Client/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado3").empty();
            autoInicioCliente();
            alert("Se ha Eliminado.")
        }
    });

}

///// TABLA MENSAJE /////

function autoInicioRelacionCliente(){
    
    $.ajax({
        url:"http://144.22.59.185:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){          
            let $select = $("#select-client");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');            
            }); 
        }    
    })
}

function autoInicioMensaje(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://144.22.59.185:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta3(respuesta);
        }
    
    })

}

function pintarRespuesta3(respuesta){

    let myTable="<table>";
    
    myTable+="<tr>";
    myTable+="<th>messageText</th>";
    myTable+="<th>moto</th>";
    myTable+="<th>client</th>";
    "</tr>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td>"+respuesta[i].motorbike.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionMensaje("+respuesta[i].idMessage+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarMensaje("+respuesta[i].idMessage+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado4").html(myTable);
}

function guardarInformacionMensaje(){
    if ($("#messageText").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{

    let var2 = {
        messageText:$("#messageText").val(),
        motorbike:{id: +$("#select-motorbike").val()},
        client:{idClient: +$("#select-client").val()},                
        };      
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),        
        url:"http://144.22.59.185:8080/api/Message/save",        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()    
        },        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
        }
        });
    }
}

function actualizarInformacionMensaje(idElemento){
    let myData={
        idMessage:idElemento,
        messageText:$("#messageText").val(),
        motorbike:{id: +$("#select-motorbike").val()},
        client:{idClient: +$("#select-client").val()},
        
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.59.185:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado4").empty();
            $("#messageText").val("");
            autoInicioMensaje();
            alert("se ha Actualizado correctamente el Mensaje")
        }
    });

}

function borrarMensaje(idElemento){
    let myData={
        idMessage:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.59.185:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado4").empty();
            autoInicioMensaje();
            alert("Se ha Eliminado.")
        }
    });
}

///// TABLA RESERVACIONES /////

function autoInicioRelacionClienteR(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://144.22.59.185:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta); 
            let $select = $("#select-clientR");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
                console.log("select "+name.idClient);
            }); 
        }
    
    })
}

function autoInicioMotoR(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://144.22.59.185:8080/api/Motorbike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-motorbikeR");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }    
    })
}

function autoInicioReservation(){
    $.ajax({

        url: "http://144.22.59.185:8080/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaReservation(response);
        }
    });
}

function pintarRespuestaReservation(response){
   
    let myTable="<table>";
    myTable+="<tr>";
        myTable+="<th>startDate</th>";
        myTable+="<th>devolutionDate</th>";
        myTable+="<th>status</th>";
        myTable+="<th>motorbike</th>";
        myTable+="<th>client</th>";
     "</tr>";
      
    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>"+response[i].startDate.slice(0,10)+"</td>";
        myTable+="<td>"+response[i].devolutionDate.slice(0,10)+"</td>";
        myTable+="<td>"+response[i].status+"</td>";
        myTable+="<td>"+response[i].motorbike.name+"</td>";
        myTable+="<td>"+response[i].client.name+"</td>";
        myTable+='<td><button  onclick="borrarReservation(' + response[i].idReservation + ')">Borrar</button></td>';
        myTable+='<td><button  onclick="actualizarReservation(' + response[i].idReservation + ')">Actualizar</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaReservation").html(myTable);
}

function guardarInformacionReservation() {

    if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0){
        alert("Todos los campos son Obligatorios")
    }else{  
        let elemento = {
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            motorbike:{id: +$("#select-motorbikeR").val()},
            client:{idClient: +$("#select-clientR").val()},
        }
        let dataToSend = JSON.stringify(elemento);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url:"http://144.22.59.185:8080/api/Reservation/save",
            data: dataToSend,
            datatype: "json",
            success: function (response) {
                console.log(response);
                console.log("Se ha guardado Correctamente!");
                alert("Se ha guardado Correctamente!")
                window.location.reload()
            },
            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo Correctamente!")
            }
        });
    }
}

function actualizarReservation(idElemento) {
    
    if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            idReservation: idElemento,
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            motorbike:{id: +$("#select-motorbikeR").val()},
            client:{idClient: +$("#select-clientR").val()},
        }
        let dataToSend = JSON.stringify(elemento);
        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url: "http://144.22.59.185:8080/api/Reservation/update",
            type: "PUT",
            success: function (response) {
                console.log(response);
                $("#miListaReservation").empty();
                alert("se ha Actualizado Correctamente!")
                autoInicioReservation();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}

function borrarReservation(idElemento) {
    let elemento = {
        idReservation: idElemento
    }
    let dataToSend = JSON.stringify(elemento);
    $.ajax(
        {
            dataType: 'JSON',
            data: dataToSend,
            url: "http://144.22.59.185:8080/api/Reservation/" + idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function(respuesta){
                console.log(respuesta);
                $("#miListaReservation").empty();
                autoInicioReservation();
                alert("Se Eliminó Correctamente")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente")
            }
        });
}

//// REPORTES ////

function traerReporteStatus(){
    console.log("test");
    $.ajax({
        url:"http://144.22.59.185:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta4(respuesta);
        }
    });
}

function pintarRespuesta4(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
       myTable+="<th>completadas</th>";
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<th>canceladas</th>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
        "</tr>";
    myTable+="</table>";
    $("#resultadoStatus").html(myTable);
}
function traerReporteDate(){

    var fechaInicio = document.getElementById("RstarDate").value;
    var fechaCierre = document.getElementById("RdevolutionDate").value;
    console.log(fechaInicio);
    console.log(fechaCierre);
    
        $.ajax({
            url:"http://144.22.59.185:8080/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaDate(respuesta);
            }
        });
    }
    function pintarRespuestaDate(respuesta){

        let myTable="<table>";
        myTable+="<tr>";
        myTable+="<th>startDate</th>";
        myTable+="<th>devolutionDate</th>";
        myTable+="<th>status</th>";
        myTable+="</tr>";
          
        for(i=0;i<respuesta.length;i++){
        myTable+="<td>"+respuesta[i].startDate.slice(0,10)+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate.slice(0,10)+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="</tr>";
        }
        myTable+="</table>";
        $("#resultadoDate").html(myTable);
    }

    function traerReporteClientes(){
        $.ajax({
            url:"http://144.22.59.185:8080/api/Reservation/report-clients",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaClientes(respuesta);
            }
        });
    }

    function pintarRespuestaClientes(respuesta){

        let myTable="<table>";
        myTable+="<tr>";
        myTable+="<tr>";
        myTable+="<th>total reservas</th>";
        myTable+="<th>name</th>";
        myTable+="<th>email</th>";
        myTable+="<th>age</th>";
        myTable+="</tr>";
          
        for(i=0;i<respuesta.length;i++){

            myTable+="<td>"+respuesta[i].total+"</td>";
            myTable+="<td>"+respuesta[i].client.name+"</td>";
            myTable+="<td>"+respuesta[i].client.email+"</td>";
            myTable+="<td>"+respuesta[i].client.age+"</td>";
          
            myTable+="</tr>";
        }
        myTable+="</table>";
        $("#resultadoClientes").html(myTable);
    }
