<?php

if($_SERVER['REQUEST_METHOD'] == 'POST') {
	if(empty($_POST['g-recaptcha-response'])) {
		exit('Empty captcha');
	}
	
	$url = 'https://www.google.com/recaptcha/api/siteverify';
	
	//data POST
	$secret = '6Ldf_mQUAAAAADt6NtGgB_q3Y8459e5fitI8MSFn';
	$recaptcha = $_POST['g-recaptcha-response'];
	$ip = $_SERVER['REMOTE_ADDR'];
	
	$url_data = $url.'?secret='.$secret.'&response='.$recaptcha.'&remoteip='.$ip;
	$curl = curl_init();
	
	curl_setopt($curl,CURLOPT_URL,$url_data);
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,FALSE);
	
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,1);
	
	
	$res = curl_exec($curl);
	curl_close($curl);
	
	$res = json_decode($res);
	
	if($res->success) {
		echo 'YES';
	}
	else {
		exit('Error');
	}
	
}



