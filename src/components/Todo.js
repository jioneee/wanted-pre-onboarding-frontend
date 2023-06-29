import styled from 'styled-components';

import { useState, useEffect } from 'react';
import todosApi from '../api/todos';


const Header = styled.h1`

`

const Todo = () => {
  const accessToken = localStorage.getItem('accessToken');
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showInput, setShowInput] = useState(true);



  const handleAddTodo = async () => {

    try {
      const newTodoItem = await todosApi.addTodo(accessToken,newTodo)
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
      
    } catch (error) {


    }
  };

  const handleGetTodo = async () => {

    try {
      const data = await todosApi.getTodos(accessToken)
      setTodos(data)
  
    } catch (error) {

    }
  }
  useEffect(() => {
    handleGetTodo();
  }, []);


  const handleChangeTodo = (e) => {
    setNewTodo(e.target.value);
  };

  const handleModifyTodo = async (id, modifiedTodo, isCompleted) => {
    try {
      const modifiedTodoItem = await todosApi.modifyTodo(accessToken,id,modifiedTodo)
      const updatedTodos = todos.map((todo) =>
        todo.id === modifiedTodoItem.id ? modifiedTodoItem : todo
      );
      setTodos(updatedTodos);

    } catch (error) {

    }
  };

  const handleEditTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    setNewTodo(todo.todo);
    setEditingId(id);
  };

  const handleSubmitTodo = (id, modifiedTodo) => {
    handleModifyTodo(id, modifiedTodo);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setNewTodo('');
    setEditingId(null);
   
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todosApi.deleteTodo(accessToken,id)
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
   
    }
  };


  return (
    <>
      <Header>Todo</Header>

      {showInput && (
        <>
          <input
            data-testid="new-todo-input"
            value={newTodo}
            onChange={handleChangeTodo}
          />
          <button data-testid="new-todo-add-button" onClick={handleAddTodo}>
            추가
          </button>
        </>
      )}
      {todos.map((todo) => (
        <li key={todo.id}>
          {editingId === todo.id ? (
            <>
              <input
                data-testid="modify-input"
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />
              <button
                data-testid="submit-button"
                onClick={() => handleSubmitTodo(todo.id, newTodo)}
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
                <input type="checkbox" value={todo.isCompleted} />
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
              >
                삭제
              </button>
            </>
          )}
        </li>
      ))}
    </>
  );
};

export default Todo;

// import styled from 'styled-components';

// import axios from 'axios';
// import { useState, useEffect } from 'react';

// const Header = styled.h1`

// `

// const Todo = () => {
//   const url = 'https://www.pre-onboarding-selection-task.shop'; 
//   const accessToken = localStorage.getItem('accessToken');
//   const [newTodo, setNewTodo] = useState('');
//   const [todos, setTodos] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [showInput, setShowInput] = useState(true);



//   const handleAddTodo = async () => {

//     try {

//       const headers = {
//         Authorization: `Bearer ${accessToken}`,
//         'Content-Type': 'application/json',
//       };
//       const data = {
//         todo: newTodo,
//       };

//       const response = await axios.post(`${url}/todos`, data, { headers });
  
//       const newTodoItem = response.data;
//       setTodos([...todos, newTodoItem]);

//       setNewTodo('');
//     } catch (error) {


//     }
//   };

//   const handleGetTodo = async () => {

//     try {

//       const headers = {
//         Authorization: `Bearer ${accessToken}`,
//         'Content-Type': 'application/json',
//       };

//       const response = await axios.get(`${url}/todos`, { headers });
//       setTodos(response.data)
  
 
//     } catch (error) {

//     }
//   }
//   useEffect(() => {
//     handleGetTodo();
//   }, [accessToken]);


//   const handleChangeTodo = (e) => {
//     setNewTodo(e.target.value);
//   };

//   const handleModifyTodo = async (id, modifiedTodo, isCompleted) => {
//     try {
//       const headers = {
//         Authorization: `Bearer ${accessToken}`,
//         'Content-Type': 'application/json',
//       };
//       const data = {
//         todo: modifiedTodo,
//         isCompleted: false,
//       };

//       const response = await axios.put(`${url}/todos/${id}`, data, { headers });
//       console.log('Response:', response.data);

//       const modifiedTodoItem = response.data;
//       const updatedTodos = todos.map((todo) =>
//         todo.id === modifiedTodoItem.id ? modifiedTodoItem : todo
//       );
//       setTodos(updatedTodos);
//     } catch (error) {
//       console.log('Error:', error.response.data);

//     }
//   };

//   const handleEditTodo = (id) => {
//     const todo = todos.find((todo) => todo.id === id);
//     setNewTodo(todo.todo);
//     setEditingId(id);
//   };

//   const handleSubmitTodo = (id, modifiedTodo) => {
//     handleModifyTodo(id, modifiedTodo);
//     setEditingId(null);
//   };

//   const handleCancelEdit = () => {
//     setNewTodo('');
//     setEditingId(null);
   
//   };

//   const handleDeleteTodo = async (id) => {
//     try {
//       const headers = {
//         Authorization: `Bearer ${accessToken}`,
//       };

//       await axios.delete(`${url}/todos/${id}`, { headers });
 

//       const updatedTodos = todos.filter((todo) => todo.id !== id);
//       setTodos(updatedTodos);
//     } catch (error) {
   
//     }
//   };


//   return (
//     <>
//       <Header>Todo</Header>

//       {showInput && (
//         <>
//           <input
//             data-testid="new-todo-input"
//             value={newTodo}
//             onChange={handleChangeTodo}
//           />
//           <button data-testid="new-todo-add-button" onClick={handleAddTodo}>
//             추가
//           </button>
//         </>
//       )}
//       {todos.map((todo) => (
//         <li key={todo.id}>
//           {editingId === todo.id ? (
//             <>
//               <input
//                 data-testid="modify-input"
//                 type="text"
//                 value={newTodo}
//                 onChange={(e) => setNewTodo(e.target.value)}
//               />
//               <button
//                 data-testid="submit-button"
//                 onClick={() => handleSubmitTodo(todo.id, newTodo)}
//               >
//                 제출
//               </button>
//               <button data-testid="cancel-button" onClick={handleCancelEdit}>
//                 취소
//               </button>
//             </>
//           ) : (
//             <>
//               <label>
//                 <input type="checkbox" value={todo.isCompleted} />
//                 <span>{todo.todo}</span>
//               </label>
//               <button
//                 data-testid="modify-button"
//                 onClick={() => handleEditTodo(todo.id)}
//               >
//                 수정
//               </button>
//               <button
//                 data-testid="delete-button"
//                 onClick={() => handleDeleteTodo(todo.id)}
//               >
//                 삭제
//               </button>
//             </>
//           )}
//         </li>
//       ))}
//     </>
//   );
// };

// export default Todo;