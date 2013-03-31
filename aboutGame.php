<?php 
	session_start();
?>
<!DOCTYPE html> 
<html> 
<head>
	<title>About racing Game</title>
	<link rel="stylesheet" href="styles.css" type="text/css">
	
	
</head>

<body  id="aboutGame">
	<?php 
		include_once('mysqli_connect.php');
		include_once('login_info.php');
		include('menu.php'); 
	?>
	<div id="aboutGameCont">
		<div id="gameInfo">
		
		<h3>About Racing-game</h3>
		<p>
			This application has two parts gaming and messaging. The gaming side I have made inspired from this game <b><a href="http://codeincomplete.com/projects/racer/v1.straight.html">http://codeincomplete.com/projects/racer/v1.straight.html.</a></b> I want to give thank to author of this game, 
			The gaming part may looks similar to that game at some level, But the code structure and some features of my game is completely different from this game. However it did help me lot to create game side of my application.
			</p>
<p>			
			The main objective of this project is to entertain the people and stay connected by gaming and messaging  respectveily. For stay connect each to other I used the message mechanism at very basic level of game(for now).			</p>
		</div>
		
		<div id="gameImgCon">
			<img src="racing_game.png" />
		</div>
		
		<div id="gameInfo2">
				Main concern was that I would had to used this application for my project of A' level, So I made very basic application through which people can entertain and stay in connection of each other. 
			We know that people would love to play the game since very earlier, Lot of people have passion about it, that’s why the gaming world gets the success into IT industry. 
			
			<br />
			In now a days social network application is getting the lot of success. People want to stay in connection. <br/>
			
			<p>
				This application is running at very basic level over the complete application. It needs much improvements and some bugs remainied to be fixed for make this application much usable, I can say it's in prototype stage for now, to make it robust application, I'll have to do lot of work on this. 
				
				Whenever I'll get the free time, I'll give this for it <br />
				
				In any case if you want to help me in anyway, please contact with below details.
			</p>
		</div>
		
		<div id="contactCont">
		<h5>Contact</h5>
		<p id="contact">
			<label>Email:</label> <span id="emailId"> sumanbogati@gmail.com </span> <br />
			<label>Phone : </label>  <span id="phoneNo"> 9968411216, </span><br />
			<span id="fbId">https://facebook.com/sumanbogati </span><br />
			<span id="twId">https://twitter.com/sumanbogati </span>	
		</p>
		</div>
		
	</div>
	
	
</body>

</html>