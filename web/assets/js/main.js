$(document).ready(function() {
  var default_checklist_data = defaultChecklistDataAndItemEditEvents();

  loadChecklists(default_checklist_data);
  setChecklistItemsModal(default_checklist_data);
  checklistPopover();
});



function defaultChecklistDataAndItemEditEvents() {
  var checklist_items_api = 'api/checklist_items.php', // relative path to the html page
      default_checklist_data = {
        checklist_id: '',
        checklist_title: '',
        events: {
          'onItemDelete': onItemDelete,
          'onItemUpdate': onItemUpdate,
          'onItemSorted': onItemSorted
        },
        items: []
      };


  return default_checklist_data;


  // --------------------------------------------
  // Private Checklist Events

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


  // Input: {id: '....', order: 1}
  function onItemSorted(item_data) {
    $.ajax({
      type: 'POST',
      url: checklist_items_api,
      dataType: 'json',
      data: {
        functionname: 'updateItem',
        arguments: JSON.stringify(item_data)
      },
      success: function(res, res_status) {
        // var item_data = JSON.parse(res['result']);
      }
    });
  }
}




function loadChecklists(checklist_data) {
  // Dependencies
  var lib = CCB.lib;

  var checklist_items_api = 'api/checklist_items.php', // relative path to the html page
      checklists_api = 'api/checklists.php';

  
  getAllChecklists();



  function getAllChecklists() {
    $.ajax({
      type: 'POST',
      url: checklists_api,
      dataType: 'json',
      data: {
        functionname: 'getAllChecklists'
      },
      success: function(res, res_status) {
        var checklists = JSON.parse(res['result']);
        createChecklistBtns(checklists);
      }
    });
  }

  function createChecklistBtns(checklists) {
    var checklist_btn_tpl = ' \
      <button type="button" class="btn btn-light btn-sm btn-block col-md-7 col-12" \
              data-checklist_id={{id}} data-toggle="modal" data-target="#checklist-modal"> \
        {{title}} \
      </button> \
    ';

    var btns = '';
    for (var i in checklists) {
      btns += lib.applyTemplate(checklist_btn_tpl, checklists[i]);
    }
    $(btns).appendTo($('#checklists_container'));
  }
}





function setChecklistItemsModal(checklist_data) {
  var checklist_items_api = 'api/checklist_items.php'; // relative path to the html page
      checklist_api = 'api/checklists.php';


  getChecklistItemsModal();
  onTitleEdit();


  function getChecklistItemsModal() {
    $('#checklist-modal').on('show.bs.modal', function(e) {
      var modal = this,
          trigger_btn = e.relatedTarget,
          checklist_id = trigger_btn.dataset.checklist_id,
          checklist_title = trigger_btn.innerText;

      $(modal).find('.checklist-title-form')[0].dataset.checklist_id = checklist_id;
      $(modal).find('.checklist-title-input')[0].value = checklist_title;
      $(modal).find('.checklist-title-input')[0].defaultValue = checklist_title;

      checklist_data.checklist_id = checklist_id;
      checklist_data.checklist_title = checklist_title;
      getItemsByChecklistId(checklist_id);
    });
  }


  function onTitleEdit() {
    $('.modal-header').on('submit', '.checklist-title-form',
      function(e) {
        var title_form_el = this,
            title_input_el = $(title_form_el).find('.checklist-title-input')[0];

        e.preventDefault();
        document.activeElement.blur();

        if (title_input_el.value == '') {
          title_input_el.value = title_input_el.defaultValue;
        } else {
          $.ajax({
            type: 'POST',
            url: checklist_api,
            dataType: 'json',
            data: {
              functionname: 'updateChecklist',
              arguments: JSON.stringify({id: title_form_el.dataset.checklist_id, 
                                         title: title_input_el.value
                                        })
            },
            success: function(res, res_status) {
              var updated_title = JSON.parse(res['result'])['title'];
              title_input_el.value = updated_title;
              title_input_el.defaultValue = updated_title;
            },
            error: function(xhr, ajaxOptions, throwError) {
              alert('Sorry, failed to update! :( Please try again.');
              title_input_el.value = title_input_el.defaultValue; // Return to previous title if failed
  
              console.log(ajaxOptions)
              console.log(throwError)
            }
          });
        }
        
      }
    );


    $('.modal-header').on('focusout', '.checklist-title-input',
      function(e) {
        var title_input_el = this;
        title_input_el.value = title_input_el.defaultValue;
      }
    );
  }


  // ----------------------------------------------
  // Checklist Items

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
        checklist_data.items = JSON.parse(res['result']);
        setChecklist(checklist_data);
      }
    });
  }


  function setChecklist(checklist_data) {
    var ck_list = new CCB.uic.CheckList('checklist-modal-body', checklist_data);
  }
}




function checklistPopover() {
  var checklists_api = 'api/checklists.php',
      create_checklist_popover = ' \
        <form class="checklist_popover_form"> \
          <div class="form-group mb-2"> \
            <label for="checklist_title_input" class="checklist_popover_form_label">Title</label> \
            <input type="text" class="form-control form-control-sm" id="checklist_title_input" value="Checklist"> \
          </div> \
          <button type="submit" class="btn btn-success btn-sm shadow-sm mt-0 create-checklist-btn">Create</button> \
        </form> \
      ';


  onChecklistBtnClick(create_checklist_popover);
  onChecklistPopoverBlur();


  function onChecklistBtnClick(popover_content) {
    // Init popover event
    $('.checklist-popover-btn').popover({
      title: 'New Checklist',
      container: 'body',
      html: true,
      content: popover_content
    });


    // After popover shown, add events to popover elements
    $('.checklist-popover-btn').on('shown.bs.popover', function() {
      $('#checklist_title_input').focus();
  
      $('.checklist_popover_form').submit(function(e) {
        e.preventDefault();
        var new_checklist_title = $(this).find('#checklist_title_input').val();
        createNewChecklist(new_checklist_title);
      })
    });


    function createNewChecklist(title) {
      $.ajax({
        type: 'POST',
        url: checklists_api,
        dataType: 'json',
        data: {
          functionname: 'createChecklist',
          arguments: title
        },
        success: function(res, res_status) {
          var result = JSON.parse(res['result']);
          createChecklistBtn(result['id'], result['title']);
          $('.checklist-popover-btn').popover('hide');
        }
      });
    }


    function createChecklistBtn(id, title) {
      // Dependencies
      var lib = CCB.lib;
  
      var checklist_btn_tpl = ' \
            <button type="button" class="btn btn-light btn-sm btn-block col-md-7 col-12" \
                    data-checklist_id={{id}} data-toggle="modal" data-target="#checklist-modal"> \
              {{title}} \
            </button> \
          ';
  
      var new_btn = lib.applyTemplate(checklist_btn_tpl, {id: id, title: title});
      $(new_btn).appendTo($('#checklists_container'));
    }
  }



  function onChecklistPopoverBlur() {
    // Close popover when clicking outside
    $(document).click(function(e) {
      var target_not_popover_or_btn = !$(e.target).is('.popover-header, .popover-body, .checklist-popover-btn');
      var target_not_within_popover_body = $(e.target).parents('.popover-body').length == 0;
  
      if (target_not_popover_or_btn && target_not_within_popover_body) {
        $('.checklist-popover-btn').popover('hide');
      }
    });
  }


}
