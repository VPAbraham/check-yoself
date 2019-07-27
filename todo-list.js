class ToDoList {
  constructor(id, title, tasks, urgent) {
    this.id = id || Date.now();
    this.title = title;
    this.taskList = tasks;
    this.urgent = urgent || false;
  }

  saveToStorage() {
    var toDosString = JSON.stringify(toDosArray);
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


class Items {
  constructor(body, id) {
    this.id = id || Date.now();
    this.body = body;
    this.taskComplete = false;
  }
}
