Link to: [Backend](https://github.com/sungchaan/receipt-scanner-backend_project5)
## Bill Splitter
Take pictures of restaurant bills to split items between friends

## Demo
Upload/take photo of bill (uploaded in this case)\
![Add Receipt](https://github.com/sungchan/receipt-scanner-frontend_project5/blob/master/gifs/1.%20Add%20Receipt%20.gif)

Select who you ate with, can add new users if person isn't found\
![Add User](https://github.com/sungchan/receipt-scanner-frontend_project5/blob/master/gifs/2.%20Add%20users.gif)

Select who's paying, correct rare errors and add responsive tip by either percentage or amount\
![Add Tip](https://github.com/sungchan/receipt-scanner-frontend_project5/blob/master/gifs/3.%20Add%20tip.gif)

Split items based on who ordered what, can split items between multiple people\
![Assign items](https://github.com/sungchan/receipt-scanner-frontend_project5/blob/master/gifs/4.%20Assign%20items.gif)

Shows how much is owed\
![Results](https://github.com/sungchan/receipt-scanner-frontend_project5/blob/master/gifs/5.%20Results.gif)


## Challenges
- Parsing through 10,000+ line response from Google Vision API to find necessary information
- Creating algorithm that attaches corresponding price to item
- Fixing problem when values for the price would come be returned from the API as separate numbers
- Accounting for edge cases for different types of receipts

## Tech/Framework Useed
<b> Built with </b>
- [React.js](https://reactjs.org/) frontend
- [Ruby on Rails](https://rubyonrails.org/) backend
- [Semantic React UI](https://react.semantic-ui.com/) styling
- [Google Cloud Vision API](https://cloud.google.com/vision/docs/ocr) optical character recognition 

## Features
- uploads photo of receipt and returns each item and its cost along with the totals and tax
- allows for edits of costs and calculates tip 
- assign or split each item between friends 

## Installation
Backend
1. clone backend repo and run 'bundle install'
2. run 'rails db:migrate' then 'rails db:seed'
3. run 'rails s' (will default to localhost:3000)

Frontend
1. clone frontend repo and run 'npm install'
2. run 'npm start' (will prompt you to run on another port, hit 'y' and run on port 3001)

## API Reference
- [Google Vision API](https://www.google.com/search?q=google+vision+api&rlz=1C5CHFA_enUS814US814&oq=google+vision+api&aqs=chrome..69i57j69i60l2j0j69i65j69i59.3303j0j7&sourceid=chrome&ie=UTF-8) ocr
- [Cloudinary API](http://cloudinary.com)
