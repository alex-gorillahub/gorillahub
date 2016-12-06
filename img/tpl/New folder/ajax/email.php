<?php

	/* headers */
	header("Cache-Control: no-cache, must-revalidate");
    header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");

	/* error reporting */
	/*error_reporting(E_ALL);
	set_error_handler("var_dump");
	ini_set('display_errors', 0);
	ini_set("log_errors", 0);
	ini_set("error_log", $_SERVER ["DOCUMENT_ROOT"] . "/error_log.txt");*/

	/* config */
	set_time_limit(120);

	/* variables to return */
	$info = null;
	$error = 0;

	$msg = null;

	$fields = array( 'type', 'name', 'email', 'phone', 'message',);

	/* get the request parameter */	
	foreach ( $_REQUEST as $k => $v ) {
		$$k = $v;
		if ( in_array($k, $fields) ) {
			$msg .= '<b>' . ucfirst( $k ) . '</b>: ' . filter_var( $v, FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH ) . '<br/>';
		} else {
			$msg .= null;
		}
	}
	
	if ( isset( $_REQUEST['file_path'] ) && !empty( $_REQUEST['file_path'] ) ) {
		$file = $_REQUEST['file_path'];
	}
	
	/* vars */	
	//$file = 'log_cabine.jpg';//$path.$filename
	$content = file_get_contents( $file );
	$content = chunk_split( base64_encode( $content ) );
	$uid = md5( uniqid( time() ) );
	$filename = basename( $file );
	
	$from_name = 'GorillaHub';
	$from_mail = 'hello@gorillahub.net';//someone@domain.com
	$replyto = 'noreply@gorillahub.net';//noreply@domain.com
	$to = 'nikola@uidigital.com';//admin@domain.com
	$cc = 'mark.allen@uidigital.com';//alex@uidigital.com
    $bcc = 'craig.harffey@uidigital.com';//dejan@uidigital.com
	$subject = 'Message from GorillaHub website';
	
	/* email header */
	$header = "From: " . $from_name . " <" . $from_mail . ">\r\n";
	$header .= "Reply-To: " . $replyto . "\r\n";
	$header .= 'Cc: ' . $cc . "\r\n";
    $header .= 'Bcc: ' . $bcc . "\r\n";
	$header .= "MIME-Version: 1.0\r\n";
	$header .= "Content-Type: multipart/mixed; boundary=\"" . $uid . "\"\r\n\r\n";
	$header .= 'X-Mailer: PHP/' . phpversion();
	
	/* email message & attachment */
	$message = "--" . $uid . "\r\n";
	//$message .= "Content-type:text/plain; charset=iso-8859-1\r\n";
	$message .= "Content-type:text/html; charset=UTF-8\r\n";
	$message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
	$message .= $msg . "\r\n\r\n";
	$message .= "--" . $uid . "\r\n";
	$message .= "Content-Type: application/octet-stream; name=\"" . $filename . "\"\r\n";
	$message .= "Content-Transfer-Encoding: base64\r\n";
	$message .= "Content-Disposition: attachment; filename=\"" . $filename . "\"\r\n\r\n";
	$message .= $content . "\r\n\r\n";
	$message .= "--" . $uid . "--";
	
	/* action / send */
	if ( mail( $to, $subject, $message, $header ) ) {
	    return true;
	} else {
		return false;
		$error = 1;
	}
	
	/* delete existing file */
	/*if ( is_file( $file ) ) {
		unlink( $file );
	}*/
	
	/* debug */
	/*ob_start();
	echo print_r($_REQUEST);
	echo print_r($file);
	echo print_r($_SERVER['DOCUMENT_ROOT']);
	$data = ob_get_clean();
	$fp = fopen("debug.txt", "w");
	fwrite($fp, $data);
	fclose($fp);*/
	
	/* return variables */
	$return = array(
		'info' => $info,
		'error' => $error
	);
	echo json_encode( $return );
	
?>