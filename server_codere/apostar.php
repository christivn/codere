<?php
/*
id_combinada:V7y1n3s2v26
id_apuesta:1
nombre:christian
apostado:1
cantidad:340

http://127.0.0.1/codere/apostar.php?id_combinada=V7y1n3s2v26&id_apuesta=1&nombre=christian&apostado=1&cantidad=340
*/

// TODO: Comprobar que lo apostado no sea mayor que el saldo

/**************************************************************/
// Crea la apuesta combinada
// Params: "id_combinada" "id_apuesta" "nombre" "apostado" "cantidad"
/**************************************************************/
include "./headers.php";
include "./dbConnect.php";

if(isset($_REQUEST['id_combinada']) && isset($_REQUEST['id_apuesta']) && isset($_REQUEST['nombre']) && isset($_REQUEST['apostado']) && isset($_REQUEST['cantidad'])){

    // Crea el registro en la tabla historial
    $registros=mysqli_query($conexion,"select count(id_combinada) as count from historial where id_combinada='".$_REQUEST['id_combinada']."'") or 
    die("Problemas en el select".mysqli_error($conexion));
    while ($reg=mysqli_fetch_assoc($registros)) { $vec[]=$reg; }
    $numeroRegistros = $vec[0]['count'];
    
    if($numeroRegistros=='0') {
        // UPDATE al balance de la cuenta del usuario
        mysqli_query($conexion,"UPDATE usuarios SET balance=balance-".intval($_REQUEST['cantidad'])." WHERE nombre='".$_REQUEST['nombre']."'") or 
        die("Problemas en el insert".mysqli_error($conexion));

        mysqli_query($conexion,"INSERT INTO historial (nombre,id_combinada,cantidad) VALUES ('".$_REQUEST['nombre']."', '".$_REQUEST['id_combinada']."', ".$_REQUEST['cantidad'].");") or 
        die("Problemas en el insert".mysqli_error($conexion));
    } else {
        echo "Ya existe la ID de la combinada";
    }

    // Crea el registro en la tabla combinada
    $dateNow = date('Y-m-d H:i:s');
    mysqli_query($conexion,"INSERT INTO combinada (id_combinada,id_apuesta,nombre,apostado,fecha) VALUES ('".$_REQUEST['id_combinada']."', ".$_REQUEST['id_apuesta'].", '".$_REQUEST['nombre']."', '".$_REQUEST['apostado']."', '".$dateNow."');") or 
    die("Problemas en el insert".mysqli_error($conexion));
}

?>