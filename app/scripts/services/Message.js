(function() {
  function Message($firebaseArray, $rootScope) {
    var ref = firebase.database().ref().child("messages");

    var messages = $firebaseArray(ref);

    return {
      getByRoomId: function(roomId) {
        // Filter the messages by their room ID.
        var messageId = ref.orderByChild("roomId").equalTo(roomId)

        var messageArray = $firebaseArray(messageId)
        console.log(messageArray)
        return messageArray;
      },
      send: function(newMessage, messageByRoom) {
        if (newMessage) {
          newMessage = angular.copy(newMessage);
          messageByRoom.$add(newMessage);
        }
      }
    };
  }

  angular
    .module('blocChat')
    .factory('Message', ['$firebaseArray', Message]);
})();
