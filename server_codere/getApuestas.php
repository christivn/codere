<?php
/**************************************************************/
// Devuelve las apuestas que aún no han caducado
// Params: 
/**************************************************************/
	include "./headers.php";
	include "./dbConnect.php";

	$registros=mysqli_query($conexion,"select * from apuestas where fecha>now() and resultado='0'") or 
	die("Problemas en el select".mysqli_error($conexion));

	while ($reg=mysqli_fetch_assoc($registros)) {
		$vec[]=$reg;
	}

	print json_encode ($vec);
?>