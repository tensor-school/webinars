const $todoList = document.querySelector('.mainContent__list');
const $form = document.querySelector('.todo-add-form');
const $formInput = $form.querySelector('.mainContent__input')
const $searchInput = document.querySelector('.header__input');

const deleteTodo = (element) => {
    element.closest('.mainContent__item').remove();
}

$todoList.addEventListener('click', (event) => {
    if (event.target.classList.contains('mainContent__itemAction_type_delete')) {
        return deleteTodo(event.target);
    }
});

$form.addEventListener('submit', (event) => {
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

$searchInput.addEventListener('input', (event) => {
    const searchValue = event.target.value;

    if (searchValue.length < 2) {
        [...$todoList.querySelectorAll('.hide')].forEach(($todo) => $todo.classList.remove('hide'));
        return;
    }

    [...$todoList.querySelectorAll('.mainContent__item')].forEach(($todo) => {
        const todoText = $todo.querySelector('.todo__text').textContent;

        if (todoText.includes(searchValue)) {
            $todo.classList.remove('hide');
        } else {
            $todo.classList.add('hide');
        }
    });
});