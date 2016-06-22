<?php

set_include_path('./php-includes' . PATH_SEPARATOR . './functions');

// Functions

require_once 'show-questions.fn.php';
require_once 'show-author.fn.php';
require_once 'test-get-pair-of-questions-id.fn.php';
require_once 'show-top-questions.fn.php';

// Includes

require_once 'connect.inc.php';
require_once 'get-variables.inc.php';
require_once 'head.inc.php';
require_once 'header.inc.php';
require_once 'main.inc.php';
require_once 'footer.inc.php';
require_once 'top.ten.inc.php';

?>