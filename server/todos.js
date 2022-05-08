const uuid = require('uuid').v4;

function makeTodoList() {
  const id1 = uuid();
  const id2 = uuid();
  const id3 = uuid();
  const id4 = uuid();

  const todoList = {};
  
  const todos = {
    [id1]: {
      id: id1,
      task: "Clean Up",
      description: "Vaccum the floor and wipe down desks",
      point: 10,
      done: true,
      canRepeat: false,
      completionCount: 1,
    },
    [id2]: {
      id: id2,
      task: "Participate in Class",
      description: "Raise hands to answer a difficult question",
      point: 3,
      done: false,
      canRepeat: true,
      completionCount: 0,
    },
    [id3]: {
      id: id3,
      task: "Share a Story with the Class",
      description: "Choose a story of any kind",
      point: 8,
      done: false,
      canRepeat: false,
      completionCount: 0,
    },
    [id4]: {
      id: id4,
      task: "Read for 30 Minutes",
      description: "Read quietly",
      point: 5,
      done: false,
      canRepeat: true,
      completionCount: 0,
    },
  };

  todoList.containTodo = function containTodo(id) {
    return !!todos[id];
  };

  todoList.getTodos = function getTodos() {
    return todos;
  };

  todoList.addTodo = function addTodo(task, description, point, canRepeat) {
    const id = uuid();
    todos[id] = {
      id,
      task,
      description,
      point,
      done: false,
      canRepeat,
      completionCount: 0,
    };
    return id;
  };

  todoList.getTodo = function getTodo(id) {
    return todos[id];
  };

  todoList.canCompleteTodo = function canCompleteTodo(id) {
    return !todos[id].done || todos[id].canRepeat;
  }

  todoList.updateTodo = function updateTodo(id, todo) {
    todos[id].done = todo.done ?? todos[id].done;
    todos[id].task = todo.task || todos[id].task;
    todos[id].completionCount = todo.completionCount ?? todos[id].completionCount;
  };

  todoList.deleteTodo = function deleteTodo(id) {
    delete todos[id];
  };

  return todoList;
};

module.exports = {
  makeTodoList,
};
