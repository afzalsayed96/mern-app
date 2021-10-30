import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#409EFF',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#303133',
      contrastText: '#ffffff',
    },
    error: {
      main: "#F56C6C",
      contrastText: '#ffffff'
    },
    grey: {
      main: '#606266'
    },
    background: {
      default: '#fff',
      secondary: '#00000'
    },
  },
  typography: {
    fontFamily: [
      'Product Sans Regular',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export default theme;
