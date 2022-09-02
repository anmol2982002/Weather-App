import './App.css';
import { WiFog } from 'weather-icons-react';
import {useState,useEffect} from 'react'


function App() {
  const [city, setcity] = useState("");
  const [tmp, settmp] = useState("");
  const [climate, setclimate] = useState("");
  const [country, setcountry] = useState("");
  const temp=(k)=>{
    return (k-273.15).toFixed(2);
  }


  const setCityDetail=(cityName)=>{
    setcity(cityName);
  }


  const searchLocation= async ()=>{
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9286151fc9802e880b596656e965e32a`;
    const res= await fetch(url);
    const newRes=await res.json();
    settmp(temp(newRes.main.temp)+"°C")
    setclimate(newRes.weather[0].main)
    setcountry(newRes.sys.country);
  }

  useEffect(()=>{
    let element=document.getElementById("main");
    let ele2= document.getElementById("check");

    const time= new Date().getHours();
    if(time>=18){
      ele2.style.backgroundImage = 'linear-gradient('
      + '0deg' + ', ' + "#141e30" + ', ' + "#243b55" + ')';
      element.style.backgroundImage=`url(${require('./images/night.png')})`;
    }
  })
  
  return (
    <div className="App" id="check">
      <div id='main'>
        <div id="temp" className='textDec'>{tmp}</div>
        <div id="day" className='textDec'>{climate}
        {tmp===""?"":<WiFog/>}
        <div>{city}</div>
        </div>
        <div className='textDec'>{country}</div>
        <input type="text" id="text" placeholder='Enter City' value={city} onChange={event=>{setCityDetail(event.target.value)}}/>
        <button onClick={searchLocation} id="btn">Search</button>
      </div>
    </div>
  );
}

export default App;

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=9286151fc9802e880b596656e965e32a

// style={{ backgroundImage:`url(./images/night.png)` }}

// style={{backgroundImage: 'url(' + require('./images/night.png') + ')'}}