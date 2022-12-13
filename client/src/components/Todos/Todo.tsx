import { deleteTodo } from "../../server/api";
import { ITodo } from "../../types/todo"

interface ITodoProps {
    todo: ITodo;
    onDelete: (id: number) => void;
}

export const Todo = (props: ITodoProps) => {
    const {todo, onDelete} = props;
    const className = `todo__text ${todo.completed ? 'todo__text_completed' : ''}`;
    const handleDelete = () => {
         onDelete(todo.id);
    }
    return (
        <div className="mainContent__item" tabIndex={0}>
        <span className={className}>{todo.text}</span>
        <div className="mainContent__itemActions">
            <button type="button" className="mainContent__itemAction">Complete</button>
            <button type="button" className="mainContent__itemAction" onClick={handleDelete}>Delete</button>
        </div>
    </div>
    )
}