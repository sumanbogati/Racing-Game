<?php
	if(file_exists('config.php')){
		include_once('config.php');
		
		$dbc = mysqli_connect($dbhost, $dbuser, $password, $dbname);
		if($dbc){
			return $dbc;		
		}else{
			return false;
		}	
	}
	
?>

