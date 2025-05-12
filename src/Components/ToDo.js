import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import IconButton from '@mui/material/IconButton';
import '../Style/ToDo.css';
import { useContext, useState } from 'react';
import { ToDosContext } from '../Contexts/ToDosContext';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function ToDo({ todo }) {
  const { todos, setTodos } = useContext(ToDosContext);

  /********* States **********/

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editedToDo, setEditedToDo] = useState({
    title: todo.title,
    details: todo.details,
  });

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
    setShowEditDialog(true);
  }

  function handleEditClose() {
    setShowEditDialog(false);
  }
  function handleEditConfirm() {
    const edited_ToDo = todos.map((t) => {
      if (t.id == todo.id) {
        return { ...t, title: editedToDo.title, details: editedToDo.details };
      } else {
        return t;
      }
    });
    setTodos(edited_ToDo);
    localStorage.setItem('todos', JSON.stringify(edited_ToDo));

    setShowEditDialog(false);
  }

  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }

  function handleDeleteClose() {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    const updatedToDos = todos.filter((t) => {
      if (t.id == todo.id) {
        return false;
      }
      return true;
    });
    setTodos(updatedToDos);
    localStorage.setItem('todos', JSON.stringify(updatedToDos));
  }

  /********* Event Handler **********/

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
