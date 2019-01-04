<?php
use ActiveRecord as AR;

class Checklists extends AR\Model {
  public static $table_name = 'checklists';  // Not required (default assuming table_name=小寫class_name)
  public static $primary_key = 'id';
}

?>