const mongoose= require('mongoose');
const cities= require('./cities');
const {places, descriptors}= require('./seedHelpers');
mongoose.set('strictQuery', false);



mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
const Campground= require('../models/campground');


const db= mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',()=>{
    console.log('Database connected')
});

const seedDB= async()=>{
    await Campground.deleteMany({});
  for(let i=0; i<50; i++){
    const price= Math.floor( Math.random()*30)+10;
    const random1000= Math.floor(Math.random()*1000);
    const sample= array=> array[Math.floor(Math.random()* array.length)];

    
   const camp= new Campground({
title:`${sample(descriptors)} ${sample(places)}` ,
author: '63bb5f76be6eaa2cc78253ff',
        location:`${cities[random1000].city},${cities[random1000].state}`,
        image: 'https://source.unsplash.com/collection/483251',
        description: ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur ipsam voluptas quas ea beatae, odio explicabo molestiae eum! Illum cupiditate at commodi doloremque eum numquam alias, ipsam expedita qui voluptas.',
        price

    })
    await camp.save();
  }
}

module.exports= seedDB().then(
    ()=>{mongoose.connection.close()}
)
