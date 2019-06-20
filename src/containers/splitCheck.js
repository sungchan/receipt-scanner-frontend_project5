import React from 'react';
import { Button, Container } from 'semantic-ui-react';

import SplitCheckDropdown from '../components/splitCheckDropdown';

class SplitCheck extends React.Component {

  state = {
    isOpen:false,
  }




  render(){
    return (
      <Container textAlign='center'>
        <h1>Split Check</h1>
        {this.props.createdItemsArray.map(item => {
          return (
            <React.Fragment>
              <Button fluid onClick={()=>console.log('hello')}>{item.name}</Button>
                <br/>
              <SplitCheckDropdown
                selectedUsers={this.props.selectedUsers}
                itemArray={this.props.itemSplits[item.id]}
                handleAddItemSplit={this.props.handleAddItemSplit}
                itemId={item.id}
              />
                <br/>
            </React.Fragment>
          )
        })}
        <Button onClick={this.props.submitSplit}> Split! </Button>
      </Container>
    )
  }
}

export default SplitCheck;
