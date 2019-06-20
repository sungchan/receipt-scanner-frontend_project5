import React from 'react';
import { Dropdown, Button, Container, Grid, Divider } from 'semantic-ui-react';

import CheckEditForm from '../components/CheckEditForm';

class EditCheck extends React.Component {

  usersArray = this.props.selectedUsers.map(user => {
    return ({
        key: user.name,
        text: user.name,
        value: user,
        image: { avatar: true, src: user.profile_url },
    })
  })

  render() {

    return (
      <Container textAlign='center'>
          <h1>Edit Check</h1>
           <h5>Paid</h5> by: <Dropdown
            placeholder='Who paid?'
            fluid
            clearable
            selection
            options={this.usersArray}
            onChange={this.props.handlePayer}
            >
          </Dropdown>
          <br/>
<Divider fitted />
<br/>
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
      </Container>
    )
  }
}

export default EditCheck;
