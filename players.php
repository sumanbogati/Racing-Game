<?php
	session_start();
	include('mysqli_connect.php');
	
	include('login_info.php');
	include_once('menu.php');
	$userid = $_SESSION['user_id'];
	
	
    //$query = "SELECT user_info.id, user_info.username, history.bestTime, history.totalGame  FROM history, user_info  WHERE history.id = user_info.id";
	echo '<body id="topGamer">';
	echo  '<div id="players">';
	
	$table	= "<table border='1'>";
	$table  .= "<tr>
					<th>Rank</th> <th>User Id</th> <th>User name</th> <th>Best Time</th> <th>Total Game</th> <th>Send Message</th>
				</tr>";
	$rank = 0;
	$min_game = 0;
	$query = "SELECT user_info.id, user_info.username, history.bestTime, history.totalGame  FROM history, user_info  WHERE history.id = user_info.id  AND history.totalGame > ".$min_game . " ORDER BY history.bestTime";
	
	mysqli_select_db($dbc, $dbname);
	$result = mysqli_query($dbc, $query);
	
	while($row = mysqli_fetch_row($result)){
		list($userid, $username, $best_time, $totalgame) = $row;
		$best_time = ($best_time/1000)/60;
		$best_time = round($best_time, 2);
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
<style type="text/css">
	#players{
		clear:both;
	}
</style>
<?php
	echo '</body>';
?>