<?php

define('DATABASE_URL', $DATABASE_URL);

// ORM Connection
ActiveRecord\Config::initialize(function($config) {
  $config->set_model_directory(__DIR__.'/orm');
  $config->set_connections(
    array(
      'development' => DATABASE_URL,
      'production'  => DATABASE_URL
    )
  );
});

?>