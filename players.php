<?php
	include('mysqli_connect.php');
	session_start();
	$user_id = $_SESSION['user_id'];
	
	echo '<a href="game.php" >Play Game</a>';
	
    //$query = "SELECT user_info.id, user_info.username, history.bestTime, history.totalGame  FROM history, user_info  WHERE history.id = user_info.id";
	
	$query = "SELECT user_info.id, user_info.username, history.bestTime, history.totalGame  FROM history, user_info  WHERE history.id = user_info.id ORDER BY history.bestTime";
	
	mysqli_select_db($dbc, 'racing_game');
	$result = mysqli_query($dbc, $query);
	
	echo  '<div id="player">';
	
	$table	= "<table border='1'>";
	$table  .= "<tr>
					<th>Rank</th> <th>User Id</th> <th>User name</th> <th>Best Time</th> <th>Total Game</th> <th>Send Message</th>
				</tr>";
	$rank = 0;			
	while($row = mysqli_fetch_row($result)){
		list($userid, $username, $best_time, $totalgame) = $row;
	
		$rank++;
		$table .= "<tr>
					<td>".$rank."</td>
					<td>".$userid."</td> 
					<td><a href='profile.php?user_id=".$userid."'>".$username."</a></td> 
					<td>".$best_time."</td>
					<td>".$totalgame."</td>
					<td><a href='message.php?userid=".$userid."'>Send Message</td> 
				</tr>";
	}
	echo $table;
	echo "</div>" ;
?>

