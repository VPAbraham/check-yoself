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
var toDoListCard = document.querySelector('.task__card');
var tasksArray = [];
var toDosArray = JSON.parse(localStorage.getItem('tasks')) || [];



// Auto-loading Functions


// Event listeners
window.addEventListener('load', loadFunctionsHandler);
addItemBtn.addEventListener('click', pushItemToTaskList);
itemList.addEventListener('click', delItem);
makeListBtn.addEventListener('click', makeCardHandler);
clearAllBtn.addEventListener('click', clearAll);
main.addEventListener('click', cardButtonsHandler);

// Event handlers

function loadFunctionsHandler() {
  persistToDoLists();
  console.log(tasksArray);
  console.log(toDosArray);
}

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

function cardButtonsHandler(e) {
  if (e.target.className === 'task__card--checkbox') {
    taskItemCheck(e);
    toggleTaskCheck(e);
  }
  if (e.target.className === 'delete-img') {
    delTaskList(e);
  }
  if (e.target.className === 'urgent-img') {
    markUrgent(e);
    toggleUrgent(e);
  }
}

// Functions

function getId(obj) {
  return parseInt(obj.dataset.id);
}

function getToDoListIndex(toDoListId) {
  return toDosArray.findIndex(obj => obj.id === toDoListId);
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
}

function delItem(e) {
  var item = e.target.closest('li');
  var taskItemId = getId(item);
  var index = tasksArray.findIndex(obj => obj.id === taskItemId);
  tasksArray.splice(index, 1)
  item.remove();
}


function pushTaskListToCard(toDoList) {
  var listItems = '';
  for (var i = 0; i < toDoList.tasks.length; i++) {
    var checkStatus = toDoList.tasks[i].taskComplete ? 'images/checkbox-active.svg'
    : 'images/checkbox.svg';
    listItems += `
    <li class="task__card--li">
      <img class="task__card--checkbox" src="${checkStatus}" data-id=${toDoList.tasks[i].id}>
      <p>${toDoList.tasks[i].body}</p>
    </li>`
  }
  return listItems;
}

function makeCard(toDoList) {
  var urgentStatus = toDoList.urgent ? 'images/urgent-active.svg' : 'images/urgent.svg';
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
        <img class="urgent-img" src="${urgentStatus}" alt="urgency lightning bolt">
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
  var toDoListId = getId(e.target.closest('.task__card'));
  var toDoListIndex = getToDoListIndex(toDoListId);
  var toDoListObj = toDosArray[getToDoListIndex(toDoListId)];
  var taskItemId = getId(e.target.closest('.task__card--li'));
  var taskItemIndex = toDoListObj.tasks.findIndex(obj => obj.id === taskItemId);
  toDosArray[toDoListIndex].updateTask(toDoListIndex, taskItemIndex);
}

function toggleTaskCheck(e) {
  var checkbox = e.target.closest('.task__card--checkbox');
    checkbox.src = 'images/checkbox.svg' ? checkbox.src='images/checkbox-active.svg' : checkbox.src='images/checkbox.svg';
}

// function delCardDom(e) {
//   e.target.closest('article').remove();
// }

function delTaskList(e) {
  var toDoListId = getId(e.target.closest('.task__card'));
  var toDoListIndex = getToDoListIndex(toDoListId);
  toDosArray[toDoListIndex].deleteFromStorage(toDoListIndex);
  toDosArray.splice(toDoListIndex, 1);
  e.target.closest('article').remove();
}

function markUrgent(e) {
  var toDoListId = getId(e.target.closest('.task__card'));
  var toDoListIndex = getToDoListIndex(toDoListId);
  toDosArray[toDoListIndex].updateToDo();
}

function toggleUrgent(e) {
  var urgentButton = e.target.closest('.urgent-img');
  urgentButton.src = 'images/urgent.svg' ? urgentButton.src='images/urgent-active.svg' : urgentButton.src='images/checkbox.svg';
}
