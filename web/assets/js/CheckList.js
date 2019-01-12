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
        checklists_container = $('#' + container_id)[0];

    // HTML templates
    var checklist_tpl = ' \
          <div class="checklist row col-12 col-md-7" data-checklist_id="{{id}}"> \
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
            <div class="items-container w-100"> \
              {{item_forms}} \
              <div class="hidden bottom-of-items-container"></div> \
            </div> \
            <div class="new-item m-3">New item ...</div> \
          </div> \
        ';

    var item_tpl = ' \
          <form class="item-form" data-item_id="{{id}}" data-order={{order}} data-checklist_id="{{checklist_id}}"> \
            <div class="form-check mt-1 p-0"> \
              <i class="handle collapse fas fa-grip-vertical fa-xs text-muted m-1"></i> \
              <input type="checkbox" class="shadow-sm mr-2" {{checked}}> \
              <input type="text" class="content-input" value="{{content}}"> \
              <i class="delete collapse fas fa-trash-alt fa-xs text-danger m-1"></i> \
            </div> \
            <button type="submit" class="item-update-btn collapse btn btn-success btn-sm">Upate</button> \
          </form> \
        ';



    
    // ------------------------------------------------
    // Execute main functions

    // One-time init procedure
    initChecklist(checklists_container, items);

    // Event handlers
    itemMouseEvents($('.items-container'));
    itemFocusBlurEvents($('.items-container'));
    setSortable($('.items-container'));
    createNewItem($('.checklist'), $('.items-container'));
    setItemEditFunction($('.items-container'));
    



    //--------------------------------------------------
    // Main functions

    function initChecklist(checklists_container_el, items) {
      // Sort items by order
      items.sort(function (a, b) {
        return a.order - b.order;
      });

      var item_forms = '';
      for (var i in items) {
        item_forms += lib.applyTemplate(item_tpl, { id: items[i].id,
                                                    checklist_id: items[i].checklist_id,
                                                    content: items[i].content,
                                                    checked: items[i].checked ? 'checked' : '',
                                                    order: items[i].order
                                                  });
      };

      var checklist = lib.applyTemplate(checklist_tpl, { id: checklist_id, 
                                                         checklist_title: checklist_title,
                                                         item_forms: item_forms
                                                       });
      $(checklists_container_el).append(checklist);
    }


    function setSortable(items_container) {
      $(items_container).sortable({
        placeholder: "sortable-highlight",
        disable: true,
        axis: "y",
        update: function(event, ui) {
          var items = ui.item.parents('.items-container').children('.item-form');

          for (var i=0; i < items.length; i++) {
            items[i].dataset.order = i;
            onItemSorted({ id: items[i].dataset.item_id, order: i });
          }
        }
      });
      $(items_container).disableSelection();
    }


    function itemMouseEvents(items_container_el) {
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
    }


    function itemFocusBlurEvents(items_container_el) {
      // Show 'item-update-btn'
      $(items_container_el).on('focus', '.content-input, .item-update-btn', 
        function(e) {
          var focused_item_form = $(this).parents('.item-form');

          $(focused_item_form).find('.handle').show();
          $(focused_item_form).find('.delete').show();
          $(focused_item_form).find('.item-update-btn').show();
        }
      );


      // Remove 'item-update-btn'; Cancel input changes
      $(items_container_el).on('focusout', '.content-input, .item-update-btn', 
        function(e) {
          var blurred_input_el = this;

          // setTimeout to wait for document.activeElement set
          setTimeout(function() {
            // If new focused el is not input or add-btn
            if ( !$(document.activeElement).is('.content-input, .item-update-btn') ) {
              var blurred_item_form = $(blurred_input_el).parents('.item-form')[0],
                  input_el = $(blurred_item_form).find('.content-input')[0];

              $(blurred_item_form).find('.handle').hide();
              $(blurred_item_form).find('.delete').hide();
              $(blurred_item_form).find('.item-update-btn').hide();


              // If content is empty now OR editted empty input without save, 
              //    Then delete from DB && remove it
              if (input_el.value == '' || input_el.defaultValue == '') {
                if (blurred_item_form.dataset.item_id !== '') {
                  onItemDelete(blurred_item_form);
                }

                $(blurred_item_form).remove();
                return;
              }

              // Return to previous value if not tapping save
              input_el.value = input_el.defaultValue;
            }
          }, 1);
        }
      );
    }


    // Create new empty item and auto focus on it (Not store to DB yet)
    function createNewItem(checklist_el, items_container_el) {
      $(checklist_el).on('click', '.new-item',
        function(e) {
          var checklist_id = $(checklist_el).data('checklist_id'),
              new_item_order = $(items_container_el).find('.item-form').length,
              default_item_data = {
                id: '',
                checklist_id: checklist_id,
                checked: '',
                content: '',
                order: new_item_order
              },
              new_item = lib.applyTemplate(item_tpl, default_item_data);
          
          $(new_item).insertBefore($('.bottom-of-items-container'))
          var new_item_input = $('.items-container .item-form:last .content-input')[0];
          $(new_item_input).focus();
        }
      );
    }


    function setItemEditFunction(items_container_el) {
      // Item checked
      $(items_container_el).on('change', 'input:checkbox', 
        function(e) {
          onItemUpdate( $(this).parents('.item-form')[0] );
        }
      );


      // Item submit
      $(items_container_el).on('submit', '.item-form', 
        function(e) {
          e.preventDefault();
          var item_form_el = this;

          // If content empty, ignore any changes
          if ($(item_form_el).find('.content-input').val() == '') {
            document.activeElement.blur();
          } else {
            onItemUpdate(item_form_el);
          }
        }
      );


      // Delete
      $(items_container_el).on('click', '.delete',
        function(e) {
          onItemDelete( $(this).parents('.item-form')[0] );
        }
      )
    }




    //--------------------------------------------------
    // For main functions

    function onItemUpdate(item_form_el) {
      console.log(item_form_el)
      console.log(item_form_el.dataset.item_id)
      var item_data = {
        id: item_form_el.dataset.item_id,
        checklist_id: item_form_el.dataset.checklist_id,
        checked: $(item_form_el).find('input:checkbox')[0].checked,
        content: $(item_form_el).find('.content-input').val(),
        order: item_form_el.dataset.order
      };

      if (typeof events.onItemUpdate === 'function') {
        events.onItemUpdate(item_form_el, item_data, updateItemElementData);
      }
    }


    function onItemSorted(item_data) {
      events.onItemSorted(item_data);
    }


    function updateItemElementData(item_form_el, item_data) {
      item_form_el.dataset.item_id = item_data['id'];
      item_form_el.dataset.checklist_id = item_data['checklist_id'];
      item_form_el.dataset.order = item_data['order'];

      // Store into defaultValue for cases without tapping 'update', so we can reset to previous value anytime
      $(item_form_el).find('.content-input')[0].defaultValue = item_data['content'];
      $(item_form_el).find('.content-input')[0].value = item_data['content'];

      // Focus out of the update btn (to hide editable elements)
      document.activeElement.blur();
    }


    function onItemDelete(item_form_el) {
      if (typeof events.onItemDelete === 'function') {
        events.onItemDelete(item_form_el, item_form_el.dataset.item_id);
      }
    }



  }
})();