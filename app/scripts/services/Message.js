(function() {
  function Message($firebaseArray, $rootScope) {
    var ref = firebase.database().ref().child("messages");

    var messages = $firebaseArray(ref);

    // var orderBy = ref.orderByChild("roomId").equalTo("-KXEIe3ThIGnb755sMjs").on("child_added", function(snapshot) {
    //   console.log(snapshot.key);
    // });
    return {
      getByRoomId: function(roomId) {
        // Filter the messages by their room ID.
        // return ref.child('roomId').equalTo(roomId);
        var messageId = ref.orderByChild("roomId").equalTo(roomId)
        
        var messageArray = $firebaseArray(messageId)
        console.log(messageArray)
        return messageArray;
      },

    };
  }

  angular
    .module('blocChat')
    .factory('Message', ['$firebaseArray', Message]);
})();
