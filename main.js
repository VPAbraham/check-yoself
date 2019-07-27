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
  `<li class="nav__li--task"><img class="nav__img--del--idea" alt="delete X button" src="images/delete.svg"><p class="nav__p--task">${newlyEnteredTask}</p></li>`)
  taskItemInput.value = "";
  makeListBtn.disabled = false;
}
function delItem(e) {
  var task = e.target.closest('li');
  var taskId = parseInt(task.dataset.id);
  var itemIndex = tasksArray.findIndex(item => item.id === taskId) + 1;
  console.log(itemIndex)
  tasksArray.splice(itemIndex, 1)
  task.remove();
  console.log(tasksArray);
}

function makeCardHandler(e) {
  if (titleInput != '' && itemList.innerText != '') {
    var toDoList = new ToDoList(titleInput.value, tasksArray);
    toDosArray.push(toDoList);
    toDoList.saveToStorage();
  }
}


// function compileItemsToCard(e) {
//   if (titleInput.value != '' && ul.innerText != '') {
//     var newTaskList = new TaskCard(titleInput.value, tasksArray);
//     taskCollection.push(newTaskList);
//     newTaskList.saveToStorage();
//     createCard(newTaskList);
//     clearAll();
//   }
// }
