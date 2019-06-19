import React from 'react';
import { Button } from 'semantic-ui-react';
// import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

import api from './services/api';
import itemizer from './services/receiptItemizer';

import UserSelect from './containers/userSelect';
import EditCheck from './containers/editCheck';
import SplitCheck from './containers/splitCheck';




class App extends React.Component {

  state = {
    imgUrl: "https://res.cloudinary.com/sungchan/image/upload/v1560827636/s074852994-300_fzkrgc.jpg",
    thumbnail: 's',
    notPhotoError: false,
    placeName: '',
    itemsArray: [],
    createdItemsArray: [],
    subTotal: null,
    tax: null,
    taxPerc: null,
    tipPerc: null,
    tipAmnt: null,
    total: null,
    users: [],
    selectedUsers: [],
    checkStage: 'ADD', //'ADD', 'EDIT', 'SPlIT'
    currentReceiptId: null,
    payer: {},
    itemSplits: {}
  }

//******************************************************
// CLOUDINARY UPLOAD WIDGET
//******************************************************
  widget = window.cloudinary.createUploadWidget({
    sources: [ 'local', 'camera'],
    cloudName: "sungchan",
    uploadPreset: process.env.REACT_APP_CLOUDINARY_KEY,
    maxFiles: 1,
    preBatch: (cb, data) => {
      const name = data.files[0].name
      const acceptedExtensions = ['jpeg', '.jpg', '.png']
      const extensionName = name.slice(name.length-4, name.length)

      if(acceptedExtensions.includes(extensionName)){
        this.setState({
          notPhotoError: false
        })
        return cb()
      } else {
        this.setState({notPhotoError: true})
        cb({cancel: true})
        this.widget.close()
      }
    }
  }, (error, result) => {this.uploadResult(result)})
  showWidget = (widget) => {
    this.widget.open()
  }
  uploadResult = (result) => {
    if (result.event === 'success'){
      this.setState({
        imgUrl: result.info.secure_url,
        thumbnail: result.info.thumbnail_url
      })
    }
  }


//******************************************************
// STAGE= 'ADD'
//******************************************************
  handleUpload = () => {
    if (this.state.imgUrl && this.state.selectedUsers.length){
      api.processReceipt(this.state.imgUrl)
      .then(json => {

        const placeName = (json.responses[0].textAnnotations[0].description.split('\n')[0])
        const items = itemizer(json.responses[0].textAnnotations)
        const subTotal = parseFloat(items.find(item => item.name.toLowerCase().includes("sub" && "total")).price)
        const tax = items.find(item => item.name.toLowerCase().includes("tax"))
          ? items.find(item => item.name.toLowerCase().includes("tax")).price
          : 0
        const total = items.find(item => !item.name.toLowerCase().includes('sub')
          && item.name.toLowerCase().includes("total")
          || item.name.toLowerCase().includes("amount")
        )
        const tip = items.find(item => item.name.toLowerCase() === "gratuity" || item.name.toLowerCase() === "tip")
            ? parseFloat(items.find(item => item.name.toLowerCase() === "gratuity" || item.name.toLowerCase() === "tip").price)
            : null
        const foodItems = items.filter(item => {
          return !(item.name.toLowerCase().includes('tax')
            || item.name.toLowerCase().includes('total')
            || item.name.toLowerCase() === 'tip'
            || item.name.toLowerCase() === 'gratuity'
            || item.name.toLowerCase().includes("amount")
            || !item.price
          )
        })
        this.setState({
          itemsArray: foodItems,
          tax: tax,
          taxPerc: (tax/subTotal),
          subTotal: subTotal,
          placeName: placeName,
          tipAmnt: tip,
          tipPerc: Math.round(tip/subTotal * 100),
          total: parseFloat(total.price)
        }, ()=> {
          this.setState({  checkStage: 'EDIT' }); console.log(this.state)
        })
      })
    }
  }

  handleUserSearchChange = (e, {value}) => {
    this.setState({ selectedUsers: value })
  }
  handleAddGuestSubmit = (name) => {
    api.addUser(name)
    .then(() =>api.grabUsers())
    .then(users => this.setState({users: users}))

  }


//******************************************************
// STAGE= 'EDIT'
//******************************************************

  handleTipPercCalc = (e) => {
    this.setState({
      tipPerc: parseFloat(e.target.value)
    }, () => {
      let tipAmnt = (this.state.tipPerc * this.state.subTotal * .01).toFixed(2)
      this.setState({tipAmnt: parseFloat(tipAmnt)}, () => {
        this.calculateTotal()
      })
    })
  }
  handleTipAmntCalc = (e) => {
    this.setState({
      tipAmnt: parseFloat(e.target.value)
    }, () => {
      let tipPerc = (this.state.tipAmnt / this.state.subTotal * 100).toFixed(2)
      this.setState({tipPerc:parseFloat(tipPerc)}, () => {
        this.calculateTotal()
      })
    })
  }


  handleCheckEditPrice = (e, i) =>{
    e.persist()
    this.setState(prevState => {
      const itemsArray = [...prevState.itemsArray]
      itemsArray[i].price = e.target.value
      return { itemsArray }
    }, () => {
      this.calculateSubTotal()
    })
  }
  handleCheckEditName = (e, i) =>{
    e.persist()
    this.setState(prevState => {
      const itemsArray = [...prevState.itemsArray]
      itemsArray[i].name = e.target.value
      return { itemsArray }
    })
  }
  handleEditTax = (e) => {
    let tax = (e.target.value)? parseFloat(e.target.value) : NaN
    this.setState({ tax: tax}, () => {
      this.calculateTotal()
    })
  }

