import React from 'react';
import { Button, List, Container, Image } from 'semantic-ui-react';

class ResultPage extends React.Component {


  render(){
    console.log('results', this.props)
    return (
      <Container textAlign='center'>
        <h2>Results</h2>
        <br/>

        <List divided float='left' relaxed>

          {this.props.userCosts.map(user => {
            if (Object.keys(user)[0] === this.props.payer.name){
              return (
                <List.Item>
                  <List.Content floated='left'>
                    <Image avatar src={user.profile_url} />
                  </List.Content>
                  <List.Content floated='left'>
                    <h3>{`${Object.keys(user)[0].split(' ')[0]} paid $${Object.values(user)[0].toFixed(2)}`}</h3>
                  </List.Content>
                </List.Item>
              )
            } else {
              return (
                <List.Item>
                  <List.Content floated='left'>
                    <Image avatar src={user.profile_url} />
                  </List.Content>
                  <List.Content floated='left'>
                    <h3>{`${Object.keys(user)[0].split(' ')[0]} owes ${this.props.payer.name} $${Object.values(user)[0].toFixed(2)}`}</h3>
                  </List.Content>
                </List.Item>
              )
            }
          })}
          <br/>
          <br/>

          <Button primary size='large' fluid onClick={this.props.handleAnotherReceipt}>Scan another receipt</Button>
        </List>
      </Container>
    )
  }
}

export default ResultPage;


// john owes bob 11.93
// bob paid 269.18
// george owes bob 60.25
// Chris Metzger owes bob 12.95
