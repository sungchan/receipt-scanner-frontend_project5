import React from 'react';
import { Progress } from 'semantic-ui-react';
// import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

import api from './services/api';
import itemizer from './services/receiptItemizer';


import AddReceipt from './containers/addReceipt';
import UserSelect from './containers/userSelect';
import EditCheck from './containers/editCheck';
import SplitCheck from './containers/splitCheck';
import ResultPage from './containers/resultPage';




class App extends React.Component {

  state = {
    imgUrl: "",
    thumbnail: '',
    notPhotoError: false,
    noSelectedUerError: false,
    noPayerSelectedError: false,
    notAllItemsSplitError: false,
    placeName: '',
    itemsArray: [],
    createdItemsArray: [],
    subTotal: 34.35,
    tax: null,
    taxPerc: null,
    tipPerc: null,
    tipAmnt: null,
    total: null,
    users: [],
    selectedUsers: [],
    checkStage: 'ADD', //'ADD', 'USER', 'EDIT', 'SPlIT', 'RESULTS'
    currentReceiptId: null,
    payer:{},
    itemSplits: {},
    createdItemSplits: [],
    userCosts: [],
    progressPercentage: 0,
    loading: false


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
        thumbnail: result.info.thumbnail_url,
        progressPercentage: 20
      })
    }
  }

//******************************************************
// STAGE= 'ADD'
//******************************************************

  handleUpload = () => {
    this.setState({
      loading: true
    })
    if (this.state.imgUrl){
      api.processReceipt(this.state.imgUrl)
      .then(json => {
        const placeName = (json.responses[0].textAnnotations[0].description.split('\n')[0])
        const items = itemizer(json.responses[0].textAnnotations)
        const subTotal = items.find(item => item.name.toLowerCase().includes("sub" && "total"))
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
            || item.yValue > subTotal.yValue
          )
        })

        this.setState({
          itemsArray: foodItems,
          tax: tax,
          taxPerc: (tax/subTotal),
          subTotal: parseFloat(subTotal.price),
          placeName: placeName,
          tipAmnt: tip,
          tipPerc: Math.round(tip/subTotal * 100),
          total: parseFloat(total.price)
        }, ()=> {
          this.setState({  checkStage: 'USER', progressPercentage: 40 });
        })
      })
    }
  }




