const Task = require('../timer');

// test
const date = new Date();
let task = new Task({
  startTime: date.getHours + ':' + date.getMinutes + ':' + (date.getSeconds - 10),
  interval : 1000,
  infinity: true,
  start: (cb) => {
    console.log('开始');
    setTimeout(() => {
      console.log('结束');
      cb();
    }, 2000)
  }
});
setTimeout(() => {
  task.abort();
  console.log('-------- 中止 ---------')
}, 8000);
