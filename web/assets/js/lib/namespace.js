//### Namespace Init
// Create a namespace(module) if not exists yet

// Usage: 
// MYAPP.namespace('MYAPP.Modules.Module1');
// MYAPP.Modules.Module1 = (function() {
//   // private
//   var priv_var_a;
//   priv_func_a = function() {return ...};
//
//   // public
//   return {
//     var_a: ..., 
//     var_b: ...,
//
//     func_a: function() {...},
//     func_b: function() {...}
//   };
// })();

var CCB = CCB || {};

CCB.namespace = function(namespace_str) {
  var modules = namespace_str.split('.'),
    parent_module = CCB;

  // slice off parent module from modules
  if (modules[0] === 'CCB') {
    modules = modules.slice(1);
  }

  for (var i=0; i < modules.length; i++) {
    if (typeof parent_module[modules[i]] === 'undefined') {
        parent_module[modules[i]] = {};
    }
    parent_module = parent_module[modules[i]];
  }
  return parent_module;
};