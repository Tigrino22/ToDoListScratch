// TodoList.js

import { TodoItem } from "./TodoItem.js";

export class TodoList {
    todos = {};
    element;

    constructor(element) {
        this.element = element;
        this.loadTodos();
    }

    addTodo(todo) {
        try {
            const item = new TodoItem(this);
            const todoElement = item.createTodo(todo);

            this.element.appendChild(todoElement);
            this.todos[item.id] = todoElement;
            this.saveTodos();
        } catch (e) {
            console.error(e);
        }
    }

    removeTodo(id) {
        if (this.todos[id]) {
            this.todos[id].remove();
            delete this.todos[id];
            this.saveTodos();
        }
    }

    saveTodos() {
        const todos = Object.keys(this.todos).map(id => ({
            id: id,
            text: this.todos[id].querySelector('label').innerText,
            completed: this.todos[id].querySelector('input[type="checkbox"]').checked
        }));
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    loadTodos() {
        const savedItems = localStorage.getItem('todos');
        if (savedItems) {
            const todos = JSON.parse(savedItems);
            todos.forEach(todo => {
                const item = new TodoItem(this);
                const todoElement = item.createTodo(todo.text);
                if (todo.completed) {
                    todoElement.querySelector("input[type='checkbox']").checked = true;
                }
                this.element.appendChild(todoElement);
                this.todos[item.id] = todoElement;
            });
        }
    }

    filterTodos() {
        const filterValue = document.querySelector('input[name="filter"]:checked').value;
        Object.values(this.todos).forEach(todo => {
            const checkbox = todo.querySelector('input[type="checkbox"]');
            if (checkbox) {
                const isCompleted = checkbox.checked;
                switch (filterValue) {
                    case 'all':
                        todo.classList.remove('d-none');
                        break;
                    case 'todo':
                        if (isCompleted) {
                            todo.classList.add('d-none');
                        } else {
                            todo.classList.remove('d-none');
                        }
                        break;
                    case 'done':
                        if (isCompleted) {
                            todo.classList.remove('d-none');
                        } else {
                            todo.classList.add('d-none');
                        }
                        break;
                    default:
                        todo.classList.remove('d-none');
                }
            }
        });
    }
}
