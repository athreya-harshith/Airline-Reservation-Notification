## Notification Service
* This Service is to send the Notification to the users.
* This Service consumes the message from the message queue (RabbitMQ) .
* As soon as it consumes an event published by the Booking Service , it sends the mail to the user who done the successfull booking.

