const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
//imports .env variables
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI

// const serverOptions = {
//     poolSize: 100,
//     socketOptions: {
//       socketTimeoutMS: 6000000
//     }
//   };
// console.log(uri)
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false})

const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
}).then(() => { }).catch(err => console.error(err))

const moviesRouter = require('./routes/movieAPI')
// const usersRouter = require('./routes/users')

app.use('/movies', moviesRouter)
// app.use('/users', usersRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})