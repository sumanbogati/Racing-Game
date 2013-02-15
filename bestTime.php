<?php
	include('mysqli_connect.php');
	session_start();
	
	$user_id = $_SESSION['user_id'];
	$curr_time = $_GET['currTime'];
	
	$query = "Select bestTime, totalGame FROM history WHERE id =".$user_id;

	mysqli_select_db($dbc, 'history');
	
	$result = mysqli_query($dbc, $query);
	
	while($row = mysqli_fetch_row($result)){
		$best_time = $row[0];
		$total_game = $row[1];
	}
	$result = Array();	
	
	if(!empty($best_time) and !empty($total_game)){
		$total_game += 1;
		
		if($curr_time < $best_time){
			$best_time = $curr_time;
			$query = "UPDATE history SET bestTime = ". $best_time .", totalGame = " .$total_game ." WHERE id=".$user_id;
		}else{
			$query = "UPDATE history SET totalGame = " .$total_game ." WHERE id=".$user_id;
		}
		
		$result['best_time'] = $best_time;
		$result['total_game'] = $total_game;
		echo json_encode($result);
	}else{
		$best_time = $curr_time;
		$total_game = 1;
		//todo 
		//$query = "INSERT into history (id, bestTime, totalGame) VALUES('".$user_id ."', '".$best_time."', '".$total_game."')";
		
		$query = "UPDATE history SET bestTime = ". $best_time .", totalGame = " .$total_game ." WHERE id=".$user_id;
		
		//echo $best_time;
		 $result['best_time'] = $best_time;
		 $result['total_game'] = $total_game;
		 echo json_encode($result);
	}
	
	mysqli_select_db($dbc,  'history');
	$result = mysqli_query($dbc, $query);
	
	
?>