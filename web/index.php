<?php require_once __DIR__.'/init.php'; ?>

<!DOCTYPE html>
<html>

<head>
  <?php echoBootstrapAndJqueryDependencies(); ?>
  <link rel="stylesheet" href="assets/css/styles.css">

  <script src="assets/js/lib/namespace.js"></script>
  <script src="assets/js/lib/lib.js"></script>
  <script src="assets/js/CheckList.js"></script>
  <script src="assets/js/main.js"></script>
</head>

<body>

<div class="container-fluid pt-3">
  <div class="row col-12 mb-3">
    <button class="checklist-popover-btn btn btn-light btn-sm shadow-sm" data-toggle="popover" data-placement="right">
      Create Checklist
    </button>
  </div>
  
  <div id="checklists_container" class="row col-12 mt-2"></div>
  <div class="modal fade" id="checklist-modal" tabindex="-1" role="dialog" aria-labelledby="checklist-modal-label" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <span>
            <i class="far fa-check-square align-middle m-2"></i>
          </span>
          <h6 class="checklist-title" id="checklist-modal-label">Checklist</h6>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div id="checklist-modal-body" class="modal-body"></div>
      </div>
    </div>
  </div>
  
</div>


</body>

</html>
