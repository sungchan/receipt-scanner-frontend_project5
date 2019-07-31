import React from 'react';
import { Button, Container, Image, Header, Divider, Loader, Dimmer } from 'semantic-ui-react';

class AddReceipt extends React.Component {



  render(){
    return (
      <React.Fragment>
        <Container fluid textAlign='center'>

          {!this.props.thumbnail &&
            <Container>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <Image size="small" centered src={"https://res.cloudinary.com/sungchan/image/upload/v1561493642/user%20icons/receipt-7_joiovs.png"}/>
              <Header as='h1'>Check Splitter </Header>
              <br/>
              <Divider horizontal>-</Divider>
              <br/>
              <br/>
              <Button primary size="huge" onClick={this.props.showWidget}>Add Photo</Button>
            </Container>
          }

          {this.props.notPhotoError &&
            <h3>Uploaded File must be a photo</h3>
          }

          {(this.props.thumbnail) &&
            <Container fluid>
              <div>
                <br/>
                <br/>
                <br/>

                <Image src={this.props.imgUrl} alt="img preview" fluid />

                <Header textAlign='center'>
                  <Header.Content>Is This Correct?</Header.Content>
                </Header>

                <Button.Group fluid>
                  <Button positive size='large' onClick={this.props.handleUpload}>Upload Photo</Button>
                  <Button.Or/>
                  <Button onClick={this.props.showWidget}>Choose Another</Button>
                </Button.Group>
                <Dimmer active={this.props.loading}>
                  <Loader size='massive' active={this.props.loading}> Processing </Loader>
                </Dimmer>

            </div>
            </Container>
          }

        </Container>

      </React.Fragment>
    )
  }
}

export default AddReceipt;
