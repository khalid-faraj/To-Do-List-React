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
import { useState } from 'react';
import { ToDosContext } from '../Contexts/ToDosContext';
import { useContext } from 'react';
export default function ToDoList() {
  const { todos, setTodos } = useContext(ToDosContext);
  const value = useContext(ToDosContext);
  const todosJsx = todos.map((td) => {
    return <ToDo key={td.id} todo={td} />;
  });
  const [titleInput, setTitleInput] = useState('');

  function handelAddClick() {
    const newTask = {
      id: Guid(),
      title: titleInput,
      details: '',
      isDone: false,
    };
    setTodos([...todos, newTask]);
    setTitleInput('');
  }
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275, borderRadius: '12px' }}>
          <CardContent>
            <Typography variant="h2" component="h2">
              مهامي
            </Typography>
            <Divider />
            <ToggleButtonGroup
              exclusive
              aria-label="text alignment"
              style={{ direction: 'ltr', marginTop: '30px' }}
            >
              <ToggleButton value="right">غير منجز</ToggleButton>
              <ToggleButton value="center">منجز</ToggleButton>
              <ToggleButton value="left">الكل</ToggleButton>
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
