<?php require_once __DIR__.'/init.php'; ?>

<!DOCTYPE html>
<html>

<head>
  <?php echoBootstrapAndJqueryDependencies(); ?>
  <link rel="stylesheet" href="assets/styles/styles.css">

  <script src="assets/js/checklist.js"></script>
</head>

<body>

<div class="container-fluid pt-3">
  <div class="row">
    <div class="col-9 col-md-5">
      <div class="checklist-header">
        <div class="row pl-2">
          <span class="icon-span col-1 align-middle text-center">
            <i class="far fa-check-square"></i>
          </span>
          <h6 class="col-8 checklist-title">Checklist</h6>
        </div>
      </div>
      <hr class="checklist-division">

      <div id="item-forms-area">
        <!-- <li class="sortable-form"> -->
          <form class="item-form">
            <div class="form-check mt-2 row">
              <input type="checkbox" class="shadow-sm mr-2">
              <input type="text" class="content-input" placeholder="Add an item...">
            </div>
          </form>
        <!-- </li> -->
        
        <!-- <li class="sortable-form"> -->
          <form class="item-form">
            <div class="form-check mt-2 row">
              <input type="checkbox" class="shadow-sm mr-2">
              <input type="text" class="content-input" placeholder="Add an item...">
            </div>
          </form>
        <!-- </li> -->

        <!-- <li class="sortable-form"> -->
          <form class="item-form">
            <div class="form-check mt-2 row">
              <input type="checkbox" class="shadow-sm mr-2">
              <input type="text" class="content-input" placeholder="Add an item...">
            </div>
          </form>
        <!-- </li> -->

        <!-- <li class="sortable-form"> -->
          <form class="item-form">
            <div class="form-check mt-2 row">
              <input type="checkbox" class="shadow-sm mr-2">
              <input type="text" class="content-input" placeholder="Add an item...">
            </div>
          </form>
        <!-- </li> -->

      </div>

    </div>

    <div class="col-3 col-md-3 mt-2">
      <button class="btn btn-light btn-sm shadow-sm checklist-popover-btn" data-toggle="popover" data-placement="bottom">
        Checklist
      </button>
    <div>

    
  </div>
  
</div>


</body>

</html>
