(function() {

  function RoomList(Room, $uibModal, $document, $rootScope) {
    return {
      templateUrl: '/templates/directives/room-list.html',
      restrict: 'E',
      scope: true,
      link: function(scope, element, attrs) {
        //@var for tasks array
        var roomArray = Room.all;
        scope.roomList = roomArray;
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
          //1) open new room or 2) back to current room
          $rootScope.modalInstance = $uibModal.open({
            appendTo: $document.find('body'),
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/templates/controllers/room-modal.html',
          });
          //Open the room
        };


      }
    };
  }

  angular
    .module('blocChat')
    .directive('roomList', RoomList);
})();
