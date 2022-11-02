const $todoList = document.querySelector('.mainContent__list') as HTMLDivElement;
const $form = document.querySelector('.todo-add-form') as HTMLFormElement;
const $formInput = $form.querySelector('.mainContent__input') as HTMLInputElement;
const $searchInput = document.querySelector('.header__input') as HTMLInputElement;


const deleteTodo = (element: HTMLDivElement) => {
    element.closest('.mainContent__item')?.remove();
}

$todoList.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLDivElement;
    if (target.classList.contains('mainContent__itemAction_type_delete')) {
        return deleteTodo(target);
    }
});

$form.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();

    const value = $formInput.value;
    const template = `
    <div class="mainContent__item" tabindex="0">
        <span class="todo__text">${value}</span>
        <div class="mainContent__itemActions">
            <button type="button" class="mainContent__itemAction">Complete</button>
            <button type="button" class="mainContent__itemAction mainContent__itemAction_type_delete">Delete</button>
        </div>
    </div>
    `;

    $todoList.insertAdjacentHTML('beforeend', template);
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