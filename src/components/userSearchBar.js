import React from 'react';
import { Dropdown, Button } from 'semantic-ui-react';


const UserSearchBar = (props) => {

  let usersArray = props.users.map(user => {
    return ({
        key: user.name,
        text: user.name,
        value: user,
        image: { avatar: true, src: user.profile_url },
    })
  })


  return (
    <React.Fragment>
      <Dropdown
        size='large'
        placeholder="Who'd you eat with?"
        onChange={props.handleUserSearchChange}
        fluid
        multiple selection
        search
        scrolling
        value={props.selectedUsers}
        options={usersArray}
        noResultsMessage={<Button onClick={props.handleOpen}>User not found, add guest user? </Button>}
        />
    </React.Fragment>
  )
}



export default UserSearchBar;
