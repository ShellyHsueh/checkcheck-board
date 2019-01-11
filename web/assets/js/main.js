$(document).ready(function() {
  main();
});


function main() {
  var data = {
    checklist_id: 13,
    checklist_title: 'Checklist 1',
    events: {
      'onDelete': onDelete,
      'onAdd': onAdd
    },
    items: [
      {
        id: 12,
        checked: 'checked',
        content: '123'
      },
      {
        id: 13,
        checked: '',
        content: '456'
      }
    ]
  };


  var ck_list = new CCB.uic.CheckList('checklists_container', data);


  function onDelete(item_id) {
    console.log(item_id)
  }

  function onAdd(item_data) {
    console.log(item_data)
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
