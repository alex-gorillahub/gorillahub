<?php

	/* headers */
	header("Cache-Control: no-cache, must-revalidate");
    header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");

	/* error reporting */
	error_reporting(E_ALL);
	set_error_handler("var_dump");
	ini_set('display_errors', 0);
	ini_set("log_errors", 0);
	ini_set("error_log", "error_log.txt");

	/* config */
	set_time_limit(120);

	/* variables to return */
	$info = null;
	$error = 0;
	$msg = null;
	$fields = array( 'name', 'email', 'phone', 'message', 'role', );

	$message = $_REQUEST['message'];
	unset($_REQUEST['message']);
	//array_push($_REQUEST, $message);
	$_REQUEST['message'] = $message; 
	
	/* get the request parameter */	
	foreach ( $_REQUEST as $k => $v ) {
		$$k = $v;
		if ( in_array( $k, $fields ) ) {
			$msg .= '<b>' . ucfirst( $k ) . '</b>: ' . filter_var( $v, FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH ) . '<br/>';
		} else {
			$msg .= null;
		}
	}
	
	$from_name = 'GorillaHub';
	$from_mail = 'hello@gorillahub.net';//someone@domain.com
	$replyto = 'noreply@gorillahub.net';//noreply@domain.com
	$to = 'nikola@uidigital.com';//admin@domain.com
	$cc = 'mark.allen@uidigital.com';//alex@uidigital.com
    $bcc = null;// 'craig.harffey@uidigital.com' dejan@uidigital.com
	$subject = 'Message from GorillaHub website';
	
	/* email header */
	$header = "From: " . $from_name . " <" . $from_mail . ">\r\n";
	$header .= "Reply-To: " . $replyto . "\r\n";
	$header .= 'Cc: ' . $cc . "\r\n";
    $header .= 'Bcc: ' . $bcc . "\r\n";
	$header .= "MIME-Version: 1.0\r\n";
	$header .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
	$header .= 'X-Mailer: PHP/' . phpversion();
	
	/* email message & attachment */
	$message = $msg . "\r\n\r\n";
	
	$mail = mail( $to, $subject, $message, $header );
	
	/* action / send */
	if ( $mail == true ) {
		
		$from_name = 'GorillaHub';
		$from_mail = 'hello@gorillahub.net';//someone@domain.com
		$replyto = 'noreply@gorillahub.net';//noreply@domain.com
		$to = $email;//admin@domain.com
		$subject = 'Message from GorillaHub website';
		$msg = 'Thank you for your enquiry on GorillaHub.net. We will be in touch soon.';
		$header = "From: " . $from_name . " <" . $from_mail . ">\r\n";
		$header .= "Reply-To: " . $replyto . "\r\n";
		$header .= 'Cc: ' . $cc . "\r\n";
	    $header .= 'Bcc: ' . $bcc . "\r\n";
		$header .= "MIME-Version: 1.0\r\n";
		$header .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
		$header .= 'X-Mailer: PHP/' . phpversion();
		$message = $msg . "\r\n\r\n";
		$mail = mail( $to, $subject, $message, $header );
		
		if ( $mail == true ) {
			$info = 'Ok';
			$error = 0;
		} else {
			$info = 'Error';
			$error = 2;
		}
		
	} else {
		$info = 'Error';
		$error = 1;
	}
	
	/* return variables */
	$return = array(
		'info' => $info,
		'error' => $error,
	);
	echo json_encode( $return );
	
?>