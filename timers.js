const Task = require('./timer');
const list = [];

function add(conf) {
  list.shift(new Task(conf));
}

exports.remove = function(i) {
  let task = list[i];
  task.abort();
  list.splice(i, 1);
}

var isStart = false;
exports.start = function(confs) {
  if(isStart) {
    return;
  }
  isStart = true;
  confs.forEach((conf) => {
    add(conf);
  });
}

exports.add = add;
