<link rel="stylesheet"  href="styles.css" type="text/css" />
<?php
	if(isset($_GET['signout'])){
		session_start();
		session_destroy();
		echo '<div class="msgForUser">';
			echo "Thank you so much for joining to us";
			echo "<br />Return to <a href='game.php'>Game</a>";
		echo '</div>';
	}else{
		if(isset($_SESSION['user_name'])){
			$username = $_SESSION['user_name'];
		}
		
		if(isset($_SESSION['user_id'])){
			$userid = $_SESSION['user_id'];
		}
	?>
	
	<div id="loginInfo">
		<?php if(!empty($username)){
			echo ' Welcome <a href="profile.php?user_id='.$userid.'"> '. $username .'</a>';
		?>
		(<a href="login_info.php?signout=true">Signout</a>)	
			<?php
		}else{
		?>
			
			<span> You are playing as a Guest!!  </span>	<a href="index.php">Login</a>
			
		<?php
		
		}?>
	</div>
<?php
}
?>