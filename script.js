const loadInitialLocation = () => {
    let url = "http://localhost:7000/location/"
    fetch(url, { method: 'get' }).then(async (data) => {
        let datas = await data.json();
        createView(datas)
    })
}

const createView = (location) => {
    let currlocation = document.getElementById('location');
    if (location.success) {
        currlocation.innerHTML = location.location.name;
        document.getElementById('climate').innerHTML = location.current.weather_descriptions[0];
        document.getElementById('temp').innerHTML = `${location.current.temperature} &#8451;`;
        document.getElementById('humidity').innerHTML = `${location.current.humidity}`;
        document.getElementById('wind').innerHTML = `${location.current.wind_speed + ' ' + location.current.wind_dir}`;
        document.getElementById('airp').innerHTML = `${location.current.pressure}`;
        document.getElementById('chancer').innerHTML = `${location.current.precip}`;
        document.getElementById('time').innerHTML = `${location.current.observation_time}`;
        let date=new Date(location.location.localtime).toLocaleTimeString('en-US',{ hour: '2-digit', minute: '2-digit' });
        document.getElementById('date').innerHTML = date;
        
    } else {
        console.log('not found');

    }


}
function getItem() {
    let userLocation = document.getElementById('loc').value;
    let url = 'http://localhost:7000/location/' + userLocation + '/';
    fetch(url, { method: 'get' }).then(async (data) => {
        let datas = await data.json();
        createView(datas)
    }).catch(() => {
        console.log("error");
    });
}
window.onload = () => {
    loadInitialLocation();
}