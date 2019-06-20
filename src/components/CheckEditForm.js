import React from 'react';
import { Form, Input, Button, List } from 'semantic-ui-react';

const CheckEditForm = props => {

  return (
    <React.Fragment>
      <List divided verticalAlign='middle'>
        <Form onSubmit={props.handleCheckEditSubmit}>
        <List.Item>
          <List.Content>SubTotal</List.Content>
          <List.Content floated='right'>
            <Form.Input type="number" value={props.subTotal}/>
          </List.Content>
        </List.Item>


          {props.itemsArray.map((item, i) => {
            if (!isNaN(item.price)){
              return (
                <Form.Group key={item.yValue}>
                  <Form.Input value={item.name} onChange={(event) => props.handleCheckEditName(event, i)}/>
                  <Form.Input type="number" value={item.price} onChange={(event) => props.handleCheckEditPrice(event, i)}/><br/>
                </Form.Group>
              )
            }
          })}

          <Form.Group inline>
            <label>Tax</label>
            <Form.Input type="number" value={props.tax} onChange={props.handleEditTax}/>
          </Form.Group>

          <Form.Group inline>
            <Form.Field>
              <label>Tip</label>
              <Input type='number' value={props.tipPerc} onChange={props.handleTipPercCalc}/>
            </Form.Field>
            <Form.Field>
              <Input type='number' value={props.tipAmnt} onChange={props.handleTipAmntCalc}/>
            </Form.Field>
          </Form.Group>

          <h4>{props.total}</h4>
          <Button type='submit'>Split Check</Button>
        </Form>
      </List>
    </React.Fragment>
  )
}

export default CheckEditForm;
