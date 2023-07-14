const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require("fs");
const qrcode = require('qrcode-terminal');

const express = require ('express');
const app = express();
const port = process.env.PORT || 5727 ;
require("dotenv").config();
var hostName;
app.listen(port, ()=>{
  console.log (`server listening on port ${port}`)
});
app.get('/', (req, res)=>{
  hostName = req.headers.host;
  console.log(`server listening on https://${hostName}`);
  res.send('testing server connection')
});

  const client = new Client({
    authStrategy: new LocalAuth({ clientId: "client-one" }),
    puppeteer: {
      args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
      ]
    }
 
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});


client.on("authenticated", (session) => {
    console.log("WHATSAPP WEB => Authenticated");
  });

  client.on('ready', () => {
    console.log('Client is ready!');
    const text = "Alright";
    const chatId = '2348108093964@c.us';
    const groupId = '120363045867794165@g.us';
    //client.getChatById(groupId).then(chat=>console.log(chat));
    async function getChatHistory(client) {
      try {
        const chatThread = await client.getChatById(groupId);
        //Logger.log(allChats)
        console.log(chatThread);
      } catch (e) {
        console.error(e);
      }
    };
    getChatHistory(client);
    client.sendMessage(groupId, text);
    
    //getUnreadMsg(client);
});

client.on("auth_failure", (session) => {
    console.log("WHATSAPP WEB => Auth Failure");
  });
  
  client.on("disconnected", (reason) => {
    console.log("WHATSAPP WEB => Disconnected");
  });
  
/*client.on('message', message => {
	console.log(message.body);
});*/
async function getUnreadMsg(client) {
  try {
    const allChats = await client.getChats();
    //Logger.log(allChats)
    console.log('check chat log');
  } catch (e) {
    console.error(e);
  }
}


client.initialize();
 

