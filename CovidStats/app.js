const { Telegraf } = require('telegraf');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => {
    ctx.reply('Welcome')
})

bot.help((ctx) => {
    ctx.reply("This bot can perform following commands\n  /start\n  /help \n /showdata")
})

async function getdata(){
    url = `https://api.covid19india.org/data.json`
    let res = await axios.get(url)
    let arr = []
    
    for (let cases of res.data.statewise){
        result = `Cases in ${cases.state}:
        Active Cases ${cases.active}
        Confirmed Cases ${cases.confirmed}
        Recovered Cases ${cases.recovered}
        Last Update Time ${cases.lastupdatedtime}` 
        arr.push(result)
        
    }
    // console.log(arr)
    return arr
}


bot.command('showdata',(ctx)=>{
    getdata()
    .then((arr)=>{
        for( let i = 0; i < arr.length; i++){
            console.log(arr[i])
            ctx.reply(arr[i])
        }
    })
    
})

bot.launch()