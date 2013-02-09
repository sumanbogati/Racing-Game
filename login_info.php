<?php

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
	(<a href="signout.php">Signout</a>)	
		<?php
	}?>
</div>