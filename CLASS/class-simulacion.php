<?php

class simulaciones{

	private $idSimulacion;
	private $Precio;
	private $Anios;
	private $VentasIniciales;
	private $VentasFinales;
	private $Categoria;

	public function __construct($idSimulacion,
				$Precio,
				$Anios,
				$VentasIniciales,
				$VentasFinales,
				$Categoria){
		$this->idSimulacion = $idSimulacion;
		$this->Precio = $Precio;
		$this->Anios = $Anios;
		$this->VentasIniciales = $VentasIniciales;
		$this->VentasFinales = $VentasFinales;
		$this->Categoria = $Categoria;
	}
	public function getIdSimulacion(){
		return $this->idSimulacion;
	}
	public function setIdSimulacion($idSimulacion){
		$this->idSimulacion = $idSimulacion;
	}
	public function getPrecio(){
		return $this->Precio;
	}
	public function setPrecio($Precio){
		$this->Precio = $Precio;
	}
	public function getAnios(){
		return $this->Anios;
	}
	public function setAnios($Anios){
		$this->Anios = $Anios;
	}
	public function getVentasIniciales(){
		return $this->VentasIniciales;
	}
	public function setVentasIniciales($VentasIniciales){
		$this->VentasIniciales = $VentasIniciales;
	}
	public function getVentasFinales(){
		return $this->VentasFinales;
	}
	public function setVentasFinales($VentasFinales){
		$this->VentasFinales = $VentasFinales;
	}
	public function getCategoria(){
		return $this->Categoria;
	}
	public function setCategoria($Categoria){
		$this->Categoria = $Categoria;
	}
	public function toString(){
		return "IdSimulacion: " . $this->idSimulacion . 
			" Precio: " . $this->Precio . 
			" Anios: " . $this->Anios . 
			" VentasIniciales: " . $this->VentasIniciales . 
			" VentasFinales: " . $this->VentasFinales . 
			" Categoria: " . $this->Categoria;
	}

	public function verRegistroSimulaciones($conexion){

		$sql = "SELECT idSimulacion, Precio, Anios, VentasIniciales, VentasFinales, C.categoria 
		FROM simulaciones as S  
		INNER JOIN categorias as C
		ON S.Categoria = C.id
		ORDER BY idSimulacion DESC LIMIT 5";

		$resultado = $conexion->ejecutarConsulta($sql);
		$listaSimulaciones = array();
		while($fila = $conexion->obtenerFila($resultado)){
			$listaSimulaciones[] = $fila;
		}

		$final = json_encode($listaSimulaciones);

		return $final;
		
	}

	public function registarNuevaSimulacion($conexion){
		$sql = sprintf("INSERT INTO simulaciones( Precio, Anios, VentasIniciales, VentasFinales, Categoria) VALUES (%s,%s,%s,%s,%s)",
		$conexion->antiInyeccion($this->Precio),
		$conexion->antiInyeccion($this->Anios),
		$conexion->antiInyeccion($this->VentasIniciales),
		$conexion->antiInyeccion($this->VentasFinales),
		$conexion->antiInyeccion($this->Categoria));
		$resultado = $conexion->ejecutarConsulta($sql);

		if($resultado){
			$mensaje["mensaje"]="Simulacion guardada exitosamente";
			$mensaje["sql"]=$sql;
			return json_encode($mensaje);
		}
		else{
			$mensaje["mensaje"]="No se ha podido guardar la simulación";
			$mensaje["sql"]=$sql;
			return json_encode($mensaje);
		}
	}
	

}

?>