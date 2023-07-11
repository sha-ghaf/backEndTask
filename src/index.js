const express = require ('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const path = require('path')
const DBConnection = require('./helpers/db/mongoose.js')
const cors = require ('cors')
const noteRouter = require('./routes/noteRouter.js')
const userRouter = require('./routes/userRouter.js')
const authRouter = require('./routes/authRouter.js')
const mongoose  = require('mongoose')
const {logger , logEvents} = require('./helpers/middleware/logger.js')
const errorHandler = require('./helpers/middleware/errorHandler.js')
const corsOptions = require('./helpers/db/corsOptions')

const app = express()
DBConnection()
app.use(cookieParser())
app.use(cors(corsOptions))

// function in middleWare 
app.use(logger)
app.use(express.json())

// Routers
app.use('/note', noteRouter)
app.use('/user', userRouter)
app.use('/auth', authRouter)

// for hbs
app.set('view engine', 'hbs');
const viewsDirectory = path.join (__dirname , "../views" )
app.set( "views" , viewsDirectory)
const publicDirectory =  path.join(__dirname , '../public')
app.use (express.static (publicDirectory))

app.use('/', require('./routes/root.js'))
app.all('*' , (req, res) => {
    // res.status(404).send('Sorry this page isn,t fined');
    res.status(404)
    if (req.accepts('html')) {
        res.render("error" , {
        title:"Sorry!",
        paragraph:"The resources you have request doesn't exit"
    })
    } else if (req.accepts('json')) {
        res.send({message : 'page not found'})
    } else {
        res.type('text').send({message : 'page not found'})
    }
});

app.use(errorHandler)

mongoose.connection.on('error', err => {
    console.log("connected to DB")
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})


const port = process.env.PORT || 5000
app.listen( port , () => {
    console.log(`listen to port ${port}`)
})

// app.get("/" , (req , res) => {
//     res.render("index" , {
//         title:"TechNotes",
//     })
// })

// "username": "shimo mohamed",
// "roles": "Manager",