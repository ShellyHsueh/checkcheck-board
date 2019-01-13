<?php

require_once __DIR__.'/../init.php';

// ----- Interface to js -----
// Usage JS ex:
// $.ajax({
//   type: 'POST',
//   url: 'api/checklists.php',
//   dataType: 'json',
//   data: {
//     functionname: 'function_name',
//     arguments: JSON.stringify({id: '....', title: '...'})
//   },
//   success: function(res, res_status) {...} // no need to parse res
// });


header('Content-Type: application/json');

$result = [];

if ( !isset($_POST['functionname']) ) { $result['error'] = 'No function name'; }
// if ( !isset($_POST['arguments']) ) { $result['error'] = 'No function arguments'; }

if ( !isset($result['error']) ) {
  switch($_POST['functionname']) {
    case 'getAllChecklists':
      $result['result'] = json_encode(getAllChecklists(), true);
      break;
    case 'getChecklistById':
      $result['result'] = json_encode(getChecklistById($_POST['arguments']), true);
      break;
    case 'createChecklist':
      $result['result'] = json_encode(createChecklist($_POST['arguments']), true);
      break;
    case 'updateChecklist':
      $result['result'] = json_encode(updateChecklist($_POST['arguments']), true);
      break;
    case 'deleteChecklistById':
      $result['result'] = json_encode(deleteChecklistById($_POST['arguments']), true);
      break;
    default:
      $result['error'] = 'Not found function '.$_POST['functionname'];
      break;
  }
}

echo json_encode($result, true);


?>