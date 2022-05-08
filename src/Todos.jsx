import { useState, useEffect } from "react";
import { fetchTodos } from "./services";
import TodoItem from "./TodoItem";

function Todos({ updatePoints, setLoggedIn, setError }) {
  const [todos, setTodos] = useState({});

  useEffect(() => {
    fetchTodos()
      .then((rawtodo) => setTodos(rawtodo))
      .catch((err) => {
        if (err.error === "auth-missing") {
          setLoggedIn(false);
        }
        setError(err.error);
      });
  }, [setTodos]);

  return (
    <div className="todos">
      <div className="todo__box">
        <div className="todo__list">
          {Object.values(todos).map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              todos={todos}
              setTodos={setTodos}
              setError={setError}
              updatePoints={updatePoints}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Todos;
