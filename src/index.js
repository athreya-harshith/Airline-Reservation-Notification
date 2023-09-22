const express = require('express');
// in the below line object destructuring happens and the PORT is a constant that hold the value of the key : value pair PORT:process.env.PORT
const {ServerConfig,Logger} = require('./config');// no need for './config/index' it automatically pics index.js

const app = express();
const apiRoutes = require('./routes');
const mailsender= require('./config/email-config')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//both above are for reading requests that has request body
app.use('/api',apiRoutes);
app.listen(ServerConfig.PORT,async ()=>{
    console.log(`Server is up and running on the port ${ServerConfig.PORT}`);
    // Logger.info({message:'some logging is begin done',error:"some error caught",label :'some label according to us'});
    try {
        const response = await mailsender.sendMail({
            from:ServerConfig.GMAIL_EMAIL,
            to:'athreya1207@gmail.com',
            subject:'Whether the Notification Service Working',
            text:'WHoooo !!!!! the Service is working'
        });
        console.log(response)
    } catch (error) {
        console.log(error);
    }
});

