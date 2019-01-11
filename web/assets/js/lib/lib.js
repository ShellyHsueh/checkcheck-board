(function() {
  var lib = CCB.namespace("CCB.lib");

  lib.applyTemplate = function(tpl, obj) {
    var rendered = tpl;

    $.each(obj, function(key, value) {
      var re = new RegExp("{{" + key + "}}", "gm");
      rendered = rendered.replace(re, value);
    });

    return rendered;
  }
})();


function convertToNode(html_str) {
  return document.createRange().createContextualFragment(html_str);
}