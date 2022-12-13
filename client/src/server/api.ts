export async function addTodo(text: string) {
    const todo = {text};
    const response = await fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(todo)
    });
    return await response.json();
}

export async function fetchTodos() {
    const response = await fetch('http://localhost:3000/todos');
    const data = await response.json();
    return data;
}

export async function deleteTodo(id: number) {
    const response = await fetch('http://localhost:3000/todos/' + id, {
        method: 'DELETE'
    });
    return response.json();
}