import logo from './logo.svg';
import './App.css';
import ToDoList from './Components/ToDoList';
function App() {
  return (
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
  );
}

export default App;
