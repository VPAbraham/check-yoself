// Global Variables
var main = document.querySelector('.main');
var nav = document.querySelector('.nav');
var header = document.querySelector('.header');
var titleInput = document.querySelector('.nav__input--ttitle');
var taskItemInput = document.querySelector('.nav__input--titem');
var addItemBtn = document.querySelector('.nav__button--titem');
var itemList = document.querySelector('.nav__task--list')
var makeListBtn = document.querySelector('.nav__button--make-tl');
var clearAllBtn = document.querySelector('.nav__button--clear');
var filterUrgencyBtn = document.querySelector('.nav__button--filter');
var tasksArray = [];
var toDosArray = JSON.parse(localStorage.getItem('tasks')) || [];



// Auto-loading Functions


// Event listeners
addItemBtn.addEventListener('click', pushItemToTaskList);
itemList.addEventListener('click', delItem);
makeListBtn.addEventListener('click', makeCardHandler);
clearAllBtn.addEventListener('click', clearAll);
window.addEventListener('load', loadFunctionsHandler);


// Event handlers

function makeCardHandler(e) {
  if (titleInput != '' && itemList.innerText != '') {
    var toDoList = new ToDoList(titleInput.value, tasksArray);
    toDosArray.push(toDoList);
    toDoList.saveToStorage();
    makeCard(toDoList);
    pushTaskListToCard(toDoList);
    resetfields();
  }
}

function loadFunctionsHandler() {
  persistToDoLists();
  console.log(tasksArray);
  console.log(toDosArray);
}

// Functions

function getId(obj) {
  objId = parseInt(obj.dataset.id);
}

function pushItemToTaskList(e) {
  if (taskItemInput.value != '') {
    var newItem = new Item(taskItemInput.value);
    tasksArray.push(newItem);
    appendNewItem(newItem);
  }
}

function appendNewItem(item) {
  var taskList = document.querySelector('.nav__task--list');
  var newlyEnteredTask = taskItemInput.value;
  taskList.insertAdjacentHTML('beforeend',`
  <li class="nav__li--task" data-id=${item.id}>
    <img class="nav__img--del--idea" alt="delete X button" src="images/delete.svg">
    <p class="nav__p--task">${newlyEnteredTask}</p>
  </li>`)
  taskItemInput.value = '';
  // makeListBtn.disabled = false;
}

function delItem(e) {
  var item = e.target.closest('li');
  var itemId = parseInt(item.dataset.id);
  var index = tasksArray.findIndex(item => item.id === itemId);
  tasksArray.splice(index, 1)
  item.remove();
}


function pushTaskListToCard(toDoList) {
  var listItems = '';
  for (var i = 0; i < toDoList.tasks.length; i++) {
    listItems += `
    <li class="task__card--li">
      <input class="task__card--checkbox" type="checkbox" data-id=${toDoList.tasks[i].id}>
      <p>${toDoList.tasks[i].body}</p>
    </li>`
  }
  return listItems;
}

function makeCard(toDoList) {
  var taskList = `
  <article class="task__card" data-id=${toDoList.id}
    <header class="task__card--header">
      <h3>${toDoList.title}</h3>
    </header>
    <section class="task__card--body">
      <ul class="task__card--list">
      ${pushTaskListToCard(toDoList)}
      </ul>
    </section>
    <footer class="task__card--footer">
      <span class="task__card--urgent">
        <img class="urgent-img" src="images/urgent.svg" alt="urgent lightning bolt">
        <p>URGENT</p>
      </span>
      <span class="task__card--delete">
        <img class="delete-img" src="images/delete.svg" alt="delete X button">
        <p class="span__p--delete">DELETE</p>
      </span>
    </footer>
  </article>`;
  main.insertAdjacentHTML('afterbegin', taskList);
  clearAll();
}

function resetfields() {
  titleInput.value = '';
  taskItemInput.value = '';
  itemList.innerText = '';
  tasksArray = [];
}

function clearAll() {
  if (titleInput.value === '' && itemList.innerText === '') {
    return;
  } else {
    resetfields();
  }
}

function persistToDoLists() {
  var placeholderArray = toDosArray.map(function(toDoList) {
    toDoList = new ToDoList (toDoList.title, toDoList.tasks, toDoList.id, toDoList.urgent);
    return toDoList;
  });
  toDosArray = placeholderArray;
  toDosArray.forEach(function(toDoList) {
    makeCard(toDoList);
  });
}

function taskItemCheck(e) {
  if (e.target.className.contains('task__card--checkbox')) {

  }
}
