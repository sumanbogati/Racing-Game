<?php
	//include("mysqli_connect.php");
	if(file_exists('config.php')){
		include_once("login_form.php");
	}else{
		include_once("install.php");
	}
	
	//include("home.php");

?>