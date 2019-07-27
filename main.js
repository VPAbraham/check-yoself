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
nav.addEventListener('keyup', enableItemBtn())
addItemBtn.addEventListener('click', appendNewTask);
// Event handlers
function navBtnsHandler(e) {
  console.log(e);
  enableListBtns();
  enableItem();

}

// Functions

function enableItemBtn(e) {
    if (titleInput.value === '' || taskItemInput.value === ''){
        addItemBtn.disabled = false;
        clearAllBtn.disabled = false;
    // } else {
    //     addItem.disabled = false;
    //     clearAllBtn.disabled = false;
      }
}

function enableMakeTaskList(e) {
    if (itemInput.value === ''){
        addItemBtn.disabled = true;
    } else {
        addItemBtn.disabled = false;
    }
};

function appendNewTask(e) {
  var taskList = document.querySelector('.nav__task--list');
  var newlyEnteredTask = taskItemInput.value;
  taskList.insertAdjacentHTML('beforeend',
  `<li class="nav__li--task"><img class="nav__img--del--idea" alt="delete X button" src="images/delete.svg"><p class="nav__p--task">${newlyEnteredTask}</p></li>`)
  taskItemInput.value = "";
  makeListBtn.disabled = false;
}
