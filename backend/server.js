const express = require('express');
const app = express();
const dbConnection = require('./config/dbConfig');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const movie = require('./routers/routeMove');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
dbConnection();
const PORT = process.env.PORT || 5000;

app.use('/api', movie);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

