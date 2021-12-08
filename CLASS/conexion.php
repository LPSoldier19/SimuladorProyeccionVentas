

<?php
	class Conexion{

		private $host;
		private $database;
		private $usuario;
		private $pass;
		private $link;
		private $puerto;
		private $esConectado=false;
		public function __construct(
			$host =  "localhost",
			$database =  "proyeccionventas", //colocan el nombre de la base de datos 
			$usuario =  "root",//usuario
			$pass =  "",
			$port = 3306,
			$link = null
		){
			$this->host = $host;
			$this->database = $database;
			$this->usuario = $usuario;
			$this->pass = $pass;
			$this->port = $port;
			$this->establecerConexion();
		}
		public function establecerConexion () {
			// MySQLi
			$this->link = mysqli_connect(
				$this->host,
				$this->usuario,
				$this->pass,
				$this->database,
				$this->port
			);
		}

		public function ejecutarConsulta($sql){
			return mysqli_query($this->link, $sql);
		}

		public function obtenerFila($resultado){
			return mysqli_fetch_assoc($resultado);
		}

		public function cerrarConexion(){
			mysqli_close($this->link);
		}

		public function getLink(){
			return $this->link;
		}

		public function antiInyeccion($texto){
			return mysqli_real_escape_string($this->link, $texto);
		}

		public function ultimoId(){
			return mysqli_insert_id($this->link);
		}

		public function cantidadRegistros($resultado){
			return mysqli_num_rows($resultado);
		}
	}

?>