import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
// Changes
import CountUp from 'react-countup';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceIconSuccess: {
    color: theme.palette.success.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  },
  differenceValueSucess: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1)
  }
}));

const Budget = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const renderPercentage = (classStyle) => {
    return (
      <div>
        <Typography
        className={classStyle}
        variant="body2"
        >
          {Math.abs(props.percentage)}%
        </Typography>
        <Typography
          className={classes.caption}
          variant="caption"
        >
          Desde el mes pasado
        </Typography>
      </div>
    );
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              {props.month} MES
            </Typography>
            <Typography variant="h3">
              <CountUp
                  start={0}
                  end={props.amount}
                  duration={4}
                  prefix="$"
                  separator=","
              />
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        {!props.percentage ? null : props.percentage < 0 ? 
                                    <div className={classes.difference}>
                                      <ArrowUpwardIcon className={classes.differenceIconSuccess} />
                                        {renderPercentage(classes.differenceValueSucess)}
                                    </div> :
                                    <div className={classes.difference}>
                                      <ArrowDownwardIcon className={classes.differenceIcon} />
                                        {renderPercentage(classes.differenceValue)}
                                    </div> 
                                  }
      </CardContent>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string
};

export default Budget;
