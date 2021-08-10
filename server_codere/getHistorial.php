<?php
/**************************************************************/
// Devuelve las apuestas que fueron realizadas por el usuario
// Params: "User ID"
/**************************************************************/
include "./headers.php";
include "./dbConnect.php";

if(isset($_REQUEST['nombre'])){
    $registros=mysqli_query($conexion,"SELECT combinada.nombre, historial.cantidad,combinada.id_combinada, combinada.id_apuesta, apuestas.jugador1, apuestas.jugador2, apuestas.fecha, combinada.fecha as combinadaFecha, apuestas.resultado,combinada.apostado
    FROM combinada
    INNER JOIN apuestas ON combinada.id_apuesta=apuestas.id_apuesta
    INNER JOIN historial ON combinada.id_combinada=historial.id_combinada
    WHERE historial.nombre='".$_REQUEST['nombre']."'
    ORDER BY apuestas.fecha DESC
    LIMIT 40")
    or die("Problemas en el select".mysqli_error($conexion));

    while ($reg=mysqli_fetch_assoc($registros)) {
        $vec[]=$reg;
    }

    print json_encode($vec);
}
?>