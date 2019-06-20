import React from 'react';
import { Dropdown } from 'semantic-ui-react';

class SplitCheckDropdown extends React.Component {

  usersArray = this.props.selectedUsers.map(user => {
    return ({
        key: user.name,
        text: user.name,
        value: user.id,
        image: { avatar: true, src: user.profile_url },
    })
  })

  render (){
    return (
      <React.Fragment>
        <Dropdown
          upward
          clearable
          search
          placeholder='Who ate this?'
          fluid
          multiple selection
          options={this.usersArray}
          onChange={(e, value) => this.props.handleAddItemSplit(e, value, this.props.itemId)}
          >
        </Dropdown>
      </React.Fragment>
    )
  }
}

export default SplitCheckDropdown;
