const { Telegraf } = require('telegraf');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN)

// bot.use((ctx)=> ctx.reply("Hi Human!!"))
bot.start((ctx) => {
    ctx.reply('Welcome')
})

bot.help((ctx) => {
    ctx.reply("This bot can perform following commands\n  /start\n  /help \n /getjab")
})

var today = new Date();
var dd = String(today.getDate());
var mm = String(today.getMonth() + 1) //January is 0!
var yyyy = today.getFullYear();


async function getVaccine(){
    url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=363&date=${dd}-${mm}-${yyyy}`
    let res = await axios.get(url)
    let arr = []

    for (let listOfHospital of res.data.sessions) {
        if((listOfHospital.available_capacity_dose1 > 0) || (listOfHospital.available_capacity_dose2 > 0)){
            result = `Vaccine Slot in Pune:
            Hospital Name: ${listOfHospital.name}
            Hospital Address: ${listOfHospital.address}
            Pincode: ${listOfHospital.pincode}
            Vaccine: ${listOfHospital.vaccine}
            Capacity Dose1: ${listOfHospital.available_capacity_dose1}
            Capacity Dose2: ${listOfHospital.available_capacity_dose2}
            No of Avilable Shots: ${listOfHospital.available_capacity}
            Fee Type: ${listOfHospital.fee_type}
            Minimum Age Limit: ${listOfHospital.min_age_limit}
            Slots: ${listOfHospital.slots}`
            arr.push(result)
            console.log(arr)
        }
                
    }
    console.log(arr)
    return arr
}

bot.command('getjab', (ctx) => {
    getVaccine()
    .then((arr)=>{
        for( let i = 0; i < arr.length; i++){
            console.log(arr[i])
            ctx.reply(arr[i])
        }
    })
    .catch(err => {
        console.error(err)
    })
    
})

bot.launch()