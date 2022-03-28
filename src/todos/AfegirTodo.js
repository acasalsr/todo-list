import { useRef } from "react";
import { endPoint } from "./App";

export function AfegirTodo({ onTodoAdded }) {
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
export function TodoItem({ todo, onUpdated }) {
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
