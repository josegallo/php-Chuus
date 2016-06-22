<?php

require_once 'connect2.inc.php';
$TestRecoverPass = TestHash();
$output = VerifyRecoveringPass($TestRecoverPass);
echo $output;

?>