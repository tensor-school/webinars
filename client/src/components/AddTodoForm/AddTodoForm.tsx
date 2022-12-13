import { addTodo } from "../../server/api";

interface IAddTodoForm {
    onSubmit: (value: string) => void;
}

export const AddTodoForm = (props: IAddTodoForm) => {
    const {onSubmit} = props;
    const handleSubmit = (event: any) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const text = formData.get('text') as string || '';
        onSubmit(text);
    }
    return (
        <form className="todo-add-form" onSubmit={handleSubmit}>
            <input type="text" className="mainContent__input" placeholder="Add todo..." name="text" />
        </form>
    )
}