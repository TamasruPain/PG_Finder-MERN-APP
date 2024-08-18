require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors')
const propertyRoutes = require('./routes/propRoutes.js');
const queryRoutes = require('./routes/queryRoutes.js');
const userRoutes = require('./routes/userRoutes.js')
const authRoutes = require('./routes/authRoutes.js')

//express app
const app = express();

// Increase the payload size limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


//meddileware
app.use(cors())
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});


//routes
app.use('/api/properties', propertyRoutes);
app.use('/api/query', queryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

//Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("connected to MongoDB!");
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log("listening on port", process.env.PORT);
            console.log("--------------------------");
            console.log("Server is Running !!");
        })
    })
    .catch((error) => {
        console.log('Connection Error: ', error);
    })

// //listen for requests
// app.listen(process.env.PORT, () => {
//     console.log("listening on port", process.env.PORT);
//     console.log("--------------------------");
//     console.log("Server is Running Baby 😎");
// })
