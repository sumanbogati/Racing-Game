<?php
	include_once('mysqli_connect.php');
	if(isset($_POST['submit'])){
		if(!empty($_POST['username'])){
			$username = $_POST['username'];
		}
		if(!empty($_POST['password'])){
			$password  = $_POST['password'];
		}
		
		if($dbc){
			$query = "SELECT username, password FROM user_info" ;
			mysqli_select_db($dbc, 'user_info');
			
			$result = mysqli_query($dbc, $query);
			
			while($row =  mysqli_fetch_row($result)){
				if($row[0]==$username && $row[1]==md5($password)){
					echo "Wel come to Car Racing Game, there would be great fun";
					return;
				}
			}
			echo "does not matched";
		}
	}
?>


<div id="loginForm">
	<fieldset>
	<legend>Please do the login for play game</legend>
	<form action="login_form.php" method="POST">
		Username : <input type="text" name="username" /> <br />
		Password : <input type="password" name="password" /> <br />
		<input type="submit" value="submit" name="submit" />
	</form>
		<p>If you are not registered user please click on here <a href="register.php">Register</a>
		</p>
	</fieldset>
</div>