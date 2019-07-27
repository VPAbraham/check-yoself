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
  }
}

function createCard(toDoList) {
  var listCard = `<article class="task__card" data-id=${toDoList.id}>
    <header class="task__card--header">
    </header>
    <section class="task__card--body">
      <ul class="task__card--list">
      $
      </ul>
    </section>
    <footer class="task__card--footer">
      <div class="task__card--urgent">
        <img class="urgent-img" src="images/urgent.svg" alt="urgent lightning bolt">
        <p>URGENT</p>
      </div>
      <div class="task__card--delete">
        <img class="delete-img" src="images/delete.svg" alt="delete X button">
        <p>DELETE</p>
      </div>
    </footer>
  </article>`
  `
  <div class="todo__card--container" data-id=${newTaskList.id}>
    <article class="todo__card--header">
      <h3 class="todo__card--title">${newTaskList.title}</h3>
    </article>
    <ul class="todo__card--middle">
    ${appendTaskList(newTaskList)}
    </ul>
    <article class="todo__card--footer">
      <div class="todo__card--buttons--container1">
        <img class="todo__card--button--urgent" src="check-yo-self-icons/urgent.svg"/>
        <p class="todo__card--text--urgent">URGENT</p>
      </div>
      <div class="todo__card--buttons--container2">
        <img class="todo__card--button--delete" src="check-yo-self-icons/delete.svg"/>
        <p class="todo__card--text--delete">DELETE</p>
      </div>
    </article>
  </div>
  `;
  cardContainer.insertAdjacentHTML('afterbegin', listCard);
  clearAll();
}
