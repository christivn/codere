<?php
header('Content-Type: text/txt; charset=utf-8');
$conexion=mysqli_connect("localhost","root","","codere") or 
    die("Problemas con la conexión");

$conexion->set_charset("utf8") or
die("Error cargando el conjunto de caracteres utf8: %s\n".mysqli_error($conexion));
?>