<?php
include_once('mysqli_connect.php');
session_start();
$user_id = $_SESSION['user_id'];
mysqli_select_db($dbc, $dbname);
	
if(!empty($_GET['delMessage'])){
	$message_ids = $_GET['delMessage'];
	$message_ids = json_decode($message_ids);
	$ids = '';
	foreach($message_ids as $value){
		$ids .=  $value.',' ;	
	}
	$ids = rtrim($ids, ",");
	
	$query = "DELETE message from message WHERE id IN (".$ids.")";
	
	echo $query;
	$result = mysqli_query($dbc, $query);
	if($result){
		echo "sucess";
	}else{
		echo "failure";
	}
}

?>