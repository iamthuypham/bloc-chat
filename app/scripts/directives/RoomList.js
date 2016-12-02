(function() {

  function RoomList(Room, $uibModal, $document, $rootScope) {
    $rootScope.currentRoomId = null;
    return {
      templateUrl: '/templates/directives/room-list.html',
      restrict: 'E',
      scope: {
        onChange: '&'
      },
      link: function(scope, element, attrs) {

        //@var for tasks array
        var roomArray = Room.all;
        scope.roomList = roomArray;
        scope.value = null;
        scope.pull = false;
        /**
         * @func updateRoom
         * @desc 1) read user input 2) write to database 3)reset input field to default
         */
        scope.updateRoom = function(room) {
          if (scope.room) {
            scope.room = angular.copy(room);
            roomArray.$add(scope.room);
            scope.room = '';
          };
        };
        /**
         * @func removeRoom
         * @desc 1) remove a room using its index
         */
        scope.removeRoom = function(room) {
            Room.all.$remove(scope.roomList.indexOf(room));
          }
          /**
           * @func openRoom
           * @desc 1) call a uibModal warning 2) open a chat room
           */
        scope.openRoom = function(room) {
          //Used to call room's info outside of scope
          $rootScope.room = angular.copy(room);
          //Ensure room name in room-list is not affected
          scope.room = '';
          //Call a modal which is popup message asking for confirmation
          $rootScope.modalInstance = $uibModal.open({
            appendTo: $document.find('body'),
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/templates/controllers/room-modal.html',
          });
        };
        //When user makes decision on Modal, ModalCtrl will call one of these function
        //1) switch to clicked room or 2) stay at current room
        scope.stayRoom = function() {
          $rootScope.modalInstance.dismiss('cancel');
          scope.pull = false;
        }
        scope.$on('stayRoom', function() {
          scope.stayRoom()
        });
        scope.switchRoom = function() {
          $rootScope.currentRoomId = $rootScope.room.$id;
          $rootScope.modalInstance.dismiss('cancel');
          scope.pull = false;
          $rootScope.$broadcast('loadMessage')
        };
        scope.$on('switchRoom', function(event, data) {
          scope.switchRoom()
        });
        
        
        scope.pullList = function() {
          scope.pull = true;
        }
        scope.$on('pullList', function() {
          scope.pullList()
        });
        
      }
    };
  }

  angular
    .module('blocChat')
    .directive('roomList', RoomList);
})();
