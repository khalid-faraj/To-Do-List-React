import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToDo from './ToDo';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { v4 as Guid } from 'uuid';
import { useState, useContext, useEffect, useMemo } from 'react';
import { ToDosContext } from '../Contexts/ToDosContext';

export default function ToDoList() {
  const { todos, setTodos } = useContext(ToDosContext);
  const [titleInput, setTitleInput] = useState('');

  const [tasksCategory, setTasksCategory] = useState('all');

  const completedTasks = useMemo(() => {
    return todos.filter((t) => {
      return t.isDone;
    });
  }, [todos]);

  const notCompletedTasks = useMemo(() => {
    return todos.filter((t) => {
      return !t.isDone;
    });
  }, [todos]);

  let selectedTasksList = todos;

  if (tasksCategory == 'completed') {
    selectedTasksList = completedTasks;
  }

  if (tasksCategory == 'notCompleted') {
    selectedTasksList = notCompletedTasks;
  }

  const todosJsx = selectedTasksList.map((td) => {
    return <ToDo key={td.id} todo={td} />;
  });

  function changeDisplayedType(e) {
    setTasksCategory(e.target.value);
  }

  useEffect(() => {
    const storageToDos = JSON.parse(localStorage.getItem('todos')) ?? [];
    setTodos(storageToDos);
  }, []);

  function handelAddClick() {
    const newTask = {
      id: Guid(),
      title: titleInput,
      details: '',
      isDone: false,
    };
    const updatedtodos = [...todos, newTask];
    setTodos(updatedtodos);
    localStorage.setItem('todos', JSON.stringify(updatedtodos));
    setTitleInput('');
  }

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Card
          sx={{
            minWidth: 275,
            maxHeight: '80vh',
            overflow: 'scroll',
          }}
        >
          <CardContent>
            <Typography variant="h2" component="h2">
              مهامي
            </Typography>
            <Divider />
            <ToggleButtonGroup
              exclusive
              aria-label="text alignment"
              style={{ direction: 'ltr', marginTop: '30px' }}
              value={tasksCategory}
              onChange={changeDisplayedType}
            >
              <ToggleButton value="notCompleted">غير منجز</ToggleButton>
              <ToggleButton value="completed">منجز</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>
            {todosJsx}
          </CardContent>
          <Grid container spacing={1} sx={{ margin: '20px' }}>
            <Grid size={8}>
              <TextField
                id="outlined-basic"
                label="إضافة مهمة جديدة"
                variant="outlined"
                style={{ width: '100%' }}
                value={titleInput}
                onChange={(event) => {
                  setTitleInput(event.target.value);
                }}
              />
            </Grid>
            <Grid size={4}>
              <Button
                variant="contained"
                style={{
                  width: '100%',
                  height: '100%',
                }}
                onClick={handelAddClick}
                disabled={titleInput.length === 0}
              >
                إضافة
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </React.Fragment>
  );
}
