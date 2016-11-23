(function() {
  function Room($firebaseArray) {
    var ref = firebase.database().ref().child("rooms");
    // download room into a synchronized array
    var rooms = $firebaseArray(ref);
    return {
      all: rooms
        // remaining logic for room
      // getRoomId: id
    };

  }

  angular
    .module('blocChat')
    .factory('Room', ['$firebaseArray', Room]);
})();
