<!DOCTYPE html> 
<html> 
<head>
	<title>Racing Game</title>
	<link rel="stylesheet" href="styles.css" type="text/css">

	
</head>

<body  id="authorContainer">
	<?php 
		include_once('mysqli_connect.php');
		include_once('login_info.php');
		include('menu.php'); 
	?>
	<div id="author">
		<h3> About Author </h3>
		<div id="authorInfo">
			<p>
				This is Suman Bogati 'Software Devloper' from Delhi.
				I am passionate about Web technology, especally about JavaScript, I think you can give me any challange for JavaScript, I would love to work with JavaScript/jquery, CSS, HTML/HTML5, PHP/MySql.
			</p>	
			
			<p>		
				I know about Moodle, eg:- How to do Moodeling and Themeing, about Devloping did not try yet. 
				
				I have knowledge about Joomla and drupal as well, I know how to make the theme on Joomla and how to manage the content on these CMS.
				
				I can say since 6 years I am into this field. From last few years I have been working on my company <a href="http://www.vidyamantra.com"> VidyaMantra EduSystem Pvt. Ltd.</a>	
			</p>
			
			<p>
				People say my hair is not good when it would be the longer. But I want to make it long. :)
			</p>
		</div>
		
		<div id="authorImg">
			<img src="author.jpg"  />
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