var item_add_btn,
    checklist_popover_content;


$(document).ready(function() {
  onChecklistBtnClick();
  onChecklistPopoverBlur();
  
  onFormFocusAndBlur();
  onItemAddClick();

  $('#item-forms-area').sortable({ 
    // cancel: null, 
    disable: true,
    // delay: 100,
    axis: "y",
    change: function( event, ui ) { console.log(event) }
  });
})



//////////////////////////////
// Checklist Button & Popover Handlers

checklist_popover_content = (
  '<form class="checklist_popover_form"> \
    <div class="form-group mb-2"> \
      <label for="checklist_title_input" class="checklist_popover_form_label">Title</label> \
      <input type="text" class="form-control form-control-sm" id="checklist_title_input" value="Checklist"> \
    </div> \
    <button type="submit" class="btn btn-success btn-sm shadow-sm mt-0 add-checklist-btn">Add</button> \
  </form>'
);

function onChecklistBtnClick() {
  $('.checklist-popover-btn').popover({
    title: 'Add Checklist',
    container: 'body',
    html: true,
    content: checklist_popover_content
  });

  // After popover shown, add events to popover elements
  $('.checklist-popover-btn').on('shown.bs.popover', function() {
    $('#checklist_title_input').focus();

    $('.checklist_popover_form').submit(function(e) {
      e.preventDefault();
      var popover_form = this,
          checklist_title = $(popover_form).find('#checklist_title_input')[0].value;

      console.log(checklist_title)
      $('.checklist-popover-btn').popover('hide');
    })
  })
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


function onAddChecklistClick() {
  $('.add-checklist-btn').click(function(e) {
    e.preventDefault();
    e.stopPropagation();

    console.log(this)
  })
}



//////////////////////////////
// Items Handlers

item_add_btn = (
  '<button type="submit" class="btn btn-success btn-sm item-add-btn"> \
    Add</button>'
);

function onFormFocusAndBlur() {
  $('.content-input, .item-add-btn').focus(function(e) {
    var item_form = $(e.target).parents('.item-form');

    // Insert "item_add_btn" after checkbox & inputbox (if no item_add_btn yet)
    if ($(item_form).find('.item-add-btn').length == 0) {
      var form_check = $(item_form).find('.form-check')[0];
      $(form_check).after( item_add_btn );
    }
  });


  $('.item-form').focusout(function() {
    var item_form = this;

    // Wait for active element to leave the old element and enter the new one
    setTimeout(function() {
      // If active element is not within current 'item-form' (=> if 'item-form' is blurred), then remove 'item-add-btn'
      if ($(item_form).has(document.activeElement).length == 0) {
        $(item_form).children('.item-add-btn').remove();
      }
    }, 1);
  });
}


function onItemAddClick() {
  $('.item-form').submit(function(e) {
    var item_form = this;
    e.preventDefault();

    var content = $(item_form).find('.content-input')[0].value;
    console.log(content)
  })
}

