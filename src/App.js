import './App.css';
import ToDoList from './Components/ToDoList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { v4 as Guid } from 'uuid';
import { useState } from 'react';
import { ToastProvider } from './Contexts/ToastContext';
import ToDosProvider from './Contexts/ToDosContext';

const theme = createTheme({
  typography: {
    fontFamily: ['Kufam'],
  },
});

const stateToDos = [
  {
    id: Guid(),
    title: 'عنوان المهمة',
    details: 'هنا سيكتب تفاصيل المهمة',
    isDone: false,
  },
  {
    id: Guid(),
    title: 'عنوان المهمة',
    details: 'هنا سيكتب تفاصيل المهمة',
    isDone: false,
  },
];

function App() {
  const [todos, setTodos] = useState(stateToDos);

  return (
    <ThemeProvider theme={theme}>
      <ToDosProvider>
        <ToastProvider>
          <div
            className="App"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              backgroundColor: '#191b1f',
              direction: 'rtl',
            }}
          >
            <ToDoList />
          </div>
        </ToastProvider>
      </ToDosProvider>
    </ThemeProvider>
  );
}

export default App;
