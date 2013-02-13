<?php
	session_start();
	/* if(isset($_SESSION['user_name'])){
		$username =  $_SESSION['user_name'];
		$userid =  $_SESSION['user_id'];
	} */
	
?>
<!DOCTYPE html> 
<html> 
<head>
<title>Racing Game</title>

<link rel="stylesheet" href="styles.css" type="text/css">
<script type="text/javascript" src="script.js"> </script>
<style type="text/css">
#game_container{
	clear:both;
}
</style>
</head>

<body  id="bdRcGame">
	<?php 
		if(isset($_SESSION['user_id'])){
			include_once('login_info.php');
			include_once('menu.php');
		}else{
			?>
			<h3> You are playing as a guest  </h3>	<a href="index.php">Login</a>
			<?php
		}
	 ?>
	<div id="game_container">
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
		<div>  <input type="button" id="scar" class="cars" value="Silver Car"> </div>
	</div>
	
	<div class="clearBoth">
	
	</div>
	<div id="myDiv">
	</div>
	</div>
</body>

</html>