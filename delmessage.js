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