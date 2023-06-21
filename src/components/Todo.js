import axios from 'axios';
import { useState, useEffect } from 'react';

const Todo = () => {
  const url = 'https://www.pre-onboarding-selection-task.shop'; 
  const accessToken = localStorage.getItem('accessToken');
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);


  const handleAddTodo = async () => {

    try {

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };
      const data = {
        todo: newTodo,
      };

      const response = await axios.post(`${url}/todos`, data, { headers });
      console.log('Response:', response.data);
      const newTodoItem = response.data;
      setTodos([...todos, newTodoItem]);

      setNewTodo('');
    } catch (error) {
      console.log('Error:', error.response.data);

    }
  };

  const handleGetTodo = async () => {

    try {

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.get(`${url}/todos`, { headers });
      setTodos(response.data)
      console.log('Response:', response.data);
 
    } catch (error) {
      console.log('Error:', error.response.data);

    }
  }
  useEffect(() => {
    handleGetTodo();
  }, [accessToken]);


  const handleChangeTodo = (e) => {
    setNewTodo(e.target.value);
  };

  const handleModifyTodo = async (id, modifiedTodo) => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };
      const data = {
        todo: modifiedTodo,
        isCompleted: false,
      };

      const response = await axios.put(`${url}/todos/${id}`, data, { headers });
      console.log('Response:', response.data);

      const modifiedTodoItem = response.data;
      const updatedTodos = todos.map((todo) =>
        todo.id === modifiedTodoItem.id ? modifiedTodoItem : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.log('Error:', error.response.data);

    }
  };

  const handleEditTodo = (id) => {
    setEditingId(id);
  };

  const handleSubmitTodo = (id, modifiedTodo) => {
    handleModifyTodo(id, modifiedTodo);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDeleteTodo = async (id) => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      await axios.delete(`${url}/todos/${id}`, { headers });
 

      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
   
    }
  };

  return (
    <>
      <input
     
        value={newTodo}
        onChange={handleChangeTodo}
      />
      <button  onClick={handleAddTodo}>
        추가
      </button>
      {todos.map((todo) => (
        <li key={todo.id}>
          {editingId === todo.id ? (
            <>
              <input
                type="text"
                value={todo.todo}
                onChange={(e) => handleModifyTodo(todo.id, e.target.value)}
              />
              <button
                data-testid="submit-button"
                onClick={() => handleSubmitTodo(todo.id, todo.todo)}
              >
                제출
              </button>
              <button data-testid="cancel-button" onClick={handleCancelEdit}>
                취소
              </button>
            </>
          ) : (
            <>
              <label>
                <input type="checkbox" />
                <span>{todo.todo}</span>
              </label>
              <button
                data-testid="modify-button"
                onClick={() => handleEditTodo(todo.id)}
              >
                수정
              </button>
              <button 
              data-testid="delete-button"
              onClick={() => handleDeleteTodo(todo.id)}
              >삭제
              </button>
            </>
          )}
        </li>
      ))}
    </>
  );
};

export default Todo;