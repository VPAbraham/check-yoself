// Global Variables
var tasksArray = [];
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
var searchField = document.querySelector('.header__search--bar');
var toDoListCard = document.querySelector('.task__card');
var toDosArray = JSON.parse(localStorage.getItem('tasks')) || [];



// Event listeners
window.addEventListener('load', loadFunctionsHandler);
addItemBtn.addEventListener('click', pushItemToTaskList);
itemList.addEventListener('click', delItem);
makeListBtn.addEventListener('click', makeCardHandler);
clearAllBtn.addEventListener('click', clearAll);
main.addEventListener('click', cardButtonsHandler);
searchField.addEventListener('keyup', searchHandler);

// Event handlers

function loadFunctionsHandler() {
  persistToDoLists();
  console.log(tasksArray);
  console.log(toDosArray);
}

function makeCardHandler(e) {
  if (titleInput != '' && itemList.innerText != '') {
    var toDoList = new ToDoList(titleInput.value, tasksArray, Date.now());
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
    toggleItalics(e);
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
  else makeListBtn.disabled = true;
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
    var italicsStatus = toDoList.tasks[i].taskComplete ?
    'style="color: #3c6577; font-style: italic"' : '';
    listItems += `
    <li class="task__card--li" data-id=${toDoList.tasks[i].id}>
      <img class="task__card--checkbox" src="${checkStatus}" >
      <p class="task-body" ${italicsStatus}>${toDoList.tasks[i].body}</p>
    </li>`
  }
  return listItems;
}

function makeCard(toDoList) {
  var urgentStatus = toDoList.urgent ? 'images/urgent-active.svg' : 'images/urgent.svg';
  var urgentCard = toDoList.urgent ? 'urgent' : '';
  var taskList = `
  <article class="task__card ${urgentCard}" data-id=${toDoList.id}>
    <div class="task__card--header">
      <h3>${toDoList.title}</h3>
    </div>
    <section class="task__card--body">
      <ul class="task__card--list">
      ${pushTaskListToCard(toDoList)}
      </ul>
    </section>
    <div class="task__card--footer">
      <span class="task__card--urgent">
        <img class="urgent-img" src="${urgentStatus}" alt="urgency lightning bolt">
        <p>URGENT</p>
      </span>
      <span class="task__card--delete">
        <img class="delete-img" src="images/delete.svg" alt="delete X button">
        <p class="span__p--delete">DELETE</p>
      </span>
    </div>
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
  var toDoListObj = toDosArray[toDoListIndex];
  var taskItemId = getId(e.target.closest('.task__card--li'));
  var taskItemIndex = toDoListObj.tasks.findIndex(obj => obj.id === taskItemId);
  console.log(typeof taskItemIndex);
  toDosArray[toDoListIndex].updateTask(taskItemIndex);
}

function toggleTaskCheck(e) {
  var checkbox = e.target.closest('.task__card--checkbox');
  checkbox.src.includes('images/checkbox.svg') ? checkbox.src='images/checkbox-active.svg' : checkbox.src='images/checkbox.svg';
  var paragraph = e.target.closest('.task-body');
}


function delTaskList(e) {
  var toDoListId = getId(e.target.closest('.task__card'));
  var toDoListIndex = getToDoListIndex(toDoListId);
  var toDoListObj = toDosArray[toDoListIndex];
  if (toDoListObj.verifyTasksComplete() === true) {
  toDoListObj.deleteFromStorage(toDoListIndex);
  toDosArray.splice(toDoListIndex, 1);
  e.target.closest('article').remove();
  }
}

function markUrgent(e) {
  var toDoListId = getId(e.target.closest('.task__card'));
  var toDoListIndex = getToDoListIndex(toDoListId);
  var toDoListObj = toDosArray[toDoListIndex];
  console.log(toDosArray[toDoListIndex]);
  toDosArray[toDoListIndex].updateToDo();

};

function toggleUrgent(e) {
  var urgentButton = e.target.closest('.urgent-img');
  urgentButton.src.includes('images/urgent.svg') ? urgentButton.src='images/urgent-active.svg' : urgentButton.src='images/urgent.svg';
  var card = e.target.closest('.task__card');
  card.classList.toggle('urgent');
}

function toggleItalics(e) {
  var listItem = e.target.closest('.task__card--li')
  listItem.classList.toggle('italic');
}

function searchHandler(e){
  var searchTerms = event.target.closest('.header__search--bar').value
  searchTerms = searchTerms.toLowerCase();
  var cardContent = document.querySelectorAll('h3');
  var card = document.querySelectorAll(".task__card");
  searchCardContent(searchTerms, card, cardContent);
}


function searchCardContent(input, card, content, body) {
  var cardContent = document.querySelectorAll("h3");
  var card = document.querySelectorAll(".task__card");
  for (var i = 0; i < cardContent.length; i++) {
    if (!cardContent[i].innerText.toLowerCase().includes(input)) {
      card[i].classList.add('hidden');
    }
    if (cardContent[i].innerText.toLowerCase().includes(input)) {
      card[i].classList.remove('hidden');
    }
    else if (input.length === 0) {
      card[i].classList.remove('hidden');
    }
  }
}
