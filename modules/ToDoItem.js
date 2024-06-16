// TodoItem.js

export class TodoItem {
    #id;

    constructor(parent) {
        this.#id = self.crypto.randomUUID();
        this.parent = parent;
    }

    #createElement(type, className = null) {
        try {
            const element = document.createElement(type);
            if (className) {
                element.setAttribute("class", className);
            }
            return element;
        } catch (e) {
            console.error(e);
        }
    }

    createTodo(text) {
        const divItem = this.#createElement("div", "todo-item d-flex align-items-center justify-content-between");
        divItem.setAttribute("id", `${this.#id}`);

        const divInput = this.#createElement("div", "d-flex align-items-center");
        divItem.appendChild(divInput);

        const input = this.#createElement("input", "form-check-input me-3");
        input.setAttribute("type", "checkbox");
        input.setAttribute("id", `input-${this.#id}`);
        input.addEventListener("click", (e) => {
            this.toggleCheck(e.target);
        });

        const label = this.#createElement("label", "form-check-label");
        label.setAttribute("for", `input-${this.#id}`);
        label.innerText = text;

        divInput.appendChild(input);
        divInput.appendChild(label);

        const button = this.#createElement("button", "btn btn-sm btn-danger ms-2");
        button.setAttribute("type", "button");
        button.innerText = "Remove";
        button.setAttribute("data-id", this.#id);
        button.addEventListener("click", () => {
            divItem.remove();
            this.parent.removeTodo(this.#id);
        });

        divItem.appendChild(button);

        return divItem;
    }

    toggleCheck(input) {
        !input.checked;
        this.parent.saveTodos();
    }

    get id() {
        return this.#id;
    }
}
