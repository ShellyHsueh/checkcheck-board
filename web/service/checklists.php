<?php

function getAllChecklists() {
  $db_checklists = Checklists::all();
  return getArrayofResultArr($db_checklists);
}


function getChecklistById($id) {
  $db_checklist = Checklists::find_by_id($id);
  return getResultArr($db_checklist);
}


// Return: updated/created checklist
function updateChecklist($data_json) {
  $new_data = json_decode($data_json, true);

  // Create if no checklist id yet (means not in DB yet)
  if (empty($new_data['id'])) {
    return createChecklist($new_data['title']);
  }

  $db_checklist = Checklists::find_by_id($new_data['id']);
  // Create if not found in DB
  if (empty($db_checklist)) {
    return createItem($new_data['title']);
  }

  // Update if found in DB
  $update_res = $db_checklist->update_attributes($new_data); // Return true if success; Exception if failed
  if ($update_res) {
    return getChecklistById($new_data['id']);
  }
}



// Return: deleted checklist
function deleteChecklistById($id) {
  // Delete checklist items first
  ChecklistItems::delete_all([
    'conditions' => [
      'checklist_id' => $id
    ]
  ]);

  // Delete checklist and items if exists
  $db_checklist = Checklists::find_by_id($id);
  if (!empty($db_checklist)) {
    $del_res = $db_checklist->delete(); // Return true if success
    if ($del_res) {
      return getResultArr($db_checklist);
    }
  }
}


// Return: created checklist
function createChecklist($title) {
  $new_checklist = Checklists::create(
    [
      'id' => uniqid(),
      'title' => $title
    ]
  );

  return getResultArr($new_checklist);
}

?>