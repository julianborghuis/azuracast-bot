const mongoose = require('mongoose');
const { Guild } = require('./models');

module.exports = client => {

    client.getGuild = async(guild) => {
        let data = await Guild.findOne({ guildID: guild.id });
        if (data) return data;
        else return client.config.defaultSettings;
    };

    client.updateGuild = async(guild, settings) => {
        let data = await client.getGuild(guild);

        if (typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
            else return;
        }

        console.log(`Guild "${data.guildName}" updated settings: ${Object.keys(settings)}`);
        return await data.updateOne(settings);
    };

    client.getGuildStation = async(guild) => {
        let data = await client.getGuild(guild);
        return client.findStation(data.station || "CMFM!")
    }

    client.setGuildStation = async(guild, stationName) => {
        await client.updateGuild(guild, {
            station: stationName
        })
        return await client.getGuild(guild)
    }

    client.createGuild = async(settings) => {
        let defaults = Object.assign({ _id: mongoose.Types.ObjectId() }, client.config.defaultSettings);
        let merged = Object.assign(defaults, settings);

        const newGuild = await new Guild(merged);
        return newGuild.save()
            .then(console.log(`Default settings saved for guild "${merged.guildName}" (${merged.guildID})`));
    };

    client.deleteGuild = async(guild) => {
        await Guild.deleteOne({ guildID: guild.id })
        console.log(`Guild "${data.guildName}" has been deleted`);
    };

    client.convertLength = (millisec) => {
        // Credit: https://stackoverflow.com/questions/19700283/how-to-convert-time-milliseconds-to-hours-min-sec-format-in-javascript
        var seconds = (millisec / 1000).toFixed(0);
        var minutes = Math.floor(seconds / 60);
        var hours = "";
        if (minutes > 59) {
            hours = Math.floor(minutes / 60);
            hours = (hours >= 10) ? hours : "0" + hours;
            minutes = minutes - (hours * 60);
            minutes = (minutes >= 10) ? minutes : "0" + minutes;
        }
        // Normally I'd give notes here, but I actually don't understand how this code works.
        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        if (hours != "") {
            return hours + ":" + minutes + ":" + seconds;
        }
        return minutes + ":" + seconds;
    };
};