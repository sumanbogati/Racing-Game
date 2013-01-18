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
					session_start();
					$_SESSION['user_name'] = $row[0];
					//echo "Wel come to Car Racing Game, there would be great fun";
					//header("home.php");
					 header( 'Location: home.php' );
					//return;
				}
			}
			echo "You are not registered user, Please re-try with ";
			echo '<a href="index.php">Login</a>';
		}
	}else {
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
	<?php
	}
?>


