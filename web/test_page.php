<?php

require_once __DIR__.'/init.php';


// -----------------------------------
// Test checklist_item services

// // $item_id = uniqid();
// // $checklist_id = uniqid();
// $item_id = '5c38a344d7721';
// $checklist_id = '5c38a344d7725';
// $item_data = [
//   'id' => $item_id,
//   'checklist_id' => $checklist_id,
//   'content' => 'To finish homework',
//   'checked' => false,
//   'order' => 1
// ];
// $item_data_json = json_encode($item_data);

// $item_data_2 = [
//   'id' => $item_id,
//   'checklist_id' => $checklist_id,
//   'content' => 'what',
//   'checked' => false,
//   'order' => 1
// ];
// $item_data2_json = json_encode($item_data_2);

// var_dump(updateItem($item_data2_json));
// // var_dump(getItemByItemId($item_id)['checklist_id']);
// // var_dump(getItemsByChecklistId($checklist_id));
// // var_dump(deleteItemByItemId($item_id));


// -----------------------------------
// Test checklist services

// $checklist_data = [
//   'title' => 'Checklist title'
// ];
// $new_data = [
//   'id' => '5c3acd6553b14',
//   'title' => 'New title'
// ];
// $checklist_json = json_encode($new_data, true);

// var_dump(createChecklist($checklist_data));
// var_dump(updateChecklist($checklist_json));
var_dump(deleteChecklistById('5c3ad5565f51e') );

// var_dump(getAllChecklists());


?>