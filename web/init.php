<?php

define('WEB_DIR', __DIR__);

// Require dependencies if exists
$dependencies_autoload_file = __DIR__.'/../vendor/autoload.php';
if (file_exists($dependencies_autoload_file)) {
  require_once $dependencies_autoload_file;
};


// Require all init files in all folders we need
$folders = array('config', 'database', 'service');
foreach ($folders as $folder) {
  require_once __DIR__ . '/' . $folder . '/init.php';
}

require_once __DIR__.'/html_dependencies.php';


?>