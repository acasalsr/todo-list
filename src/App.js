import { useEffect, useState } from "react";
import { TodoItem, AfegirTodo } from "./todos/AfegirTodo";
import "./App.css";

export const endPoint = "https://tc-todo-2022.herokuapp.com/todos";

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
