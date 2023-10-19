// Definición de acciones
export const SET_TODOS = 'SET_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';

// Estado inicial
export const initialState = {
  todos: []
};

// Función reductora
export default function reducerTodo(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          action.todos
        ]
      }
    case SET_TODOS:
      return {
        ...state,
        todos: action.todos
      }
    case DELETE_TODO:
      return {
        ...state,
        todos: [ state.todos.filter(x => x.id !== action.id) ]
      }
    default:
      return state;
  }
}

// Creadores de acciones
export const setTodos = todos => ({
  type: SET_TODOS,
  todos
});
export const deleteTodo= id => ({
  type: DELETE_TODO,
  id
});
export const addTodo = todos => ({
  type: ADD_TODO,
  todos
});