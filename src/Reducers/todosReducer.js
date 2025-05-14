import { v4 as Guid } from 'uuid';

export default function reducer(currentTodos, action) {
  switch (action.type) {
    case 'added': {
      const newTask = {
        id: Guid(),
        title: action.payload.titleInput,
        details: '',
        isDone: false,
      };
      const updatedtodos = [...currentTodos, newTask];
      localStorage.setItem('todos', JSON.stringify(updatedtodos));
      return updatedtodos;
    }
    default: {
      throw Error('UnKnow Action' + action.type);
    }
  }
}
