module.exports = {
    name: 'time',
    aliases: ["t"],
    utilisation: '{prefix}time',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing)
            return message.reply({ content: `❌ | There is no music currently playing!.`, allowedMentions: { repliedUser: false } });

        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();

        if (timestamp.progress == 'Infinity')
            return message.reply({ content: `❌ | This song is live streaming, no duration data to display.`, allowedMentions: { repliedUser: false } });

        message.reply(`${progress} (**${timestamp.progress}**%)`);
    },
};