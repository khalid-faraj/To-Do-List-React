import logo from './logo.svg';
import './App.css';
import ToDoList from './Components/ToDoList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { typographyClasses } from '@mui/material';
import { ToDosContext } from './Contexts/ToDosContext';
import { v4 as Guid } from 'uuid';
import { useState } from 'react';
import ToDo from './Components/ToDo';
import MySnackBar from './Components/MySnackBar';
import { ToastContext } from './Contexts/ToastContext';

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
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  function showAndHideToast(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContext.Provider value={{ showAndHideToast }}>
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
          <MySnackBar open={open} message={message} />
          <ToDosContext.Provider value={{ todos, setTodos }}>
            <ToDoList />
          </ToDosContext.Provider>
        </div>
      </ToastContext.Provider>
    </ThemeProvider>
  );
}

export default App;
