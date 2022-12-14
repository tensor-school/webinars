import { useEffect, useState } from "react";
import { addTodo, deleteTodo, fetchTodos } from "../../server/api";
import { ITodo } from "../../types/todo";
import { AddTodoForm } from "../AddTodoForm/AddTodoForm"
import { Todos } from "../Todos/Todos"

export const Main = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);

    const handleSubmit = (text: string) => {
        addTodo(text).then((result) => {
            setTodos([...todos, result]);
        });
    }

    const handleDelete = (id: number) => {
        deleteTodo(id).then(() => {
            setTodos(todos.filter(todo => todo.id !== id));
        });
    }

    useEffect(() => {
        fetchTodos().then((result) => setTodos(result));
    }, []);

    return (
        <main className="content">
            <aside className="accordion">
                <div className="accordion__tag">Work</div>
                <div className="accordion__tag">Home</div>
                <div className="accordion__tag">Reading list</div>
            </aside>
            <div className="mainContent">
                <AddTodoForm onSubmit={handleSubmit} />
                <Todos todos={todos} onDelete={handleDelete} />
            </div>
        </main>
    );
}