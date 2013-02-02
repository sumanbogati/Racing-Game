<style type="text/css">
	#msgFormCont input.usrInput{
		width:300px;
		margin:8px;
		padding:4px;
		color:#111;
	}
	
	#msgFormCont label{
		margin-right:auto;
		color:green;
	}
	
	#msgFormCont{
		border:3px solid gray;
		width:75%;
		padding:20px;
	}
	#msgFormCont textarea{
		color:#111;
	}
	#newMessage{
		margin:0 auto;
		text-align:center;
	}
	
	#msgFormCont h4{
		text-align:center;
		margin-bottom:15px;
		color:#111;
	}
</style>

<?php

	include_once('mysqli_connect.php');
	
	session_start();
	$curr_user = $_SESSION['user_id'];
	
	if(!empty($_GET['userid'])){
		$receiver  = $_GET['userid'];

	
?>

<div id="msgFormCont">
	<h4>New Message</h3>
	<form action="message.php" method="POST" id="newMessage">
		<input type="text" size="200" name="receiver" class="usrInput" value="To" /><br />
		<input type="hidden"  name="receiverId" value="<?php echo $receiver;  ?>"/><br />
		<input type="text" size="200" name="subject"  class="usrInput" value="Subject"/><br />
		<textarea size="2000000" name="message" rows="9" cols="65" >Body</textarea>
		<br >
		<input type="submit" name="msgSubmit"  value="Send"> 
		
	</form>
</div>
<?php		
}

if(isset($_POST['msgSubmit'])){
	if(!empty($_POST['receiverId'])){
		$rec_person_id = $_POST['receiverId'];
	}else{
		echo "the receiver is missing <br />";
	}
	
	if(!empty($_POST['subject'])){
		$subject = $_POST['subject'];
	}else{
		echo "the subject is missing <br />";
	}
	
	if(!empty($_POST['message'])){
		$message = $_POST['message'];
	}else{
		echo "the message is missing <br />";
	}
	
	$createddate = 126;
	
	mysqli_select_db($dbc, 'racing_game');
	
	$query = "INSERT INTO message (useridfrom, useridto, subject, fullmessage, createddate) 
					VALUES('".$curr_user."', '".$rec_person_id."', '".$subject."', '".$message."', '".$createddate."' )";
					
	$result = mysqli_query($dbc, $query);
	
	
	echo $query;
	
	if($result){
		echo "message has been sent successfully";
	}else{
		echo "there is some problem";
	}
	
}
?>