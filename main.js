// Global Variables
var main = document.querySelector('.main');
var nav = document.querySelector('.nav');
var header = document.querySelector('.header');
var titleInput = document.querySelector('.nav__input--ttitle');
var taskItemInput = document.querySelector('.nav__input--titem');
var addItemBtn = document.querySelector('.nav__button--titem');
var makeListBtn = document.querySelector('.nav__button--make-tl');
var clearAllBtn = document.querySelector('.nav__button--clear');
var filterUrgencyBtn = document.querySelector('.nav__button--filter');
var tasksArray = [];
var toDosArray = JSON.parse(localStorage.getItem("storedToDos"));


// Auto-loading Functions


// Event listeners
addItemBtn.addEventListener('click', pushItemToTaskList);

// Event handlers
function navBtnsHandler(e) {
  console.log(e);
  enableListBtns();
  enableItem();

}

// Functions


function pushItemToTaskList(e) {
  if (taskItemInput.value != "") {
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

function removeNewItem(e) {
  var newlyMadeItem = e.target.closest('li');

}
// function delCard(e) {
//   if (e.target.className === "nav__img--del--idea") {
//
//   }
// }
