(function() {

  function ChatSpace(Message, $rootScope) {
    return {
      templateUrl: '/templates/directives/chat-space.html',
      restrict: 'E',
      scope: {},
      link: function(scope, element, attributes) {
        var messageArray = null;

    
        scope.messageList = null;

        /**
         * @func enterMessage
         * @desc 1) enter a new message
         */
        scope.enterMessage = function(message) {

          //Prepare the message info
          scope.message.sentAt = '9:00';
          scope.message.roomId = $rootScope.currentRoomId    
          scope.message.username = 'Me'

          //Ensure message is valid and content is not null
          if (scope.message && scope.message.content) {
            scope.message = angular.copy(message);
            messageArray.$add(scope.message);
            scope.message = '';
          };
        };

        /**
         * @func loadMessage
         * @desc 1) load messages after user switch room
         */
        scope.loadMessage = function(id) {
          scope.messageList = ''; //reset messageList
          messageArray = Message.getByRoomId(id); //make new query of the chosen room
          scope.messageList = messageArray;
        }
        scope.$on('loadMessage', function() {
          scope.loadMessage($rootScope.currentRoomId)
        })
      }
    }
  }

  angular
    .module('blocChat')
    .directive('chatSpace', ChatSpace);
})();
