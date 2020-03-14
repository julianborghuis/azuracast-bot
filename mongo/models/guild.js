const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    ownerID: String,
    ownerUsername: String,
    prefix: Array,
    autoJoinChannel: String,
    station: String
});

module.exports = mongoose.model('Guild', guildSchema);