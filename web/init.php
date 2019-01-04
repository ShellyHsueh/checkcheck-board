<?php

define('WEB_DIR', __DIR__);

// Require dependencies if exists
$dependencies_autoload_file = __DIR__.'../vendor/autoload.php';
if (file_exists($dependencies_autoload_file)) {
  require_once $dependencies_autoload_file;
};


// Require all files in the current folder
foreach (glob(__DIR__ . '/*.php') as $file) {
  require_once $file;
}


?>