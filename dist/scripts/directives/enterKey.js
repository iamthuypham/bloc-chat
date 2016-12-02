(function() {
  function EnterKey($parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.bind('keydown keypress', function(event) {
          if (event.which === 13) {
            var attrValue = $parse(attrs.enterKey);
            (typeof attrValue === 'function') ? attrValue(scope): angular.noop();
            event.preventDefault();
          }
        });
        scope.$on('$destroy', function() {
          element.unbind('keydown keypress')
        })
      }
    };
  }

  angular
    .module('blocChat')
    .directive('enterKey', EnterKey);
})();
