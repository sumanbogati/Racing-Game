<?php
	include_once("mysqli_connect.php");
	if(ISSET($_POST['submit'])){
	
		if(!empty($_POST['username'])){
			$username = $_POST['username'];
		}else{
			$username = " ";
			echo " username is missing <br >";
		}
		
		if(!empty($_POST['password'])){
			$password = $_POST['password'];
		}else{
			$password = " ";
			echo " password is missing <br >";
		}
		
		if(!empty($_POST['firstname'])){
			$firstname = $_POST['firstname'];
			
		}else{
			$firstname = " ";
			echo " first name is missing <br >";
		}
		
		
		if(!empty($_POST['lastname'])){
			$lastname = $_POST['lastname'];
		}else{
			$lastname = " ";
			echo " lastname is missing <br >";
		}
		
		if(!empty($_POST['gender'])){
			$gender = $_POST['gender'];
		}else{
			$gender = " ";
			echo " gender is missing <br >";
		}
		
		if(!empty($_POST['email'])){
			$email = $_POST['email'];
		}else{
			$email = " ";
			echo " email is missing <br >";
		}
		
		if($username == " " || $firstname == " " || $lastname == " " || $email == " " || $gender == " "){
			echo " <br >there is missing something in your form please fill the form completely <br >";
			echo "<a href='register.php'>Register</a>";
		}else{
			if($dbc){
				$query = "SELECT username, email FROM user_info";
				mysqli_select_db($dbc, 'user_info');
				$result = mysqli_query($dbc, $query);
				
				if($result){
					while($row = mysqli_fetch_row($result)){
						if($row[0]==$username){
							echo "the ". $username ." is already exist please make another username <a href='register.php'>Register </a>";
							return;
						}else if($row[1]==$email){
							echo "the ". $email ." is already exist please make another email address";
							return;
						}
					}
				}
				
				$query = 'INSERT INTO user_info (username, password, first_name, last_name, gender, email) 
				VALUES("'.$username.'", "'. md5($password).'", "'.$firstname.'", "' .$lastname.'", "' .$gender.'", "'. $email.'");';
				
				/* echo $query;
				exit; */
				
				mysqli_select_db($dbc, "user_info");
				
				$result = mysqli_query($dbc, $query);
				if($result){
					echo "thanks for the register to our site <a href='game.php'>Play Game</a>";
				}else{
					echo "there is some problem for submit the information"	;
				}
			}
		}
	}else{
?>

<div id="container">
	<div id="loginform">
		<fieldset>
		<legend>Register Form</legend>
		<form name="userInfo" method="POST">
		Username : <input type="text"	name="username" /> <br />
		Password : <input type="password"	name="password" /> <br />
		First name : <input type="text" name="firstname" /><br />
		Last name : <input type="text" name="lastname" /><br />
		Email : <input type="text" name="email" /> <br />
		Gender : <input type="radio" name="gender" value="male" /> Male 
			  <input type="radio" name="gender" value="male" /> Female <br />
<input type="submit" value="submit" name="submit" />
			  
		</form>	  
		</fieldset>
	</div>
			<p>If you are already registered  <a href="login_form.php">Login</a>
		</p>

</div>
<?php
}

?>