$(document).ready(function() {
  main();
});



function main(data) {
  var checklist_items_api = 'api/checklist_items.php'; // relative path to the html page
      data = {
        checklist_id: '5c38a344d7725',
        checklist_title: 'Checklist 1',
        events: {
          'onItemDelete': onItemDelete,
          'onItemUpdate': onItemUpdate
        },
        items: []
      };


  getItemsByChecklistId(data.checklist_id);


  // Get items data from DB and render checklist
  function getItemsByChecklistId(checklist_id) {
    $.ajax({
      type: 'POST',
      url: checklist_items_api,
      dataType: 'json',
      data: {
        functionname: 'getItemsByChecklistId',
        arguments: checklist_id
      },
      success: function(res, res_status) {
        data.items = JSON.parse(res['result']);
        setChecklist(data)
      }
    });
  }


  function setChecklist(data) {
    var ck_list = new CCB.uic.CheckList('checklists_container', data);
  }


  function onItemDelete(item_el, item_id) {
    if (item_id) {
      $.ajax({
        type: 'POST',
        url: checklist_items_api,
        dataType: 'json',
        data: {
          functionname: 'deleteItemByItemId',
          arguments: item_id
        },
        success: function(res, res_status) {
          if (res) {
            $(item_el).remove();
          }
        },
        error: function(xhr, ajaxOptions, throwError) {
          alert('Sorry, failed to delete! :( Please refresh and try again.');
          console.log(ajaxOptions)
          console.log(throwError)
        }
      });
    }
  }



  function onItemUpdate(item_form_el, item_data, updateItemElementData) {
    $.ajax({
      type: 'POST',
      url: checklist_items_api,
      dataType: 'json',
      data: {
        functionname: 'updateItem',
        arguments: JSON.stringify(item_data)
      },
      success: function(res, res_status) {
        var item_data = JSON.parse(res['result']);
        updateItemElementData(item_form_el, item_data);
      },
      error: function(xhr, ajaxOptions, throwError) {
        alert('Sorry, failed to update! :( Please try again.');
        console.log(ajaxOptions)
        console.log(throwError)
      }
    });

  }
  


  //--------------------------------------
  // // Create Checklist ----> Some unexpected results, not look into yet

  // var default_checklist_data = {
  //   checklist_id: 10,
  //   checklist_title: 'Checklist',
  //   // events: {
  //   //   'onDelete': onDelete,
  //   //   'onAdd': onAdd
  //   // },
  //   items: [
  //     // {
  //     //   id: 22,
  //     //   checked: '',
  //     //   content: ''
  //     // }
  //   ]
  // };


  // var create_checklist_popover = ' \
  //   <form class="checklist_popover_form"> \
  //     <div class="form-group mb-2"> \
  //       <label for="checklist_title_input" class="checklist_popover_form_label">Title</label> \
  //       <input type="text" class="form-control form-control-sm" id="checklist_title_input" value="Checklist"> \
  //     </div> \
  //     <button type="submit" class="btn btn-success btn-sm shadow-sm mt-0 create-checklist-btn">Create</button> \
  //   </form> \
  // ';

  // onChecklistBtnClick(create_checklist_popover, default_checklist_data);
  // onChecklistPopoverBlur();

  // function onChecklistBtnClick(popover_content, checklist_data) {
  //   $('.checklist-popover-btn').popover({
  //     title: 'New Checklist',
  //     container: 'body',
  //     html: true,
  //     content: popover_content
  //   })

  //   // After popover shown, add events to popover elements
  //   $('.checklist-popover-btn').on('shown.bs.popover', function() {
  //     $('#checklist_title_input').focus();
  
  //     $('.checklist_popover_form').submit(function(e) {
  //       e.preventDefault();
  //       var new_checklist_title = $(this).find('#checklist_title_input').val();
  //       console.log(new_checklist_title)
  //       /////// Save to database

  //       $('.checklist-popover-btn').popover('hide');

  //       checklist_data.checklist_title = new_checklist_title;
  //       new CCB.uic.CheckList('checklists_container', checklist_data);
  //       $('.items-container .item-form:first').find('.content-input').focus();

  //     })
  //   })
  // }
  
  
  // function onChecklistPopoverBlur() {
  //   // Close popover when clicking outside
  //   $(document).click(function(e) {
  //     var target_not_popover_or_btn = !$(e.target).is('.popover-header, .popover-body, .checklist-popover-btn');
  //     var target_not_within_popover_body = $(e.target).parents('.popover-body').length == 0;
  
  //     if (target_not_popover_or_btn && target_not_within_popover_body) {
  //       $('.checklist-popover-btn').popover('hide');
  //     }
  //   });
  // }


}
