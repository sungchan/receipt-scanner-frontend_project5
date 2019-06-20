import React from 'react';
import { Button, Container } from 'semantic-ui-react';

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
        <Container textAlign="center">
          <br/>
          <br/>
          <h1>Who'd you eat with?</h1>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
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
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <Button primary size="huge" centered onClick={this.props.handleUserSelect}>Split Check</Button>
        </Container>
      </React.Fragment>
    )
  }
}

export default UserSelect;
