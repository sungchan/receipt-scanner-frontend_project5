Link to: [Backend](https://github.com/sungchaan/receipt-scanner-backend_project5)
## Bill Splitter
Take pictures of restaurant bills to split items between friends

## Motivation
Was always 

## Tech/Framework Useed
<b> Built with </b>
- [React.js](https://reactjs.org/) frontend
- [Ruby on Rails](https://rubyonrails.org/) backend
- [Semantic React UI](https://react.semantic-ui.com/) styling

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
