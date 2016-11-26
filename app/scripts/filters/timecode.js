(function() {
  function timecode($filter) {
    return function(time) {
      var today = new Date();//in milisecond
      console.log("comparison")
      console.log(time)
      console.log(today)
      var today_conv = $filter('date')(today, 'hh:mm a')
      
      var conv = $filter('date')(time, 'hh:mm a')
      
    };
  }

  angular
    .module('blocChat')
    .filter('timecode', timecode);
})();
