import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, lighten } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import RefreshListIcon from '@material-ui/icons/Refresh';
import DownloadIcon from '@material-ui/icons/ArrowDownward';
import CsvDataService from '../services/CsvDataService';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    position: 'sticky',
    left: 0,
    right: 0
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
}));

export default function EnhancedTableToolbar(props) {
  const classes = useToolbarStyles();
  const { selected, refresh, rows } = props;
  const numSelected = selected.length;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
            </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
              Export
            </Typography>
          )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Download">
            <IconButton aria-label="download" onClick={() => CsvDataService(`data-${new Date().toISOString()}.csv`, rows, selected)}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        ) : (
            <Tooltip title="Refresh list">
              <IconButton aria-label="Refresh list" onClick={refresh}>
                <RefreshListIcon />
              </IconButton>
            </Tooltip>
          )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  selected: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired
};
