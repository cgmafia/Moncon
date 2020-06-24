const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/ConsultDB', { useNewUrlParser: true }, (err) => {
//     if (!err) { console.log('MongoDB Connection Succeeded.') }
//     else { console.log('Error in DB connection : ' + err) }
// });

const uri = 'mongodb://JMhHSleOcYLpBuLI:WMi9n9Tly2aL2ws3@vand3d-shard-00-00-qbrut.mongodb.net:27017,vand3d-shard-00-01-qbrut.mongodb.net:27017,vand3d-shard-00-02-qbrut.mongodb.net:27017/ConsultDB?ssl=true&replicaSet=vand3d-shard-0&authSource=admin&retryWrites=true&w=majority';


const connectDB = async() => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });
    console.log("mongoDB connected successfully. visit /consult to start");
};

require('./consult.model');

module.exports = connectDB;