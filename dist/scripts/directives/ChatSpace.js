(function() {

  function ChatSpace(Message, $rootScope, $cookies, $uibModal, $document) {
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
        
        /**
         * @func askSetUsername
         * @desc 1) prompt to user-modal to set username
         */
        var askSetUsername = function() {
          $rootScope.modalUsername = $uibModal.open({
            appendTo: $document.find('body'),
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/templates/controllers/user-modal.html'
          })
        }
        var currentUser = $cookies.get('blocChatCurrentUser');
        if (!currentUser || currentUser === '') {
          askSetUsername();
        }
        console.log(currentUser)
        /**
         * @func setUsername
         * @desc 1) get input username from user 2) cancel the modal
         */
        scope.setUsername = function(username) {
          if (username) {
            currentUser = username
            $cookies.put('blocChatCurrentUser',username)
            $rootScope.modalUsername.dismiss('cancel');
            
          }
        }
        scope.$on('setUsername', function(event, args) {
          scope.setUsername(args.username)
        })
        /**
         * @func setUsername
         * @desc 1) remove currentUser in cookies 2) prompt user to modal setUsername
         */
        scope.reset = function() {
          $cookies.remove('blocChatCurrentUser');
          askSetUsername();
        }
      }
    }
  }

  angular
    .module('blocChat')
    .directive('chatSpace', ChatSpace);
})();
