import { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import axios from "axios";

const Title = styled.h2`
  color: black;
  display: inline;
  margin-right: 1rem;
`;

const Description = styled.h3`
  display: inline-block;
  margin-right: 1rem;
`;

const Input = styled.div`
  display: flex;
  gap: 1rem;
`;

function App() {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  // fetch all todos from server
  useEffect(() => {
    async function fetchData() {
      const todosData = await axios.get("http://localhost:3000/todos");
      setTodos(todosData.data);
    }
    fetchData();
  }, []);

  const handleTitleChange = (e) => {
    e.preventDefault();
    setTodoTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    e.preventDefault();
    setTodoDescription(e.target.value);
  };

  const handleSubmit = async () => {
    await axios.post("http://localhost:3000/todos", {
      title: todoTitle,
      description: todoDescription,
    });

    setTodoTitle("");
    setTodoDescription("");

    const todosData = await axios.get("http://localhost:3000/todos");
    setTodos(todosData.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/todos/${id}`);
    const todosData = await axios.get("http://localhost:3000/todos");
    setTodos(todosData.data);
  };

  return (
    <>
      <div>
        <h1>Easy Todo App</h1>
        {todos.map((todo, index) => (
          <Todo
            key={todo.id}
            title={todo.title}
            index={index + 1}
            description={todo.description}
            handleDelete={() => handleDelete(todo.id)}
          />
        ))}
        <Input>
          <label children="Tile" />
          <input
            type="text"
            id="title"
            name="Title"
            value={todoTitle}
            onChange={handleTitleChange}
          />
          <label children="Description" />
          <input
            type="text"
            id="description"
            name="Description"
            value={todoDescription}
            onChange={handleDescriptionChange}
          />
          <button onClick={handleSubmit}>+ Create new todo</button>
        </Input>
      </div>
    </>
  );
}

function Todo(props) {
  // Add a delete button here so user can delete a TODO.
  return (
    <div>
      <Title>
        {props.index}. {props.title}
      </Title>

      <Description>{props.description}</Description>

      <button onClick={props.handleDelete}>Delete</button>
    </div>
  );
}

export default App;
