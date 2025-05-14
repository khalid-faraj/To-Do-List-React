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
    case 'deleted': {
      const updatedToDos = currentTodos.filter((t) => {
        if (t.id == action.payload.id) {
          return false;
        }
        return true;
      });
      localStorage.setItem('todos', JSON.stringify(updatedToDos));
      return updatedToDos;
    }
    case 'edited': {
      const edited_ToDo = currentTodos.map((t) => {
        if (t.id == action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            details: action.payload.details,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem('todos', JSON.stringify(edited_ToDo));
      return edited_ToDo;
    }
    case 'get': {
      const storageToDos = JSON.parse(localStorage.getItem('todos')) ?? [];
      return storageToDos;
    }
    case 'toggeledCompleted': {
      const updatedToDos = currentTodos.map((t) => {
        if (t.id == action.payload.id) {
          t.isDone = !t.isDone;
        }
        return t;
      });
      localStorage.setItem('todos', JSON.stringify(updatedToDos));
      return updatedToDos;
    }
    default: {
      throw Error('UnKnow Action' + action.type);
    }
  }
}
