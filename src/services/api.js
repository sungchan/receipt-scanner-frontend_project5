const API_BASE = 'http://localhost:3000'

const VISION_API = process.env.REACT_APP_DEV_API_URL

const processReceipt = (imgUrl) => {
  return fetch(VISION_API, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'applicatoin/json'
    },
    body: JSON.stringify({
      "requests": [
        {
          "features": [
            { "type": "TEXT_DETECTION" }
          ],
          "image": {
            "source": {"imageUri": `${imgUrl}`}
          },
          "imageContext": {
            "languageHints": [ "en" ]
          }
        }
      ]
    })
  }).then(resp => resp.json())
}

const addReceipt = (data) => {
  return fetch(`${API_BASE}/receipts`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      payer_id: data.payer_id,
      place_name: data.place_name,
      img_url: data.img_url,
      date: data.date,
      subtotal: data.subtotal,
      tax: data.tax,
      total: data.total
    })
  }).then(resp => resp.json())
}

const addItem = (data) => {
  return fetch(`${API_BASE}/items`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      receipt_id: data.receipt_id,
      name: data.name,
      cost: data.cost
    })
  }).then(resp => resp.json())
}

const addItemSplit = (data) => {
  console.log(data)
  return fetch(`${API_BASE}/item_splits`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      item_id: data.item_id,
      user_id: data.user_id,
      splitBetween: data.splitBetween
    })
  }).then(resp => resp.json())
}

const grabUsers = () => {
  return fetch(`${API_BASE}/users`)
  .then(resp => resp.json())
}

const addUser = (name) => {
  return fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      name: name
    })
  }).then(resp => resp.json())
}

const addUserReceipt = (data) => {
  return fetch(`${API_BASE}/user_receipts`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      user_id: data.user_id,
      receipt_id: data.receipt_id,
    })
  }).then(resp => resp.json())
}

const api = {
  processReceipt,
  addReceipt,
  addItem,
  grabUsers,
  addUser,
  addItemSplit,
  addUserReceipt
}

export default api;
