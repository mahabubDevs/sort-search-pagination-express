const mongoose = require('mongoose');

const dbConfig =  () => {
    try {
        const connectionParam = {useNewUrlParser: true,};
         mongoose.connect(process.env.MONGO_URL, connectionParam);
        mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB');
        });
        mongoose.connection.on('error', (error) => {
            console.log('Error:', error);
        });
        mongoose.connection.on('disconnected', () => {
            console.log('Disconnected from MongoDB');
        }); 
    } catch (error) {   
        console.log(error);
    }
};

module.exports = dbConfig;
