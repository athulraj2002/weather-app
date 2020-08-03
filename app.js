const fetch = require('node-fetch');
const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const app = express();



const config = {
    port: 7000
};

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));


app.get('/location/', async (req, res) => {
    let location = 'Trivandrum';
  
    let new_Data = [];
    new_Data = await getData(location);
    new_Data.success=true;
    res.status(200).json(new_Data);
});
app.get('/location/:loc', async (req, res) => {
    location = req.params.loc
    // let inter=db.filter((a)=>a['id']!=req.params.id);
    let new_Data = [];
    new_Data = await getData(location);
    if(new_Data.error){
        res.status(404).json(new_Data);
    } else {
        new_Data.success=true;
        res.status(200).json(new_Data);
    }

});
async function getData(location) {
    let url = `http://api.weatherstack.com/current?access_key=bad34ff065952c8b9fb17b1e57633717&%20query=${location}`;
    let data;
    data = await fetch(url, { method: 'get' });
    let json = await data.json(); 
    return json;
}

app.listen(config.port, (err) => {
    if (err) {
        console.error(err);
    }
    console.log(`app running on ${config.port}`);
});
