// Definición de acciones
export const SET_CATEGORIAS = 'SET_CATEGORIAS';
export const ADD_CATEGORIA = 'ADD_CATEGORIA';
export const DELETE_CATEGORIA = 'DELETE_CATEGORIA';

// Estado inicial
export const initialState = {
  categorias: []
};

// Función reductora
export default function reducerCategoria(state = initialState, action) {
  switch (action.type) {
    case ADD_CATEGORIA:
      return {
        ...state,
        categorias: [
          ...state.categorias,
          action.categorias
        ]
      }
    case SET_CATEGORIAS:
      return {
        ...state,
        categorias: action.categorias
      }
    case DELETE_CATEGORIA:
      return {
        ...state,
        categorias: [ state.categorias.filter(x => x.id !== action.id) ]
      }
    default:
      return state;
  }
}

// Creadores de acciones
export const setCategorias = categorias => ({
  type: SET_CATEGORIAS,
  categorias
});
export const deleteCategoria= id => ({
  type: DELETE_CATEGORIA,
  id
});
export const addCategoria = categorias => ({
  type: ADD_CATEGORIA,
  categorias
});