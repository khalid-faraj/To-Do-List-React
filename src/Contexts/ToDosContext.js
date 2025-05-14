import { createContext, useContext, useReducer } from 'react';
import todosReducer from '../Reducers/todosReducer';

const ToDosContext = createContext([]);
const ToDosProvider = ({ children }) => {
  const [todos, toDoDispach] = useReducer(todosReducer, []);
  return (
    <ToDosContext.Provider value={{ todos: todos, dispach: toDoDispach }}>
      {children}
    </ToDosContext.Provider>
  );
};

export const useToDos = () => {
  return useContext(ToDosContext);
};
export default ToDosProvider;
