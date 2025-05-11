import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import IconButton from '@mui/material/IconButton';
import '../Style/ToDo.css';

export default function ToDo() {
  return (
    <>
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
                sx={{ textAlign: 'right' }}
              >
                المهمة الأولى
              </Typography>
              <Typography
                variant="h6"
                component="h2"
                sx={{ textAlign: 'right' }}
              >
                تفاصيل المهمة الأولى
              </Typography>
            </Grid>
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                className="iconButton"
                aria-label="complete"
                style={{
                  color: '#8bc34a',
                  background: 'white',
                  border: 'solid #8bc34a 3px',
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                className="iconButton"
                aria-label="edit"
                style={{
                  color: '#1769aa',
                  background: 'white',
                  border: 'solid #1769aa 3px',
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: '#b23c17',
                  background: 'white',
                  border: 'solid #b23c17 3px',
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
