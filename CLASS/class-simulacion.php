<?php

	class Simulacion{

		private $precio;
		private $ventasIniciales;
		private $ventasFinales;
		private $categoria;
		private $anios;

		public function __construct($precio,
					$ventasIniciales,
					$ventasFinales,
					$categoria,
					$anios){
			$this->precio = $precio;
			$this->ventasIniciales = $ventasIniciales;
			$this->ventasFinales = $ventasFinales;
			$this->categoria = $categoria;
			$this->anios = $anios;
		}
		public function getPrecio(){
			return $this->precio;
		}
		public function setPrecio($precio){
			$this->precio = $precio;
		}
		public function getVentasIniciales(){
			return $this->ventasIniciales;
		}
		public function setVentasIniciales($ventasIniciales){
			$this->ventasIniciales = $ventasIniciales;
		}
		public function getVentasFinales(){
			return $this->ventasFinales;
		}
		public function setVentasFinales($ventasFinales){
			$this->ventasFinales = $ventasFinales;
		}
		public function getCategoria(){
			return $this->categoria;
		}
		public function setCategoria($categoria){
			$this->categoria = $categoria;
		}
		public function getAnios(){
			return $this->anios;
		}
		public function setAnios($anios){
			$this->anios = $anios;
		}
		public function __toString(){
			return "Precio: " . $this->precio . 
				" VentasIniciales: " . $this->ventasIniciales . 
				" VentasFinales: " . $this->ventasFinales . 
				" Categoria: " . $this->categoria . 
				" Anios: " . $this->anios;
		}
	}
?>