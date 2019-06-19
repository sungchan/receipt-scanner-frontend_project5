import React from 'react';
import { Button } from 'semantic-ui-react';

import SplitCheckDropdown from '../components/splitCheckDropdown';

class SplitCheck extends React.Component {

  state = {
    isOpen:false,
  }




  render(){
    return (
      <div>
        {this.props.createdItemsArray.map(item => {
          return (
            <React.Fragment>
              <Button onClick={()=>console.log('hello')}>{item.name}</Button>
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
      </div>
    )
  }
}

export default SplitCheck;
