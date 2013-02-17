<link rel="stylesheet" href="styles.css" type="text/css" />

<?php
	session_start();
	include_once('mysqli_connect.php');
	include_once('login_info.php');
	include_once('menu.php');
	
	
	$userid = $_SESSION['user_id'];
 	mysqli_select_db($dbc, $dbname);
	
	if(isset($_GET['delMessage'])){
		$message_ids = $_GET['delMessage'];
		return;
	}
	
	echo '<body id="inbox">';
	echo '<div id="inboxInfo">';
	
	if(!isset($_GET['msgid'])){
	
		echo '<div id="inboxContainer">';
		echo '<div id="messageContainer">';
			echo '<div id="headerCont"> 
				<div id="chkAllMsg" class="header"><input type="checkbox" id="checAllInput" name="checkmsg" value="all" /></div>
				<div id="sender" class="header">Sender</div>
				<div id="subject" class="header">Subject</div>
				<div id="date" class="header">date</div>
			</div>';

		echo '<div id="msgBody">';
		echo '<form id="delMessageForm" action="inbox2.php" method="POST" >';
		
		$query = "SELECT user_info.username, message.subject, message.fullmessage, message.createddate, message.id, message.useridfrom  FROM user_info, message WHERE message.useridto = ".$userid .' AND user_info.id = message.useridfrom' ;
			
		$result = mysqli_query($dbc, $query);
		if($result){
			$row_container = "";
			while($rows = mysqli_fetch_row($result)){
				
				list($username, $subject, $fullmessage, $crtdate, $msgid, $useridfrom) = $rows;
				
				$row_container .= '<div  class="msgContainer"> ';
				$row_container .= '<div class="msgContent"><input type="checkbox" class="msg" id=msg'.$msgid.' name="msg" value="'.$msgid.'" /></div>';
				$row_container .= '<div id="senderCont" class="msgContent">'. $username .' </div>';
				
				$row_container .= '<div id="subjectCont" class="msgContent"> <a href="?msgid='.$msgid.'&useridfrom='.$useridfrom.'" > '. $subject .' </a></div>';
				$row_container .= '<div id="messageCont" class="msgContent">'. $fullmessage .' </div>';
				$row_container .= '<div id="dateCont" class="msgContent">'. $crtdate .' </div>';
				$row_container .= '</div>';
			}
			echo $row_container;
		}
		echo '<br /><br /><input type="button" value="delete" id="delMessage" name="delMsg" />';
		echo '</form>';
		echo '</div>';
		echo '</div>';
	}else{
		$msg_id = $_GET['msgid'];
		$query = "SELECT user_info.username, message.subject, message.fullmessage, message.createddate, message.id  FROM user_info, message WHERE message.useridto = ".$userid .' AND user_info.id = message.useridfrom AND message.id = '.$msg_id;
		$result = mysqli_query($dbc, $query);
	
		$full_msg_div = '<div id="fullMessageCont">';
		while ($rows = mysqli_fetch_row($result)){
			list($username, $subject, $fullmessage, $crtdate, $msgid)  = $rows;
			$full_msg_div .= '<div  class="msgContainer"> ';
			$full_msg_div .= '<div id="subjectCont" class="">'. $subject  .' </div>';
			$full_msg_div .= '<div id="sender" class="">'.$username. ' to me</div>';
			$full_msg_div .= '<div id="fullMessage" class="">'. $fullmessage .' </div>';
			$full_msg_div .= '</div>';
		}
		$full_msg_div .= '</div>';
		echo $full_msg_div;
		?>
		<form action="message.php" style="clear:both;">
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

</div>
</div>
<script type="text/javascript" src="delmessage.js"></script>
</body>