exports.handler = async (req, res) => {

    if(!(req.method === "POST")){
        return res.status(202).send('Wrong');
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilio_number = process.env.TWILIO_PHONE_NUMBER;

    const payload = req.body;

    const client = require('twilio')(accountSid, authToken);

    const curbside_fulfillment_body = 'Your ' + payload.store_name + ' order, ' + payload.order_number + ', is ready at ' + payload.pickup_address + '. Call us at ' + payload.merchant_phone + ' when you arrive.';
    const body = payload.sms_body || curbside_fulfillment_body;
    console.log(body);

    client.messages
        .create({
            body: body,
            from: twilio_number,
            to: payload.customer_phone
        })
        .then(message => console.log(message.sid));


    return res.status(200).send('Message Sent');
  };
