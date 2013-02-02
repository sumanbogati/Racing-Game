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
	
	<div id="audioContainer">
		<audio id="music" controls>
  <source src="music/mymusic.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
	</div>
	
	<div id="carContainer">
		<div>  <input type="button" id="bcar" class="cars" value="Blue Car"> </div>
		<div>  <input type="button" id="rcar" class="cars" value="Red Car"> </div>
	</div>
	
	<div class="clearBoth">
	
	</div>
	<div id="myDiv">
	</div>
	
</body>

</html>