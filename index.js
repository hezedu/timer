// 图标闹钟
// 进程的、服务的
// 可增删改查的。
// log
// --------- 开始时间 ---------
// 间隔
// 次数
var startDate, startTime;
const taskList = [];

function getDate(str) {
  const date = new Date();
  str = str.split('-');
  date.setFullYear(Number(str[0]), Number(str[1]), Number(str[2]));
  return date;
}

function setHours(date, str) {
  str = str.split(':');
  var sec = str[2];
  sec = sec ? Number(sec) : 0; //开始时间秒
  date.setHours(Number(str[0]), Number(str[1]), sec);
  return date;
}

function reGetTime(startTime, nowTime, interval) {
  return startTime + interval * Math.ceil((nowTime - startTime) / interval);
}

function Task(conf){
  // startDate 可选。默认当天 yyyy-MM-dd OK
  // startTime 必选 00:00:00 或 00:00 OK
  // interval 间隔 必选 毫秒
  // infinity bool   是否Infinity 无限循环 默认 false
  // start 必填 
  this.interval = conf.interval;
  this._timerIndex = null;

  const nowDate = new Date();
  const confDate = conf.startDate ? getDate(conf.startDate) : nowDate;
  this.startTime = setHours(confDate, conf.startTime).getTime();
  this.nowTime = nowDate.getTime();
  this.infinity = conf.infinity;

  if ( this.startTime < this.nowTime) {
    if (conf.infinity) {
      this.startTime = reGetTime(this.startTime, this.nowTime, this.interval);
    } else {
      this._isEnd = true;
      return; // 已过期
    }
  }
  this._isEnd = false;
  this._start = conf.start;
  this._onEnd = conf.onEnd;

  this._autoStart();

}
Task.prototype.reInitTime = function() {
  this.nowTime = Date.now();
  this.startTime = this.startTime + this.interval;
  if(this.startTime < this.nowTime) {
    this.startTime = reGetTime(this.startTime, this.nowTime, this.interval);
  }
}

Task.prototype._autoStart = function() {
  this._timerIndex = setTimeout(() => {
    this._start(() => { // end callback
      if (this.infinity) {
        if(!this._isEnd) {
          this.reInitTime();
          this._autoStart();
        }

      } else {
        this._isEnd = true;
      }
    });
  }, this.startTime - this.nowTime);
}
Task.prototype.abort = function() {
  if(this._isEnd) {
    return;
  }
  this._isEnd = true;
  clearTimeout(this._timerIndex);
}

module.exports = Task;
