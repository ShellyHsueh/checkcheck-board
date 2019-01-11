<?php

require_once __DIR__.'/init.php';

// $item_id = uniqid();
// $checklist_id = uniqid();
$item_id = '5c38a344d7721';
$checklist_id = '5c38a344d7725';
$item_data = [
  'id' => $item_id,
  'checklist_id' => $checklist_id,
  'content' => 'To finish homework',
  'checked' => false,
  'order' => 1
];
$item_data_json = json_encode($item_data);

$item_data_2 = [
  'id' => $item_id,
  'checklist_id' => $checklist_id,
  'content' => 'what',
  'checked' => false,
  'order' => 1
];
$item_data2_json = json_encode($item_data_2);

var_dump(updateItem($item_data2_json));
// var_dump(getItemByItemId($item_id)['checklist_id']);
// var_dump(getItemsByChecklistId($checklist_id));
// var_dump(deleteItemByItemId($item_id));


?>