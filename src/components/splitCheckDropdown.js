import React from 'react';
import { Dropdown } from 'semantic-ui-react';

class SplitCheckDropdown extends React.Component {

  usersArray = this.props.selectedUsers.map(user => {
    return ({
        key: user.name,
        text: user.name,
        value: user.id,
        image: { avatar: true, src: 'https://res.cloudinary.com/sungchan/image/upload/v1560829909/00-ELASTOFONT-STORE-READY_user-circle-512_bg2kgc.png' },
    })
  })

  render (){
    return (
      <Dropdown
        search
        placeholder='Who ate this?'
        fluid
        multiple selection
        options={this.usersArray}
        onChange={(e, value) => this.props.handleAddItemSplit(e, value, this.props.itemId)}
      >
      </Dropdown>
    )
  }
}

export default SplitCheckDropdown;
