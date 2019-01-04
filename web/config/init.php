<?php

// Require all files in this directory
foreach (glob(__DIR__ . '/*.php') as $file) {
  require_once $file;
}

?>