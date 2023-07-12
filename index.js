const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require("fs");
const qrcode = require('qrcode-terminal');
const { Console } = require("console");
const Logger = new Console({
    stdout: fs.createWriteStream("normalStdout.txt", { flags: 'a' }),
    stderr: fs.createWriteStream("errStdErr.txt"),
  });

  const client = new Client({
    authStrategy: new LocalAuth({ clientId: "client-one" })
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});


client.on("authenticated", (session) => {
    console.log("WHATSAPP WEB => Authenticated");
  });

  client.on('ready', () => {
    console.log('Client is ready!');
});

client.on("auth_failure", (session) => {
    console.log("WHATSAPP WEB => Auth Failure");
  });
  
  client.on("disconnected", (reason) => {
    console.log("WHATSAPP WEB => Disconnected");
  });
  
client.on('message', message => {
	console.log(message.body);
});


client.initialize();
 

