require('dotenv').config();

const OpenAI = require("openai");


module.exports = {
  name: 'ai',
  aliases: [],
  description: 'talk with ai',
  usage: 'ai <prompt>',
  options: [
    {
      name: "prompt",
      description: "prompt for the ai to read",
      type: 3,
      required: true
    }
  ],


  execute(client, message){
      
      
    const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
      let prompt = message.content.slice(3).trim();
      console.log(prompt);
        
            
      (async () => {
        const gptResponse = await openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt: prompt,
            max_tokens: 4000,
            temperature: 0.9,
            top_p: 0.3,
            presence_penalty: 0,
            frequency_penalty: 0.5,
          });
        console.log(`${gptResponse.choices[0].text.substring(5)}`);
        let reply = "```" + gptResponse.choices[0].text + "\n```"
        //reply += ` ${gptresponse.data.choices[0].text}`
        
        message.reply(reply);
      })();

},  
  
  
  
  slashExecute(client, interaction){
      
      
      const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
        let prompt = interaction.options.getString("prompt");
        console.log(prompt);
        interaction.deferReply();
       
        
        
        (async () => {
          const gptResponse = await openai.completions.create({
              model: "gpt-3.5-turbo-instruct",
              prompt: prompt,
              max_tokens: 4000,
              temperature: 0.9,
              top_p: 0.3,
              presence_penalty: 0,
              frequency_penalty: 0.5,
            });
          console.log(`${gptResponse.choices[0].text.substring(5)}`);
          let reply = "```" + gptResponse.choices[0].text + "\n```"
          //reply += ` ${gptresponse.data.choices[0].text}`
          
          interaction.editReply(reply);
        })();
  
},     
    };