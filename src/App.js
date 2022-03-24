import { useEffect, useRef, useState } from "react";
import "./App.css";

const endPoint = "https://tc-todo-2022.herokuapp.com/todos";

function AfegirTodo({ onTodoAdded }) {
  const titleRef = useRef();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        titleRef.current.value = "";
        fetch(endPoint, {
          method: "POST",
          body: JSON.stringify({ title }),
        })
          .then((response) => response.json())
          .then((json) => onTodoAdded(json));
      }}
    >
      <input ref={titleRef} />
      <input type="Submit" value="Afegir" />
    </form>
  );
}

function TodoItem({ todo, onUpdated }) {
  return (
    <li
      className={todo.completed ? "completed" : "pending"}
      onClick={() => {
        fetch(`${endPoint}/${todo.id}`, {
          method: "POST",
          body: JSON.stringify({ completed: !todo.completed }),
        })
          .then((response) => response.json())
          .then((json) => onUpdated(json));
      }}
    >
      {todo.title}
    </li>
  );
}
export default function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch(endPoint)
      .then((response) => response.json())
      .then(setTodos);
  }, []);

  return (
    <>
      <div className="App"></div>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdated={(updateTodo) =>
              setTodos(
                todos.map((currentTodo) =>
                  currentTodo.id === updateTodo.id ? updateTodo : currentTodo
                )
              )
            }
          />
        ))}
      </ul>
      <AfegirTodo onTodoAdded={(todo) => setTodos([...todos, todo])} />
    </>
  );
}
