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
	session_start();
	include_once('mysqli_connect.php');
	include_once('login_info.php');
	include_once('menu.php');
	mysqli_select_db($dbc, 'racing_game');
	$curr_user = $_SESSION['user_id'];
	
	if(!empty($_GET['msgid'])){
		$query = "SELECT  subject, fullmessage, createddate FROM message WHERE id =". $_GET['msgid'];
		$result = mysqli_query($dbc, $query);
		if($result){
			while($row = mysqli_fetch_row($result)){
				$subject = $row[0];
				$fullmsg = $row[1];
			}
			echo "<div id='subject'>" .$subject." </div>";
			echo "<div id='fullMessage'>" .$fullmsg." </div>";
		}
		
		
		$messag_header = "Reply Message";
	}else{
		$messag_header = "New Message";
	}
	
	if(!empty($_GET['userid'])){
		$receiver  = $_GET['userid'];
		if($receiver  != $curr_user){
			$rquery = "SELECT username from user_info WHERE  id = ".$receiver;
			$result = mysqli_query($dbc, $rquery);
			while($row = mysqli_fetch_row($result)){
				$receiver_name = $row[0];
			}
			if(!empty($_GET['msgid'])){
				echo $receiver_name . ' to me';	
			}
			
		?>
			<div id="msgFormCont">
			
			<h4><?php echo $messag_header; ?></h3>
			
			<form action="message.php" method="POST" id="newMessage">
				<input type="text" size="200" name="receiver" class="usrInput" value="<?php echo $receiver_name; ?>" /><br />
				<input type="hidden"  name="receiverId" value="<?php echo $receiver;  ?>"/><br />
				<?php 
					if(empty($subject)){ $subject = "Subject";}
				?>
				<input type="text" size="200" name="subject"  class="usrInput" value="<?php echo $subject; ?>"/><br />
				<textarea size="2000000" name="message" rows="9" cols="65" >Body</textarea>
				<br >
				<input type="submit" name="msgSubmit"  value="Send"> 
				
				</form>
			</div>
		
		<?php
		
		}else{
			echo "You can not send message to yourself. Please send to others";
		}
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
	
	$createddate = date('Y-m-d H:i:s');
	//$sDate = date("Y-m-d H:i:s")

	
	$query = "INSERT INTO message (useridfrom, useridto, subject, fullmessage, createddate) 
					VALUES('".$curr_user."', '".$rec_person_id."', '".$subject."', '".$message."', '".$createddate."' )";
					
	$result = mysqli_query($dbc, $query);
	
	if($result){
		echo "message has been sent successfully";
	}else{
		echo "there is some problem";
	}
	
}
?>