export {}
const mongoose = require('mongoose')

mongoose.connect(process.env.NODE_ENV === "production" ? process.env.ATLAS_SERVER : 'http://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
    console.log('connected to database!')
})

export default mongoose;