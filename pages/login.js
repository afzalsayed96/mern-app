import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ProTip from '../components/ProTip';
import Footer from '../components/footer';
import Nav from '../components/nav';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, CircularProgress } from '@material-ui/core';
import UserLogin from '../services/LoginService';
import MySnackbarContentWrapper from '../components/snackbar';


const useStyles = makeStyles(theme => ({
  margin: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2)
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  },
  textField: {
  },
}));


function init() {
  return {
    username: { value: "", error: "" },
    password: { value: "", error: "" }
  };
}

function reducer(state, action) {
  return {
    setValue: () => ({
      ...state,
      [action.payload.field]: { value: action.payload.value, error: "" }
    }),
    setError: () => ({
      ...state,
      [action.payload.field]: { value: state[action.payload.field].value, error: action.payload.error }
    }),
    reset: init
  }[action.type]() || new Error();
}

export default function Create() {
  const classes = useStyles();
  const [state, dispatch] = React.useReducer(reducer, init(), init);
  const [snackbar, setSnackbar] = React.useState({ open: false, message: "", variant: "info" });
  const [loading, setLoading] = React.useState(false);

  const validate = async (field) => {
    // Empty check for all
    if (state[field].value.trim() === "") {
      dispatch({ type: "setError", payload: { field, error: "Can't be empty" } })
    }
  }

  const handleSubmit = async () => {
    let errors = Object.values(state).some(state => !!state.error);
    let values = Object.values(state).every(state => !!state.value);
    if (!loading && !errors && values) {
      const data = {
        username: state.username.value,
        password: state.password.value,
      };
      setLoading(true);
      const registerStatus = await UserLogin(data);
      if (registerStatus === 200) {
        dispatch({ type: 'reset' })
        setSnackbar({ open: true, message: 'Login successfully', variant: 'success' });
      } else setSnackbar({ open: true, message: 'Unable to login', variant: 'error' });
      setLoading(false);
    }
  }

  return (
    <>
      <Nav />
      <Container maxWidth="sm" >
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <form noValidate autoComplete="off">
            <TextField
              fullWidth
              label="Username"
              className={classes.textField}
              value={state.username.value}
              onBlur={() => validate('username')}
              error={!!state.username.error}
              helperText={state.username.error}
              onChange={(e) => dispatch({ type: 'setValue', payload: { field: 'username', value: e.target.value } })}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              className={classes.textField}
              value={state.password.value}
              onBlur={() => validate('password')}
              error={!!state.password.error}
              helperText={state.password.error}
              onChange={(e) => dispatch({ type: 'setValue', payload: { field: 'password', value: e.target.value } })}
              margin="normal"
              variant="outlined"
            />
          </form>
          <div className={classes.container}>
            <Button color="primary" variant="contained" className={classes.margin} onClick={handleSubmit}>
              {loading ?
                <CircularProgress color="inherit" style={{ width: '24px', height: '24px' }} />
                : "Login"}
            </Button>
            <Button color="secondary" variant="contained" className={classes.margin} onClick={() => dispatch({ type: 'reset' })}>
              Cancel
            </Button>
          </div>
          <MySnackbarContentWrapper
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            variant={snackbar.variant}
            message={snackbar.message}
            open={snackbar.open}
            autoHideDuration={6000}
          />
          <ProTip message="Not yet registered?" verb="Register" url="/create" />
        </Box>
      </Container>
      <Footer />
    </>
  );
}
