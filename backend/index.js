const express = require('express')
const connectToDb = require("./config/connectDB");
const {errorHandler,notFound} = require('./middlewares/error');
require("dotenv").config()

// Connection to DB 
connectToDb();

//init App
const app = express()

//Middlewares
app.use(express.json())

// Routes

app.use('/api/auth', require('./routes/authRoute'))
app.use('/api/users', require('./routes/usersRoute'))
app.use('/api/formation', require('./routes/formationRoute'))
app.use('/api/comment', require('./routes/commentRoute'))
app.use('/api/organisation', require('./routes/organisationRoute'))


// Error Handler Middleware
app.use(notFound)
app.use(errorHandler)
//Running To Server

const PORT = process.env.PORT
app.listen(PORT,()=> console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))