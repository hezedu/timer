const Task = require('../timer');

// test
const date = new Date();
// let task = new Task({
//   startTime: date.getHours + ':' + date.getMinutes + ':' + (date.getSeconds - 10),
//   interval : 1000,
//   infinity: true,
//   start: (cb) => {
//     console.log('开始');
//     setTimeout(() => {
//       console.log('结束');
//       cb();
//     }, 2000)
//   }
// });
// setTimeout(() => {
//   task.abort();
//   console.log('-------- 中止 ---------')
// }, 8000);

let task = new Task({
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
