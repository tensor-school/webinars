const $todoList = document.querySelector('.mainContent__list') as HTMLDivElement;
const $form = document.querySelector('.todo-add-form') as HTMLFormElement;
const $formInput = $form.querySelector('.mainContent__input') as HTMLInputElement;
const $searchInput = document.querySelector('.header__input') as HTMLInputElement;

type Todo = {
    id: number;
    text: string;
    completed?: boolean;
}

const deleteTodoFromUI = (element: HTMLDivElement) => {
    element.closest('.mainContent__item')?.remove();
}

$todoList.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLDivElement;
    if (target.classList.contains('mainContent__itemAction_type_delete')) {
        deleteTodo(Number(target.dataset.id) || 0);
    }
    if (target.classList.contains('mainContent__itemAction_type_completed')) {
        toggleTodo(Number(target.dataset.id) || 0, target.dataset.completed !== '1');
    }
});

function addTodoToUI(todo: Todo) {
    const template = `
    <div class="mainContent__item" tabindex="0">
        <span class="todo__text ${todo.completed ? 'todo__text_completed' : ''}">${todo.text}</span>
        <div class="mainContent__itemActions">
            <button type="button" class="mainContent__itemAction mainContent__itemAction_type_completed" data-id="${todo.id}" data-completed="${todo.completed ? 1 : 0}">Complete</button>
            <button type="button" class="mainContent__itemAction mainContent__itemAction_type_delete" data-id="${todo.id}">Delete</button>
        </div>
    </div>
    `;

    $todoList.insertAdjacentHTML('beforeend', template);
}

async function addTodo(text: string) {
    const todo = {text};
    const response = await fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(todo)
    });
    const result = await response.json();
    addTodoToUI(result);
}

async function deleteTodo(id: number) {
    const response = await fetch('http://localhost:3000/todos/' + id, {
        method: 'DELETE'
    });
    const element = $todoList.querySelector(`[data-id="${id}"]`) as HTMLDivElement;
    if (element) {
        deleteTodoFromUI(element);
    }
}

async function toggleTodo(id: number, completed: boolean) {
    const response = await fetch('http://localhost:3000/todos/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({completed})
    });
    // TODO Обновить элемент в списке
}

$form.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();

    const value = $formInput.value;
    addTodo(value);
    $form.reset();
});

$searchInput.addEventListener('input', (event: Event) => {
    const searchValue = (event.target as HTMLInputElement).value;

    if (searchValue.length < 2) {
        [...$todoList.querySelectorAll('.hide')].forEach(($todo) => $todo.classList.remove('hide'));
        return;
    }

    [...$todoList.querySelectorAll('.mainContent__item')].forEach(($todo) => {
        const todoText = $todo.querySelector('.todo__text')?.textContent;

        if (todoText?.includes(searchValue)) {
            $todo.classList.remove('hide');
        } else {
            $todo.classList.add('hide');
        }
    });
});

async function fetchTodos() {
    const response = await fetch('http://localhost:3000/todos');
    const data = await response.json();
    return data;
}

async function main() {
    const todos = await fetchTodos();
    todos.forEach((todo: Todo) => addTodoToUI(todo));
}

main();
