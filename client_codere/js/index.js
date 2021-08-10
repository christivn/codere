let arrBets = new Array();

function actualizarTotal(){
    let apostado = document.getElementById("cantidadApostada").value;
    let cuota = document.getElementById("cuota").textContent;
    let total = document.getElementById("total");

    if(apostado==""){
        total.innerHTML=0;
    } else {
        total.innerHTML=(parseInt(apostado)*parseFloat(cuota)).toFixed(0);
    }
}

function actualizarCuota(ele){
    let radios = document.querySelectorAll("input[type='radio']:checked");
    let cuota = document.getElementById("cuota");

    let totalCuota = 0;
    arrBets= new Array();
    for(let i=0; i<radios.length; i++){
        let value = radios[i].value;
        let cuota = value.split("/");
        totalCuota+=parseFloat(cuota[1]);

        let apuesta = {id:cuota[0], apostado:cuota[2]};
        arrBets.push(apuesta);
    }

    cuota.innerHTML=(parseFloat(totalCuota)).toFixed(2);
    actualizarTotal();
}

function realizarApuesta(){
    let saldo = document.getElementById("saldo").textContent;
    saldo = parseInt(saldo);
    console.log(saldo);

    let cantidadTotal = document.getElementById("cantidadApostada").value;
    cantidadTotal = parseInt(cantidadTotal);
    console.log(cantidadTotal);
    
    if(saldo>0){
        if(cantidadTotal<=saldo){
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            let nombre = urlParams.get('nombre');
    
            let id_combinada = makeid(11);
            console.log("id_combinada:"+id_combinada);

            for(let i=0;i<arrBets.length;i++){
                console.log("+----------------------------+");
                console.log("id_apuesta:"+arrBets[i].id);
                console.log("nombre:"+nombre);
                console.log("apostado:"+arrBets[i].apostado);
                console.log("cantidad:"+cantidadTotal);

                let con=new XMLHttpRequest();
                con.open('GET','http://127.0.0.1/codere/apostar.php?id_combinada='+id_combinada+'&id_apuesta='+arrBets[i].id+'&nombre='+nombre+'&apostado='+arrBets[i].apostado+'&cantidad='+cantidadTotal);
                con.send();
            }
            location.reload();
        }
    }
}

function makeid(length) {
    var result           = '';
    var characters       = 'GV9Jm2u7rmsCe65wKzPTw5jtS38n2tVEGiijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

/****************************************************************/

addEventListener('load',inicializarEventos,false);

function inicializarEventos() {
    // TODO: Verificar si el usuario ya está registrado, si no crearlo

    linkLogo();
    cargarSaldo();
    cargarApuestas();
}

function linkLogo() { 
    const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	let nombre = urlParams.get('nombre');
    document.getElementById("logo").href="index.html?nombre="+nombre;
}

/****************************************************************/

let conexion;
let tiempo;
function cargarSaldo(){
    const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	let nombre = urlParams.get('nombre');

    document.getElementById("add_saldo").href="add_saldo.html?nombre="+nombre;
    document.getElementById("retirar_saldo").href="retirar_saldo.html?nombre="+nombre;
    document.getElementById("historial").href="historial.html?nombre="+nombre;

    conexion=new XMLHttpRequest();
    conexion.addEventListener('readystatechange',callBackSaldo);
    conexion.open('GET','http://localhost/codere/getUserData.php?nombre='+nombre);
    conexion.send();

    tiempo=setTimeout("finDeEspera()",10000);
}


function callBackSaldo() {
    if(conexion.readyState == 4 && conexion.status == 200) {
        clearTimeout(tiempo);
        let data=JSON.parse(conexion.responseText);
        document.getElementById('saldo').innerHTML=data[0].balance;
    }
}

function finDeEspera() {
    conexion.abort();
}



let conexion2;
let tiempo2;
function cargarApuestas(){
    conexion2=new XMLHttpRequest();
    conexion2.addEventListener('readystatechange',callBackApuestas);
    conexion2.open('GET','http://localhost/codere/getApuestas.php');
    conexion2.send();

    tiempo2=setTimeout("finDeEspera2()",10000);
}


function callBackApuestas() {
    if(conexion2.readyState == 4 && conexion2.status == 200) {
        clearTimeout(tiempo2);
        let data=JSON.parse(conexion2.responseText);

        let str="";
        for(let i=0;i<data.length;i++){
            let fecha = data[i].fecha.substr(0,data[i].fecha.length-3);
            fecha = fecha.replaceAll("-","/");
            fecha = fecha.replace(" ","&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class='far fa-clock'></i> ");

            let icono = "";
            if(data[i].tipo.toLowerCase()=="futbol"){
                icono = "<i class='far fa-futbol'></i>";
            } else {
                icono = "<i class='fas fa-award'></i>";
            }

            str+="<tr>";
            str+="<td style='padding-left:2rem;background-color:#162329'><b>"+data[i].jugador1+"</b>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<b>"+data[i].jugador2+"</b></td>";
            str+="<td align='right'>"+icono+" "+data[i].tipo+"</td>";
            str+="<td align='right'><i class='far fa-calendar-alt'></i> "+fecha+"</td>";

            str+=`<td align='right' style='padding-right:2rem;'>
                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" class="btn-check" name="btnradio-`+i+`" id="btnradio1-`+i+`" autocomplete="off" onclick="actualizarCuota(this)" value="`+data[i].id_apuesta+`/`+data[i].cuota_1+`/1">
                    <label class="btn btn-outline-success" for="btnradio1-`+i+`">`+data[i].cuota_1+`</label>
                
                    <input type="radio" class="btn-check" name="btnradio-`+i+`" id="btnradio2-`+i+`" autocomplete="off" onclick="actualizarCuota(this)" value="`+data[i].id_apuesta+`/`+data[i].cuota_x+`/x">
                    <label class="btn btn-outline-success" for="btnradio2-`+i+`">`+data[i].cuota_x+`</label>
                
                    <input type="radio" class="btn-check" name="btnradio-`+i+`" id="btnradio3-`+i+`" autocomplete="off" onclick="actualizarCuota(this)" value="`+data[i].id_apuesta+`/`+data[i].cuota_2+`/2">
                    <label class="btn btn-outline-success" for="btnradio3-`+i+`">`+data[i].cuota_2+`</label>
                </div>
            </td>`;

            str+="</tr>";
        }

        document.getElementById('tabla').innerHTML=str;
    }
}


function finDeEspera2() {
  conexion2.abort();
}