<?php

$configs_file = __DIR__.'/secrets.dev.json';

// Credential files only exist in development mode
if (file_exists($configs_file)) {
  define('ENV', 'development');
  $configs = json_decode(file_get_contents($configs_file), true);
  $DATABASE_URL = $configs['DATABASE_URL'];
} else {
  define('ENV', 'production');
  $DATABASE_URL = getenv('CLEARDB_DATABASE_URL');
}

?>