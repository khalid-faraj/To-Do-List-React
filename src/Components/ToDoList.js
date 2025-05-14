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
import ToDo from './ToDo';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { v4 as Guid } from 'uuid';
import { useState, useContext, useEffect, useMemo, useReducer } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContext } from '../Contexts/ToastContext';
import { useToast } from '../Contexts/ToastContext';
import todosReducer from '../Reducers/todosReducer';
import { type } from '@testing-library/user-event/dist/type';
import { useToDos } from '../Contexts/ToDosContext';
export default function ToDoList() {
  const { todos, dispach } = useToDos();
  const { showAndHideToast } = useToast();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [dialogToDo, setDialogToDo] = useState(null);
  const [tasksCategory, setTasksCategory] = useState('all');
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editedToDo, setEditedToDo] = useState({ ...dialogToDo });
  useEffect(() => {
    if (showEditDialog) {
      setEditedToDo({ ...dialogToDo });
    }
  }, [showEditDialog, dialogToDo]);

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

  function changeDisplayedType(e) {
    setTasksCategory(e.target.value);
  }

  useEffect(() => {
    dispach({ type: 'get' });
  }, []);

  function handelAddClick() {
    dispach({ type: 'added', payload: { titleInput } });
    setTitleInput('');
    showAndHideToast('تمت إضافة مهمة جديدة');
  }

  /********* Event Handler **********/
  function handleDeleteClose() {
    setShowDeleteDialog(false);
  }

  function showTheDeleteDialog(todo) {
    setDialogToDo(todo);
    setEditedToDo(todo);
    setShowDeleteDialog(true);
  }

  function handleDeleteConfirm() {
    dispach({ type: 'deleted', payload: dialogToDo });
    setShowDeleteDialog(false);
    showAndHideToast('تم المسح');
  }

  function showTheEditDialog(todo) {
    setDialogToDo(todo);
    setShowEditDialog(true);
  }
  function handleEditClose() {
    setShowEditDialog(false);
  }
  function handleEditConfirm() {
    dispach({ type: 'edited', payload: editedToDo });
    setShowEditDialog(false);
    showAndHideToast('تم التعديل');
  }
  const todosJsx = selectedTasksList.map((td) => {
    return (
      <ToDo
        key={td.id}
        todo={td}
        showDelete={showTheDeleteDialog}
        showEdit={showTheEditDialog}
      />
    );
  });
  return (
    <>
      {/*      Delete Dialog      */}
      <Dialog
        open={showDeleteDialog}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ direction: 'rtl' }}
      >
        <DialogTitle id="alert-dialog-title">
          {'هل أنت متأكد من حذف المهمة؟'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            حذف المهمة يعني أنك لن تستطيع الوصول إليها مرة أخرى عزيزي المستخدم.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>إغلاق</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            مسح
          </Button>
        </DialogActions>
      </Dialog>
      {/* ---- Delete Dialog ---- */}
      {/*      Edit Dialog      */}
      <Dialog
        open={showEditDialog}
        onClose={handleEditClose}
        sx={{ direction: 'rtl' }}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleEditClose();
            },
          },
        }}
      >
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="taskTitle"
            name="taskTitle"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={editedToDo.title}
            onChange={(e) => {
              setEditedToDo({ ...editedToDo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="taskDetails"
            name="taskDetails"
            label="تفاصيل المهمة"
            fullWidth
            variant="standard"
            value={editedToDo.details}
            onChange={(e) => {
              setEditedToDo({ ...editedToDo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>إغلاق</Button>
          <Button type="submit" onClick={handleEditConfirm}>
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
      {/* ---- Edit Dialog ---- */}
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
    </>
  );
}
