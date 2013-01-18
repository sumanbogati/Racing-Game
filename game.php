<?php
	session_start();
	if(isset($_SESSION['user_name'])){
		$username =  $_SESSION['user_name'];
	}
?>

<!DOCTYPE html> 
<html> 
<head>
<title>Racing Game</title>

<link rel="stylesheet" href="styles.css" type="text/css">
<script type="text/javascript" src="script.js"> </script>
<style type="text/css" > 
	#loginInfo{
		float:right;
		clear : both;
	}
	#racingGame{
		padding-top:15px;
		clear:both;
	}
</style>
</head>

<body  id="bdRcGame">
	<div id="loginInfo">
		<?php
			$signout = " <a href='signout.php'>Sign Out</a> ";
			if(empty($username)){
				$username = "Guest";
				$signout = "<a href='index.php'>Login</a> ";
			}
			echo "Welcome " .$username . "!! $signout"
		?>
		
	</div>
	<div id="racingGame">
		<canvas id="racingCan">
			Your browser does not support Canvas Element. Please make the browser suitable for canvas to run this game.
		</canvas>
	</div>
</body>

</html>