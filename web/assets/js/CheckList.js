(function() {
  var uic = CCB.namespace('CCB.uic');

  uic.CheckList = function(container_id, data) {
    // Dependencies
    var lib = CCB.lib;

    // Private variables    
    var checklist_id = data.checklist_id,
        checklist_title = data.checklist_title,
        items = data.items,
        events = data.events,
        checklists_container = $('#' + container_id)[0],
        checklist_id = 'chk_' + checklist_id;

    // HTML templates
    var checklist_tpl = ' \
          <div class="checklist row col-12 col-md-7"> \
            \
            <div class="checklist-header"> \
              <div class="row pl-2"> \
                <span> \
                  <i class="far fa-check-square align-middle m-2"></i> \
                </span> \
                <h6 class="checklist-title">{{checklist_title}}</h6> \
              </div> \
            </div> \
            \
            <hr class="checklist-division"> \
            \
            <div id="{{id}}" class="items-container w-100"> \
              {{item_forms}} \
              <div class="hidden bottom-of-items-container"></div> \
            </div> \
            <div class="new-item m-3">New item ...</div> \
          </div> \
        ';

    var item_tpl = ' \
          <form class="item-form" data-id="{{id}}"> \
            <div class="form-check mt-1 p-0"> \
              <i class="handle collapse fas fa-grip-vertical fa-xs text-muted m-1"></i> \
              <input type="checkbox" class="shadow-sm mr-2" {{checked}} > \
              <input type="text" class="content-input" value="{{content}}"> \
              <i class="delete collapse fas fa-trash-alt fa-xs text-danger m-1"></i> \
            </div> \
            <button type="submit" class="item-add-btn collapse btn btn-success btn-sm">Add</button> \
          </form> \
        ';


    // One-time init procedure
    initChecklist(checklists_container, items);

    showItemEditable($('.items-container'));
    setSortable($('.items-container'));
    createNewItem($('.checklist'), $('.items-container'));
    setItemEditFunction($('.items-container'));
    


    //--------------------------------------------------
    // Private functions

    function initChecklist(checklists_container_el, items) {
      var item_forms = '';
      for (var i in items) {
        item_forms += lib.applyTemplate(item_tpl, items[i]);
      }

      var checklist = lib.applyTemplate(checklist_tpl, {'id': checklist_id, 
                                                        'checklist_title': checklist_title,
                                                        'item_forms': item_forms});
      $(checklists_container_el).append(checklist);
    }


    function setSortable(items_container) {
      $(items_container).sortable({
        placeholder: "sortable-highlight",
        disable: true,
        axis: "y",
        stop: function( event, ui ) { console.log(event) }
      });
      $(items_container).disableSelection();
    }


    function showItemEditable(items_container_el) {
      // Show dragable handle and delete
      $(items_container_el).on('mouseenter', '.item-form',
        function(e) {
          $(this).find('.handle').show();
          $(this).find('.delete').show();
        }
      );

      $(items_container_el).on('mouseleave', '.item-form',
        function(e) {
          var left_item_form = $(e.target).parents('.item-form')[0],
              left_item_input = $(left_item_form).find('.content-input')[0];

          // Hide them only if the item input is not a focused
          if (!$(left_item_input).is(':focus')) {
            $(left_item_form).find('.handle').hide();
            $(left_item_form).find('.delete').hide();
          };
        }
      );

      // Show 'item-add-btn'
      $(items_container_el).on('focus', '.content-input, .item-add-btn', 
        function(e) {
          var focused_item_form = $(this).parents('.item-form');

          $(focused_item_form).find('.handle').show();
          $(focused_item_form).find('.delete').show();
          $(focused_item_form).find('.item-add-btn').show();
        }
      );

      $(items_container_el).on('focusout', '.content-input, .item-add-btn', 
        function(e) {
          var blurred_item_form = $(this).parents('.item-form');

          $(blurred_item_form).find('.handle').hide();
          $(blurred_item_form).find('.delete').hide();
          $(blurred_item_form).find('.item-add-btn').hide();

          // Remove item if no content
          if ($(blurred_item_form).find('.content-input').val() == '') {
            $(blurred_item_form).remove();
          }
        }
      );
    }


    // Create new item and auto focus on it
    function createNewItem(checklist_el, items_container_el) {
      $(checklist_el).on('click', '.new-item',
        function(e) {
          var default_item_data = { 
                id: 12,
                checked: '',
                content: ''
              },
              new_item = lib.applyTemplate(item_tpl, default_item_data);

          // $('.items-container .item-form:last').after(new_item);
          $(new_item).insertBefore($('.bottom-of-items-container'))

          var new_item_input = $('.items-container .item-form:last .content-input')[0];
          $(new_item_input).focus();
        }
      );
    }


    function setItemEditFunction(items_container_el) {
      // Delete
      $(items_container_el).on('click', '.delete',
        function(e) {
          deleteItem($(this).parents('.item-form')[0]);
        }
      )

      // Private functions
      function deleteItem(del_item_el) {
        console.log(del_item_el.dataset.id)
        // if (typeof events.onDelete === 'function') {
        //   // events.onDelete(del_item_el.dataset.id)
        // }
      }
    }



  }
})();