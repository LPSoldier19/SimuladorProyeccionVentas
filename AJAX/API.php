<?php

    include ("../CLASS/conexion.php");
    include ("../CLASS/class-simulacion.php");


    $conexion = new Conexion();

    switch ($_GET["accion"]){

        case "obtener-lista-simulaciones":
            $empr = new empresas(null,null,null);
            echo $empr->obtenerListaEmpresas($conexion);
        break;

        case "guardar-simulacion":
            $agrdev = new devoluciones(null,$_POST["Total_Devolucion"],$_POST["Fecha_Devolucion"],$_POST["Estado"],$_POST["Sucursal"]);
            echo $agrdev->agregarDevolucion($conexion);
        break;

    }
    
?>