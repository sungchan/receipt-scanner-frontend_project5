import React from 'react';
import { Dropdown, Button, Container, Grid } from 'semantic-ui-react';

import CheckEditForm from '../components/CheckEditForm';

class EditCheck extends React.Component {

  usersArray = this.props.selectedUsers.map(user => {
    return ({
        key: user.name,
        text: user.name,
        value: user,
        image: { avatar: true, src: 'https://res.cloudinary.com/sungchan/image/upload/v1560829909/00-ELASTOFONT-STORE-READY_user-circle-512_bg2kgc.png' },
    })
  })

  render() {

    return (
      <React.Fragment>
          <h1>Edit Check</h1>
          <Dropdown
            placeholder='Who paid?'
            fluid
            selection
            options={this.usersArray}
            onChange={this.props.handlePayer}
            search
            >
          </Dropdown>

          <CheckEditForm
            itemsArray = {this.props.itemsArray}
            tipPerc={this.props.tipPerc}
            tipAmnt={this.props.tipAmnt}
            tax={this.props.tax}
            subTotal={this.props.subTotal}
            total={this.props.total}

            handleEditSubTotal={this.props.handleEditSubTotal}
            handleEditTax={this.props.handleEditTax}
            handleCheckEditPrice = {this.props.handleCheckEditPrice}
            handleCheckEditName = {this.props.handleCheckEditName}
            handleCheckEditSubmit= {this.props.handleCheckEditSubmit}
            handleTipPercCalc={this.props.handleTipPercCalc}
            handleTipAmntCalc={this.props.handleTipAmntCalc}
          />
      </React.Fragment>
    )
  }
}

export default EditCheck;
