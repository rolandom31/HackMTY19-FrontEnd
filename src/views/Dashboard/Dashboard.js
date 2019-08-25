import React from 'react';
import { Grid } from '@material-ui/core';
import apiurl from './../../constants/api';
import axios from 'axios';
import { DualRing } from 'react-loading-io';

import {
  Budget,
  TotalProfit,
} from './components';
import Prediction from 'views/Prediction/Prediction';

const cursorStyling = {
  cursor:'pointer',
  marginTop:20,
};

const cardstyle = {
  paddingLeft: 70
};

const totalStyle={
  paddingRight: 30,
  marginTop:20,
  maxHeight: 135,
  marginRight: 10
}

class Dashboard extends React.Component{
  
  constructor(props) {
    super(props);
    this.makeAPIRequest();
    this.state = {
      first: null,
      second: null,
      third: null,
      monthStats: null,
      fetching: true
    };
  }

  makeAPIRequest = () => {
    let url = apiurl + '/statics';
    axios.get(url)
      .then( data => {
        this.setState({
          first: data.data.first,
          second: data.data.second,
          third: data.data.third,
          monthStats: data.data.first,
          fetching: false
        });
      });
  }

  calculateAmountPerMonth = (stadistics) => {
    let amount = 0;
    for(let key in stadistics) {
      amount += stadistics[key].total;
    }
    return amount;
  }

  renderLoading = () =>{
    return <DualRing size={120} />
  }

  render(){
    let amountFirst = this.state.first == null ? 0 : this.calculateAmountPerMonth(this.state.first.stadistics);
    let amountSecond = this.state.second == null ? 0 : this.calculateAmountPerMonth(this.state.second.stadistics);
    let amountThird = this.state.third == null ? 0 : this.calculateAmountPerMonth(this.state.third.stadistics);
    
    if(this.state.fetching) {
      return( this.renderLoading())
    }
    return (
      <div>
        <Grid
          container
          spacing={4}
          style={cardstyle}
        >
          <Grid
            style={cursorStyling}
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
            onClick={()=> this.displayMonthStats(this.state.first)}
          >
            <Budget amount={amountFirst}
                    month="PRIMER" 
                    percentage={null}/>
          </Grid>
          <Grid
            style={cursorStyling}
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
            onClick={()=> this.displayMonthStats(this.state.second)}
          >
            <Budget amount={amountSecond}
                    month="SEGUNDO"
                    percentage={Math.round(100 - ((amountSecond * 100)/amountFirst))} />
          </Grid>
          <Grid
            style={cursorStyling}
            item
            onClick={()=> this.displayMonthStats(this.state.third)}
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget amount={amountThird}
                    month="TERCER" 
                    percentage={Math.round(100 - ((amountThird * 100)/ amountSecond))} />
          </Grid>
          <Grid
           
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalProfit amount={amountFirst+amountSecond+amountThird}
            style={totalStyle}
            />
          </Grid>
          
            {this.state.monthStats == null ? null : <Prediction prediction={this.state.monthStats}/>};
        </Grid>
      </div>
    );
  }

  displayMonthStats(monthData) {
    this.setState({
      monthStats: monthData,
      
    })
  }
}

export default Dashboard;
