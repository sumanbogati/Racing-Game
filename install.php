<link rel="stylesheet" type="text/javascript" href="styles.css" />
<?php
	if(file_exists('config.php')){
		echo "you have already installed the game ";
		echo "Return to <a href='game.php'>Home</a>";
	}else{
		if(isset($_POST['submit'])){
			if(!empty($_POST['usrserver'])){
				$usr_server = $_POST['usrserver'];
			}else{
				echo "please put the Database server name \n";	
			}
			
			if(!empty($_POST['dbname'])){
				$dbname = $_POST['dbname'];
			}else{
				echo "please put the database name \n";
			}
			
			if(!empty($_POST['dbuser'])){
				$dbuser = $_POST['dbuser'];
			}else{
				echo "please put database user name \n";
			}
			
			if(!empty($_POST['password'])){
				$password = $_POST['password'];
			}else{
				$password = "";
			}
			
			if($usr_server && $dbname && $dbname){
				$config_info = "<?php \n";
				$config_info .= "\$dbhost  = '" .$usr_server ."';\n";
				$config_info .= "\$dbname  = '" .$dbname ."';\n";
				$config_info .= "\$dbuser  = '" .$dbuser ."';\n";
				$config_info .= "\$password  = '" .$password ."';\n";
				$config_info .= "\n ?>";
				
				$file_name = "config.php";
				$file_handle = fopen($file_name, "w");
				$fwrite = fwrite($file_handle, $config_info);
				if($fwrite){
					include('config.php');
					if($dbname){
						$bdbc = mysqli_connect($dbhost, $dbuser, $password);
						$query = "CREATE DATABASE " .$dbname;
						$result = mysqli_query($bdbc, $query);
						mysqli_select_db($bdbc, $dbname);
						
					$query_table = "CREATE TABLE IF NOT EXISTS history (
									  id int(125) NOT NULL,
									  bestTime bigint(200) NOT NULL,
									  totalGame int(250) NOT NULL,
									  UNIQUE KEY id (id)
									) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;";
						
						$result_t = mysqli_query($bdbc, $query_table);
						
						
						$query_message = "CREATE TABLE IF NOT EXISTS message (
										  id bigint(10) NOT NULL AUTO_INCREMENT,
										  useridfrom bigint(10) NOT NULL DEFAULT '0',
										  useridto bigint(10) NOT NULL DEFAULT '0',
										  subject text CHARACTER SET utf8 NOT NULL,
										  fullmessage text CHARACTER SET utf8 NOT NULL,
										  createddate timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
										  UNIQUE KEY id (id)
										) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=35;";
						
						$result_m = mysqli_query($bdbc, $query_message);
						
						
						$query_user_info = "CREATE TABLE IF NOT EXISTS user_info (
											  id int(20) NOT NULL AUTO_INCREMENT,
											  username varchar(255) COLLATE utf8_persian_ci NOT NULL,
											  password varchar(250) COLLATE utf8_persian_ci NOT NULL,
											  first_name varchar(255) COLLATE utf8_persian_ci NOT NULL,
											  last_name varchar(255) COLLATE utf8_persian_ci NOT NULL,
											  gender varchar(50) COLLATE utf8_persian_ci NOT NULL,
											  email varchar(255) COLLATE utf8_persian_ci NOT NULL,
											  PRIMARY KEY (id),
											  UNIQUE KEY username (username),
											  UNIQUE KEY email (email),
											  UNIQUE KEY email_2 (email)
											) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci AUTO_INCREMENT=33;";
											
						$result_u = mysqli_query($bdbc, $query_user_info);
						
						if($result_t && $result_m && $result_u ){
							echo "You have installed the Game  successfully in your computer";
							echo " Click continue to play the Game <a href='game.php '> Continue</a>" ;
						}else{
							echo "You could not install the problem because of some problem";
						}
					}
				}
				
				
			}
		}else{
			?>
			<div id="installPageCont">
				<div id="installPage">	
				<h3>Please put the relative Information</h3>
				<form action="install.php"  method="POST">
				<label>Server Name</label><input type="text" name="usrserver"  size="20"/><br />
				<label>Database Name</label><input type="text" name="dbname"  size="20"/><br />
				<label>Database user</label><input type="text" name="dbuser"  size="20"/><br />
				<label>Database Password</label><input type="password" name="password"   size="20"/><br />
				<input type="submit" value="Submit" id="installSub" name="submit" />
				</form>
			</div>
			</div>
	<?php }
}
 ?>