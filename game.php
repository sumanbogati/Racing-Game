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


</head>

<body  id="bdRcGame">
	<?php 
		include_once('login_info.php');
		include_once('menu.php');
		
		
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
		<div id="bestTime">
		</div>
	<div id="carContainer">
		<div id="rcar" class="cars">   </div>
		<div id="scar" class="cars">  </div>
		<div id="bcar" class="cars">   </div>
		
		<div class="clearBoth">
		</div>
		
	</div>
	</div>
</body>


<script type="text/javascript">
	navigator.sayswho= (function(){
		var N= navigator.appName, ua= navigator.userAgent, tem;
		var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
		if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
		M= M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
		return M;
	})();
	
	if(navigator.sayswho[0] == 'Firefox'){
		var noteDiv = document.createElement('div');
		noteDiv.id = 'noteMsg'
		noteDiv.innerHTML = "This game runs very slow on Firefox <br /> Please run it into Chrome browser for better result.";
		var canElement = document.getElementById('racingCan');
		document.getElementById('racingGame').insertBefore(noteDiv, canElement);
	}
</script>

</html>