  calculateSubTotal = () => {
    const subTotal = this.state.itemsArray.map(item => item.price).reduce((acc, curr) => {
        return parseFloat(acc) + parseFloat(curr)
    })
    const subTotalCheck = subTotal ? subTotal:0
    this.setState({subTotal: subTotalCheck}, () => {
      this.calculateTotal()
    })
  }
  calculateTotal = () => {
    if (!isNaN(this.state.tipAmnt) && !isNaN(this.state.subTotal)) {
      const total = ((this.state.subTotal ? this.state.subTotal:0) + this.state.tax + (this.state.tipAmnt ? this.state.tipAmnt:0) ).toFixed(2)
      this.setState({total: total}, ()=> console.log(this.state))
    }
  }
  createReceipt = () => {
    api.addReceipt({
      payer_id: this.state.payer.id,
      place_name: this.state.placeName,
      img_url: this.state.imgUrl,
      date: 'placeholder',
      subtotal: this.state.subTotal,
      tax: this.state.tax,
      tip: this.state.tipAmnt,
      total: parseFloat(this.state.total)
    }).then(receipt => {
      this.setState({
        currentReceiptId: receipt.id
      }, () => {
        this.createUserReceipts()
        this.createItems()
      })
    })
  }

  createUserReceipts = () => {
    this.state.selectedUsers.map(user => {
      api.addUserReceipt({
        user_id: user.id,
        receipt_id: this.state.currentReceiptId
      })
    })
  }

  createItems = () => {
    this.state.itemsArray.map(item => {
      api.addItem({
        receipt_id: this.state.currentReceiptId,
        name: item.name,
        cost: parseFloat(item.price)
      }).then(item => {
        this.setState({
          createdItemsArray: [...this.state.createdItemsArray, item]
        })
      })
    })
    this.setState({ checkStage: 'SPLIT' })
  }


  handleCheckEditSubmit = (e) => {
    console.log('here')
    e.preventDefault();
    this.createReceipt()
  }

  handlePayer = (e, { value }) => {
    this.setState({ payer: value }, () => console.log(this.state.payer))
  }

//******************************************************
// STAGE= 'SPLIT'
//******************************************************

  handleAddItemSplit = (e, { value }, id) => {
    this.setState({
      itemSplits: {...this.state.itemSplits, [id]: value}
    }, () => console.log(this.state.itemSplits))
  }

  submitSplit = () => {
    Object.keys(this.state.itemSplits).forEach(itemId => {
      this.state.itemSplits[itemId].forEach(userId => {
        api.addItemSplit({
          item_id:itemId,
          user_id:userId,
          splitBetween: this.state.itemSplits[itemId].length
        }).then(data => console.log(data))
      })
    })
  }

//******************************************************
// MOUNTING AND RENDERING
//******************************************************
  componentDidMount(){
    api.grabUsers()
    .then(users => this.setState({users: users}))

  }

  render(){
    return (
      <div className="App">

        {this.state.checkStage === 'ADD' &&
          <React.Fragment>
            <UserSelect
              users={this.state.users}
              selectedUsers={this.state.selectedUsers}

              handleUserSearchChange={this.handleUserSearchChange}
              handleAddGuestSubmit={this.handleAddGuestSubmit}
            />

          <Button onClick={this.showWidget}>Add Photo</Button>

            {this.state.notPhotoError &&
              "Uploaded File must be a photo"
            }

            {(this.state.thumbnail && !!this.state.selectedUsers.length) &&
              <React.Fragment>
                <img src={this.state.thumbnail} alt="img preview" className="imgPrev" id="imgPrev" />
                <Button onClick={this.handleUpload}>Continue</Button>
              </React.Fragment>
            }
          </React.Fragment>
        }

        {this.state.checkStage === 'EDIT' &&
          <React.Fragment>
            {this.state.itemsArray &&
              <EditCheck itemsArray={this.state.itemsArray}
                selectedUsers={this.state.selectedUsers}
                tipPerc={this.state.tipPerc}
                tipAmnt={this.state.tipAmnt}
                total={this.state.total}
                subTotal={this.state.subTotal}
                tax={this.state.tax}

                handleEditSubTotal={this.handleEditSubTotal}
                handleEditTax={this.handleEditTax}
                handleCheckEditPrice = {this.handleCheckEditPrice}
                handleCheckEditName = {this.handleCheckEditName}
                handleTipPercCalc={this.handleTipPercCalc}
                handleTipAmntCalc={this.handleTipAmntCalc}
                handlePayer={this.handlePayer}
                handleCheckEditSubmit= {this.handleCheckEditSubmit}
              />
            }
          </React.Fragment>
        }

        {this.state.checkStage === 'SPLIT' &&
          <React.Fragment>
            <SplitCheck
              createdItemsArray={this.state.createdItemsArray}
              selectedUsers={this.state.selectedUsers}
              itemSplits={this.state.itemSplits}

              handleAddItemSplit={this.handleAddItemSplit}
              submitSplit={this.submitSplit}
            />
          </React.Fragment>
        }

      </div>
    )
  }
}

export default App;
