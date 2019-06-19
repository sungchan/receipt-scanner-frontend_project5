import React from 'react';
import { Dropdown, Button } from 'semantic-ui-react';


const UserSearchBar = (props) => {

  let usersArray = props.users.map(user => {
    return ({
        key: user.name,
        text: user.name,
        value: user,
        image: { avatar: true, src: 'https://res.cloudinary.com/sungchan/image/upload/v1560829909/00-ELASTOFONT-STORE-READY_user-circle-512_bg2kgc.png' },
    })
  })


  return (
    <React.Fragment>
      <Dropdown
        placeholder="Who'd you eat with?"
        onChange={props.handleUserSearchChange}
        fluid
        multiple selection
        search
        value={props.selectedUsers}
        options={usersArray}
        noResultsMessage={<Button onClick={props.handleOpen}>User not found, add guest user? </Button>}
        />
    </React.Fragment>
  )
}



export default UserSearchBar;
