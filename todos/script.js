//VARIABLES
let todoItems = document.getElementById("todo-items"),
  todoInput = document.getElementById("todo-input"),
  todoForm = document.getElementById("todo-form"),
  todoSearch = document.getElementById("todo-search");

//EVENT LISTENERS
todoItems.addEventListener("click", removeItem);
todoForm.addEventListener("submit", addTodo);
// todoSearch.addEventListener("keyup", searchItem);
document.addEventListener("DOMContentLoaded", loadItems);

//FUNCTIONS
function addTodo(e) {
  e.preventDefault();
  let todo = todoInput.value;
  //checking if todo is entered
  if (todo !== "") {
    //creating todo list element
    let li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = todo;
    //appending delete btn for todo element
    let deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-dark btn-sm float-right";
    deleteBtn.textContent = "Delete";
    li.appendChild(deleteBtn);
    //todo is added to todo items container and form input is being reset
    todoItems.appendChild(li);
    todoForm.reset();
    //uploading item to localStorage with help of this function
    setItemLocalStorage(todo);
    checkLocalStorage();
  }
}
function removeItem(e) {
  if (e.target.classList.contains("btn")) {
    let item = e.target.parentElement;
    removeFromLocalStorage(item);
    item.remove();
  }
}
function loadItems() {
  todoInput.focus();
  let items = getItemsFromLocalStorage();
  checkLocalStorage();
  items.forEach((item) => {
    if (item !== "") {
      //creating todo list element
      let li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = item;
      //appending delete btn for todo element
      let deleteBtn = document.createElement("button");
      deleteBtn.className = "btn btn-dark btn-sm float-right";
      deleteBtn.textContent = "Delete";
      li.appendChild(deleteBtn);
      //todo is added to todo items container and form input is being reset
      todoItems.appendChild(li);
      todoForm.reset();
    }
  });
}

function setItemLocalStorage(todo) {
  let storageItems = getItemsFromLocalStorage();
  storageItems.push(todo);
  localStorage.setItem("todo", JSON.stringify(storageItems));
}
function getItemsFromLocalStorage() {
  let items = localStorage.getItem("todo");
  if (items === null) {
    items = [];
  } else {
    items = JSON.parse(items);
  }
  return items;
}
function removeFromLocalStorage(todo) {
  let liValue = todo.firstChild.textContent;
  let items = getItemsFromLocalStorage();
  const filteredItems = items.filter((item) => item != liValue);
  localStorage.setItem("todo", JSON.stringify(filteredItems));
}

function checkLocalStorage() {
  let arr = getItemsFromLocalStorage();
  if (arr.length != 0) {
    todoItems.parentElement.style.display = "block";
  } else {
    todoItems.parentElement.style.display = "none";
  }
}
