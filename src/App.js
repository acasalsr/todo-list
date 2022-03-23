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

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch(endPoint)
      .then((response) => response.json())
      .then((json) => setTodos(json));
  }, []);

  return (
    <>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.completed}>{todo.title}</li>
        ))}
      </ul>
      <AfegirTodo onTodoAdded={(todo) => setTodos([...todos, todo])} />
    </>
  );
}

export default App;
