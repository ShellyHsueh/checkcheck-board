<?php
use ActiveRecord as AR;

class ChecklistItems extends AR\Model {
  public static $table_name = 'checklist_items';  // Not required (default assuming table_name=小寫class_name)
  public static $primary_key = 'id';
  public static $belongs_to = array(
    array(
      'checklists', 
      'foreign_key' => 'checklist_id', 
      'class_name' => 'Checklists'
    )
  );
}

?>