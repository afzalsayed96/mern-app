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
import { UserRegistration, UsernameValidation } from '../services/RegistrationService';
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
    email: { value: "", error: "" },
    password: { value: "", error: "" },
    confirmPassword: { value: "", error: "" },
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
    else if (field === 'username') {
      const data = {
        username: state.username.value
      };
      const isUsernameTaken = await UsernameValidation(data);

      if (isUsernameTaken === 400)
        dispatch({ type: "setError", payload: { field, error: "Already exists" } })
    }
    else if (field === 'email') {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(state.email.value) == false) {
        dispatch({ type: "setError", payload: { field, error: "Invalid Email Address" } })
      }
    }
    else if (field === 'password') {
      if (state.password.value.trim().length < 6) {
        dispatch({ type: "setError", payload: { field, error: "Should be atleast 6 characters" } })
      }
    }
    if (field === 'confirmPassword') {
      if (state.password.value.trim() !== state.confirmPassword.value.trim()) {
        dispatch({ type: "setError", payload: { field, error: "Passwords doesn't match" } })
      }
    }
  }

  const handleSubmit = async () => {
    let errors = Object.values(state).some(state => !!state.error);
    let values = Object.values(state).every(state => !!state.value);
    if (!loading && !errors && values) {
      const data = {
        username: state.username.value,
        email: state.email.value,
        password: state.password.value,
        confirmPassword: state.confirmPassword.value,
      };
      setLoading(true);
      const registerStatus = await UserRegistration(data);
      if (registerStatus === 200) {
        dispatch({ type: 'reset' })
        setSnackbar({ open: true, message: 'User created successfully', variant: 'success' });
      } else setSnackbar({ open: true, message: 'Unable to create user', variant: 'error' });
      setLoading(false);
    }
  }

  return (
    <>
      <Nav />
      <Container maxWidth="sm" >
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Register
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
              label="Email"
              className={classes.textField}
              value={state.email.value}
              onBlur={() => validate('email')}
              error={!!state.email.error}
              helperText={state.email.error}
              onChange={(e) => dispatch({ type: 'setValue', payload: { field: 'email', value: e.target.value } })}
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
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              className={classes.textField}
              value={state.confirmPassword.value}
              onBlur={() => validate('confirmPassword')}
              error={!!state.confirmPassword.error}
              helperText={state.confirmPassword.error}
              onChange={(e) => dispatch({ type: 'setValue', payload: { field: 'confirmPassword', value: e.target.value } })}
              margin="normal"
              variant="outlined"
            />
          </form>
          <div className={classes.container}>
            <Button color="primary" variant="contained" className={classes.margin} onClick={handleSubmit}>
              {loading ?
                <CircularProgress color="inherit" style={{ width: '24px', height: '24px' }} />
                : "Sign up"}
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
          <ProTip message="Already registered?" verb="Login" url="/login" />
        </Box>
      </Container>
      <Footer />
    </>
  );
}
