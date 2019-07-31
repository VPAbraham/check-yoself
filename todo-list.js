class ToDoList {
  constructor(title, tasks, id, urgent) {
    this.id = id;
    this.title = title;
    this.tasks = tasks;
    this.urgent = urgent || false;
  }

  saveToStorage() {
    var toDosString = JSON.stringify(toDosArray);
    localStorage.setItem('tasks', toDosString);
  }

  deletefromGlobalArray(i) {

  }

  deleteFromStorage(i) {
    toDosArray.splice(i, 1);
		this.saveToStorage();
  }

  updateToDo() {
    this.urgent = !this.urgent;
    this.saveToStorage();
  }

  updateTask(i) {
    this.tasks[i].taskComplete = !this.tasks[i].taskComplete;
    this.saveToStorage();
  }

  verifyTasksComplete() {
    var tasksDone = this.tasks.every(function (e) {
      return e.taskComplete === true
    });
    return tasksDone;
  }
}

class Item {
  constructor(body, id) {
    this.id = id || Date.now();
    this.body = body;
    this.taskComplete = false;
  }
}
