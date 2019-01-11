<?php

// Require all files in the current folder
foreach (glob(__DIR__ . '/*.php') as $file) {
  require_once $file;
}

?>