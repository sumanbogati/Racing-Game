<link rel="stylesheet" href="styles.css" type="text/css" />

<?php
	session_start();
	if(isset($_SESSION['user_name'])){
		$username =  $_SESSION['user_name'];
		$userid = $_SESSION['user_id'];
	}
	include_once('login_info.php');
	include_once('menu.php');
	include('mysqli_connect.php');

	if(isset($_GET['user_id'])){
		$userid = $_GET['user_id'];
		$query = "SELECT user_info.username, user_info.first_name, user_info.last_name, user_info.gender, 
		user_info.email, history.bestTime, history.totalGame FROM user_info,history WHERE user_info.id=".$userid." AND
		 history.id = ".$userid ;
		mysqli_select_db($dbc, $dbname);
		$result = mysqli_query($dbc, $query);
		while($rows = mysqli_fetch_row($result)){
			list($username, $firstname, $lastname, $gender, $email, $best_time, $totalgame) = $rows;
		}
		if(!empty($best_time)){
			$best_time = ($best_time/1000)/60;
			$best_time = round($best_time, 2);
		}else{
			$best_time = "";
		}
		if(empty($totalgame)){
			$totalgame = 0;
		}
		
		
		
	}
?>
<body id="profile">

<div id="fullProfile">
	<div id="fullProfileInfo">
	<h3><?php echo $firstname . ' '. $lastname;?></h3>
		<div id="username"><label>User name : </label><?php echo $username; ?></div>
		<div id="email"><label>Email :  </label><?php echo $email; ?></div>
		<div id="gender"><label>Gender : </label><?php echo $gender; ?></div>
		<div id="totalgame"><label>Total  game : </label><?php echo $totalgame; ?></div>
		<div id="bestTime"><label> Best time :</label><?php echo $best_time; ?></div>
		<a href="message.php?userid=<?php echo $userid ; ?>">Send message</a>
	</div>	
</div>
</body>