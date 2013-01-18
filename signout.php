<?php
/* 	if(session_start()){
		echo "session start";
	}
	if(session_destroy()){
		echo "destroy the session";
	}
 */	
	session_start();
	session_destroy();
	
	echo "Thank you very much for joined to us";
	echo "<br />";
	echo "Returned to ";
	echo "<a href='index.php'> HOME </a>";
?>