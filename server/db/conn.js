const mongoose = require('mongoose');

const DB = process.env.DATABASE;

const connectionParams={
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true ,
};
mongoose.connect(DB,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });

