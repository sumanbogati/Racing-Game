<style type="text/css">
	.header, .msgContent{
		float:left;
		border :2px solid #ddd;
		width:170px;
		text-align:center;
		
	}
	
	#headerCont .header{
		font-size:20px;
		font-weight:Bold;
	}
	#headerCont, #msgBody{
		clear:both;
	}
	#subject, #subjectCont{
		width:250px;
	}
	
	#messageCont{
		display:none;
	}
	.msgContainer{
		clear : both;
	}
</style>
<?php
	include_once('mysqli_connect.php');
	session_start();
	$user_id = $_SESSION['user_id'];
	
	mysqli_select_db($dbc, 'racing_game');
	
		
	if(!isset($_GET['msgid'])){
		$query = "SELECT user_info.username, message.subject, message.fullmessage, message.createddate, message.id, message.useridfrom  FROM user_info, message WHERE message.useridto = ".$user_id .' AND user_info.id = message.useridfrom' ;
			
		$result = mysqli_query($dbc, $query);
		echo '<div id="messageContainer">';
			echo '<div id="headerCont"> 
				<div id="chkAllMsg" class="header"><input type="checkbox" name="checkmsg" value="all" /></div>
				<div id="sender" class="header">Sender</div>
				<div id="subject" class="header">Subject</div>
				<div id="date" class="header">date</div>
			</div>';

		echo '<div id="msgBody">';
		if($result){
			$row_container = "";
			while($rows = mysqli_fetch_row($result)){
			
				$row_container .= '<div  class="msgContainer"> ';
				$row_container .= '<div class="msgContent"><input type="checkbox" name="msg" value="'.$rows[4].'" /></div>';
				$row_container .= '<div id="senderCont" class="msgContent">'. $rows[0] .' </div>';
				
				$row_container .= '<div id="subjectCont" class="msgContent"> <a href="?msgid='.$rows[4].'&useridfrom='.$rows[5].'" > '. $rows[1] .' </a></div>';
				$row_container .= '<div id="messageCont" class="msgContent">'. $rows[2] .' </div>';
				$row_container .= '<div id="dateCont" class="msgContent">'. $rows[3] .' </div>';
				$row_container .= '</div>';
			}
			echo $row_container;
		}
		echo '</div>';
		echo '</div>';
	}else{
		$msg_id = $_GET['msgid'];
		$query = "SELECT user_info.username, message.subject, message.fullmessage, message.createddate, message.id  FROM user_info, message WHERE message.useridto = ".$user_id .' AND user_info.id = message.useridfrom AND message.id = '.$msg_id;

		
		$result = mysqli_query($dbc, $query);
		
		$full_msg_div = '<div id="fullMessage">';
		
		while ($rows = mysqli_fetch_row($result)){
			$full_msg_div .= '<div  class="msgContainer"> ';
			$full_msg_div .= '<div id="subjectCont" class="">'. $rows[1] .' </div>';
			$full_msg_div .= '<div id="sender" class="">'.$rows[0]. ' to me</div>';
			$full_msg_div .= '<div id="fullMessage" class="">'. $rows[2] .' </div>';
			$full_msg_div .= '</div>';
		}
		$full_msg_div .= '</div>';
		echo $full_msg_div;
		?>
		
		<form action="message.php">
			<?php
				if(!empty($_GET['useridfrom'])){
					$user_id_from = $_GET['useridfrom'];
				}
				
				if(!empty($_GET['msgid'])){
					$msgid = $_GET['msgid'];
				}
			?>
			<input type="hidden" name="userid" value="<?php echo $user_id_from; ?>" />
			<input type="hidden" name="msgid" value="<?php echo $msgid; ?>" />
			<input type="submit" value="Reply" name="reply" /> 
		</form>
		<?php
	}
?>

	