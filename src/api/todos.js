import axios from 'axios';

const url = 'https://www.pre-onboarding-selection-task.shop';

const todosApi = {
  getTodos: async (accessToken) => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.get(`${url}/todos`, { headers });
      return response.data;
    } catch (error) {
 console.log('geterror',error)
    }
  },

  addTodo: async (accessToken, newTodo) => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };

      const data = {
        todo: newTodo,
      };

      const response = await axios.post(`${url}/todos`, data, { headers });
      return response.data;
    } catch (error) {
 
    }
  },

  modifyTodo: async (accessToken, id, modifiedTodo) => {
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
      return response.data;
    } catch (error) {
     
    }
  },

  deleteTodo: async (accessToken, id) => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      await axios.delete(`${url}/todos/${id}`, { headers });
    } catch (error) {
     
    }
  },
};

export default todosApi;