(function() {
  function ModalCtrl($uibModal, $scope, $rootScope) {
    
    $scope.ok = function() {
      
    }
    
    //Cancel current modal
    $scope.cancel = function() {
      $rootScope.modalInstance.dismiss('cancel');
    }
  }
  angular
    .module('blocChat')
    .controller('ModalCtrl', ModalCtrl);
})();
