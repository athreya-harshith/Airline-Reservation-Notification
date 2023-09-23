const express = require('express');
// in the below line object destructuring happens and the PORT is a constant that hold the value of the key : value pair PORT:process.env.PORT
const {ServerConfig,Logger} = require('./config');// no need for './config/index' it automatically pics index.js
const {EmailService} = require('./services');
const amqplib = require('amqplib');
async function connectQueue(){
    try {
        //to connect to rabbitMQ server
        const connection = await amqplib.connect('amqp://127.0.0.1');
        const channel = await connection.createChannel();

        await channel.assertQueue('AirlineNotificationQueue');
        channel.consume('AirlineNotificationQueue',(data)=>{
            console.log(`${Buffer.from(data.content)}`);
            const object = JSON.parse(`${Buffer.from(data.content)}`);
            EmailService.sendEmail(ServerConfig.GMAIL_EMAIL,object.recepientEmail,object.subject,object.text);
            channel.ack(data);
        })
    } catch (error) {
        console.log(error);
    }
}

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
    await connectQueue();
    console.log('queue is up');
});

