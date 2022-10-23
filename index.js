import express from 'express'
import bodyParser from 'body-parser'
import twilio from 'twilio'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.ACCOUNT_TOKEN;
const client = new twilio(accountSid, authToken);

app.post("/sms", async (req, res) => {
  try {
    const response = await client.messages.create(
      {
        body: req.body.message,
        to: req.body.phoneNumber,
        from: process.env.PHONE_NUMBER,
      }
    )

    res.status(200).send({
      data: response
    })
  } catch(error) {
    console.log({ error })
    res.status(500).send("Internal server error")
  }
  
})

app.listen(3000, () => {
  console.log("app started successfully")
})
