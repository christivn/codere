addEventListener('load',inicializarEventos,false);

function inicializarEventos() {
    // TODO: Verificar si el usuario ya está registrado, si no crearlo

    linkLogo();
    cargarSaldo();
    cargarHistorial();
}

function linkLogo() { 
    const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	let nombre = urlParams.get('nombre');
    document.getElementById("logo").href="index.html?nombre="+nombre;
}

/**********************************************************************/

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

/**********************************************************************/

let conexion2;
let tiempo2;
function cargarHistorial(){
    const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	let nombre = urlParams.get('nombre');

    document.getElementById("add_saldo").href="add_saldo.html?nombre="+nombre;
    document.getElementById("retirar_saldo").href="retirar_saldo.html?nombre="+nombre;
    document.getElementById("historial").href="historial.html?nombre="+nombre;

    conexion2=new XMLHttpRequest();
    conexion2.addEventListener('readystatechange',callBackHistorial);
    conexion2.open('GET','http://localhost/codere/getHistorial.php?nombre='+nombre);
    conexion2.send();

    tiempo2=setTimeout("finDeEspera()",10000);
}


function callBackHistorial() {
    if(conexion2.readyState == 4 && conexion2.status == 200) {
        clearTimeout(tiempo2);

        let data;
        try {
            data=JSON.parse(conexion2.responseText);
        } catch(err) {
            data=new Array();
        }



        let str=document.getElementById('tabla').innerHTML;
        if(data.length!=0){
            for(let i=0;i<data.length;i++){
                let fecha = data[i].fecha.substr(0,data[i].fecha.length-3);
                fecha = fecha.replaceAll("-","/");
                fecha = fecha.replace(" ","&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class='far fa-clock'></i> ");

                let jugadorApostado = "";
                let jugadorGanador = "";

                if(data[i].apostado.toLowerCase()=="x"){
                    jugadorApostado="Empate";
                } else {
                    if(data[i].apostado.toLowerCase()=="1"){
                        jugadorApostado=data[i].jugador1;
                    } else {
                        jugadorApostado=data[i].jugador2;
                    }
                }

                if(data[i].resultado=="0"){
                    jugadorGanador="En espera";
                } else {
                    if(data[i].resultado=="1"){
                        jugadorGanador=data[i].jugador1;
                    } else {
                        jugadorGanador=data[i].jugador2;
                    }
                }

                let color = "";
                if(jugadorGanador=="En espera"){
                    color="#ffb81f";
                } else {
                    if(jugadorGanador==jugadorApostado){
                        color="#13a847";
                    } else {
                        color="#a61b1b";
                    }
                }

                str+=`<button id="`+data[i].id_combinada+`" type="button" class="collapsible text-white" style='background-color:#162329;background-image: linear-gradient(90deg, `+color+` 3.5rem, transparent 0%);' onclick="mostarCollapsable(this)"><b><i class="fas fa-plus" style="color:#162329;"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Apuesta: </b>`+data[i].combinadaFecha.substr(0,data[i].combinadaFecha.length-3)+`</button><div class="content">`;
        
                str+=`<div class="table100 ver5" style="margin-top:-4rem;background-color: #fff0!important;"><div class="table100-body js-pscroll"></div>`;

                str+="<table id='apuestas'>";

                str+=`<thead style='font-weight: bold;'>
                <td style="padding-left:2rem;background-color:#162329;">Partido</td>
                <td align='right' style="background-color:#162329;">Fecha - Hora</td>
                <td align='right' style="background-color:#162329;">Cantidad Apostada</td>
                <td align='right' style="background-color:#162329;">Apostado a favor</td>
                <td align='right' style='padding-right:4rem;background-color:#162329;'>Resultado</td>
                </thead>`;

                str+="<tr>";
                str+="<td style='color:#232323;padding-left:2rem;background-color:"+color+"'><b>"+data[i].jugador1+"</b>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<b>"+data[i].jugador2+"</b></td>";
                str+="<td align='right'><i class='far fa-calendar-alt'></i> "+fecha+"</td>";
                str+="<td align='right'>"+data[i].cantidad+"€</td>";
                str+="<td align='right'>"+jugadorApostado+"</td>";
                str+="<td align='right' style='padding-right:4rem;'>"+jugadorGanador+"</td>";
                str+="</tr></table>";
                str+="</div>";

                str+="</div></div>";
            }
            document.getElementById('tabla').innerHTML=str;
        } else {
            let str=document.getElementById('tabla').innerHTML;
            str+="<center><h1 class='text-white'>No tienes apuestas aún</h1></center>";
            document.getElementById('tabla').innerHTML=str;
        }

    }
}

function finDeEspera() {
    conexion2.abort();
}

function mostarCollapsable(ele) {
    if (ele.nextElementSibling.style.display === "block") {
		ele.style.borderBottomLeftRadius = "5px";
		ele.style.borderBottomRightRadius = "5px";
        ele.nextElementSibling.style.display = "none";
        ele.nextElementSibling.style.marginTop = "0rem";
    } else {
		ele.style.borderBottomLeftRadius = "0px";
		ele.style.borderBottomRightRadius = "0px";
        ele.nextElementSibling.style.display = "block";
        ele.nextElementSibling.style.marginTop = "-1rem";
    }
}