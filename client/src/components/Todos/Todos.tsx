import { ITodo } from "../../types/todo";
import { Todo } from "./Todo";

interface ITodos {
    todos: ITodo[];
    onDelete: (id: number) => void;
}

export const Todos = (props: ITodos) => {
    const {todos, onDelete} = props;
    return (
         <div className="mainContent__list">
              {todos.map((todo) => <Todo todo={todo} onDelete={onDelete} key={todo.id} />)}
        </div>
    )
};