const TelegaBot = require('../');
const bot = new TelegaBot('TELEGRAM_BOT_TOKEN');

bot.on('/time', msg => {

    return bot.sendMessage(msg.from.id, 'Getting time...').then(re => {
        // Start updating message
        updateTime(msg.from.id, re.result.message_id);
    });

});

function updateTime(chatId, messageId) {

    // Update every second
    setInterval(() => {
        bot.editMessageText({ chatId, messageId }, `<b>Current time:</b> ${ time() }`, { parseMode: 'html' }).catch(error => console.log('Error:', error));
    }, 1000);

}

bot.start();

// Get current time
function time() {
    return new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}