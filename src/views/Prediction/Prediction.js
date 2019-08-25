import React from 'react';
import LatestSales from './../Dashboard/components/LatestSales/LatestSales';
import LatestOrders from './../Dashboard/components/LatestOrders/LatestOrders';

class Prediction extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                {this.props.prediction ? this.renderStaticsWithData() : null}
            </div>
        );
    }

    renderStaticsWithData() {
        return(
            <div>
                <LatestSales stats={this.props.prediction.stadistics}/>
                <br/>
                <LatestOrders records={this.props.prediction.records}/>
            </div>
        );
    }
}
export default Prediction;