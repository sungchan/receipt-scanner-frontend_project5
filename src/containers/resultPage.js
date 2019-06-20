import React from 'react';
import { Button } from 'semantic-ui-react';

class ResultPage extends React.Component {


  render(){
    console.log('results', this.props)
    return (
      <React.Fragment>
        {this.props.userCosts.map(user => {
          if (Object.keys(user)[0] === this.props.payer.name){
            return <div>{`${Object.keys(user)} paid ${Object.values(user)[0].toFixed(2)}`}</div>
          } else {
            return <div>{`${Object.keys(user)} owes ${this.props.payer.name} ${Object.values(user)[0].toFixed(2)}`}</div>
          }
        })}
        <Button onClick={this.props.handleAnotherReceipt}>Scan another receipt</Button>
      </React.Fragment>
    )
  }
}

export default ResultPage;
