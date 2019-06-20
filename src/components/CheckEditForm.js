import React from 'react';
import { Form, Input, Button, List, Divider } from 'semantic-ui-react';

const CheckEditForm = props => {

  return (
    <React.Fragment>
      <Form onSubmit={props.handleCheckEditSubmit}>
      <List >


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
            <br/>
            <Divider fitted />
          <List.Item>
            <List.Content floated='right'>
                <h3>SubTotal: &nbsp; ${props.subTotal}</h3>
            </List.Content>
          </List.Item>
            <br/>
            <Divider fitted />
          <List.Item>
            <List.Content floated='right'>
              <Form.Group inline>
                <label>Tax &nbsp; $</label>
                <Form.Input type="number" value={props.tax} onChange={props.handleEditTax}/>
              </Form.Group>
            </List.Content>
          </List.Item>

          <List.Item>
            <List.Content floated='right'>
              <Form.Group inline>
                  <label>Tip %</label>
                  <Form.Input type='number' value={props.tipPerc} onChange={props.handleTipPercCalc}/>
              </Form.Group>
            </List.Content>
          </List.Item>

          <List.Item>
            <List.Content floated='right'>
              <Form.Group inline>
                  <label>Tip Amount &nbsp; $</label>
                  <Form.Input type='number' value={props.tipAmnt} onChange={props.handleTipAmntCalc}/>
              </Form.Group>
            </List.Content>
          </List.Item>
          <Divider fitted />

          <h2>Total: &nbsp; ${props.total}</h2>
          <Button type='submit'>Split Check</Button>
      </List>
    </Form>
    </React.Fragment>
  )
}

export default CheckEditForm;
