
Array.prototype.unique = function() {
  return this.filter((value, index, self) => {
    return self.indexOf(self.find(item => item.yValue === value.yValue)) === index;
  });
}

const itemizer = (receiptInfo) => {

  let receipt = receiptInfo.slice(1, receiptInfo.length)
  let xMidPoint = (receiptInfo[0].boundingPoly.vertices[0].x + receiptInfo[0].boundingPoly.vertices[1].x)/2
  let isPrice = receipt.filter(item => item.boundingPoly.vertices[0].x > xMidPoint && item.description.includes('.'))


  let receiptBreakdown = isPrice.map(item => {
    let yValue= (item.boundingPoly.vertices[0].y + item.boundingPoly.vertices[3].y)/2

    let rows = receipt.filter(item => {
      return item.boundingPoly.vertices[0].y < yValue + 6 && item.boundingPoly.vertices[3].y > yValue - 6
    })

    let price = rows.map(item => {
      if (item.boundingPoly.vertices[0].x > xMidPoint){
        return item.description
      }
    }).filter(item => {
      return !!parseFloat(item) || item === '.' || item === '00'
    })

    if (price[0] === '.'){
      price.shift()
    }

    let quantity = rows.map(item => {
      if (item.boundingPoly.vertices[0].x < xMidPoint ){
        return item.description
      }
    }).filter(item => {
      return !!parseInt(item)
    })

    const name = (rows.map(item => item.description).filter(item => !parseInt(item) && item !== '.' && item !== '00').join(' '))

    return {
      'price': parseFloat(price.join('')),
      'yValue': yValue,
      'name': name,
      'quantity': parseInt(quantity) ? parseInt(quantity):1
    }
  })
  return receiptBreakdown;
}

export default itemizer;
