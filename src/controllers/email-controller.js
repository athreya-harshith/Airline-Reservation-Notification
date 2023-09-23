const {EmailService} = require('../services');
const {StatusCodes} = require('http-status-codes');
async function createTicket(req,res)
{
    try {
         const response = await EmailService.createTicket({
            subject:req.body.subject,
            content:req.body.content,
            recepientEmail:req.body.recepientEmail
         });
         return res.status(StatusCodes.OK).json(response);//need to lookup the response and error hanlding
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}
module.exports = {
    createTicket
}