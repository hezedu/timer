const timers = require('../timers');
const date = new Date();
timers.start([
  {
    name: '1秒循环间隔，执行2秒',
    startTime: date.getHours() + ':' + date.getMinutes() + ':' + (date.getSeconds() - 10),
    interval : 1000,
    infinity: true,
    start: (cb) => {
      console.log('1秒循环间隔:开始');
      setTimeout(() => {
        console.log('1秒循环间隔:结束');
        cb();
      }, 2000)
    }
  },
  {
    name: '明天上午执行一次',
    startDate: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 1),
    startTime: '9:30',
    infinity: false,
    start: (cb) => {
      console.log('明天上午执行一次：开始');
      setTimeout(() => {
        console.log('明天上午执行一次：结束');
        cb();
      }, 500)
    }
  }
]);

timers.add({
  name: '每两个月执行',
  startDate: '2019-2-20',
  startTime: '9:30',
  interval: 1000 * 60 * 60 * 24 * 60,
  infinity: true,
  start: (cb) => {
    console.log('每两个月执行：开始');
    setTimeout(() => {
      console.log('每两个月执行：结束');
      cb();
    }, 500)
  }
});
