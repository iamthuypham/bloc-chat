(function() {
  function ModalCtrl($uibModal, $scope, $rootScope) {
    
    $scope.ok = function() {
      $rootScope.$broadcast('switchRoom')
      console.log('You are now in room :' + $rootScope.room.name)
    }
    //Cancel current modal
    $scope.cancel = function() {
      $rootScope.$broadcast('stayRoom')
    }
    
    $scope.set = function(value) {
      $rootScope.$broadcast('setUsername', { username: value })
    }
  }
  angular
    .module('blocChat')
    .controller('ModalCtrl', ModalCtrl);
})();
