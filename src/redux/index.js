import { combineReducers } from 'redux';
import reducerTodo  from './todo/index';
import reducerCategoria  from './categoria/index';

export const allReducers = combineReducers({
    todos: reducerTodo,
    categorias: reducerCategoria
});

export default allReducers;