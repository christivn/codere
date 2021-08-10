<?php
/**************************************************************/
// Devuelve los datos de un usuario (id,nombre,balance...)
// Params: "nombre"
/**************************************************************/
include "./headers.php";

if(isset($_REQUEST['nombre'])){
    include "./dbConnect.php";

    $registros=mysqli_query($conexion,"select * from usuarios where nombre='".$_REQUEST['nombre']."'") or 
    die("Problemas en el select".mysqli_error($conexion));

    while ($reg=mysqli_fetch_assoc($registros)) {
        $vec[]=$reg;
    }

    print json_encode ($vec);
}
?>