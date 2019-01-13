<?php

// Return: Array of created items
function getItemsByChecklistId($checklist_id) {
  $db_items = ChecklistItems::find_all_by_checklist_id($checklist_id);
  return getArrayofResultArr($db_items);
}

// Return: the created item
function getItemByItemId($item_id) {
  $db_item = ChecklistItems::find_by_id($item_id);
  return getResultArr($db_item);
}


// Input: Arrayjson of the changed fields (requiring item_id; no need to provide full item data)
// Return: Full data of the updated record
function updateItem($new_data_json) {
  $new_data = json_decode($new_data_json, true);

  // Create if no item id yet (means not in DB yet)
  if (empty($new_data['id'])) {
    return createItem($new_data);
  }

  $db_item = ChecklistItems::find_by_id($new_data['id']);

  // Create if not found in DB
  if (empty($db_item)) {
    return createItem($new_data);
  }

  // Update if found in DB
  $update_res = $db_item->update_attributes($new_data); // Return true if success; Exception if failed
  if ($update_res) {
    return getItemByItemId($new_data['id']);
  }
}


// Return: deleted item
function deleteItemByItemId($item_id) {
  $db_item = ChecklistItems::find_by_id($item_id);

  if (!empty($db_item)) {
    $del_res = $db_item->delete(); // Return true if success

    if ($del_res) {
      return getResultArr($db_item);
    }
  }
}



// ---------------------------------
// For main functions


// Directly use 'updateItem' function instead (It'll check if exists)
function createItem($data) {
  $new_item = ChecklistItems::create(
    [
      'id' => empty($data['id']) ? uniqid() : $data['id'],
      'checklist_id' => $data['checklist_id'],
      'content' => $data['content'],
      'checked' => empty($data['checked']) ? false : true,
      'order' => $data['order'],
    ]
  );

  return getResultArr($new_item);
}


?>