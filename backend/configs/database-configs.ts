export {}
const mongoose = require('mongoose')

mongoose.connect('mongodb://weatherpoint-database:27017', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
    console.log('connected to database!')
})

export default mongoose;