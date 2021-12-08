<?php

    include ("../CLASS/conexion.php");
    include ("../CLASS/class-simulacion.php");


    $conexion = new Conexion();

    switch ($_GET["accion"]){

        case "obtener-lista-simulaciones":
            $simu = new simulaciones(null,null,null,null,null,null);
            echo $simu->verRegistroSimulaciones($conexion);
        break;

        case "guardar-simulacion":
            $regSim = new simulaciones(null,$_POST["Precio"],$_POST["Anios"],$_POST["VentasIniciales"],$_POST["VentasFinales"],$_POST["Categoria"]);
            echo $regSim->registarNuevaSimulacion($conexion);
        break;

    }
    
?>