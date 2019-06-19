import React from 'react';
import { Button, Modal, Header, Form } from 'semantic-ui-react';

class UserCreateModal extends React.Component {



  render(){
    return (
      <Modal
        trigger={this.props.modelOpen}
        open={this.props.modalOpen}
        onClose={this.props.handleClose}
        closeIcon
        basic size='small'
      >
        <Header icon='user' content='Add Guest'/>
        <Modal.Content>
          <Form onSubmit={()=>{ this.props.handleAddGuestSubmit(this.props.guest); this.props.handleClose()} }>
            <Form.Field>
              <input placeholder='Guest Name' value={this.props.guest} onChange={this.props.handleChange}/>
            </Form.Field>
            <Button type ='submit'>Add</Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default UserCreateModal;
