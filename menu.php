<?php
	//session_start();
	//$userid = $_SESSION['user_id'];
	if(isset($_SESSION['user_id'])){
		$userid =$_SESSION['user_id']; 
	}
?>

<div id="menubar">
	<ul>
		<li> <a href="game.php">Play Game</a></li>
		<li> <a href="inbox.php">Inbox</a></li>
		<li> <a href="players.php">Top Gamer</a></li>
		<?php if(!empty($userid)){ ?>
		
		<li> <a href="profile.php?user_id=<?php echo $userid; ?>">Profile</a></li>
		<?php } ?>
		<li> <a href="other.php">Others</a></li>
	</ul>
</div><div class="clear"></div>