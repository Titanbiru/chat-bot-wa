const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');

function chatbotResponse(message) {
    message = message.toLowerCase();
    if (message.includes('hello') || message.includes('hi')) {
        return 'HALLOOOO! Ada yang bisa di bantu?';
    } else if (message.includes('help')) {
        return 'Yess, saya siap membantu! Apa yang Anda butuhkan?';
    }
    return "Maaf, saya tidak mengerti. Bisa tolong ulangi? Kamu bisa memulai dengan 'hello' atau 'help'"; // Default response

}

const client = new Client({
    authStrategy: new LocalAuth({ ClientId: 'my-bot' }),
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR code received, scan please!');
    fs.writeFileSync('qr.txt', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (msg) => {
    console.log('Message received:', msg.body);
    const response = chatbotResponse(msg.body);
    msg.reply(response);
    console.log('Replied with:', response);
});

client.initialize();