//******************************************************
// STAGE= 'USER'
//******************************************************

  handleUserSearchChange = (e, {value}) => {
    this.setState({ selectedUsers: value })
  }

  handleAddGuestSubmit = (name) => {
    api.addUser(name)
    .then(() =>api.grabUsers())
    .then(users => this.setState({users: users}))

  }

  handleUserSelect = () => {
    if (!this.state.selectedUsers.length) {
      this.setState({ noSelectedUerError: true })
    } else {
      this.setState({ checkStage: 'EDIT', progressPercentage: 60 })
    }
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
    this.setState({subTotal: subTotalCheck.toFixed(2)}, () => {
      this.calculateTotal()
    })
  }
  calculateTotal = () => {
    if (!isNaN(this.state.tipAmnt) && !isNaN(this.state.subTotal)) {
      const total = ((this.state.subTotal ? parseFloat(this.state.subTotal):0) + this.state.tax + (this.state.tipAmnt ? this.state.tipAmnt:0) ).toFixed(2)
      this.setState({total: total})
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
    this.setState({ checkStage: 'SPLIT', progressPercentage: 80 })
  }


  handleCheckEditSubmit = (e) => {
    e.preventDefault();
    if (!this.state.payer){
      this.setState({ noPayerSelectedError: true })
    } else {
      this.createReceipt()
    }
  }

  handlePayer = (e, { value }) => {
    this.setState({ payer: value, noPayerSelectedError: false })
  }

//******************************************************
// STAGE= 'SPLIT'
//******************************************************

  handleAddItemSplit = (e, { value }, id) => {
    this.setState({
      itemSplits: {...this.state.itemSplits, [id]: value}
    })
  }

  submitSplit = () => {
    if (Object.keys(this.state.itemSplits).length === this.state.itemsArray.length){
      let splitLength = 0
      Object.values(this.state.itemSplits).forEach(e => splitLength += e.length)

      Object.keys(this.state.itemSplits).forEach(itemId => {
        this.state.itemSplits[itemId].forEach(userId => {
          api.addItemSplit({
            item_id:itemId,
            user_id:userId,
            splitBetween: this.state.itemSplits[itemId].length
          }).then(item => {
            this.setState({
              createdItemSplits: [...this.state.createdItemSplits, item]
            }, () => {
              if (this.state.createdItemSplits.length === splitLength){
                this.calculateResults()
              }
            })
          })
        })
      })
    } else {
      this.setState({ notAllItemsSplitError: true })
    }
  }

  calculateResults = () => {
    let usersSelected = [];

    this.state.createdItemSplits.forEach(item => {
      if (!usersSelected.includes(item.user_id)){
        usersSelected.push(item.user_id)
      }
    })
    console.log(usersSelected)

    this.setState({
      selectedUsers: this.state.selectedUsers.filter(user => usersSelected.includes(user.id))
    }, ()=>{
      const userCosts = this.state.selectedUsers.map(userData => {
        let total = this.state.createdItemSplits.filter(item => {
          console.log(this.state.createdItemSplits)
          return item.user.name === userData.name
        }).map(itemInfo => {
          return itemInfo.item.cost/itemInfo.splitBetween
        }).reduce((acc, curr) => {
          return acc + curr
        })

        total= total * (1 + (this.state.tipPerc?this.state.tipPerc:0 + this.state.taxPerc?this.state.taxPerc:0)/100)
          return {[userData.name]: total, profile_url: userData.profile_url}
      })

      this.setState({ userCosts: userCosts}, () => {
        this.setState({ checkStage: 'RESULTS', progressPercentage: 100 }, () => console.log('after', this.state))
      })
    })
  }

//******************************************************
// STAGE= 'RETURNS'
//******************************************************

  handleAnotherReceipt = () => {
    this.setState({
      checkStage: 'ADD',
      createdItemSplits: [],
      createdItemsArray: [],
      currentReceiptId: null,
      imgUrl: '',
      itemSplits: {},
      itemsArray: [],
      notAllItemsSplitError: false,
      notPhotoError: false,
      noPayerSelectedError: false,
      noSelectedUerError: false,
      payer: null,
      progressPercentage: 0,
      selectedUsers: [],
      subTotal: null,
      tax: null,
      taxPerc: null,
      thumbnail: '',
      tipAmnt: null,
      tipPerc: null,
      total: null,
      userCosts: [],
      loading: false
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
        <Progress percent={this.state.progressPercentage} indicating/>

        {this.state.checkStage === 'ADD' &&
          <AddReceipt
            thumbnail={this.state.thumbnail}
            imgUrl={this.state.imgUrl}
            notPhotoError={this.state.notPhotoError}
            loading={this.state.loading}

            showWidget={this.showWidget}
            handleUpload={this.handleUpload}
          />
        }

        {this.state.checkStage === 'USER' &&
          <React.Fragment>
            <UserSelect
              users={this.state.users}
              selectedUsers={this.state.selectedUsers}
              noSelectedUerError={this.state.noSelectedUerError}

              handleUserSelect={this.handleUserSelect}
              handleUserSearchChange={this.handleUserSearchChange}
              handleAddGuestSubmit={this.handleAddGuestSubmit}
            />


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
                noPayerSelectedError={this.state.noPayerSelectedError}
                placeName={this.state.placeName}

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
              notAllItemsSplitError={this.state.notAllItemsSplitError}
              imgUrl={this.state.imgUrl}

              handleAddItemSplit={this.handleAddItemSplit}
              submitSplit={this.submitSplit}
            />
          </React.Fragment>
        }

        {this.state.checkStage === 'RESULTS' &&
          <React.Fragment>
            <ResultPage
              userCosts={this.state.userCosts}
              createdItemSplits={this.state.createdItemSplits}
              payer={this.state.payer}

              calculateResults={this.calculateResults}
              handleAnotherReceipt={this.handleAnotherReceipt}
            />
          </React.Fragment>
        }

      </div>
    )
  }
}

export default App;
