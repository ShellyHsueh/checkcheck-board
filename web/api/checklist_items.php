<?php

require_once __DIR__.'/../init.php';

// ----- Interface to js -----
// Usage JS ex:
// $.ajax({
//   type: 'POST',
//   url: 'api/checklist_items.php',
//   dataType: 'json',
//   data: {
//     functionname: 'function_name',
//     arguments: item_id
//   },
//   success: function(res, res_status) {...} // no need to parse res
// });


header('Content-Type: application/json');

$result = [];

if ( !isset($_POST['functionname']) ) { $result['error'] = 'No function name'; }
if ( !isset($_POST['arguments']) ) { $result['error'] = 'No function arguments'; }

if ( !isset($result['error']) ) {
  switch($_POST['functionname']) {
    case 'getItemsByChecklistId':
      $result['result'] = json_encode(getItemsByChecklistId($_POST['arguments']), true);
      break;
    case 'getItemByItemId':
      $result['result'] = json_encode(getItemByItemId($_POST['arguments']), true);
      break;
    case 'updateItem':
      $result['result'] = json_encode(updateItem($_POST['arguments']), true);
      break;
    case 'deleteItemByItemId':
      $result['result'] = json_encode(deleteItemByItemId($_POST['arguments']), true);
      break;
    default:
      $result['error'] = 'Not found function '.$_POST['functionname'];
      break;
  }
}

echo json_encode($result, true);


?>