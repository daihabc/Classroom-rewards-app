import star from "./star.png";
import tick from "./tick.png";
import { fetchUpdateTodo } from "./services";

function TodoItem({
  todo,
  todos,
  setTodos,
  setLoggedIn,
  setError,
  updatePoints,
}) {
  function addAbilitytoComplete(id, newCompletionCount) {
    fetchUpdateTodo(id, { done: true, completionCount: newCompletionCount })
      .then((todo) => {
        setTodos({
          ...todos,
          [id]: todo,
        });
      })
      .catch((err) => {
        if (err.error === "auth-missing") {
          setLoggedIn(false);
        }
        setError(err.error);
      });
  }

  const classText = `todo ${todo.done ? "todo--done" : "todo--unfinished"}`;
  const buttonText = `${
    todo.done && todo.canRepeat ? "complete again" : "complete"
    }`;
  
  return (
    <div className={classText}>
      <div className="todo__task__container">
        <img className="todo__star" src={star} alt="star"></img>
        <img className="todo__tick" src={tick} alt="tick"></img>
        <span>{todo.task}: </span>
        {todo.completionCount > 0 && (
          <span className="todo__completionCount">
            {" "}
            {todo.completionCount} completion(s)
          </span>
        )}
      </div>
      <div className="todo__point__containter">
        <span className="todo__point"> {todo.point} points </span>
        <span className="todo__repeat">
          {" "}
          {todo.canRepeat ? "Repeatable" : ""}{" "}
        </span>
      </div>
      <div className="todo__description"> {todo.description} </div>
      <button
        type="button"
        className="todo__complete"
        disabled={todo.done && !todo.canRepeat}
        onClick={() => {
          addAbilitytoComplete(todo.id, todo.completionCount + 1);
          if (!todo.done || todo.canRepeat) {
            updatePoints(todo.point);
          }
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default TodoItem;
