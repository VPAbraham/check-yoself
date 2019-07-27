class ToDoList {
  constructor(id, title, tasks, urgent) {
    this.id = id || Date.now();
    this.title = title;
    this.tasks = tasks;
    this.urgent = urgent || false;
  }

  saveToStorage() {
    var toDosString = JSON.stringify(storedToDos);
    localStorage.setItem("storedToDos", toDosString);
  }

  deleteFromStorage(i) {
    todosArray.splice(index, 1);
		this.saveToStorage();
  }

  updateToDo() {
    this.urgent = !this.urgent;
    this.saveToStorage();
  }

  updateTask(i) {
    this.taskList[i].taskComplete = !this.taskList[i].taskComplete;
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
