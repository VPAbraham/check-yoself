class ToDoList {
  constructor(title, tasks, id, urgent) {
    this.id = id || Date.now();
    this.title = title;
    this.tasks = tasks;
    this.urgent = urgent || false;
  }

  saveToStorage() {
    var toDosString = JSON.stringify(toDosArray);
    localStorage.setItem('tasks', toDosString);
  }

  deleteFromStorage(i) {
    todosArray.splice(i, 1);
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
}


class Item {
  constructor(body, id) {
    this.id = id || Date.now();
    this.body = body;
    this.taskComplete = false;
  }
}
