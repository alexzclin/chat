const moment = require("moment");

function formatMessage(username, text) {
    return {name: username, message: text, time: moment().format('h:mm a')};
}

module.exports = formatMessage;