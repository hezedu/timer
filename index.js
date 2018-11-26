
exports.run = function(conf) {
  //conf


  var interval = conf.Interval || 
  1000 * 60 * 60 * 24; //间隔  默认一天


  function initStartTime(startTime) {
    startTime = startTime || "00:00"; //开始时间
    startTime = startTime.split(':'); //开始时间

    var startTimeHour = Number(startTime[0]); //开始时间小时
    var startTimeMin = Number(startTime[1]); //开始时间分钟
    var startTimeSec = startTime[2] ? Number(startTime[2]) : 0; //开始时间分钟

    startTime = new Date();
    startTime.setHours(startTimeHour, startTimeMin, startTimeSec);
    startTime = startTime.getTime();
    return startTime;
  }

  var startTime = initStartTime(conf.startTime);

  function getInterval() {
    var _now = Date.now();
    startTime = startTime + interval * Math.ceil((_now - startTime) / interval);
    return startTime - _now;
  }


  function _loop() {
    setTimeout(function(){
      conf.task();
      _loop();
    }, getInterval());
  }
  _loop();
}
