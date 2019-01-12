<?php require_once __DIR__.'/init.php'; ?>

<!DOCTYPE html>
<html>

<head>
  <?php echoBootstrapAndJqueryDependencies(); ?>
  <link rel="stylesheet" href="assets/styles/styles.css">

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
  
</div>


</body>

</html>
