import React from 'react';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import * as firebase from "firebase/app";
import Axios from 'axios';




class App extends React.Component {

  state = {
    pendingReceipt: null,
    imgUrl: '',
    thumbnail: '',
    notPhotoError: false
  }

  fileSelectHandler = e => {
    this.setState({
      imgUrl: e.target.files[0]
    })
  }


  render(){
    return (
      <div className="App">
        hello
        <input type="file" onChange={this.fileSelectHandler}> </input>
        {this.state.thumbnail && <img src={this.state.thumbnail} alt="img preview" className="imgPrev" id="imgPrev" />}
      </div>
    )
  }
}

export default App;
