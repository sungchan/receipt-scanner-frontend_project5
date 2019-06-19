import React from 'react';

import UserSearchBar from '../components/userSearchBar';
import UserCreateModal from '../components/userCreateModal';


class UserSelect extends React.Component {

  state ={
    modalOpen: false,
    guest:''
  }



  handleOpen = () =>{
    console.log('help')
    this.setState(prevState => ({
      modalOpen: !prevState.modelOpen
    }))
  }

  handleClose = () => {
    this.setState({ modalOpen: false})
  }

  handleChange = (e) => {
    console.log(e.target.value)
    this.setState({ guest: e.target.value })
  }


  render(){
    return (
      <React.Fragment>
        <UserSearchBar
          users={this.props.users}
          handleUserSearchChange={this.props.handleUserSearchChange}
          selectedUsers={this.props.selectedUsers}
          handleOpen={this.handleOpen}
          />
        <UserCreateModal
          handleClose={this.handleClose}
          handleChange={this.handleChange}
          guest={this.state.guest}
          modalOpen={this.state.modalOpen}
          handleAddGuestSubmit={this.props.handleAddGuestSubmit}
        />
      </React.Fragment>
    )
  }
}

export default UserSelect;
