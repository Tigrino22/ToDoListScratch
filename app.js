// app.js (ou script principal)

import { TodoList } from "./modules/TodoList.js";

const todoBox = document.querySelector("#todo-box");
const todoList = new TodoList(todoBox);


const inputTache = document.querySelector("#input-tache");
const buttonTache = document.querySelector("#button-tache");

buttonTache.addEventListener("click", () => {
    const inputText = inputTache.value.trim();
    if (inputText !== "") {
        todoList.addTodo(inputText);
        inputTache.value = "";
    }
});

todoBox.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-danger")) {
        const todoId = event.target.getAttribute('data-id');
        todoList.removeTodo(todoId);
    }
});

const radioFilters = document.querySelectorAll('input[name="filter"]');
radioFilters.forEach(radio => {
    radio.addEventListener('change', () => {
        todoList.filterTodos();
    });
});

