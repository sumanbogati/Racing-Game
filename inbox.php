<?php
	session_start();
	include_once('mysqli_connect.php');
	include_once('login_info.php');
	include_once('menu.php');
	
	
	$userid = $_SESSION['user_id'];
 	mysqli_select_db($dbc, $dbname);
	
	if(isset($_GET['delMessage'])){
		$message_ids = $_GET['delMessage'];
		echo "suman";
		return;
	}
		
	if(!isset($_GET['msgid'])){
		echo '<body id="inbox">';
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
		echo '<br /><input type="button" value="delete" id="delMessage" name="delMsg" />';
		echo '</form>';
		echo '</div>';
		echo '</div>';
	}else{
		$msg_id = $_GET['msgid'];
		$query = "SELECT user_info.username, message.subject, message.fullmessage, message.createddate, message.id  FROM user_info, message WHERE message.useridto = ".$userid .' AND user_info.id = message.useridfrom AND message.id = '.$msg_id;
		$result = mysqli_query($dbc, $query);
	
		$full_msg_div = '<div id="fullMessage">';
		while ($rows = mysqli_fetch_row($result)){
			list($username, $subject, $fullmessage, $crtdate, $msgid)  = $rows;
			$full_msg_div .= '<div  class="msgContainer"> ';
			$full_msg_div .= '<div id="subjectCont" class="">'. $username .' </div>';
			$full_msg_div .= '<div id="sender" class="">'.$subject. ' to me</div>';
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

<script>
	window.onload = function (){
		document.getElementById('delMessage').onclick = delSelcMesg;
	var conJsonIds = "";
	
	document.getElementById('chkAllMsg').onclick = checkAllMsg;
	
	function checkAllMsg(){
	//	var allInputs = document.getElementById('msgContainer').getElementsByClass('msg');
		//alert(document.getElementById('msgWrapper').getElementsByClassName('msg'));
		var curEl = this;
		
		var checkAll = document.getElementById('checAllInput').checked;
		
		var allInputs = document.getElementById('delMessageForm').getElementsByClassName('msg')
		if(checkAll == true){
			for(var i=0; i<allInputs.length; i++){
				allInputs[i].checked = true;
			}
		}else{
			for(var i=0; i<allInputs.length; i++){
				allInputs[i].checked = false;
			}
		}
	}
	
	function delSelcMesg(){
		var allInputs = document.getElementById(this.id+'Form').getElementsByTagName('input');
		var message_ids = [];
		for(var i=0; i<allInputs.length; i++){
			if(allInputs[i].type == 'checkbox'){
				if(allInputs[i].checked == true){
					message_ids.push(allInputs[i].value);
				}
			}
		}
		conJsonIds = JSON.stringify(message_ids);
		loadData2(conJsonIds);
	}
		
	function loadData2(conJsonIds){
		var xmlhttp;
		if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp=new XMLHttpRequest();
		}
		else {// code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
				var delMessageIds = JSON.parse(conJsonIds); 
				for(var i=0; i<delMessageIds.length; i++){
					var removeNode = document.getElementById('msg'+delMessageIds[i]);
					var parNode = removeNode.parentNode.parentNode;
					removeNode.parentNode.parentNode.parentNode.removeChild(removeNode.parentNode.parentNode); 
				}
			}
		}
		xmlhttp.open("GET","delMessage.php?delMessage="+conJsonIds,true);
		xmlhttp.send();
	}
}
</script>
</body>