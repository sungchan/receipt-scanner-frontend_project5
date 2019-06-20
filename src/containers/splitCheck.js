import React from 'react';
import { Button, Container, Modal, Image, Popup } from 'semantic-ui-react';

import SplitCheckDropdown from '../components/splitCheckDropdown';

class SplitCheck extends React.Component {

  state = {
    modalOpen:false,
  }

  handleModalOpen = () => {
    this.setState(prevState => ({
      modalOpen: !prevState.modelOpen
    }))
  }

  handleModalClose = () => {

    this.setState({ modalOpen: false})
  }


  render(){
    return (
      <Container textAlign='center'>
        <h1>Split Check</h1>
        <Button secondary size="small" onClick={this.handleModalOpen}>View Receipt</Button>
        <br/>
        <br/>

        <Modal
          open={this.state.modalOpen}
          onClose={this.handleModalClose}
          closeIcon
          basic size='huge'
        >
          <Image src={this.props.imgUrl}></Image>
        </Modal>

        {this.props.createdItemsArray.map(item => {
          return (
            <React.Fragment>
              <Popup
                content={'$'+ parseFloat(item.cost).toFixed(2)}
                on='click'
                trigger={  <Button fluid>{item.name}</Button>}
              />

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

        {this.props.notAllItemsSplitError &&
          <h3>Please Assign all Items</h3>
        }

        <Button fluid primary size='huge' onClick={this.props.submitSplit}> Split! </Button>
      </Container>
    )
  }
}

export default SplitCheck;
