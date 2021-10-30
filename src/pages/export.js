import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableFooter, TablePagination, Typography } from '@material-ui/core';
import UserList from '../services/UserListService'
import Nav from '../components/nav'
import Footer from '../components/footer';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Checkbox from '@material-ui/core/Checkbox';
import EnhancedTableHead from '../components/EnhancedTableHead';
import EnhancedTableToolbar from '../components/EnhancedToolbar';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundImage: `url('/undraw_code_back.svg')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
    padding: theme.spacing(2),
    maxWidth: "100%",
    overflow: "hidden"
  },
  imageLeft: {
    position: 'absolute',
    left: '-32px',
    bottom: '64px',
    zIndex: 0
  },
  imageRight: {
    position: 'absolute',
    right: '16px',
    bottom: '64px',
    zIndex: 0
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  boxColumn: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  table: {
    width: "100%",
  },
  paper: {
    margin: '20px',
    position: 'relative',
    zIndex: 2,
    overflow: "auto"
  },
  progress: {
    position: "sticky",
    left: "0"
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis?.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

export default function DataTable() {
  const classes = useStyles();
  let [rows, setRows] = React.useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  let [page, setPage] = React.useState(0);
  let [rowsPerPage, setRowsPerPage] = React.useState(5);
  let [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    refresh()
  }, [])

  const refresh = async () => {
    setLoading(true);
    rows = await UserList();
    setRows(rows);
    setLoading(false);
  }

  const getRowsPerPageOptions = () => {
    if (rows?.length >= 25) {
      return [5, 10, 25]
    }
    else if (rows?.length >= 10) {
      return [5, 10]
    }
    else return [rows?.length]
  }


  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const isSelected = id => selected.indexOf(id) !== -1;

  const emptyRows = rows && rows.length ? rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage) : 0;

  return (
    <>
      <Nav />
      <Container className={classes.container}>
        <div className={classes.imageLeft}>
          <img src="/undraw_code_left.svg" height="560px"></img>
        </div>
        <div className={classes.imageRight}>
          <img src="/undraw_code_right.svg" height="560px"></img>
        </div>
        <Box my={4} className={classes.root}>
          <Paper className={classes.paper}>
            <EnhancedTableToolbar selected={selected} rows={rows} refresh={refresh} />
            {loading && <LinearProgress className={classes.progress} />}
            <Table className={classes.table}>
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows?.length}
              />
              <TableBody>
                {stableSort(rows, getSorting(order, orderBy))
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={event => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.id}
                        </TableCell>
                        <TableCell align="left">{row.username}</TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{new Date(row.created_at).toDateString() + " " + new Date(row.created_at).toLocaleTimeString()}</TableCell>
                      </TableRow>
                    );
                  })}
                {rows?.length === 0 ?
                  <TableRow style={{ height: 53 * rowsPerPage }}>
                    <TableCell colSpan={6} >
                      <Box className={classes.boxColumn}>
                        <img src="/undraw_no_data.svg" height="240" />
                        <Typography variant="body2" color="textSecondary" align="center">No data</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                  : emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={getRowsPerPageOptions()}
                    colSpan={6}
                    count={rows?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    onChangePage={(e, newPage) => { setPage(newPage); }}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>
        </Box >
      </Container >
      <Footer />
    </>
  );
}