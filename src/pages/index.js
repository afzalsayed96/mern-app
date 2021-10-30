import React from 'react'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ProTip from '../components/ProTip';
import Link from '../components/Link';
import Nav from '../components/nav'
import Footer from '../components/footer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  margin: {
    marginTop: theme.spacing(2),
    margin: theme.spacing(1),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
}));

export default function Index() {
  const classes = useStyles();

  return (
    <>
      <Nav />
      <Container maxWidth="sm">
        <Box my={4}>
          <img src="/undraw_react.svg" alt="illustration" width="100%" id="landingImg"/>
          <div className={classes.container}>
            <Button variant="contained" color="primary" component={Link} naked href="create" className={classes.margin}>
              Create New
            </Button>
            <Button variant="contained" color="secondary" component={Link} naked href="export" className={classes.margin}>
              Export All
            </Button>
          </div>
          <ProTip message="Already registered?" verb="Login" url="/login" />
        </Box>
      </Container>
      <Footer />
    </>
  );
}



