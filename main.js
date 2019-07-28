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
makeListBtn.addEventListener('click', makeCardHandler)

// Event handlers
function navBtnsHandler(e) {
  console.log(e);
  enableListBtns();
  enableItem();

}

// Functions


function pushItemToTaskList(e) {
  if (taskItemInput.value != '') {
    var newItem = new Item(taskItemInput.value);
    tasksArray.push(newItem);
    console.log(newItem);
    appendNewItem(newItem);
  }
}

function appendNewItem(item) {
  var taskList = document.querySelector('.nav__task--list');
  var newlyEnteredTask = taskItemInput.value;
  taskList.insertAdjacentHTML('beforeend',
  `<li class="nav__li--task" data-id=${item.id}><img class="nav__img--del--idea" alt="delete X button" src="images/delete.svg"><p class="nav__p--task">${newlyEnteredTask}</p></li>`)
  taskItemInput.value = "";
  makeListBtn.disabled = false;
}

function delItem(e) {
  var item = e.target.closest('li');
  console.log(item.dataset.id)
  var itemId = parseInt(item.dataset.id);
  console.log(itemId);
  var itemIndex = tasksArray.findIndex(item => item.id === itemId);
  console.log(tasksArray);
  console.log(itemIndex);
  tasksArray.splice(itemIndex, 1)
  item.remove();
  console.log(tasksArray);
}

function makeCardHandler(e) {
  if (titleInput != '' && itemList.innerText != '') {
    var toDoList = new ToDoList(titleInput.value, tasksArray);
    toDosArray.push(toDoList);
    toDoList.saveToStorage();
    makeCard(toDoList);
    pushTaskListToCard(toDoList)
  }
}

function pushTaskListToCard(toDoList) {
  var listItems = '';
  for (var i = 0; i < toDoList.tasks.length; i++) {
    listItems += `
    <li class="task__card--li">
      <input class="task__card--checkbox" type="checkbox">
      <p>${toDoList.tasks[i].body}</p>
    </li>`
    console.log(listItems);
    return listItems;
  }
}

function makeCard(toDoList) {
  var taskList = `<article class="task__card">
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
  // clearAll();
}
