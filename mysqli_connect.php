<?php
	$dbc = mysqli_connect("localhost", "root", "", "racing_game");
	if($dbc){
		return $dbc;		
	}else{
		return false;
	}
?>

