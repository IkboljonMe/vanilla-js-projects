// SELECTORS
const todoItems = document.getElementById("todo-items");
const todoInput = document.getElementById("todo-input");
const todoForm = document.getElementById("todo-form");
const todoSearch = document.getElementById("todo-search");

// EVENTS
document.addEventListener("DOMContentLoaded", () => {
  todoInput.focus();
  renderItems(getItems());
});
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = todoInput.value.trim();
  if (todo) {
    addItem(todo);
    todoForm.reset();
  }
});
todoItems.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    const li = e.target.closest("li");
    removeItem(li);
  }
});
todoSearch.addEventListener("keyup", () => {
  const val = todoSearch.value.toUpperCase();
  [...todoItems.children].forEach(li => {
    li.style.display = li.textContent.toUpperCase().includes(val) ? "block" : "none";
  });
});

// FUNCTIONS
function getItems() {
  return JSON.parse(localStorage.getItem("todo")) || [];
}

function saveItems(items) {
  localStorage.setItem("todo", JSON.stringify(items));
}

function renderItems(items) {
  todoItems.innerHTML = "";
  items.forEach(addItem);
  toggleListVisibility(items.length);
}

function addItem(todo) {
  const li = document.createElement("li");
  li.className = "list-group-item";
  li.innerHTML = `${todo} <button class="btn btn-dark btn-sm float-right">Delete</button>`;
  todoItems.appendChild(li);
  const items = getItems();
  if (!items.includes(todo)) {
    items.push(todo);
    saveItems(items);
  }
  toggleListVisibility(items.length);
}

function removeItem(li) {
  const text = li.firstChild.textContent.trim();
  const items = getItems().filter(item => item !== text);
  saveItems(items);
  li.remove();
  toggleListVisibility(items.length);
}

function toggleListVisibility(count) {
  todoItems.parentElement.style.display = count ? "block" : "none";
}
