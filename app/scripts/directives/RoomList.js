(function() {

  function RoomList(Room) {
    return {
      templateUrl: '/templates/directives/room-list.html',
      restrict: 'E',
      scope: {},
      link: function(scope, element, attributes) {
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
        * @desc 1) open a chat space using its index
        */
        scope.openRoom = function() {
          // display conversations
        }
        
        

      }
    };
  }

  angular
    .module('blocChat')
    .directive('roomList', RoomList);
})();
