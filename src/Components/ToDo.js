import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import IconButton from '@mui/material/IconButton';
import '../Style/ToDo.css';
import { useContext, useState, useEffect } from 'react';
import { ToDosContext } from '../Contexts/ToDosContext';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function ToDo({ todo, showDelete, showEdit }) {
  const { todos, setTodos } = useContext(ToDosContext);

  /********* States **********/

  /********* States **********/

  /********* Event Handler **********/

  function handelCheckClick() {
    const updatedToDos = todos.map((t) => {
      if (t.id == todo.id) {
        t.isDone = !t.isDone;
      }
      return t;
    });
    setTodos(updatedToDos);
    localStorage.setItem('todos', JSON.stringify(updatedToDos));
  }

  function handleEditClick() {
    showEdit(todo);
  }

  function handleDeleteClick() {
    showDelete(todo);
  }

  /********* Event Handler **********/

  return (
    <>
      {/*      Card      */}
      <Card
        className="card"
        sx={{
          minWidth: 275,
          color: 'white',
          backgroundColor: '#283593',
          marginTop: '20px',
        }}
      >
        <CardContent>
          <Grid container spacing={1}>
            <Grid size={8}>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  textAlign: 'right',
                  textDecoration: todo.isDone ? 'line-through' : 'none',
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  textAlign: 'right',
                  textDecoration: todo.isDone ? 'line-through' : 'none',
                }}
              >
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/*--------------------------------------*/}
              <IconButton
                className="iconButton"
                aria-label="complete"
                style={{
                  color: todo.isDone ? 'white' : '#8bc34a',
                  background: todo.isDone ? '#8bc34a' : 'white',
                  border: 'solid #8bc34a 3px',
                }}
                onClick={() => {
                  handelCheckClick();
                }}
              >
                <CheckIcon />
              </IconButton>
              {/*--------------------------------------*/}
              <IconButton
                className="iconButton"
                aria-label="edit"
                style={{
                  color: '#1769aa',
                  background: 'white',
                  border: 'solid #1769aa 3px',
                }}
                onClick={handleEditClick}
              >
                <EditOutlinedIcon />
              </IconButton>

              {/*--------------------------------------*/}
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: '#b23c17',
                  background: 'white',
                  border: 'solid #b23c17 3px',
                }}
                onClick={handleDeleteClick}
              >
                <DeleteIcon />
              </IconButton>
              {/*--------------------------------------*/}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* ---- Card ---- */}
    </>
  );
}
