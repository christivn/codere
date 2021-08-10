<?php
/**************************************************************************/
// Registra automáticamente al usuario culla ID no se encuentra registrada
// Params: "User ID"
/*************************************************************************/
include "./headers.php";
include "./dbConnect.php";

$registros=mysqli_query($conexion,"insert") or 
die("Problemas en el select".mysqli_error($conexion));
?>