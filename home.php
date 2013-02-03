<?php
	session_start();
	if(isset($_SESSION['user_name'])){
		$username = $_SESSION['user_name'];
	}
?>

<div id="loginInfo">
	<?php if(!empty($username)){
		echo "Welcome ". $username;
	?>
	<a href="signout.php">Signout</a>	
		<?php
	}?>
</div>

<div id="homePage">
	<div id="aboutPlayer">
			
	</div>
	
	<div id="game">
		<a href="game.php"	>Play Game</a>
	</div>
	
	<div id="players">
		<a href="players.php" > Top Gamer</a>
	</div>
	
	<div id="inbox">
		<a href="inbox.php" > Inbox</a>
	</div>
	
	<div id="category">
		Category content should be here
	</div>
	
		
	
	<div id="myDiv">
	</div>
	</div>
	
</div>