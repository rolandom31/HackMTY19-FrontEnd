import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import palette from 'theme/palette';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative',
    
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));
const cardstyling = {
  
  start: 100
}


const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  legend: { display: false },
  cornerRadius: 20,
  tooltips: {
    enabled: true,
    mode: 'index',
    intersect: false,
    borderWidth: 1,
    borderColor: palette.divider,
    backgroundColor: palette.white,
    titleFontColor: palette.text.primary,
    bodyFontColor: palette.text.secondary,
    footerFontColor: palette.text.secondary
  },
  layout: { padding: 50 },
  scales: {
    xAxes: [
      {
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        ticks: {
          fontColor: palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: palette.divider
        }
      }
    ]
  }
};

const LatestSales = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  let stats = props.stats;
  console.log(stats);
  let lbls = [];
  let i = 1;
  for(let k in stats) {
    lbls.push(`Producto ${i++}`);
  }
  let salesData = [];
  for(let k in stats){
    salesData.push(stats[k].quantity);
  }

  let data = {
    labels: lbls,
    datasets: [
      {
        backgroundColor: palette.primary.main,
        data: salesData
      }
    ]
  };
  return (
    <Card
      {...rest}
      style= {cardstyling}
      className={clsx(classes.root, className)}
      
    >
      
      <CardHeader
        title="Ventas por producto"
        
        
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar
            data={data}
            options={options}
          />
        </div>
      </CardContent>
      <Divider />
    </Card>
  );
};

LatestSales.propTypes = {
  className: PropTypes.string
};

export default LatestSales;
