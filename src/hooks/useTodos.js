import { useState } from "react";

function useTodos(initialTodos = []) {
  const [todoText, setTodoText] = useState("");
  const [todoList, setTodoList] = useState(initialTodos);

  const addTodo = () => {
    if (todoText.trim() === "") {
      alert("할 일을 입력하세요");
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: todoText
    };

    setTodoList((prevList) => [...prevList, newTodo]);
    setTodoText("");
  };

  const clearTodos = () => {
    setTodoList([]);
  };

  return {
    todoText,
    todoList,
    setTodoText,
    addTodo,
    clearTodos,

    inputProps: {
      value: todoText,
      onChange: (e) => setTodoText(e.target.value),
      onKeyDown: (e) => {
        if (e.key === "Enter") {
          addTodo();
        }
      }
    }
  };
}

export default useTodos;